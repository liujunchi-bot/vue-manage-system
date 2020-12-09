<template>
    <div class="manage">
        <el-dialog
                :title="operateType === 'add' ? '新增设计文档' : '更新设计文档'"
                :visible.sync="isShow"
        >
            <common-form
                    :formLabel="operateFormLabel"
                    :form="operateForm"
                    ref="form"
            ></common-form>
            <!-- action表示文件要上传到的后台API地址 -->
            <el-upload
                    class="upload-demo"
                    :action="uploadApiUrl"
                    accept="image/jpeg,image/png,image/jpg,image/gif,application/pdf,application/doc,application/docx,.zip,.rar.7z"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :before-upload="onBeforeUpload"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :on-change="handleChange"
                    :file-list="fileList"
                    :auto-upload="false"
                    :http-request="uploadFile"
                    :show-file-list="true"
            >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">请上传格式为jpeg,png,gif,jpg,pdf,doc,docx,zip.rar,7z的文件</div>
            </el-upload>

            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <div>
                <el-button type="primary" @click="addUser">新增</el-button>
                <el-button type="primary" @click="delUser">删除</el-button>
                <el-button type="primary" @click="exportUser">导出</el-button>
            </div>

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
                @export="exportUser"
                id="out-table"
        ></common-table>
    </div>
</template>

<script>
    import CommonForm from "../../components/CommonForm";
    import CommonTable from "../../components/CommonTable";
    import FileSaver from "file-saver";
    import XLSX from "xlsx";   
    import axios from '../../axios/ajax'
    import qs from 'qs'
    export default {
        components: {
            CommonForm,
            CommonTable
        },
        data () {
            return {
                operateType: "add",
                isShow: false,
                tableData: [],
                tableLabel: [
                    {
                        prop: "file_name",
                        label: "设计文档名称",
                        width: 160
                    },
                    {
                        prop: "file_type",
                        label: "文档类型",
                        width: 160
                    },
                    {
                        prop: "file_property",
                        label: "文档说明",
                        width: 200
                    },
                    {
                        prop: "file_id",
                        label: "设计文档编号",
                        width: 200
                    },
                    {
                        prop: "file_version",
                        label: "设计文档版本",
                        width: 100
                    },
                    {
                        prop: "file_project",
                        label: "所属项目",
                        width: 180
                    },
                    {
                        prop: "file_uploaddate",
                        label: "上传日期",
                        width: 220
                    },
                    {
                        prop: "file_updatedate",
                        label: "更新日期",
                        width: 220
                    }
                ],
                config: {
                    page: 1,
                    total: 30,
                    loading: false
                },
                operateForm: {
                    file_name: "",
                    file_type: "",
                    file_property: "",
                    file_version: "",
                    file_project: ""
                },
                operateFormLabel: [
                    {
                        model: "file_name",
                        label: "设计文档名称",
                        width: 160
                    },
                    {
                        model: "file_type",
                        label: "文档类型",
                        width: 160
                    },
                    {
                        model: "file_property",
                        label: "文档说明",
                        width: 200
                    },
                    {
                        model: "file_version",
                        label: "设计文档版本",
                        width: 100
                    },
                    {
                        model: "file_project",
                        label: "所属项目",
                        width: 180
                    }
                ],

                searchFrom: {
                    keyword: ""
                },
                formLabel: [
                    {
                        model: "keyword",
                        label: ""
                    }
                ],
                fileList: [

                ],
                formData: "",
                uploadApiUrl : "http://127.0.0.1:8080/file/upload",
            };
        },
        methods: {
            handleRemove (file, fileList) {
                console.log(file, fileList);
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
            handleChange(file, fileList) {
              this.fileList = fileList;
            },
            uploadFile(file) {
              this.formData.append("file", file.file);
            },
            onBeforeUpload(file){
                const isIMAGE = file.type === "image/jpeg"||"image/png"||"image/gif"||"image/jpg";
                const isDOCUMENT = file.type === "application/pdf"||"application/doc"||"application/docx"
                const isZip = file.type === "application/zip"||"application/rar"||"application/7z";
                const isLt50M = file.size /1024/1024 < 50;

                if (!isIMAGE||!isDOCUMENT||!isZip){
                    this.$message.error('上传文件格式只能为jpeg,png,gif,jpg,pdf,doc,docx,zip.rar,7z');
                }

                if (!isLt50M){
                    this.$message.error('上传文件大小不得大于50MB');
                }
                return (isIMAGE || isDOCUMENT || isZip) && isLt50M;
            },
            getList (name = '') {
                this.config.loading = true
                name ? (this.config.page = 1) : ''
                axios._get("http://127.0.0.1:8080/file/GetAllFile").then(res => {
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
                    this.config.loading = false;
                    //console.log("tabledata: "+JSON.stringify(res));
                }, err => {
                    alert("error!!!");
                })
            },

            addUser () {
                this.operateForm = {};
                this.operateType = "add";
                this.isShow = true;
            },
            editUser (row) {
                this.operateType = "edit";
                this.isShow = true;
                this.operateForm = row;
            },
            downloadUser (row) {
                this.operateType = "download";
                this.isShow = true;
                this.operateForm = row;
            },
            confirm () {
                if (this.operateType === "edit") {
                    this.$http.post("/api/user/edit", this.operateForm).then(res => {
                        console.log(res.data);
                        this.isShow = false;
                        this.getList();
                    });
                } else if (this.operateType === "add") {
                    // this.$http.post("http://127.0.0.1:8080/file/insert", this.operateForm).then(res => {
                    //     console.log(res.data);
                    //     this.isShow = false;
                    //     this.getList();
                    // });
                    let formdata = new FormData();
                    for (var key in this.operateForm)
                    {
                      formdata.append(key,this.operateForm[key])
                    }
                    formdata.append("file",this.fileList[0].raw)
                    console.log()
                    axios._post('http://127.0.0.1:8080/file/upload', formdata).then(res => {
                        this.$message.success("添加文档成功！");
                        this.isShow = false;
                        console.log("aaaaaa"+res);//res是返回插入数据的id
                        this.getList()
                    }, err => {
                        alert("error!!!");
                        console.log(JSON.stringify(formdata));
                        console.log(formdata);
                    })
                }
                else {
                    this.$http.post("/api/user/download", this.operateForm).then(res => {
                        console.log(res.data);
                        this.isShow = false;
                        this.getList();
                    });
                }
            },
            delUser (row) {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        let id = row.id;
                        this.$http
                            .get("/api/user/del", {
                                params: {
                                    id
                                }
                            })
                            .then(res => {
                                console.log(res.data);
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                this.getList();
                            });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
    //定义导出Excel表格事件
    exportUser() {
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
          "测试文档.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
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
