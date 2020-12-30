<template>
  <div class="bidApplication">
    <AddForm
      @addData="handleAdddata"
      :submitData="submitObject"
      :Submit="handleSubmitData"
      :current_role="current_role"
      :visible.sync="dialogFormAddVisable"
    />
    <EditForm
      :editData="editObject"
      :reflash="handleClickConfirm"
      :Submit="handleSubmitData"
      :visible.sync="dialogFormEditVisible"
    />

    <el-row>
      <el-col>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="search"
          :fetch-suggestions="querySearch"
          placeholder="请输入投标名称"
          @select="handleSelect"
        >
          <i class="el-icon-edit el-input__icon" slot="suffix"> </i>
          <template slot-scope="{ item }">
            <div class="name items-container">{{ item.project_name }}</div>
          </template>
        </el-autocomplete>

        <el-button type="primary" @click="dialogFormAddVisable = true"
          >新增</el-button
        >
        <el-button type="success" @click="tableSub()">提交</el-button>
        <el-button type="danger" @click="tableDel()">删除</el-button>
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

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleClickChange(scope.row)"
            >编辑</el-button
          >
          <el-button
            @click="handleSubmit(scope.row)"
            type="primary"
            size="small"
            >提交</el-button
          >
          <el-button @click="handleDelete(scope.row)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import AddForm from "./addForm";
import EditForm from "./editForm";
import qs from "qs";
export default {
  components: {
    AddForm,
    EditForm,
  },
  data() {
    return {
      search: "",
      tableData: [],
      searchTable: [],
      multipleSelection: [],
      dialogFormEditVisible: false,
      dialogFormAddVisable: false,
      editObject: {},
      submitObject: {},
      current_role: undefined,
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleTable = val; //  this.multipleTable 选中的值
      // console.log(val);
    },
    tableDel() {
      if (confirm("确定删除吗？")) {
        for (var i = 0; i < this.multipleTable.length; i++) {
          var halo = this.multipleTable[i];
          // console.log(halo);
          this.Delete(halo);
        }
      }
    },
    Delete(rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.id == rowInfo.id) {
          let params = {
            id: item.id,
          };
          let url = "/tender/application/delete/";
          this.$axios
            .post(url, qs.stringify(params))
            .then((successResponse) => {
              this.tableData.splice(index, 1);
              this.$message.success("删除成功");
            })
            .catch(() => {
              this.$message.success("删除失败");
            });
        }
      });
    },

    tableSub() {
      if (confirm("确定提交吗？")) {
        for (var i = 0; i < this.multipleTable.length; i++) {
          var halo = this.multipleTable[i];
          // console.log(halo);
          this.Submit(halo);
        }
      }
    },
    Submit(rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.id == rowInfo.id) {
          let params = {
            id: item.id,
          };
          let url = "/tender/application/submit/";
          this.$axios
            .post(url, qs.stringify(params))
            .then((successResponse) => {
              this.tableData.splice(index, 1);
              this.$message.success("提交成功");
            })
            .catch((failResponse) => {
              this.$message.success("提交失败");
            });
        }
      });
    },

    handleDelete(rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.id == rowInfo.id) {
          if (confirm("确定删除吗？")) {
            let params = {
              id: item.id,
            };
            let url = "/tender/application/delete/";
            this.$axios
              .post(url, qs.stringify(params))
              .then((successResponse) => {
                this.tableData.splice(index, 1);
                this.$message.success("删除成功");
              })
              .catch(() => {
                this.$message.success("删除失败");
              });
          }
        }
      });
    },
    handleSubmit(rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.id == rowInfo.id) {
          if (confirm("确定提交吗？")) {
            let params = {
              id: item.id,
            };
            let url = "/tender/application/submit/";
            this.$axios
              .post(url, qs.stringify(params))
              .then((successResponse) => {
                this.tableData.splice(index, 1);
                this.$message.success("提交成功");
              })
              .catch((failResponse) => {
                this.$message.success("提交失败");
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
      
      this.tableData.forEach((item, index) => {
        if (item.id == editData.id) {
          let params = {
            id: editData.id,
            tender_date: editData.tender_date,
            project_name: editData.project_name,
            audit_type: editData.audit_type,
            tender_block: editData.tender_block,
            tender_offer: editData.tender_offer,
            tender_block_sum: editData.tender_block_sum,
            tender_share: editData.tender_share,
            tender_flag: editData.tender_flag,
            tender_ceiling: editData.tender_ceiling,
            tender_discount: editData.tender_discount,
            jing_ban_ren: editData.jing_ban_ren,
            shen_he_ren: editData.shen_he_ren,
            tender_contact: editData.tender_contact,
            tender_contact_phone: editData.tender_contact_phone,
            tender_agency_contact: editData.tender_agency_contact,
            tender_agency_contact_phone: editData.tender_agency_contact_phone,
            tender_specific_type: editData.tender_specific_type,
            tender_account: editData.tender_account,
            bank_deposit: editData.bank_deposit,
          };
          let url = "/tender/application/update/";
          this.$axios
            .post(url, qs.stringify(params))
            .then((successResponse) => {
              this.dialogFormEditVisible = false;
              this.$set(this.tableData, index, editData);
              alert("修改成功");
            })
            .catch((failResponse) => {
              alert("修改失败");
            });
          
        }
      });
    },
    handleAdddata(addData) {
      
      let params = {
        tender_date: addData.tender_date,
        project_name: addData.project_name,
        audit_type: addData.audit_type,
        tender_block: addData.tender_block,
        tender_offer: addData.tender_offer,
        tender_block_sum: addData.tender_block_sum,
        tender_share: addData.tender_share,
        tender_flag: addData.tender_flag,
        tender_ceiling: addData.tender_ceiling,
        tender_discount: addData.tender_discount,
        jing_ban_ren: addData.jing_ban_ren,
        shen_he_ren: addData.shen_he_ren,
        tender_contact: addData.tender_contact,
        tender_contact_phone: addData.tender_contact_phone,
        tender_agency_contact: addData.tender_agency_contact,
        tender_agency_contact_phone: addData.tender_agency_contact_phone,
        tender_specific_type: addData.tender_specific_type,
        tender_account: addData.tender_account,
        bank_deposit: addData.bank_deposit,
      };
      let url = "/tender/application/add/";
      this.$axios
        .post(url, qs.stringify(params))
        .then((successResponse) => {
          this.dialogFormAddVisable = false;
          addData.id = successResponse.data.id;
          this.tableData.push(adddata);
          alert("新增成功");
        })
        .catch((failResponse) => {
          
          //失败原因？
          if(failResponse.message == "员工编号出错"){
            alert("员工编号出错");
          }
          else{
            alert("新增失败");
          }
        });
      
    },
    handleSubmitData(submitdata) {
      // console.log('新增表单提交', '已触发');
      // console.log('表单提交data', submitdata);
      this.handleSubmit(submitdata);
      // this.$message.success("提交成功");
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
          item.project_name.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      // console.log(this.showObject);
      // this.dialogFormEditVisible = true;
      this.handleClickChange(item);
    },

    getCurrentRole: function () {
      //获取当前用户员工编号
      this.current_role = "12345";
    },
    getList: function () {
      var current_role = this.current_role;
      let params = {
        current_role: current_role,
      };
      let url = "/tender/application/";
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
