<template>
  <div class="body">
    <div id="all" ref="all">
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="editObject" :rules="rules1" ref="editObject">
        <el-form-item label="员工编号" prop="Id">
          <el-input v-model="editObject.Id" ></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="editObject.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="editObject.sex" placeholder="请选择员工性别">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" >
          <el-form-item prop="birth">
            <el-date-picker type="date" placeholder="选择日期" v-model="editObject.birth" ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model="editObject.nation" ></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="native">
          <el-input v-model="editObject.native" ></el-input>
        </el-form-item>
        <el-form-item label="出生地" prop="birthPlace">
          <el-input v-model="editObject.birthPlace" ></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" prop="politics">
          <el-input v-model="editObject.politics" ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="number">
          <el-input v-model="editObject.number"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editObject.email" ></el-input>
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="editObject.job"></el-input>
        </el-form-item>
        <el-form-item label="员工状态" prop="state">
          <el-input v-model="editObject.state" ></el-input>
        </el-form-item>
        <el-form-item label="员工头像" prop="photo">
          <el-input v-model="editObject.photo" ></el-input>
        </el-form-item>
        <el-form-item label="员工类型" prop="type">
          <el-input v-model="editObject.type" ></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="editObject.department" ></el-input>
        </el-form-item>
        <el-form-item label="入职日期" >
          <el-form-item prop="inDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="editObject.inDate" ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="离职日期">
          <el-form-item prop="outDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="editObject.outDate" ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="绩效点数" prop="point">
          <el-input v-model="editObject.point"></el-input>
        </el-form-item>
        <el-form-item label="考勤分数" prop="score">
          <el-input v-model="editObject.score"></el-input>
        </el-form-item>
        <el-form-item label="应发工资" prop="salary">
          <el-input v-model="editObject.salary"></el-input>
        </el-form-item>
        <el-form-item label="年假天数" prop="holiday">
          <el-input v-model="editObject.holiday" ></el-input>
        </el-form-item>
        <el-form-item label="员工权限" prop="weight">
          <el-select v-model="editObject.weight" placeholder="请选择员工权限">
            <el-option label="经办人" value="3"></el-option>
            <el-option label="审核人" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="handleClickConfirm('editObject')">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="dialogFormAddVisable">
      <el-form :model="newObject" :rules="rules2" ref="newObject">
        <el-form-item label="员工编号" prop="Id">
          <el-input v-model="newObject.Id"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="newObject.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="newObject.sex" placeholder="请选择员工性别">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="number">
          <el-input v-model="newObject.number"></el-input>
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="newObject.job"></el-input>
        </el-form-item>
        <el-form-item label="绩效点数" disabled prop="point">
          <el-input v-model="newObject.point"></el-input>
        </el-form-item>
        <el-form-item label="考勤分数" prop="score">
          <el-input v-model="newObject.score"></el-input>
        </el-form-item>
        <el-form-item label="应发工资" prop="salary">
          <el-input v-model="newObject.salary"></el-input>
        </el-form-item>
        <el-form-item label="员工权限" prop="weight">
          <el-select v-model="newObject.weight" placeholder="请选择员工权限">
            <el-option label="经办人" value="3"></el-option>
            <el-option label="审核人" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisable = false">取消</el-button>
        <el-button @click="handleClickConfirmAdd('newObject')">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisibleShow">
      <el-form>
        <el-form-item label="员工编号">
          <el-input v-model="showObject.Id" disabled></el-input>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input v-model="showObject.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="showObject.sex"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="showObject.number"></el-input>
        </el-form-item>
        <el-form-item label="岗位">
          <el-input v-model="showObject.job"></el-input>
        </el-form-item>
        <el-form-item label="绩效点数">
          <el-input v-model="showObject.point"></el-input>
        </el-form-item>
        <el-form-item label="考勤分数">
          <el-input v-model="showObject.score"></el-input>
        </el-form-item>
        <el-form-item label="应发工资">
          <el-input v-model="showObject.salary"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="showObject.weight"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleShow = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="dialogFormAddVisable = true"
          >新增用户</el-button
        >
      </el-col>
      <el-col :span="5">
        <!-- <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="state"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        >
          <i class="el-icon-edit el-input__icon" slot="suffix"> </i>
          <template slot-scope="{ item }">
            <div class="name items-container">{{ item.name }}</div>
            <!-- <span class="addr">{{ item.address }}</span> -->
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="400"
    >
      <!-- @selection-change="handleSelectionChange" -->
      <!-- <el-table-column type="selection" width="150"> </el-table-column> -->
      <el-table-column prop="Id" label="员工编号" width="220">
      </el-table-column>
      <el-table-column prop="name" label="员工姓名" width="180">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="180"> </el-table-column>
      <el-table-column prop="number" label="手机" width="180">
      </el-table-column>
      <el-table-column prop="job" label="岗位" width="180"> </el-table-column>
      <el-table-column prop="point" label="绩效点数" width="180">
      </el-table-column>
      <el-table-column prop="score" label="考勤分数" width="180">
      </el-table-column>
      <el-table-column prop="salary" label="应发工资" width="180">
      </el-table-column>
      <el-table-column prop="weight" label="权限" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleClickChange(scope.row)"
            >编辑</el-button
          >
          <el-button @click="view(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
      </div>
    <div id="view" ref="view">
    <div class="title">
      <span>用户信息</span>
    </div>
    <div class="info">
      <div class="left-info">
        <ul class="key">
          <li>员工姓名</li>
          <div class="line"></div>
          <li>性别</li>
          <div class="line"></div>
          <li>员工编号</li>
          <div class="line"></div>
          <li>员工账号</li>
          <div class="line"></div>
          <li>员工密码</li>
          <div class="line"></div>
          <li>出生日期</li>
          <div class="line"></div>
          <li>民族</li>
          <div class="line"></div>
          <li>籍贯</li>
          <div class="line"></div>
          <li>出生地</li>
          <div class="line"></div>
          <li>政治面貌</li>
          <div class="line"></div>
          <li>手机</li>
          <div class="line"></div>
          <li>邮箱</li>
          <div class="line"></div>
          <li>岗位</li>
          <div class="line"></div>
          <li>员工状态</li>
          <div class="line"></div>
        </ul>
        <ul class="value">
          <li>{{ name }}</li>
          <li>{{ gender }}</li>
          <li>{{ num }}</li>
          <li>{{ account }}</li>
          <li>{{ password }}</li>
          <li>{{ birth }}</li>
          <li>{{ nation }}</li>
          <li>{{ nativePlace }}</li>
          <li>{{ birthPlace }}</li>
          <li>{{ politicsStatus }}</li>
          <li>{{ phone }}</li>
          <li>{{ email }}</li>
          <li>{{ position }}</li>
          <li>{{ state }}</li>
        </ul>
      </div>
      <div class="right-info">
        <div class="photo">
          <img src="photo" alt="" />
        </div>
        <div class="right-float">
          <ul class="key">
            <li>员工类型</li>
            <div class="line"></div>
            <li>部门</li>
            <div class="line"></div>
            <li>入职日期</li>
            <div class="line"></div>
            <li>离职日期</li>
            <div class="line"></div>
            <!--<li>绩效点数</li>
          <div class="line"></div>
          <li>考勤分数</li>
          <div class="line"></div>-->
            <li>应发工资</li>
            <div class="line"></div>
            <li>年假天数</li>
            <div class="line"></div>
            <li>员工权限</li>
            <div class="line"></div>
          </ul>
          <ul class="value">
            <li>{{ type }}</li>
            <li>{{ department }}</li>
            <li>{{ dateOnBroad }}</li>
            <li>{{ dateOfDeparture }}</li>
            <!--<li>{{performance}}</li>
          <li>{{checkIn}}</li>-->
            <li>{{ salary }}</li>
            <li>{{ holiday }}</li>
            <li>{{ authority }}</li>
          </ul>
        </div>
      </div>
    </div>
    <button class="change-info" @click="back">返回</button>
      </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data () {
    return {
      state: "",
      tableData: [
      ],
      multipleSelection: [],
      dialogFormVisible: false,
      dialogFormAddVisable: false,
      dialogFormVisibleShow: false,
      editObject: {},
      newObject: {},
      showObject: {},
      staff_id:"",
      photo: "",
      name: "1",
      gender: "1",
      num: "1",
      account: "1",
      password: "1",
      birth: "1",
      nation: "1",
      nativePlace: "1",
      birthPlace: "1",
      politicsStatus: "1",
      phone: "1",
      email: "1",
      position: "1",
      state: "1",
      type: "1",
      dateOnBroad: "1",
      dateOfDeparture: "1",
      //performance:"1",
      //checkIn:"1",
      salary: "1",
      holiday: "1",
      authority: "1",
      department: "",
      
      rules1:{
        Id:[{required:true, message:'请输入6位员工ID', trigger:'blur', min:6, max:6}],
        name:[{required: true, message: '请填写员工姓名', trigger: 'blur'}],
        sex:[{trigger:'change'}],
        birth:[],
        nation:[],
        native:[],
        birthPlace:[],
        politics:[],
        number:[{message:'请输入正确的手机号', pattern:/^1[34578]\d{9}$/, trigger:'blur'}],
        email:[{message:'请输入正确的邮箱', pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, trigger:'blur'}],
        job:[],
        state:[],
        photo:[],
        type:[],
        department:[],
        inDate:[],
        outDate:[],
        point:[],
        score:[],
        salary:[],
        holiday:[],
        weight:[{required:true, trigger:'change',message:'请选择员工权限'}]
      },
      rules2:{
        Id:[{required:true, message:'请输入6位员工ID', trigger:'blur', min:6, max:6}],
        name:[{required:true, message:'请输入员工姓名', trigger:'blur'}],
        sex:[{trigger:'change'}],
        number:[{message:'请输入正确的手机号', pattern:/^1[34578]\d{9}$/, trigger:'blur'}],
        job:[],
        point:[],
        score:[],
        salary:[],
        weight:[{required:true, trigger:'change',message:'请选择员工权限'}]
      }
    };
  },
  created () {
    this.loadData();
    this.$refs.view.style.display = "none"
    this.$refs.all.style.display = "inline"
  },
  methods: {
    loadData () {
      let params = {};
      let url = "http://8.129.86.121:8080/stuff/delete/load";
      this.$axios
        .post(url, qs.stringify(params))
        .then((successResponse) => {
          
          this.tableData = successResponse.data;
        })
        .catch((failResponse) => {
          alert("请求失败");
        });
    },
    view: function (rowInfo) {
      this.staff_id = rowInfo.Id
      var formdata = new FormData();
      formdata.append("staff_id",this.staff_id);
      this.$axios.post(
        "http://8.129.86.121:8080/staff/info",formdata
      )
        .then(res => {
          console.log(res)
          if(res.staff_photo==null){
            this.photo = '../../assets/images/user-default.png'
          }
          else {this.photo = res.data.staff_photo}

          this.name = res.data.staff_name,
          this.gender = res.data.staff_sex,
          this.num = res.data.staff_id,
          this.account = res.data.staff_account,
          this.password = res.data.staff_password,
          this.birth = res.data.staff_birthday,
          this.nation = res.data.staff_nation,
          this.nativePlace = res.data.staff_native_place,
          this.birthPlace = res.data.staff_birth_place,
          this.politicsStatus = res.data.staff_politic,
          this.phone = res.data.staff_phone,
          this.email = res.data.staff_email,
          this.position = res.data.staff_job,
          this.state = res.data.staff_status,
          this.type = res.data.staff_type,
          this.dateOnBroad = res.data.staff_in_date,
          this.dateOfDeparture = res.data.staff_out_date,
          this.department = res.data.staff_department,
          //this.performance = res.data.performance,
          //this.checkIn = res.data.checkIn,
          this.salary = res.data.staff_wage,
          this.holiday = res.data.staff_annual_leave,
          this.authority = res.data.staff_permission
      })
      .catch(err => {
        this.$notify({ title: '错误', message: err, type: 'warning' })
        return false
      })
      this.$refs.view.style.display = "inline"
      this.$refs.all.style.display = "none"
    },
    back : function(){
      this.$refs.view.style.display = "none"
      this.$refs.all.style.display = "inline"
    },
    handleDelete (rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.Id == rowInfo.Id) {
          if (confirm("确定删除吗？")) {
            let params = {
              Id: item.Id,
            };
            let url = "http://8.129.86.121:8080/stuff/delete";
            this.$axios
              .post(url, qs.stringify(params))
              .then((successResponse) => {
                this.tableData.splice(index, 1);
                this.$message.success("删除成功");
              })
              .catch(() => {
                this.$message.success("删除失败");
              });
          }
        }
      });
    },
    handleClickChange (rowInfo) {
      this.tableData.forEach((item, index) => {
        if (item.Id == rowInfo.Id) {
          this.editObject = this.tableData[index];
          console.log(this.editObject);
        }
      });
      this.dialogFormVisible = true;
    },
    handleClickConfirm (form) {
      this.$refs[form].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false;
            if (confirm("确定修改吗？")) {
              this.tableData.forEach((item) => {
                if (item.Id == this.editObject.Id) {
                  item = this.editObject;
                  let params = {
                    staff_id: item.Id,
                    staff_name: item.name,
                    staff_sex: item.sex,
                    staff_phone: item.number,
                    staff_job: item.job,
                    staff_point: item.point,
                    staff_score: item.score,
                    staff_wage: item.salary,
                    staff_permission: item.weight,
                    staff_birth: item.birth,
                    staff_nation: item.nation,
                    staff_native: item.native,
                    staff_birthPlace: item.birthPlace,
                    staff_politic: item.politics,
                    staff_email: item.email,
                    staff_job: item.job,
                    staff_status: item.state,
                    staff_photo: item.photo,
                    staff_type:item.type,
                    department: item.department,
                    staff_in_date: item.inDate,
                    staff_out_date: item.outDate,
                    staff_annual_leave: item.holiday
                  };
                  let url = "http://8.129.86.121:8080/staff/update";
                  this.$axios
                    .post(url, qs.stringify(params))
                    .then((successResponse) => {
                      alert("修改成功");
                    })
                    .catch((failResponse) => {
                      alert("修改失败");
                    });
                }
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    handleClickConfirmAdd (form) {
      this.$refs[form].validate((valid) => {
          if (valid) {
            this.dialogFormAddVisable = false;
            if (confirm("确定新增吗？")) {
              this.tableData.push(this.newObject);
              let params = {
                Id: this.newObject.Id,
                name: this.newObject.name,
                sex: this.newObject.sex,
                number: this.newObject.number,
                job: this.newObject.job,
                point: this.newObject.point,
                score: this.newObject.score,
                salary: this.newObject.salary,
                weight: this.newObject.weight,
              };
              let url = "http://8.129.86.121:8080/stuff/add";
              this.$axios
                .post(url, qs.stringify(params))
                .then((successResponse) => {
                  alert("新增成功");
                })
                .catch((failResponse) => {
                  alert("新增失败");
                });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    querySearch (queryString, cb) {
      let items = this.tableData;
      let results = queryString
        ? items.filter(this.createFilter(queryString))
        : items;
      cb(results);
    },
    createFilter (queryString) {
      return (item) => {
        return item.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect (item) {
      this.showObject = item;
      console.log(this.showObject);
      this.dialogFormVisibleShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.body{
  width:100%;
  position:relative;
}
.items-container {
  width: 170px;
}
#all{
  //position:absolute;
  width:100%;
}
#view{
  position:absolute;
  display: none;
  width:100%;
}
.title {
  height: 80px;
  width: 100%;
  background-color: rgb(230, 230, 230);
}
.title span {
  line-height: 80px;
  color: rgb(51, 51, 51);
  margin-left: 30px;
  font-size: 25px;
}
.info {
  display: flex;
}
.info .left-info,
.info .right-info {
  width: 50%;
  position: relative;
}
.info .left-info,
.right-float {
  display: flex;
}
.left-info .key,
.right-info .key,
.value,
.right-info .photo {
  margin-left: 50px;
  margin-top: 40px;
}
.photo {
  width: 300px;
  height: 300px;
}
.photo img {
  width: 300px;
}

.value {
  position: absolute;
  height: 20px;
  left: 150px;
  top: 35px;
}
.right-info .value {
  top: 380px;
}
.key li {
  margin-top: 35px;
  font-size: 20px;
}
.value li {
  margin-bottom: 48px;
  font-size: 20px;
}
.line {
  height: 3px;
  width: 300px;
  background-color: rgb(157, 157, 157);
  margin-top: 10px;
}
.change-info {
  width: 150px;
  height: 50px;
  border: 2px grey solid;
  border-radius: 25px;
  background-color: rgb(245, 245, 245);
  font-size: 20px;
  margin-left: 390px;
  margin-top: 50px;
}
</style>
