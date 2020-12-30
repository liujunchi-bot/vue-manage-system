<template>
  <div class="bidExamine">
    <ReviewerForm
      :editdata="editObject"
      :reflash="handleClickConfirm"
      :Submit="handlePass"
      :Back="handleNotPass"
      :visible.sync="dialogFormEditVisible"
    />

    <el-row>
      <el-col>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="search"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        >
          <i class="el-icon-edit el-input__icon" slot="suffix"> </i>
          <template slot-scope="{ item }">
            <div class="name items-container">{{ item.project_name }}</div>
          </template>
        </el-autocomplete>

        <el-button type="success" @click="tablePass()">通过</el-button>
        <el-button type="danger" @click="tableBack()">退回</el-button>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" label="选择" align="center" width="55">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            (config.page - 1) * 20 + scope.$index + 1
          }}</span>
        </template></el-table-column
      >
      <el-table-column prop="id" label="投标编号" width="120">
      </el-table-column>
      <el-table-column prop="tender_date" label="投标时间" width="120">
      </el-table-column>
      <el-table-column prop="project_name" label="项目名称" width="180">
      </el-table-column>
      <el-table-column prop="audit_type" label="投标类型" width="80">
      </el-table-column>
      <el-table-column prop="tender_block" label="标段" width="80">
      </el-table-column>
      <el-table-column prop="tender_offer" label="投标报价" width="80">
      </el-table-column>
      <el-table-column
        prop="tender_block_sum"
        label="标段预估金额(含税)(万元)"
        width="80"
      >
      </el-table-column>
      <el-table-column prop="tender_share" label="中标份额" width="80">
      </el-table-column>
      <el-table-column prop="tender_flag" label="是否中标" width="80">
      </el-table-column>
      <el-table-column
        prop="tender_ceiling"
        label="中标合同上限(含税)"
        width="80"
      >
      </el-table-column>
      <el-table-column prop="tender_discount" label="中标折扣" width="80">
      </el-table-column>
      <el-table-column prop="jing_ban_ren" label="经办人" width="80">
      </el-table-column>
      <el-table-column prop="shen_he_ren" label="审核人" width="80">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="190">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleClickChange(scope.row)"
            >审核</el-button
          >
          <el-button @click="handlePass(scope.row)" type="primary" size="small"
            >通过</el-button
          >
          <el-button
            @click="handleNotPass(scope.row)"
            type="danger"
            size="small"
            >退回</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ReviewerForm from "./reviewerForm";
export default {
  components: {
    ReviewerForm,
  },
  data() {
    return {
      search: "",
      tableData: [],
      multipleSelection: [],
      dialogFormEditVisible: false,
      dialogFormAddVisable: false,
      editObject: {},
      showObject: {},
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleTable = val; //  this.multipleTable 选中的值
      console.log(val);
    },
    tableBack() {
      if (confirm("确定退回吗？")) {
        for (var i = 0; i < this.multipleTable.length; i++) {
          var halo = this.multipleTable[i];
          // console.log(halo);
          this.Back(halo);
        }
      }
    },
    Back(rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.id == rowInfo.id) {
          let params = {
            id: item.id,
          };
          let url = "/tender/examine/noissue/";
          this.$axios
            .post(url, qs.stringify(params))
            .then((successResponse) => {
              this.tableData.splice(index, 1);
              this.$message.success("已退回");
            })
            .catch((failResponse) => {
              this.$message.success("未退回");
            });
          this.tableData.splice(index, 1);
        }
      });
    },

    tablePass() {
      if (confirm("确定通过吗？")) {
        for (var i = 0; i < this.multipleTable.length; i++) {
          var halo = this.multipleTable[i];
          // console.log(halo);
          this.Pass(halo);
        }
      }
    },
    Pass(rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.id == rowInfo.id) {
          let params = {
            id: item.id,
          };
          let url = "/tender/examine/issue/";
          this.$axios
            .post(url, qs.stringify(params))
            .then((successResponse) => {
              this.tableData.splice(index, 1);
              this.$message.success("已通过");
            })
            .catch((failResponse) => {
              this.$message.success("未通过");
            });
        }
      });
    },

    handlePass(rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.id == rowInfo.id) {
          if (confirm("确定通过吗？")) {
            let params = {
              id: item.id,
            };
            let url = "/tender/examine/issue/";
            this.$axios
              .post(url, qs.stringify(params))
              .then((successResponse) => {
                this.tableData.splice(index, 1);
                this.$message.success("已通过");
              })
              .catch((failResponse) => {
                this.$message.success("未通过");
              });
          }
        }
      });
    },
    handleNotPass(rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.id == rowInfo.id) {
          if (confirm("确定退回吗？")) {
            let params = {
              id: item.id,
            };
            let url = "/tender/examine/noissue/";
            this.$axios
              .post(url, qs.stringify(params))
              .then((successResponse) => {
                this.tableData.splice(index, 1);
                this.$message.success("已退回");
              })
              .catch((failResponse) => {
                this.$message.success("未退回");
              });
          }
        }
      });
    },
    handleClickChange(rowInfo) {
      // console.log('index', rowIndex)
      this.editObject = rowInfo;
      this.dialogFormEditVisible = true;
    },
    handleClickConfirm(editData) {
      this.dialogFormEditVisible = false;
      this.tableData.forEach((item, index) => {
        if (item.id == editData.id) {
          this.$set(this.tableData, index, editData);
        }
      });
    },

    querySearch(queryString, cb) {
      let items = this.tableData;
      let results = queryString
        ? items.filter(this.createFilter(queryString))
        : items;
      cb(results);
    },
    createFilter(queryString) {
      return (item) => {
        return (
          item.project_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.handleClickChange(item);
    },
    getCurrentRole: function () {
      //获取当前用户员工编号
      this.current_role = "null";
    },
    getList: function () {
      let params = {
        current_role: current_role,
      };
      let url = "/tender/examine/";
      this.$axios
        .post(url, qs.stringify(params))
        .then((successResponse) => {
          alert("请求成功");
          this.tableData = successResponse.data;
        })
        .catch((failResponse) => {
          alert("请求失败");
        });
    },
  },
  mounted: function () {
    this.getCurrentRole();
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.items-container {
  width: 170px;
}
</style>
