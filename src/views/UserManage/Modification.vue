<template>
  <div>
    <div class="title">
      <span>修改用户信息</span>
    </div>

    <div class="info">
      <div class="left-info">
        <ul class="key">
          <li>
            <p class="tag">*</p>
            员工姓名
          </li>
          <div class="line"></div>
          <li>
            <p class="tag">*</p>
            性别
          </li>
          <div class="line"></div>
          <li>员工编号</li>
          <div class="line"></div>
          <li>员工账号</li>
          <div class="line"></div>
          <li>员工密码</li>
          <div class="line"></div>
          <li>
            <p class="tag">*</p>
            出生日期
          </li>
          <div class="line"></div>
          <li>民族</li>
          <div class="line"></div>
          <li>籍贯</li>
          <div class="line"></div>
          <li>出生地</li>
          <div class="line"></div>
          <li>政治面貌</li>
          <div class="line"></div>
          <li>
            <p class="tag">*</p>
            手机
          </li>
          <div class="line"></div>
          <li>邮箱</li>
          <div class="line"></div>
          <li>
            <p class="tag">*</p>
            岗位
          </li>
          <div class="line"></div>
          <li>
            <p class="tag">*</p>
            员工状态
          </li>
          <div class="line"></div>
        </ul>
        <form action="" class="value">
          <input
            type="text"
            name="name"
            v-model="displayObj.staff_name"
          /><br />
          <input
            type="text"
            name="gender"
            v-model="displayObj.staff_sex"
          /><br />
          <input type="text" name="num" v-model="displayObj.staff_id" /><br />
          <input
            type="text"
            name="account"
            v-model="displayObj.staff_account"
          /><br />
          <input
            type="text"
            name="password"
            v-model="displayObj.staff_password"
          /><br />
          <input
            type="text"
            name="birth"
            v-model="displayObj.staff_birthday"
          /><br />
          <input
            type="text"
            name="nation"
            v-model="displayObj.staff_nation"
          /><br />
          <input
            type="text"
            name="nativePlace"
            v-model="displayObj.staff_native_place"
          /><br />
          <input
            type="text"
            name="birthPlace"
            v-model="displayObj.staff_birth_place"
          /><br />
          <input
            type="text"
            name="politicsStatus"
            v-model="displayObj.staff_politic"
          /><br />
          <input
            type="text"
            name="phone"
            v-model="displayObj.staff_phone"
          /><br />
          <input
            type="text"
            name="email"
            v-model="displayObj.staff_email"
          /><br />
          <input
            type="text"
            name="position"
            v-model="displayObj.staff_job"
          /><br />
          <input
            type="text"
            name="state"
            v-model="displayObj.staff_status"
          /><br />
        </form>
      </div>
      <div class="right-info">
        <div class="photo">
          <img :src="displayObj.staff_photo" alt="" />
          <input
            type="text"
            name="photo"
            v-model="displayObj.staff_photo"
          /><br />
        </div>
        <div class="right-float">
          <ul class="key">
            <li>
              <p class="tag">*</p>
              员工类型
            </li>
            <div class="line"></div>
            <li>
              <p class="tag">*</p>
              部门
            </li>
            <div class="line"></div>
            <li>
              <p class="tag">*</p>
              入职日期
            </li>
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
          <form action="" class="value">
            <input
              type="text"
              name="type"
              v-model="displayObj.staff_type"
            /><br />
            <input
              type="text"
              name="department"
              v-model="displayObj.staff_department"
            /><br />
            <input
              type="text"
              name="dateOnBroad"
              v-model="displayObj.staff_in_date"
            /><br />
            <input
              type="text"
              name="dateOfDeparture"
              v-model="displayObj.staff_out_date"
            /><br />
            <!--<input type="text" name="performance" v-model="displayObj.performance"><br>
          <input type="text" name="checkIn" v-model="displayObj.checkIn"><br>-->
            <input
              type="text"
              name="salary"
              v-model="displayObj.staff_wage"
            /><br />
            <input
              type="text"
              name="holiday"
              v-model="displayObj.staff_annual_leave"
            /><br />
            <input
              type="text"
              name="authority"
              v-model="displayObj.staff_permission"
            />
          </form>
        </div>
      </div>
    </div>
    <div class="button">
      <button class="" @click="cancel">取消</button>
      <button class="" @click="save">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      displayObj: {},
      staff_id: ""
    }
  },
  created: function () {
    this.staff_id = this.$route.params.staff_id;
    this.displayObj.staff_photo = this.$route.params.photo;
    this.displayObj.staff_department = this.$route.params.department;
    this.displayObj.staff_name = this.$route.params.name;
    this.displayObj.staff_sex = this.$route.params.gender;
    this.displayObj.staff_id = this.staff_id;
    this.displayObj.staff_account = this.$route.params.account;
    this.displayObj.staff_password = this.$route.params.password;
    this.displayObj.staff_birthday = this.$route.params.birth;
    this.displayObj.staff_nation = this.$route.params.nation;
    this.displayObj.staff_native_place = this.$route.params.nativePlace;
    this.displayObj.staff_birth_place = this.$route.params.birthPlace;
    this.displayObj.staff_politic = this.$route.params.politicsStatus;
    this.displayObj.staff_phone = this.$route.params.phone;
    this.displayObj.staff_email = this.$route.params.email;
    this.displayObj.staff_job = this.$route.params.position;
    this.displayObj.staff_status = this.$route.params.state;
    this.displayObj.staff_type = this.$route.params.type;
    this.displayObj.staff_in_date = this.$route.params.dateOnBroad;
    this.displayObj.staff_out_date = this.$route.params.dateOfDeparture;
    //this.displayObj.performance = this.$route.params.performance;
    //this.displayObj.checkIn = this.$route.params.checkIn;
    this.displayObj.staff_wage = this.$route.params.salary;
    this.displayObj.staff_annual_leave = this.$route.params.holiday;
    this.displayObj.staff_permission = this.$route.params.authority;
  },
  methods: {
    cancel: function () {
      this.$router.go(-1)
    },

    save: function () {
      if (confirm("确定修改吗？")) {
        console.log("准备修改");
        let params = {
          staff_photo: this.displayObj.staff_photo,
          staff_name: this.displayObj.staff_name,
          staff_sex: this.displayObj.staff_sex,
          staff_id: this.displayObj.staff_id,
          staff_account: this.displayObj.staff_account,
          staff_password: this.displayObj.staff_password,
          staff_birthday: this.displayObj.staff_birthday,
          staff_nation: this.displayObj.staff_nation,
          staff_native_place: this.displayObj.staff_native_place,
          staff_birth_place: this.displayObj.staff_birth_place,
          staff_politic: this.displayObj.staff_politic,
          staff_phone: this.displayObj.staff_phone,
          staff_email: this.displayObj.staff_email,
          staff_job: this.displayObj.staff_job,
          staff_status: this.displayObj.staff_status,
          staff_type: this.displayObj.staff_type,
          staff_in_date: this.displayObj.staff_in_date,
          staff_out_date: this.displayObj.staff_out_date,
          //this.displayObj.performance = this.$route.params.performance;
          //this.displayObj.checkIn = this.$route.params.checkIn;
          staff_wage: this.displayObj.staff_wage,
          staff_annual_leave: this.displayObj.staff_annual_leave,
          staff_permission: this.displayObj.staff_permission
        };
        /*this.$router.push({
            path:"/AllUser",
            name:"AllUser"
          })*/
        //const Qs=require('qs')
        console.log("开始发送请求");
        this.$axios.post(
          "/staff/update",
          qs.stringify(params)
        )
          .then(successResponse => {
            alert('修改成功')
            this.$router.push({
              path: "/AllUser",
              name: "AllUser"
            })
          })
          .catch(failResponse => {
            alert('修改失败')
          })

      }

    }
  },
}
</script>

<style lang="scss" scoped>
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
  left: 150px;
  top: 35px;
}
.value input {
  margin-bottom: 43px;
  font-size: 20px;
  width: 150px;
  border: 0;
  background-color: rgb(245, 245, 245);
}
.right-float .value {
  top: 377px;
}
.key li {
  margin-top: 35px;
  font-size: 20px;
}
.line {
  height: 3px;
  width: 300px;
  background-color: rgb(157, 157, 157);
  margin-top: 10px;
}

p {
  display: inline;
  color: red;
}
button {
  width: 150px;
  height: 50px;
  border: 2px grey solid;
  border-radius: 25px;
  background-color: rgb(245, 245, 245);
  font-size: 20px;
  margin-right: 50px;
}
.button {
  margin-left: 290px;
  margin-top: 50px;
}
</style>
