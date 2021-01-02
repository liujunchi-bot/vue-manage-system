<template>
  <div class="manage">
    <el-dialog title="更新合同" :visible.sync="isShow">
      <common-form
        :inline = "false"
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
        .zip,
        .rar,
        .7z"
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
      </el-upload>
      <div>
        <el-button size="small" type="primary" @click="uploadCheck">上传合同</el-button>
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
        <el-button type="primary" @click="exportRow">导出</el-button>
      </div>

      <common-form inline :formLabel="formLabel" :form="searchForm">
        <el-button type="primary" @click="searchKey(searchForm.keyword)"
          >搜索</el-button
        >
        <el-button type="info" @click="getList()">重置</el-button>
      </common-form>
    </div>
    <audit-file-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @pass="passRow"
      @reject="rejectRow"
      @edit="editRow"
      @changePage="handlePageChange"
      @changeSize="handleSizeChange"
      id="out-table"
    ></audit-file-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm";
import AuditFileTable from "../../components/AuditFileTable";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import axios from '../../axios/ajax'
import qs from 'qs'
export default {
  components: {
    CommonForm,
    AuditFileTable,
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
      if_submit: '',
      if_issued: '',
      operateType: "edit",
      isShow: false,
      updateFile: false,
      tableData: [],
      tableLabel: [
        {
          prop: "file_id",
          label: "序号",
          width: 80
        },
        {
          prop: "file_code",
          label: "合同编号",
          width: 150
        },
        {
          prop: "file_name",
          label: "合同名称",
          width: 160
        },
        {
          prop: "contract_amount",
          label: "合同金额(万元)",
          width: 160
        },
        {
          prop: "file_property",
          label: "合同说明",
          width: 200
        },
        {
          prop: "file_version",
          label: "合同版本",
          width: 150
        },
        {
          prop: "file_project",
          label: "所属项目",
          width: 180
        },
        {
          prop: "file_uploaddate",
          label: "上传日期",
          width: 150
        },
        {
          prop: "file_updatedate",
          label: "更新日期",
          width: 150
        },
        {
          prop: "file_url",
          label: "下载链接",
          width: 150,
          type: "link"
        },
        {
          prop: "operatorname",
          label: "经办人",
          width: 100,
          type: "name"
        },
        {
          prop: 'issue_state',
          label: '审核状态',
          width: 100
        },
        {
          prop: "checker",
          label: "审核人",
          width: 100,
          type: "name"
        },
      ],
      config: {
        currentPage: 1,
        total: 0,
        pageSize: 20,
        loading: false
      },
      operateForm: {
        file_code: "",
        file_name: "",
        file_type: "",
        file_property: "",
        file_version: "",
        file_project: ""
      },
      operateFormLabel: [
        {
          model: "file_code",
          label: "合同编号",
          width: 160
        },
        {
          model: "file_name",
          label: "合同名称",
          width: 160
        },
        {
          model: "file_type",
          label: "类型",
          width: 160,
          type: 'select',
          opts: [
            {
              label: '合同',
              value: '合同'
            }
          ]
        },
        {
          model: "file_property",
          label: "合同说明",
          width: 200
        },
        {
          model: "contract_amount",
          label: "合同金额",
          width: 200
        },
        {
          model: "file_version",
          label: "合同版本",
          width: 100
        },
        {
          model: "file_project",
          label: "所属项目",
          width: 180
        }
      ],
      rules: {
        file_code: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 10, max: 255, message: '合同编号长度需要在 10 到 255 个字符', trigger: 'blur' }
        ],
        file_name: [
          { required: true, message: '请输入合同名称', trigger: 'blur' },
          { min: 4, max: 255, message: '合同名称长度需要在 4 到 255 个字符', trigger: 'blur' }
        ],
        file_property: [
          { message: '请输入合同说明', trigger: 'blur' },
          { max: 255, message: '合同说明长度最多 255 个字符', trigger: 'blur' }
        ],
        file_type: [
          { type: "enum", enum: ['合同'], required: true, message: '请选择类型', trigger: 'blur' }
        ],
        contract_amount: [
          { required: true, message: '请输入合同金额（万元）',trigger:'blur',},
          { validator: isPriceValidator, message: '合同金额只能输入数字', trigger: 'blur' }
        ],
        file_project: [
          { message: '请输入合同相关项目', trigger: 'blur' },
          { max: 255, message: '合同相关项目长度最多 255 个字符', trigger: 'blur' }
        ]
      },
      searchForm: {
        keyword: ""
      },
      fileList: [

      ],
      formLabel: [
        {
          model: "keyword",
          label: ""
        }
      ],
      formData: "",
    };
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
      for (var key in this.operateForm) {
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

      const isIMAGE = (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg");
      const isDOCUMENT = (file.type === "application/pdf" ||
                          file.type === "application/msword" ||
                          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                          file.type === "application/vnd.ms-excel" ||
                          file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      const isZip = (file.type === "application/x-zip-compressed");
      const isLt100M = file.size / 1024 / 1024 < 100;

      if (!isIMAGE && !isDOCUMENT && !isZip) {
        this.$message.error('不支持此格式文件上传！');
      }

      if (!isLt100M) {
        this.$message.error('上传文件大小不得大于100MB');
      }
      return (isIMAGE || isDOCUMENT || isZip) && isLt100M;
    },
    getList (name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      axios._get("http://8.129.86.121:8080/file/GetAllContractChecker").then(res => {
        this.$message.success("获取合同列表成功！")
        this.tableData = res;

        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i]["file_url"] == null) {
            this.tableData[i]["file_url"] = "NULL";
          }
          else {
            this.tableData[i]["file_url"] = window.encodeURI(this.tableData[i]["file_url"]);
          }

          if (this.tableData[i]["if_submit"] === "0" || this.tableData[i]["if_delete"] === "1") {
            this.tableData.splice(i, 1);
            i--;
          }

          this.if_submit = this.tableData[i].if_submit;
          this.if_issued = this.tableData[i].if_issued;
          
          if (this.if_submit == '0')
          {
            this.tableData[i]["submit_state"] = '待提交';
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

        // this.config.total = res.data.count;
        this.config.loading = false;
        this.config.total = this.tableData.length;
        if (this.tableData.length == 0)
        {
          this.config.currentPage = 0;
        }
        //console.log("tabledata: "+JSON.stringify(res));
      }, err => {
        alert("getlist error!!!");
      })
    },
    editRow (row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    confirm () {
      //console.log(this.$refs.commonForm.$children[0]);
      this.$refs.commonForm.$children[0].validate((valid) => {
          if (valid) 
          {
            if (this.fileList.length != 0 && !this.onBeforeUpload(this.fileList[0].raw))
            {
              this.fileList.splice(0, 1);
              return false;
            }
            
            if (this.operateType === "edit") {
              let formdata = new FormData();
              for (var key in this.operateForm) {
                if (key != "issue_state" && key != "submit_state")
                {
                  formdata.append(key, this.operateForm[key])
                }
              }

              if (this.fileList.length != 0) {
                formdata.append("file", this.fileList[0].raw)
                this.fileList.splice(0, 1);
              }

              axios._post('http://8.129.86.121:80/file/update', formdata).then(res => {
                this.$message.success("更新合同成功！");
                this.isShow = false;
                this.getList()
              }, err => {
                alert("error!!!");
                this.$message({
                  message: "更新合同失败",
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
      this.$confirm("此操作将不再显示该合同信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.operateForm = row;
          let formdata = new FormData();
          for (var key in this.operateForm) {
            formdata.append(key, this.operateForm[key])
          }

          axios._post('http://8.129.86.121:80/file/checkdelete', formdata).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
          }, err => {
            this.$message({
              type: "error",
              message: "删除失败"
            });
            this.getList();
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    passRow (row) {
      this.$confirm("此操作将审核通过该合同, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.operateForm = row;
          let formdata = new FormData();
          for (var key2 in this.operateForm) {
            formdata.append(key2, this.operateForm[key2])
          }

          axios._post('http://8.129.86.121:80/file/checkpass', formdata).then(res => {
            if (res.code == "250") {
              this.$message({
                type: "error",
                message: "已有审核人处理此合同！"
              });
            }
            else {
              this.$message({
                type: "success",
                message: "审核结果保存成功!"
              });
            }

            this.getList();
          }, err => {
            this.$message({
              type: "error",
              message: "审核结果保存失败！"
            });
            this.getList();
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核"
          });
        });
    },
    rejectRow (row) {
      this.$confirm("此操作将退回该合同, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.operateForm = row;
          let formdata = new FormData();
          for (var key3 in this.operateForm) {
            formdata.append(key3, this.operateForm[key3])
          }

          axios._post('http://8.129.86.121:80/file/checknotpass', formdata).then(res => {
            if (res.code == "250") {
              this.$message({
                type: "error",
                message: "已有审核人处理此文档！"
              });
            }
            else {
              this.$message({
                type: "success",
                message: "审核结果保存成功!"
              });
            }
            this.getList();
          }, err => {
            this.$message({
              type: "error",
              message: "审核结果保存失败"
            });
            this.getList();
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核"
          });
        });
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
      }
    }
  },
  created () {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
