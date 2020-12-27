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
          <el-input v-model="ruleForm.answer"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
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
      <el-table-column label="问题" width="120">
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
          <el-input v-model="editForm.answer"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitEdit">确认</el-button>
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

      multipleTable: [],
    };
  },

  mounted: function () {
    var self = this;
    this.config.loading = true;
    name ? (this.config.page = 1) : "";
    axios
      .get("http://192.168.43.233:8080/backend/")
      .then((response) => {
        alert(response);
        for(var i in response){
          var newa=new Array();
          newa["question"]=response[i]["qusetion_pre"];
          newa["keywords"]=response[i]["qusetion_aft"];
          newa["answer"]=response[i]["q_word"];
          this.tableData.push(newa);
        }
      })
      .catch(function (error) {
        alert("数据获取失败");
        console.log(error.response);
      });
  },

  methods: {
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
      var newc = new Array();
      newc["question"] = this.ruleForm.question;
      newc["keywords"] = this.ruleForm.keywords;
      newc["answer"] = this.ruleForm.answer;
      this.tableData.push(newc);

      var myFormData = new FormData();
      myFormData.append("question_pre", this.ruleForm.question);
      myFormData.append("question_aft", this.ruleForm.keywords);
      myFormData.append("q_word", this.ruleForm.answer);

      axios
        .post("", myFormData)
        .then((response) => {
          alert("发送成功");
        })
        .catch(function (error) {
          alert("发送失败");
        });

      this.$message({
        type: "success",
        message: "添加成功!",
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
      this.editIndex = index;
      console.log(this.editForm);

      // console.log("qu",row["question"]);
    },
    submitEdit() {
      this.isShow2 = false;

      this.tableData[this.editIndex]["question"] = this.editForm.question;
      this.tableData[this.editIndex]["keywords"] = this.editForm.keywords;
      this.tableData[this.editIndex]["answer"] = this.editForm.answer;
      console.log("yd", this.editForm.answer);
      console.log("ed", this.tableData[this.editIndex]["answer"]);

      var myFormData = new FormData();

      var edit_index = parseInt(this.editIndex) + 1;

      myFormData.append("id", this.edit_Index);
      myFormData.append("question_pre", this.editForm.question);
      myFormData.append("question_aft", this.editForm.keywords);
      myFormData.append("q_word", this.editForm.answer);

      axios
        .post("", myFormData)
        .then((response) => {
          alert("发送成功");
        })
        .catch(function (error) {
          alert("发送失败");
        });

      this.$message({
        type: "success",
        message: "修改成功!",
      });
    },

    contentDelete(index) {
      this.$confirm("此操作将删除该问题及相应答案, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);

          var myFormData = new FormData();

          var de_index = parseInt(index) + 1;
          myFormData.append("id", de_index);

          axios
            .post("", myFormData)
            .then((response) => {
              alert("发送成功");
            })
            .catch(function (error) {
              alert("发送失败");
            });

          this.$message({
            type: "success",
            message: "删除成功!",
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
