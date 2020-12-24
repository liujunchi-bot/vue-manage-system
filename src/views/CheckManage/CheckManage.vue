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
    <common-table2
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
      @pass="passProject"
      @refuse="refuseProject"
    ></common-table2>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm'
import CommonTable2 from '../../components/CommonTable2'
import axios from '../../axios/ajax'
import qs from 'qs'

export default {
  components: {
    CommonForm,
    CommonTable2
  },
  data () {
    return {
      if_submit: false,
      if_issued: false,
      operateType: 'add',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'project_id',
          label: 'id',
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
          label: '审计报告号'
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
          prop: 'project_code',
          label: '项目编号',
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
          prop: 'project_construction',
          label: '施工单位',
        },
        {
          prop: 'project_assets',
          label: '资产总额',
        },
        {
          prop: 'project_audit',
          label: '审核金额',
        },
        {
          prop: 'project_reduction',
          label: '审减金额',
        },
        {
          prop: 'jing_ban_ren',
          label: '经办人'
        },
        {
          prop: 'shen_he_ren',
          label: '审核人'
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
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
        project_reduction: '',
        jing_ban_ren: '',
        shen_he_ren: ''
      },
      operateFormLabel: [
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
          model: 'project_name',
          label: '项目名称'
        },
        {
          model: 'project_client',
          label: '客户名称'
        },
        {
          model: 'project_reportnumber',
          label: '审计报告号'
        },
        {
          model: 'project_class',
          label: '项目类型'
        },
        {
          model: 'project_partner',
          label: '项目合伙人'
        },
        {
          model: 'project_code',
          label: '项目编号'
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
        },
        {
          model: 'project_agent',
          label: '经办人'
        },
        {
          model: 'jing_ban_ren',
          label: '经办人'
        },
        {
          model: 'shen_he_ren',
          label: '审核人'
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
    // getList (name = '') {
    //   this.config.loading = true
    //   // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
    //   name ? (this.config.page = 1) : ''
    //   this.$http
    //     .get('/api/user/getUser', {
    //       params: {
    //         page: this.config.page,
    //         name,
    //       }
    //     })
    //     .then(res => {
    //       this.tableData = res.data.list.map(item => {
    //         item.categoryLabel = item.category === 0 ? '税审' : '年审'
    //         return item
    //       })
    //       this.config.total = res.data.count
    //       this.config.loading = false
    //     })
    // },
    getList (name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      axios._get("http://8.129.86.121:8080/project/getCheckProject").then(res => {
        this.$message.success("获取项目列表成功！")

        // const mockList = res.filter(user => {
        //   if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
        //   return true
        // })
        // let List=res.data;
        // const mockList = List.filter(user => {
        //   var name=''
        //   if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
        //   return true
        // })
        // const list=mockList.filter((item, index) => index < limit * 10 && index >= limit * (10 - 1))
        this.tableData = res;
        // this.config.total = res.data.count;
        this.if_submint = res.if_submint;
        this.if_issued = res.if_issued;
        this.config.loading = false;
        if (!this.if_submit && !this.if_issued) {
          this.formLabel.project_state = '待提交';
        } else if (this.if_submit && !this.if_issued) {
          this.formLabel.project_state = '待审核';
        } else if (this.if_submit && this.if_issued) {
          this.formLabel.project_state = '已审核';
        }
        //console.log("tabledata: "+JSON.stringify(res));
      }, err => {
        alert("getlisterror!!!");
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
    passProject (row) {
      this.operateType = 'pass'
      this.isShow = true
      this.operateForm = row
    },
    refuseProject (row) {
      this.operateType = 'refuse'
      this.isShow = true
      this.operateForm = row
    },
    delUser (row) {
      this.operateType = 'if_delete'
      this.isShow = true
      this.operateForm = row
    },
    // confirm () {
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
        axios._post('http://8.129.86.121:8080/project/update', qs.stringify(this.operateForm)).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      } else if (this.operateType === 'add') {
        alert("添加成功！")
        console.log("111111" + qs.stringify(this.operateForm));
        axios._post('http://8.129.86.121:8080/project/insert', qs.stringify(this.operateForm)).then(res => {
          this.$message.success("创建用户成功！");
          this.isShow = false
          this.getList()
        }, err => {
          alert("add error!!!");
        })
      } else if (this.operateType === 'pass') {
        alert("已通过")
        console.log("ok" + qs.stringify(this.operateForm))
        axios._post('http://8.129.86.121:8080/project/pass', qs.stringify(this.operateForm)).then(res => {
          this.$message.success('通过');
          this.isShow = false;
          this.getList()
        }), err => {
          alert("error!");
        }
      } else if (this.operateType === 'refuse') {
        alert("退回")
        console.log("exitttt" + qs.stringify(this.operateForm))
        axios._post('http://8.129.86.121:8080/project/refuse', qs.stringify(this.operateForm)).then(res => {
          this.$message.success('退回');
          this.isShow = false;
          this.getList();
        }), err => {
          alert("error!");
        }
      } else if (this.operateType === 'if_delete') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        console.log("exitttt" + qs.stringify(this.operateForm))
        axios._post('http://8.129.86.121:8080/project/if_delete', qs.stringify(this.operateForm)).then(res => {
          this.$message.success('删除');
          this.isShow = false;
          this.getList();
        }), err => {
          alert("error!");
        }
      }
    },
    //   delUser (row) {
    //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     })
    //       .then(() => {
    //         let id = row.id
    //         this.$http
    //           .get('/api/user/del', {
    //             params: {
    //               id
    //             }
    //           })
    //           .then(res => {
    //             console.log(res.data)
    //             this.$message({
    //               type: 'success',
    //               message: '删除成功!'
    //             })
    //             this.getList()
    //           })
    //       })
    //       .catch(() => {
    //         this.$message({
    //           type: 'info',
    //           message: '已取消删除'
    //         })
    //       })
    //   }
    // },
    // delUser(row) {
    //   //alert(row)
    //   // console.log("row"+qs.stringify(row));
    //   //alert("delid+ "+row.project_id)
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       // let project_id=row.project_id;
    //       //console.log("id+  "+id);
    //       axios
    //         ._remove('http://8.129.86.121:8080/project/if_delete', {
    //           params: {
    //             project_id: row.project_id
    //           }
    //         })
    //
    //         .then(res => {
    //           console.log(qs.stringify(row))
    //           this.$message({
    //             type: 'success',
    //             message: '删除成功!'
    //           })
    //           this.getList()
    //         })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    // }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
