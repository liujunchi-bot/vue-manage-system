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
      var current_role = this.current_role;
      var data1 = {
        id: "20180409002",
        tender_date: "2018-09-04",
        project_name: "湖南移动2018-2021年审计委托服务项目2",
        audit_type: "竣工决算审计",
        tender_block: "标段1",
        tender_block_sum: "1300.00",
        tender_offer: "800元/人/天",
        tender_share: "",
        tender_flag: "否",
        tender_ceiling: "",
        tender_discount: "",
        jing_ban_ren: "151515",
        shen_he_ren: "100",
      };
      var data2 = {
        id: "20180630002",
        tender_date: "2018-06-30",
        project_name:
          "福建移动2018-2021年度建设项目竣工决算委托审计服务公开比选集中采购项目（第一轮）",
        audit_type: "竣工决算审计",
        tender_block: "标段1",
        tender_block_sum: "2521.42",
        tender_offer: "68%",
        tender_share: "15%",
        tender_flag: "是",
        tender_ceiling: "2571848.4",
        tender_discount: "68%",
        jing_ban_ren: "4515",
        shen_he_ren: "100",
      };
      this.tableData.push(data1);
      this.tableData.push(data2);
      // let params={};
      // let url='/tender/publicity'
      // this.$axios
      // .post(url,qs.stringify(params))
      // .then(successResponse=>{
      //   alert('请求成功')
      //   this.tableData=successResponse.data
      // })
      // .catch(failResponse=>{
      //   alert('请求失败')
      // })
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
