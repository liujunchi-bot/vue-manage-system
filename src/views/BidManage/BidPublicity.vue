<template>
  <div class="bidPublicity">
    <CheckForm :editdata= editObject :reflash="handleClickConfirm" :visible.sync="dialogFormEditVisible"/>

    <el-row>
      <el-col :span="5">
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="state"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        >
          <i class="el-icon-edit el-input__icon" slot="suffix"> </i>
          <template slot-scope="{ item }">
            <div class="name items-container">{{ item.project_name }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
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
      <el-table-column prop="tender_block_sum" label="标段预估金额(含税)(万元)" width="80">
      </el-table-column>
      <el-table-column prop="tender_share" label="中标份额" width="80">
      </el-table-column>
      <el-table-column prop="tender_flag" label="是否中标" width="80">
      </el-table-column>
      <el-table-column prop="tender_ceiling" label="中标合同上限(含税)" width="80">
      </el-table-column>
      <el-table-column prop="tender_discount" label="中标折扣" width="80">
      </el-table-column>
      <el-table-column prop="jing_ban_ren" label="经办人" width="80">
      </el-table-column>
      <el-table-column prop="shen_he_ren" label="审核人" width="80">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleClickChange(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import CheckForm from './checkForm'
export default {
  components:{
    CheckForm
  },
  data() {
    return {
      state: "",
      tableData: [],
      multipleSelection: [],
      dialogFormEditVisible: false,
      editObject: {},
    }
  },
  methods: {
    handleClickChange(rowInfo) {
      // console.log('index', rowIndex)
      this.editObject=rowInfo
      this.dialogFormEditVisible = true;
    },
    handleClickConfirm(editData) {
      this.dialogFormEditVisible = false;
      // console.log('index',index)
      // console.log('data', editData)
      this.tableData.forEach((item,index) => {
        if (item.id == editData.id) {
          this.$set(this.tableData,index,editData)
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
          item.project_name.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      this.handleClickChange(item) 
    },
    getList: function(){
      let params={};
      let url='/tender/publicity'
      this.$axios
      .post(url,qs.stringify(params))
      .then(successResponse=>{
        alert('请求成功')
        this.tableData=successResponse.data
      })
      .catch(failResponse=>{
        alert('请求失败')
      })
    },
  },
  mounted: function() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.items-container {
  width: 170px;
}
</style>
