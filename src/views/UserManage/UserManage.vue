<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增项目' : '更新项目信息'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>
    <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()" @edit="editUser" @del="delUser"></common-table>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm'
import CommonTable from '../../components/CommonTable'
export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'number',
          label: '项目编号'
        },
        {
          prop: 'name',
          label: '项目名称'
        },
        {
          prop: 'category',
          label: '项目类别'
        },
        {
          prop: 'client',
          label: '主委托方',
        },
        {
          prop: 'contract',
          label: '合同名称',
          width: 200
        },
        {
          prop: 'state',
          label: '合同状态'
        },
        {
          prop:'finish_time',
          label:'项目预计结束时间',
          width:200
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        number: '',
        name: '',
        category: '',
        client: '',
        contract: '',
        state: '',
        finish_time:'',
      },
      operateFormLabel: [
        {
          model: 'number',
          label: '项目编号'
        },
        {
          model: 'name',
          label: '项目名称'
        },       
        {
          model: 'category',
          label: '项目类别',
          type: 'select',
          opts: [
            {
              label: '税审',
              value: '税审'
            },
            {
              label: '年审',
              value: '年审'
            }
          ]
        },
        {
          model: 'client',
          label: '主委托方'
        },
        {
          model: 'contract',
          label: '合同名称'
        },
        {
          model: 'state',
          label: '合同状态',
          type: 'select',
          opts: [
            {
              label: '已完成',
              value: '已完成'
            },
            {
              label: '进行中',
              value: '进行中'
            }
          ]
        },
        {
          model: 'finish_time',
          label: '项目预计结束时间',
          type: 'date'
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
    getList(name = '') {
      this.config.loading = true
      // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      name ? (this.config.page = 1) : ''
      this.$http
        .get('/api/user/getUser', {
          params: {
            page: this.config.page,
            name,
          }
        })
        .then(res => {
          this.tableData = res.data.list.map(item => {
            item.categoryLabel = item.category === 0 ? '税审' : '年审'
            return item
          })
          this.config.total = res.data.count
          this.config.loading = false
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
    confirm() {
      if (this.operateType === 'edit') {
        this.$http.post('/api/user/edit', this.operateForm).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      } else {
        this.$http.post('/api/user/add', this.operateForm).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      }
    },
    delUser(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let id = row.id
          this.$http
            .get('/api/user/del', {
              params: {
                id
              }
            })
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
