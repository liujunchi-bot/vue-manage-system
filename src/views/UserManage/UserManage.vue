<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增项目' : '更新项目信息'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
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
  data () {
    return {
      operateType: 'add',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'type',
          label: '审计大类类型',
        },
        {
          prop: 'project_name',
          label: '项目名称'
        },
        {
          prop: 'client',
          label: '客户名称',
        },
        {
          prop: 'reportNo',
          label: '审计报告号'
        },
        {
          prop: 'project_type',
          label: '项目类型'
        },
        {
          prop: 'partner',
          label: '项目合伙人'
        },
        {
          prop: 'number',
          label: '项目编号',
        },
        {
          prop: 'quality_control',
          label: '质控负责人'
        },
        {
          prop: 'leader',
          label: '项目负责人',
        },
        {
          prop: 'group_members',
          label: '组员',
        },
        {
          prop: 'accountant',
          label: '签字注册会计师',
        },
        {
          prop: 'cost_engineer',
          label: '签字注册造价师',
        },
        {
          prop: 'tax_accountant',
          label: '签字税务师',
        },
        {
          prop: 'suggestion',
          label: '报告意见类型',
        },
        {
          prop: 'start_time',
          label: '执行起始时间',
        },
        {
          prop: 'finish_time',
          label: '执行结束时间',
        },
        {
          prop: 'organization',
          label: '施工单位',
        },
        {
          prop: 'total_assets',
          label: '资产总额',
        },
        {
          prop: 'check_money',
          label: '审核金额',
        },
        {
          prop: 'reduction_money',
          label: '审减金额',
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        type: '',
        project_name: '',
        client: '',
        reportNo: '',
        project_type: '',
        partner: '',
        number: '',
        quality_control: '',
        leader: '',
        group_members: '',
        accountant: '',
        cost_engineer: '',
        tax_accountant: '',
        suggestion: '',
        start_time: '',
        finish_time: '',
        organization: '',
        total_assets: '',
        total_assets: '',
        check_money: '',
        reduction_money: ''
      },
      operateFormLabel: [
        {
          model: 'type',
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
          model: 'project_name',
          label: '项目名称'
        },
        {
          model: 'client',
          label: '客户名称'
        },
        {
          model: 'reportNo',
          label: '审计报告号'
        },
        {
          model: 'project_type',
          label: '项目类型'
        },
        {
          model: 'partner',
          label: '项目合伙人'
        },
        {
          model: 'number',
          label: '项目编号'
        },
        {
          model: 'quality_control',
          label: '质控负责人'
        },
        {
          model: 'leader',
          label: '项目负责人'
        },
        {
          model: 'group_members',
          label: '组员'
        },
        {
          model: 'accountant',
          label: '签字注册会计师'
        },
        {
          model: 'cost_engineer',
          label: '签字注册造价师'
        },
        {
          model: 'tax_accountant',
          label: '签字税务师'
        },
        {
          model: 'suggestion',
          label: '报告意见类型'
        },
        {
          model: 'start_time',
          label: '执行起始时间',
          type: 'date'
        },
        {
          model: 'finish_time',
          label: '执行结束时间',
          type: 'date'
        },
        {
          model: 'organization',
          label: '施工单位'
        },
        {
          model: 'total_assets',
          label: '资产总额'
        },
        {
          model: 'check_money',
          label: '审计金额'
        },
        {
          model: 'reduction_money',
          label: '审减金额'
        },
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
    getList (name = '') {
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
    addUser () {
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
    editUser (row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    confirm () {
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
    delUser (row) {
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
  created () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
