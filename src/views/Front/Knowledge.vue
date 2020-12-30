<template>
  <div>
    <el-dialog title="新增" :visible.sync="isShow1" :before-close="handleclose">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="问题" prop="question">
          <el-input v-model="ruleForm.question"></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-input v-model="ruleForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="回答" prop="answer">
          <el-input type="textarea" v-model="ruleForm.answer"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-button type="primary" @click="add">增加</el-button>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="问题" width="240">
        <template slot-scope="scope">{{ scope.row.question }}</template>
      </el-table-column>
      <el-table-column prop="keywords" label="关键词" width="200"> </el-table-column>
      <el-table-column prop="answer" label="答案" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template scope="scope">
          <el-button size="mini" @click="contentEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="contentDelete(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="isShow2" :before-close="handleclose">
      <el-form
        :model="editForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="问题" prop="question">
          <el-input v-model="editForm.question"></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-input v-model="editForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="回答" prop="answer">
          <el-input type="textarea" v-model="editForm.answer"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitEdit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "../../axios/ajax";

export default {
  data() {
    return {
      ruleForm: {
        question: "",
        keywords: "",
        answer: "",
      },
      editForm: {
        question: "",
        keywords: "",
        answer: "",
      },
      rules: {
        question: [
          { required: true, message: "请输入问题", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" },
        ],
        keywords: [
          { required: true, message: "请输入关键词", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" },
        ],
        answer: [
          { required: true, message: "请输入答案", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" },
        ],
      },
      isShow1: false,
      isShow2: false,

      editIndex: 0,

      // tableData: [
      //   {
      //     question: "公司名称",
      //     keywords: "名称 名字 name 称呼 ",
      //     answer: "我司名称为湖南省华晟会计师事务所",
      //   },
      //   {
      //     question: "公司地址",
      //     keywords: "地址 地方 在哪里 ",
      //     answer: "我司地址为湖南省长沙市",
      //   },
      //   {
      //     question: "公司人数",
      //     keywords: "人数 多少人 ",
      //     answer: "我司人数约为100人",
      //   },
      // ],
      tableData: [],
      id_list: [],

      multipleTable: [],
    };
  },

  mounted: function () {
    this.init();
  },

  methods: {
    init() {
      console.log("开始初始化");
      var self = this;
      // this.config.loading = true;
      // name ? (this.config.page = 1) : "";
      axios
        ._get("http://8.129.86.121:8080/QandA/getProblem")
        .then((response) => {
          this.id_list = [];
          this.tableData = [];
          for (var i in response) {
            var newa = new Array();
            console.log("response", response[i]);

            this.id_list.push(response[i]["id"]);
            newa["question"] = response[i]["question_pre"];
            newa["keywords"] = response[i]["question_aft"];
            newa["answer"] = response[i]["q_word"];
            this.tableData.push(newa);
          }

          console.log("id_list", this.id_list);
          console.log("tableData", this.tableData);
        })
        .catch(function (error) {
          alert("数据获取失败");
          console.log(error.response);
        });
    },

    add() {
      this.isShow1 = true;
    },
    handleclose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.isShow1 = false;
          this.isShow2 = false;
          done();
        })
        .catch((_) => {});
    },
    submitForm() {
      // var newc = new Array();

      var myFormData = new FormData();
      myFormData.append("question_pre", this.ruleForm.question);
      myFormData.append("question_aft", this.ruleForm.keywords);
      myFormData.append("q_word", this.ruleForm.answer);

      axios
        ._post("http://8.129.86.121:8080/QandA/insert", myFormData)
        .then((response) => {
          // alert("发送成功");
          this.$message({
            type: "success",
            message: "添加成功!",
          });

          // newc["question"] = this.ruleForm.question;
          // newc["keywords"] = this.ruleForm.keywords;
          // newc["answer"] = this.ruleForm.answer;
          // this.tableData.push(newc);
          this.init();
        })
        .catch(function (error) {
          alert("发送失败");
        });

      this.isShow1 = false;
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    contentEdit(index, row) {
      console.log("index", index);
      console.log("row", row);
      this.editForm.question = row["question"];
      this.editForm.keywords = row["keywords"];
      this.editForm.answer = row["answer"];
      this.isShow2 = true;
      this.editIndex = parseInt(index);
      console.log(this.editForm);

      // console.log("qu",row["question"]);
    },
    submitEdit() {
      this.isShow2 = false;

      // this.tableData[this.editIndex]["question"] = this.editForm.question;
      // this.tableData[this.editIndex]["keywords"] = this.editForm.keywords;
      // this.tableData[this.editIndex]["answer"] = this.editForm.answer;
      // console.log("yd", this.editForm.answer);
      // console.log("ed", this.tableData[this.editIndex]["answer"]);
      // console.log("td", this.tableData);

      var myFormData = new FormData();

      var edit_index = this.id_list[this.editIndex];
      console.log("edit_index", edit_index);

      myFormData.append("id", edit_index);
      myFormData.append("question_pre", this.editForm.question);
      myFormData.append("question_aft", this.editForm.keywords);
      myFormData.append("q_word", this.editForm.answer);

      for (var value of myFormData.values()) {
        console.log(value);
      }

      axios
        ._post("http://8.129.86.121:8080/QandA/update", myFormData)
        .then((response) => {
          // alert("发送成功");
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.$set(this.tableData, this.editIndex, {
            question: this.editForm.question,
            keywords: this.editForm.keywords,
            answer: this.editForm.answer,
          });
        })
        .catch(function (error) {
          alert("发送失败");
        });
    },

    contentDelete(index) {
      this.$confirm("此操作将删除该问题及相应答案, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var myFormData = new FormData();

          var t_index = parseInt(index);
          var de_index = this.id_list[t_index];
          myFormData.append("id", de_index);

          axios
            ._post("http://8.129.86.121:8080/QandA/delete", myFormData)
            .then((response) => {
              // alert("发送成功");
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.tableData.splice(index, 1);
            })
            .catch(function (error) {
              alert("发送失败");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.el-button--primary {
  margin-bottom: 20px;
}
</style>
