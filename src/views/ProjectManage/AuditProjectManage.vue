<template>
  <div class="manage">
    <el-dialog
      title="更新文档"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :rules="rules"
        ref="commonForm"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <div>
        <el-button type="primary" @click="exportRow">导出</el-button>
      </div>
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary" @click="searchKey(searchFrom.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <project-check-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editRow"
      @pass="passProject"
      @refuse="refuseProject"
      id="out-table"
    ></project-check-table>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm'
import ProjectCheckTable from '../../components/ProjectCheckTable'
import FileSaver from "file-saver";
import XLSX from "xlsx";
import axios from '../../axios/ajax'
import qs from 'qs'

export default {
  components: {
    CommonForm,
    ProjectCheckTable
  },
  data () {
    return {
      tempData:[],
      if_submit: '',
      if_issued: '',
      operateType: 'edit',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'project_code',
          label: '项目编号',
        },
        {
          prop: 'project_type',
          label: '审计大类类型',
        },
        {
          prop: 'project_name',
          label: '项目名称'
        },
        {
          prop: 'project_client',
          label: '客户名称',
        },
        {
          prop: 'project_reportnumber',
          label: '审计报告编号'
        },
        {
          prop: 'project_class',
          label: '项目类型'
        },
        {
          prop: 'project_partner',
          label: '项目合伙人'
        },
        {
          prop: 'project_qualitycontroler',
          label: '质控负责人'
        },
        {
          prop: 'project_head',
          label: '项目负责人',
        },
        {
          model: 'project_starttime',
          label: '项目开始时间',
          type: 'date'
        },
        {
          model: 'project_endtime',
          label: '项目结束时间',
          type: 'date'
        },
        {
          prop: 'project_members',
          label: '组员',
        },
        {
          prop: 'project_accountant',
          label: '签字注册会计师',
        },
        {
          prop: 'project_costengineer',
          label: '签字注册造价师',
        },
        {
          prop: 'project_taxaccountant',
          label: '签字税务师',
        },
        {
          prop: 'project_comment',
          label: '报告意见类型',
        },
        {
          prop: 'project_construction',
          label: '施工单位',
        },
        {
          prop: 'project_assets',
          label: '资产总额（万元）',
        },
        {
          prop: 'project_audit',
          label: '审定金额（万元）',
        },
        {
          prop: 'project_reduction',
          label: '审减金额（万元）',
        },
        {
          prop: 'staff_namej',
          label: '经办人',
          width: 100,
          type: "name"
        },
        {
          prop: 'issue_state',
          label: '审核状态',
          width: 100
        },
        {
          prop: 'staff_names',
          label: '审核人',
          width: 100,
          type: "name"
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        project_code:'',
        project_type: '',
        project_name: '',
        project_client: '',
        project_reportnumber: '',
        project_class: '',
        project_partner: '',
        project_code: '',
        project_qualitycontroler: '',
        project_head: '',
        project_members: '',
        project_accountant: '',
        project_costengineer: '',
        project_taxaccountant: '',
        project_comment: '',
        project_starttime: '',
        project_endtime: '',
        project_construction: '',
        project_assets: '',
        project_audit: '',
        project_reduction: ''
      },
      operateFormLabel: [
        {
          model: 'project_code',
          label: '项目编号'
        },
        {
          model: 'project_name',
          label: '项目名称'
        },
        {
          model: 'project_type',
          label: '审计大类类型',
          type: 'select',
          opts: [
            {
              label: '财务审计',
              value: '财务审计'
            },
            {
              label: '工程审计',
              value: '工程审计'
            },
            {
              label: '税务审计',
              value: '税务审计'
            },
          ]
        },
        {
          model: 'project_class',
          label: '项目类型'
        },
        {
          model: 'project_client',
          label: '客户名称'
        },
        {
          model: 'project_reportnumber',
          label: '审计报告编号'
        },
        {
          model: 'project_qualitycontroler',
          label: '质控负责人'
        },
        {
          model: 'project_head',
          label: '项目负责人'
        },
        {
          model: 'project_starttime',
          label: '项目开始时间',
          type: 'date'
        },
        {
          model: 'project_endtime',
          label: '项目结束时间',
          type: 'date'
        },
        {
          model: 'project_partner',
          label: '项目合伙人'
        },
        {
          model: 'project_members',
          label: '组员'
        },
        {
          model: 'project_accountant',
          label: '签字注册会计师'
        },
        {
          model: 'project_costengineer',
          label: '签字注册造价师'
        },
        {
          model: 'project_taxaccountant',
          label: '签字税务师'
        },
        {
          model: 'project_comment',
          label: '报告意见类型'
        },
        {
          model: 'project_construction',
          label: '施工单位'
        },
        {
          model: 'project_assets',
          label: '资产总额'
        },
        {
          model: 'project_audit',
          label: '审计金额'
        },
        {
          model: 'project_reduction',
          label: '审减金额'
        }
      ],
      rules: {
        project_code: [
          { required: true, message: '请输入项目编号', trigger: 'blur' },
          { min: 10, max: 255, message: '项目编号长度需要在 10 到 255 个字符', trigger: 'blur' }
        ],
        project_name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 4, max: 255, message: '项目名称长度需要在 4 到 255 个字符', trigger: 'blur' }
        ],
        project_class: [
          { required: true, message: '请输入项目类型', trigger: 'blur' },
          { min: 4, max: 255, message: '项目类型长度需要在 4 到 255 个字符', trigger: 'blur' }
        ],
        project_type: [
          { type: "enum", enum: ['财务审计', '工程审计', '税务审计'], required: true, message: '请选择项目大类类型：财务审计，工程审计或税务审计', trigger: 'blur' }
        ],
        project_client: [
          { required: true, message: '请输入客户名称', trigger: 'blur' },
          { max: 255, message: '客户名称长度最多 255 个字符', trigger: 'blur' }
        ],
        project_reportnumber: [
          { required: true, message: '请输入审计报告号', trigger: 'blur' },
          { max: 255, message: '审计报告号长度最多 255 个字符', trigger: 'blur' }
        ],
        project_qualitycontroler: [
          { required: true, message: '请输入质控负责人', trigger: 'blur' },
          { max: 255, message: '质控负责人长度最多 255 个字符', trigger: 'blur' }
        ],
        project_head: [
          { required: true, message: '请输入项目负责人', trigger: 'blur' },
          { max: 255, message: '项目负责人长度最多 255 个字符', trigger: 'blur' }
        ],
        project_starttime: [
          { required: true, message: '请输入项目开始时间', trigger: 'blur' },
        ],
        project_endtime: [
          { required: true, message: '请输入项目结束时间', trigger: 'blur' },
        ],
        project_assets:[
          { type: 'number', message: '资产总额需输入数字（万元）', trigger: 'blur', transform: (value) => Number(value)}
        ],
        project_audit:[
          { type: 'number', message: '审定金额需输入数字（万元）', trigger: 'blur', transform: (value) => Number(value)}
        ],
        project_reduction:[
          { type: 'number', message: '审减金额需输入数字（万元）', trigger: 'blur', transform: (value) => Number(value)}
        ],
      },
      searchFrom: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ],
      formData: "",
    }
  },
  methods: {
    getList (name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      axios._get("http://8.129.86.121:8080/project/getCheckProject").then(res => {
        this.$message.success("获取项目列表成功！")
        this.tableData = res;
        
        for (var i = 0; i < this.tableData.length; i++) {
          this.if_submit = this.tableData[i].if_submit;
          this.if_issued = this.tableData[i].if_issued;
          
          if (this.if_submit == '0')
          {
            this.tableData[i]["submit_state"] = '待提交';
          }
          else 
          {
            this.tableData[i]["submit_state"] = '已提交';
            if (this.if_issued == '0')
            {
              this.tableData[i]["issue_state"] = '待审核';
            }
            else if (this.if_issued == '1')
            {
              this.tableData[i]["issue_state"] = '被退回';
            }
            else
            {
              this.tableData[i]["issue_state"] = '已通过';
            }
          }
        }
        this.config.loading = false;
      }, err => {
        alert("getlist error!!!");
      })
    },
    editRow (row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    passProject (row) {
      this.$confirm("此操作将审核通过该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.operateForm = row;
          let formdata = new FormData();
          for (var key2 in this.operateForm) {
            if (key2 != "issue_state" && key2 != "submit_state")
            {
              formdata.append(key2, this.operateForm[key2])
            }
          }

          axios._post('http://8.129.86.121:8080/project/pass', formdata).then(res => {
            if (res.code == "250") {
              this.$message({
                type: "error",
                message: "已有审核人处理此项目！"
              });
            }
            else {
              this.$message({
                type: "success",
                message: "审核结果保存成功!"
              });
            }

            this.getList();
          }, err => {
            this.$message({
              type: "error",
              message: "审核结果保存失败！"
            });
            this.getList();
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核"
          });
        });
    },
    refuseProject (row) {
       this.$confirm("此操作将退回该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.operateForm = row;
          let formdata = new FormData();
          for (var key3 in this.operateForm) {
            if (key3 != "issue_state" && key3 != "submit_state"){
              formdata.append(key3, this.operateForm[key3])
            }
          }
          axios._post('http://8.129.86.121:8080/project/refuse', formdata).then(res => {
            if (res.code == "250") {
              this.$message({
                type: "error",
                message: "已有审核人处理此项目！"
              });
            }
            else {
              this.$message({
                type: "success",
                message: "审核结果保存成功!"
              });
            }
            this.getList();
          }, err => {
            this.$message({
              type: "error",
              message: "审核结果保存失败"
            });
            this.getList();
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核"
          });
        });
    },
    //定义导出Excel表格事件
    exportRow () {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
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
    searchKey (keyword) {
      if (keyword == "" || keyword == undefined || keyword == null) {
        this.getList();
      }
      else {
        this.config.loading = true;
        var dataList = [];

        for (var i = 0; i < this.tableData.length; i++) {
          for (var j = 0; j < this.tableLabel.length; j++) {
            var keyStr = this.tableLabel[j]["prop"];

            if (this.tableData[i][keyStr] != null && this.tableData[i][keyStr].toString().indexOf(keyword) != -1 && keyStr != "file_url") {
              dataList.push(this.tableData[i]);
              break;
            }
          }
        }
        this.tableData = dataList;
        this.config.loading = false;
      }
    },
    confirm () {
      //console.log(this.$refs.commonForm.$children[0]);
      this.$refs.commonForm.$children[0].validate((valid) => {
          if (valid) 
          {
            if (this.operateType === 'edit')
            {
              let formdata = new FormData();
              for (var key in this.operateForm) {
                if (key != "issue_state" && key != "submit_state")
                {
                  formdata.append(key, this.operateForm[key])
                }
              }

              axios._post('http://8.129.86.121:8080/project/update', formdata).then(res => {
                this.$message.success("更新项目成功！");
                this.isShow = false;
                // console.log("Inserted " + res);//res是返回插入数据的id
                this.getList()
              }, err => {
                alert("error!!!");
                this.$message({
                  message: "更新项目失败",
                  type: "error"
                });
                console.log(JSON.stringify(this.formdata));
                console.log(this.formdata);
              })
            }
          } else {
            this.$message({
              type: "error",
              message: "表单填写不合法，请检查必填项！"
            });
            return false;
          }
        });
    },
    cancel() {
      this.isShow = false;
      this.getList();
    },
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
