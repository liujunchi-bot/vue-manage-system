<template>
  <div class="manage">
    <div class="manage-header">
      <div>
        <el-button type="primary" @click="exportRow">导出</el-button>
      </div>

      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary" @click="searchKey(searchFrom.keyword)"
          >搜索</el-button
        >
        <el-button type="info" @click="getList()">重置</el-button>
      </common-form>
    </div>
    <project-admin-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="handlePageChange"
      @changeSize="handleSizeChange"
      id="out-table"
    ></project-admin-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm";
import ProjectAdminTable from "../../components/ProjectAdminTable";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import axios from "../../axios/ajax";
export default {
  components: {
    ProjectAdminTable,
    CommonForm
  },
  data() {
    return {
      if_submit: "",
      if_issued: "",
      tableData: [],
      tableLabel: [
        {
          prop: "id",
          label: "投标编号",
          width: 80,
        },
        // {
        //   prop: "file_code",
        //   label: "文档编号",
        //   width: 150
        // },
        {
          prop: "tender_date",
          label: "投标时间",
          width: 120,
        },
        {
          prop: "project_name",
          label: "项目名称",
          width: 180,
        },
        {
          prop: "audit_type",
          label: "投标类型",
          width: 80,
        },
        {
          prop: "tender_block",
          label: "标段",
          width: 80,
        },
        {
          prop: "tender_offer",
          label: "投标报价(万元)",
          width: 80,
        },
        {
          prop: "tender_block_sum",
          label: "含税标段预估金额(万元)",
          width: 80,
        },
        {
          prop: "tender_flag",
          label: "是否中标",
          width: 80,
        },
        {
          prop: "tender_share",
          label: "中标份额",
          width: 80,
        },

        {
          prop: "tender_ceiling",
          label: "含税中标合同上限(万元)",
          width: 80,
        },
        {
          prop: "tender_discount",
          label: "中标折扣",
          width: 80,
        },
        {
          prop: "file_url",
          label: "下载链接",
          width: 150,
          type: "link",
        },
        {
          prop: "staff_namej",
          label: "经办人",
          width: 100,
          type: "name",
        },
        {
          prop: "issue_state",
          label: "审核状态",
          width: 100,
        },
        {
          prop: "staff_names",
          label: "审核人",
          width: 100,
          type: "name",
        },
      ],
      config: {
        currentPage: 1,
        total: 0,
        pageSize: 20,
        loading: false,
      },
      searchFrom: {
        keyword: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
        },
      ],
      formData: "",
    };
  },
  methods: {
    handleSizeChange: function (size) {
      this.config.pagesize = size;
      // console.log(this.config.pagesize)// 每页下拉显示数据
    },
    handlePageChange: function (currentPage) {
      this.config.currentPage = currentPage;
      // console.log(this.config.currentPage) // 点击第几页
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      axios._get("http://8.129.86.121:80/tender/getAdminTender").then(
        (res) => {
          this.$message.success("获取投标列表成功！");
          this.tableData = res;

          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i]["file_url"] == null) {
              this.tableData[i]["file_url"] = "NULL";
            } else {
              this.tableData[i]["file_url"] = window.encodeURI(
                this.tableData[i]["file_url"]
              );
            }

            this.if_submit = this.tableData[i].if_submit;
            this.if_issued = this.tableData[i].if_issued;

            if (this.if_submit == "0") {
              this.tableData[i]["submit_state"] = "待提交";
            } else {
              this.tableData[i]["submit_state"] = "已提交";
              if (this.if_issued == "0") {
                this.tableData[i]["issue_state"] = "待审核";
              } else if (this.if_issued == "1") {
                this.tableData[i]["issue_state"] = "被退回";
              } else {
                this.tableData[i]["issue_state"] = "已通过";
              }
            }
          }

          // this.config.total = res.data.count;
          this.config.loading = false;
          this.config.total = this.tableData.length;
          if (this.tableData.length == 0) {
            this.config.currentPage = 0;
          }
          //console.log("tabledata: "+JSON.stringify(res));
        },
        (err) => {
          // alert("未能获取投标列表，请稍后再试！");
          this.$message({
            type: "error",
            message: "未能获取投标列表，请稍后再试！",
          });
        }
      );
    },
    //定义导出Excel表格事件
    exportRow() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "导出文档.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    searchKey(keyword) {
      if (keyword == "" || keyword == undefined || keyword == null) {
        this.getList();
      } else {
        this.config.loading = true;
        var dataList = [];

        for (var i = 0; i < this.tableData.length; i++) {
          for (var j = 0; j < this.tableLabel.length; j++) {
            var keyStr = this.tableLabel[j]["prop"];

            if (
              this.tableData[i][keyStr] != null &&
              this.tableData[i][keyStr].toString().indexOf(keyword) != -1 &&
              keyStr != "file_url"
            ) {
              dataList.push(this.tableData[i]);
              break;
            }
          }
        }
        this.tableData = dataList;
        this.config.loading = false;
        this.config.total = this.tableData.length;
      }
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
