<template>
  <div class="body">
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="editObject" :rules="rules" ref="ruleForm">
        <el-form-item label="客户编号" prop="client_id" >
          <el-input v-model="editObject.client_id" ></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="client_name" > 
          <el-input v-model="editObject.client_name"></el-input>
        </el-form-item>
        <el-form-item label="客户地址" prop="client_work_address">
          <el-input v-model="editObject.client_work_address"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人" prop="client_representative">
          <el-input v-model="editObject.client_representative"></el-input>
        </el-form-item>
        <el-form-item label="注册资本" prop="client_registered_capital">
          <el-input v-model="editObject.client_registered_capital"></el-input>
        </el-form-item>
        <el-form-item label="公司类型" prop="client_type">
          <el-input v-model="editObject.client_type"></el-input>
        </el-form-item>
        <el-form-item label="经营范围" prop="client_business">
          <el-input v-model="editObject.client_business"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="client_person_name">
          <el-input v-model="editObject.client_person_name"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="client_person_phone" >
          <el-input v-model="editObject.client_person_phone"
          onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="11"></el-input> 
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleClickConfirm">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="dialogFormAddVisable">
      <el-form :model="newObject" :rules="rules" ref="ruleForm">
        <el-form-item label="客户编号" prop="client_id">
          <el-input v-model="newObject.client_id"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="client_name"> 
          <el-input v-model="newObject.client_name"></el-input>
        </el-form-item>
        <el-form-item label="客户地址" prop="client_work_address">
          <el-input v-model="newObject.client_work_address"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人" prop="client_representative">
          <el-input v-model="newObject.client_representative"></el-input>
        </el-form-item>
        <el-form-item label="注册资本" prop="client_registered_capital">
          <el-input v-model="newObject.client_registered_capital"></el-input>
        </el-form-item>
        <el-form-item label="公司类型" prop="client_type">
          <el-input v-model="newObject.client_type"></el-input>
        </el-form-item>
        <el-form-item label="经营范围" prop="client_business">
          <el-input v-model="newObject.client_business"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="client_person_name">
          <el-input v-model="newObject.client_person_name"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="client_person_phone">
          <el-input v-model="newObject.client_person_phone"
          onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="11"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisable = false">取消</el-button>
        <el-button  type="primary" @click="handleClickConfirmAdd">确定</el-button>
        
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisibleShow">
      <el-form>
        <el-form-item label="客户编号">
          <el-input v-model="showObject.client_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="showObject.client_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户地址">
          <el-input v-model="showObject.client_work_address" disabled></el-input>
        </el-form-item>
        <el-form-item label="法定代表人">
          <el-input v-model="showObject.client_representative" disabled></el-input>
        </el-form-item>
        <el-form-item label="注册资本">
          <el-input v-model="showObject.client_registered_capital" disabled></el-input>
        </el-form-item>
        <el-form-item label="公司类型">
          <el-input v-model="showObject.client_type" disabled></el-input>
        </el-form-item>
        <el-form-item label="经营范围">
          <el-input v-model="showObject.client_business" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model="showObject.client_person_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input v-model="showObject.client_person_phone" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleShow = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="dialogFormAddVisable = true"
          >新增客户</el-button
        >
      </el-col>
      <el-col :span="5">
        <!-- <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="state"
          :fetch-suggestions="querySearch"
          placeholder="请输入客户名称进行查询"
          @select="handleSelect"
        >
          <i class="el-icon-edit el-input__icon" slot="suffix"> </i>
          <template slot-scope="{ item }">
            <div class="name items-container">{{ item.client_name }}</div>
            <!-- <span class="addr">{{ item.address }}</span> -->
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData.slice((curPage-1)*pagesize,curPage*pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="500"
    >
      <!-- @selection-change="handleSelectionChange" -->
      <!-- <el-table-column type="selection" width="150"> </el-table-column> -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="经营范围">
              <span>{{props.row.client_business}}</span>
            </el-form-item> 
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        prop="client_id"
        label="客户编号"
        width="220"
      >
      </el-table-column>
      <el-table-column
        prop="client_name"
        label="客户名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="client_work_address"
        label="客户地址"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="client_type"
        label="公司类型"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="client_representative"
        label="法定代表人"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="client_registered_capital"
        label="注册资本"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="client_person_name"
        label="联系人姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="client_person_phone"
        label="联系人电话"
        width="180"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleClickChange(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    :current-page.sync="curPage"
    :page-size="pagesize"
    layout="prev, pager, next"
    :total="tableData.length"
    class="page">
    </el-pagination>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      state: "",
      tableData: [],
      curPage:1,
      pagesize:10,
      rules: {
        client_id: [
          { required: true, message: '请输入客户编号', trigger: 'blur' },
          { min: 6, message: '最少6个字符', trigger: 'blur' }
        ],
        client_name: [
          { required: true, message: '请输入客户名称', trigger: 'blur' },
          { max: 255, message: '客户名称最长255个字符', trigger: 'blur' }
        ],
        client_work_address:[
          { required: true, message: '请输入客户地址', trigger: 'blur' },
        ],
        client_representative:[
          { required: true, message: '请输入法定代表人姓名', trigger: 'blur' },
        ],
        client_person_name:[
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
        ], 
        client_person_phone:[
          { required: true, message: '请输入联系人电话', trigger: 'blur' },
          {min: 11, max: 11, message:'请输入正确的电话号码', trigger: 'blur'}
          /* { validator:function(rule,value,callback){
              if(/^1[34578]\d{9}$/.test(value)==false){
                callback(new Error("请输入正确的手机号"));
              }else{
                callback();
              }
            },trigger: 'blur'} */
        ]
      },
      multipleSelection: [],
      dialogFormVisible: false,
      dialogFormAddVisable: false,
      dialogFormVisibleShow: false,
      editObject: {},
      newObject: {},
      showObject: {},
    };
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      let params = {

      };
      let url = 'http://8.129.86.121:8080/readAllClient'
      this.$axios
        .post(url, qs.stringify(params))
        .then(successResponse => {
          // alert('请求成功')
          this.tableData = successResponse.data
        })
        .catch(failResponse => {
          alert('请求失败')
        })
    },
    handleDelete (rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.client_id == rowInfo.client_id) {
          if (confirm("确定删除吗？")) {
            let params = {
              client_id: item.client_id
            }
            let url = 'http://8.129.86.121:8080/client/delete'
            this.$axios
              .post(url, qs.stringify(params))
              .then(successResponse => {
               /*  this.tableData.splice(index, 1); */
                this.$message.success("删除成功");
                this.loadData();
              }).catch(() => {
                this.$message.success("删除失败");
              })
          }
        }
      });
    },
    handleClickChange (rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.client_id == rowInfo.client_id) {
          this.editObject = this.tableData[index];
          console.log(this.editObject);
        }
      });
      this.dialogFormVisible = true;
    },
    handleClickConfirm () {
      this.$refs.ruleForm.validate((valid)=>{
        if(valid){
          this.dialogFormVisible = false;
          if (confirm("确定修改吗？")) {
            this.tableData.forEach((item) => {
              if (item.client_id == this.editObject.client_id) { 
                let params = {
                client_id: item.client_id,
                client_name: item.client_name,
                client_work_address: item.client_work_address,
                client_representative: item.client_representative,
                client_registered_capital: item.client_registered_capital,
                client_type: item.client_type,
                client_business: item.client_business,
                client_person_name:item.client_person_name,
                client_person_phone:item.client_person_phone
                };
                let url = "http://8.129.86.121:8080/client/update"
                this.$axios
                  .post(url, qs.stringify(params))
                  .then(successResponse => {
                    //alert('修改成功')
                    this.$message.success("修改成功");
                    this.loadData();
                  })
                  .catch(failResponse => {
                    //alert('修改失败')
                    this.$message.success("修改失败");
                  })
              }
            });
          }
        }else{
          console.log('表单验证不合法！请检查必填项是否按规则填写');
          return false;
        }
      })
    },
    handleClickConfirmAdd () {
      this.$refs.ruleForm.validate((valid)=>{
        if(valid){
          this.dialogFormAddVisable = false;
          if (confirm("确定新增吗？")) {
            let params = {
              client_id: this.newObject.client_id,
              client_name: this.newObject.client_name,
              client_work_address: this.newObject.client_work_address,
              client_representative: this.newObject.client_representative,
              client_registered_capital: this.newObject.client_registered_capital,
              client_type: this.newObject.client_type,
              client_business: this.newObject.client_business,
              client_person_name:this.newObject.client_person_name,
              client_person_phone:this.newObject.client_person_phone
            };
            let url = "http://8.129.86.121:8080/client/add"
            this.$axios
            .post(url, qs.stringify(params))
            .then(successResponse => {
              //alert('新增成功')
              this.$message.success("新增成功");
              this.loadData(); 
            })
            .catch(failResponse => {
              //alert('新增失败')
              this.$message.success("新增失败");
            })
          }
        }else{
          console.log('表单验证不合法！请检查必填项是否按规则填写');
          return false;
        }  
      })
    },
    querySearch (queryString, cb) {
      let items = this.tableData;
      let results = queryString
        ? items.filter(this.createFilter(queryString))
        : items;
      cb(results);
    },
    createFilter (queryString) {
      return (item) => {
        return (
          item.client_name.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect (item) {
      this.showObject = item;
      console.log(this.showObject);
      this.dialogFormVisibleShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.items-container {
  width: 170px;
}
.body{
  position:relative;
}
.page {
  position:absolute;
  right:0;
}
</style>