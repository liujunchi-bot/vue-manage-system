<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增项目' : '更新项目信息'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :rules="rules"
        ref="commonForm"
      ></common-form>
            <!-- action表示文件要上传到的后台API地址 -->
      <el-upload
        class="upload-demo"
        accept="
        image/jpeg,
        image/png,
        image/jpg,
        application/pdf,
        application/msword,
        application/vnd.openxmlformats-officedocument.wordprocessingml.document,
        application/vnd.ms-excel,
        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
        .zip"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :file-list="fileList"
        :auto-upload="false"
        :show-file-list="true"
        :on-progress="uploadOnProgress"
        ref="uploadComponent"
      >
      <!-- <el-progress
      v-if="progressFlag == true"
      :text-inside="true"
      :stroke-width="18"
      :percentage="progressNum">
      </el-progress> -->
      </el-upload>

      <div>
        <el-button size="small" type="primary" @click="uploadCheck">上传文件</el-button>
        <div slot="tip" class="el-upload__tip">
          请上传格式为jpeg,png,jpg,pdf,doc,docx,xls,xlsx,zip的文件
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <div>
        <el-button type="primary" @click="addRow">新增</el-button>
        <el-button type="primary" @click="exportRow">导出</el-button>
      </div>
      <common-form inline :formLabel="formLabel" :form="searchForm">
        <el-button type="primary" @click="searchKey(searchForm.keyword)"
          >搜索</el-button
        >
        <el-button type="info" @click="getList()">重置</el-button>
      </common-form>
    </div>
    <project-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @edit="editRow"
      @del="delRow"
      @sub="subProject"
      @changePage="handlePageChange"
      @changeSize="handleSizeChange"
      id="out-table"
    ></project-table>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm'
