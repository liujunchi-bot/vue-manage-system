<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增审计文档' : '更新审计文档'"
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
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">上传文件</div>
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
        <el-button type="primary" @click="delUser">导出</el-button>
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
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm";
import CommonTable from "../../components/CommonTable";
export default {
  components: {
    CommonForm,
    CommonTable
  },
  data () {
    return {
      fileList: [],
      operateType: "add",
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: "contract",
          label: "审计文档名称",
          width: 160
        },
        {
          prop: "id",
          label: "审计文档编号",
          width: 200
        },
        {
          prop: "fileversion",
          label: "审计文档版本",
          width: 100
        },
        {
          prop: "proname",
          label: "所属项目",
          width: 180
        },
        {
          prop: "upbirth",
          label: "上传日期",
          width: 220
        },
        {
          prop: "rebirth",
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
        name: "",
        id: "",
        blproject: "",
        endbirth: "",
        version: "",
        documentation: ""
        //sex: ""
      },
      operateFormLabel: [
        {
          model: "name",
          label: "审计文档名称"
        },
        {
          model: "id",
          label: "审计文档编号"
        },
        {
          model: "version",
          label: "审计文档版本"
        },
        {
          model: "blproject",
          label: "所属项目"
        },
        {
          model: "endbirth",
          label: "项目预计结束时间",
          type: "date"
        }
        //{
        //model: "documentation",
        //label: "上传文档"
        // type
        //}
      ],
      searchFrom: {
        keyword: ""
      },
      formLabel: [
        {
          model: "keyword",
          label: ""
        }
      ]
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
        `当前限制选择 3 个文件，本次选择了 ${files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    getList (name = "") {
      this.config.loading = true;
      // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      name ? (this.config.page = 1) : "";
      this.$http
        .get("/api/user/getUser", {
          params: {
            page: this.config.page,
            name
          }
        })
        .then(res => {
          this.tableData = res.data.list.map(item => {
            //item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = res.data.count;
          this.config.loading = false;
        });
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
    confirm () {
      if (this.operateType === "edit") {
        this.$http.post("/api/user/edit", this.operateForm).then(res => {
          console.log(res.data);
          this.isShow = false;
          this.getList();
        });
      } else {
        this.$http.post("/api/user/add", this.operateForm).then(res => {
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
