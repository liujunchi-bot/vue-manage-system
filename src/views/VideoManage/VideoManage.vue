<template>
  <div class="contractmanage">
    <el-dialog :title="operateType === 'add' ? '上传合同' : '编辑合同'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm" ref="form"> </common-form>

      <el-upload class="upload-demo" ref="upload" action="doUpload"  :limit="1" :file-list="fileList"
      :before-upload="beforeUpload" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :before-remove="beforeRemove"
      :multiple="true" :on-exceed="handleExceed">
        <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel/word/pdf文件，且上传的文件不超过500MB</div>
        <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-button type="primary" @click="addUser">上传</el-button>
        </el-col>
      </el-row>
          <common-form inline :formLabel="formLabel" :form="searchFrom">
            <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
          </common-form>
    </div>

    <contract-table :tableData="tableData" :tableLabel="tableLabel" :config="config" 
    @changePage="getList()" @edit="editUser" @download="downloadUser" @del="delUser"></contract-table>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm'
import ContractTable from '../../components/ContractTable'
import axios from '../../axios/ajax'
import qs from 'qs'
export default {
  components: {
    CommonForm,
    ContractTable
  },
  data() {
    return {
      fileList: [],
      operateType: 'add',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '合同名称',
          width: 200
        },
        {
          prop: 'age',
          label: '合同编号'
        },
        {
          prop: 'sexLabel',
          label: '客户名称'
        },
        {
          prop: 'birth',
          label: '上传日期'
        },
        {
          prop: 'addr',
          label: '上传人'
        },
        {
          prop: 'department',
          label: '部门'
        },
        {
          prop: 'project',
          label: '所属项目'
        },
        {
          prop: 'state',
          label: '运营状态'
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: '',
        department: '',
        project: '',
        state: ''
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '*合同名称'
        },
        {
          model: 'age',
          label: '*合同编号'
        },
        {
          model: 'sex',
          label: '客户名称'
        },
        {
          model: 'birth',
          label: '上传日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '上传人'
        },
        {
          model: 'department',
          label: '*部门'
        },
        {
          model: 'project',
          label: '所属项目'
        },
        {
          model: 'state',
          label: '运营状态'
        }
      ],
      searchFrom: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ]
    }
  },
  methods: {
    beforeUpload(file){
      console.log(file,'文件');
      this.files = file;
      const extension = file.name.split('.')[1] === 'xls';
      const extension2 = file.name.split('.')[1] === 'xlsx';
      const extension3 = file.name.split('.')[1] === 'doc';
      const extension4 = file.name.split('.')[1] === 'docx';
      const extension5 = file.name.split('.')[1] === 'pdf';
      const isLt2M = file.size / 1024 / 1024 < 500;
      if (!extension && !extension2 && !extension3 && !extension4 && !extension5) {
        this.$message.warning('上传模板只能是excel/word/pdf格式!');
        return;
      }
      if (!isLt2M) {
        this.$message.warning('上传模板大小不能超过500MB!');
        return;
      }
      this.filename = file.name;
      return any;
    },
    handleSuccess: function () {
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      if(file && file.status==="success"){
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    },
    // getList(name = '') {
    //   this.config.loading = true
    //   // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
    //   name ? (this.config.page = 1) : ''
    //   this.$http
    //     .get('/api/user/getUser', {
    //       params: {
    //         page: this.config.page,
    //         name
    //       }
    //     })
    //     .then(res => {
    //       this.tableData = res.data.list.map(item => {
    //         item.sexLabel = item.sex === 0 ? '女' : '男'
    //         return item
    //       })
    //       this.config.total = res.data.count
    //       this.config.loading = false
    //     })
    // },
    getList(name = '') {
      this.config.loading = true;
      name ? (this.config.page = 1): '';
      axios._get("").then(res => {
        this.$message.success("获取合同列表成功！")
        this.tableData = res;
        // this.config.total = res.data.count;
        this.config.loading = false;
        //console.log("tabledata: "+JSON.stringify(res));
    }, err => {
      alert("error!!");
    })
    },

    addUser() {
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    // confirm() {
    //   if (this.operateType === 'edit') {
    //     this.$http.post('/api/user/edit', this.operateForm).then(res => {
    //       console.log(res.data)
    //       this.isShow = false
    //       this.getList()
    //     })
    //   } else {
    //     this.$http.post('/api/user/add', this.operateForm).then(res => {
    //       console.log(res.data)
    //       this.isShow = false
    //       this.getList()
    //     })
    //   }
    // },

    confirm () {
      if (this.operateType === 'edit') {
        axios._post('', qs.stringify(this.operateForm)).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      } else {
        alert("添加成功！")
        console.log("111111" + qs.stringify(this.operateForm));
        axios._post('', qs.stringify(this.operateForm)).then(res => {
          this.$message.success("创建用户成功！");
          this.isShow = false
          this.getList()
        }, err => {
          alert("error!!!");
        })
      }
    },

    downloadUser(){
      this.$confirm('是否下载合同文件?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '下载成功！'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下载'
          })
        })
    },
    delUser(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          axios
            ._remove('',{
              params: {
                project_id: row.project_id
              }
            })
          // let id = row.id
          // this.$http
          //   .get('/api/user/del', {
          //     params: {
          //       id
          //     }
          //   })
            .then(res => {
              console.log(res.data)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common';
</style>