import ProjectTable from '../../components/ProjectTable'
import FileSaver from "file-saver";
import XLSX from "xlsx";
import axios from '../../axios/ajax'
import qs from 'qs'
export default {
  components: {
    CommonForm,
    ProjectTable
  },
  data () {
      let isPriceValidator = (rule, value, callback) => {
      if (!value)
      {
        callback();
      } else
      {
        var reg = /^-?\d{1,252}(?:\.\d{1,3})?$/; //小数点左边最高4位，小数点右边最多4位
        if (reg.test(value))
        {
          callback();
        }
        else
        {
          callback(new Error("输入正确的数字,小数点后可1到3位"));
        }
      }
    };
    return {
      loadProgress: 0, // 动态显示进度条
      progressFlag: false, // 关闭进度条
      tempData:[],
      if_submit: '',
      if_issued: '',
      operateType: 'add',
      isShow: false,
      updateFile: false,
      tableData: [],
      tableLabel: [
        {
          prop: "project_id",
          label: "序号",
          width: 80
        },
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
          prop: 'project_starttime',
          label: '项目开始时间'
        },
        {
          prop: 'project_endtime',
          label: '项目结束时间'
        },
        {
          prop: 'project_construction',
          label: '施工单位',
        },
        {
          prop: 'project_assets',
          label: '资产总额(万元)',
          width: 160
        },
        {
          prop: 'project_audit',
          label: '审定金额(万元)',
          width: 160
        },
        {
          prop: 'project_reduction',
          label: '审减金额(万元)',
          width: 160
        },
        {
          prop: "file_url",
          label: "下载链接",
          width: 150,
          type: "link"
        },
        {
          prop: 'submit_state',
          label: '提交状态',
          width: 100
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
        currentPage: 1,
        total: 0,
        pageSize: 20,
        loading: false
      },
      operateForm: {
        project_code: '',
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
          label: '资产总额（万元）'
        },
        {
          model: 'project_audit',
          label: '审定金额（万元）'
        },
        {
          model: 'project_reduction',
          label: '审减金额（万元）'
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
          { type: "enum", enum: ['财务审计', '工程审计', '税务审计'], required: true, message: '请选择项目类型：财务审计，工程审计或税务审计', trigger: 'blur' }
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
          { validator: isPriceValidator, message: '资产总额需输入数字（万元）', trigger: 'blur', transform: (value) => Number(value)}
        ],
        project_audit:[
          { validator: isPriceValidator, message: '审定金额需输入数字（万元）', trigger: 'blur', transform: (value) => Number(value)}
        ],
        project_reduction:[
          { validator: isPriceValidator, message: '审减金额需输入数字（万元）', trigger: 'blur', transform: (value) => Number(value)}
        ],
      },
      searchForm: {
        keyword: ''
      },
      fileList: [

      ],
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ]
    }
  },
  methods: {
    handleSizeChange: function(size) {
      this.config.pagesize = size
      // console.log(this.config.pagesize)// 每页下拉显示数据
    },
    handlePageChange: function(currentPage){
      this.config.currentPage = currentPage
      // console.log(this.config.currentPage) // 点击第几页
    },
    handleRemove (file, fileList) {
      this.$refs['uploadComponent'].clearFiles();
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadOnProgress(event,file,fileList){
      this.progressFlag = true; // 显示进度条
      this.loadProgress = parseInt(event.percent); // 动态获取文件上传进度
      if (this.loadProgress >= 100) {
          this.loadProgress = 100
          setTimeout( () => {this.progressFlag = false}, 1000) // 一秒后关闭进度条
      }
    },
    handleChange (file, fileList) {
      this.fileList = fileList;
    },
    uploadCheck(){
      var result = 0;
      for (let key in this.operateForm) {
        if (key === "file_url" && this.operateForm[key] != "NULL") {
          result = 1;
          break;
        }
      }

      if (this.fileList.length > 0)
      {
        result = 2;
      }

      if (result === 1) {
        this.$confirm("已经上传的旧文件将会被覆盖，请问确定要上传新的文件吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          // console.log(this.$refs['uploadComponent'].$refs['upload-inner']);
          this.$refs['uploadComponent'].$refs['upload-inner'].handleClick();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消上传文件"
          });
        });
      }
      else if (result === 2)
      {
        this.$confirm("每次仅能上传一个文件，", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
      else
      {
        this.$refs['uploadComponent'].$refs['upload-inner'].handleClick();
      }
    },
    onBeforeUpload (file) {
      // console.log(file)
      const isIMAGE = (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg");
      const isDOCUMENT = (file.type === "application/pdf" ||
                          file.type === "application/msword" ||
                          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                          file.type === "application/vnd.ms-excel" ||
                          file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      const isZip = (file.type === "application/x-zip-compressed");
      const isLt100M = file.size / 1024 / 1024 < 100;
      
      // console.log("isIMAGE",isIMAGE);
      // console.log("isDOCUMENT",isDOCUMENT);
      // console.log("isZip",isZip);
      // console.log("isLt100M",isLt100M);

      if (!isIMAGE && !isDOCUMENT && !isZip) {
        this.$message({
              type: "error",
              message: "不支持此格式文件上传！"
            });
      }

      if (!isLt100M) {
        this.$message({
              type: "error",
              message: "上传文件大小不得大于100MB！"
            });
      }

      return (isIMAGE || isDOCUMENT || isZip) && isLt100M;
    },
    getList (name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      axios._get("http://8.129.86.121:80/project/getAllProject").then(res => {
        this.$message.success("获取项目列表成功！")
        this.tableData = res;

        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i]["file_url"] == null) {
            this.tableData[i]["file_url"] = "NULL";
          }
          else {
            this.tableData[i]["file_url"] = window.encodeURI(this.tableData[i]["file_url"]);
          }

          this.if_submit = this.tableData[i].if_submit;
          this.if_issued = this.tableData[i].if_issued;

          if (this.if_submit == '0')
          {
            this.tableData[i]["submit_state"] = '待提交';
            this.tableData[i]["issue_state"] = '-';
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
        this.config.total = this.tableData.length;
        if (this.tableData.length == 0)
        {
          this.config.currentPage = 0;
        }
      }, err => {
        alert("getlist error!!!");
      })
    },
    addRow () {
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
    editRow (row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    subProject (row) {
      this.$confirm("此操作将提交该项目信息至审核人, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.operateForm = row;
          let formdata = new FormData();
          for (var key in this.operateForm) {
            if (key != "issue_state" && key != "submit_state")
            {
              formdata.append(key, this.operateForm[key])
            }
          }
          
          axios._post('http://8.129.86.121:80/project/submit', formdata).then(res => {
            this.$message({
              type: "success",
              message: "提交成功!"
            });
            this.getList();
          }, err => {
            this.$message({
              type: "error",
              message: "提交失败"
            });
            this.getList();
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    },
    confirm () {
      //console.log(this.$refs.commonForm.$children[0]);
      this.$refs.commonForm.$children[0].validate((valid) => {
          if (valid) 
          {
            if (this.fileList.length != 0 &&!this.onBeforeUpload(this.fileList[0].raw))
            {
              this.fileList.splice(0, 1);
              return false;
            }


            if (this.operateType === 'edit') 
            {
              let formdata = new FormData();
              for (var key2 in this.operateForm) {
                if (key2 != "issue_state" && key2 != "submit_state")
                {
                  formdata.append(key2, this.operateForm[key2])
                }
              }

              if (this.fileList.length != 0) {
                formdata.append("file", this.fileList[0].raw)
                this.fileList.splice(0, 1);
              }

              axios._post('http://8.129.86.121:80/project/update', formdata).then(res => {
                this.$message.success("更新项目成功");
                this.isShow = false
                this.getList()
              },err => {
                alert("Update Error!");
                this.$message({
                  message: "更新项目失败",
                  type: "error"
                });
              })
            } 
            else if (this.operateType === 'add') 
            {
              let formdata = new FormData();
              for (var key3 in this.operateForm) {
                if (key3 != "issue_state" && key3 != "submit_state")
                {
                  formdata.append(key3, this.operateForm[key3])
                }
              }
              
              if (this.fileList.length != 0) {
                formdata.append("file", this.fileList[0].raw)
                this.fileList.splice(0, 1);
              }
              
              axios._post('http://8.129.86.121:80/project/insert', formdata).then(res => {
                this.$message.success("新建项目成功！");
                this.isShow = false
                this.getList()
              }, err => {
                alert("Add Error!");
                this.$message({
                  message: "新建项目失败",
                  type: "error"
                });
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
    delRow (row) {
      this.$confirm('此操作将永久删除该项目信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.operateForm = row
          let formdata = new FormData();
          for (var key4 in this.operateForm) {
            if (key4 != "issue_state" && key4 != "submit_state")
            {
              formdata.append(key4, this.operateForm[key4])
            }
          }

          axios
            ._post('http://8.129.86.121:80/project/delete', formdata)
            .then(res => {
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
        this.config.total = this.tableData.length;
        if (this.tableData.length == 0)
        {
          this.config.currentPage = 0;
        }
      }
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
