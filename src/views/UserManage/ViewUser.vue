<template>
  <div>
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
          <img :src="photo" alt="" />
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
    <button class="change-info" @click="ToModify">修改信息</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
    }
  },
  created: function () {
    this.staff_id = this.$route.params.staff_id;
    this.$axios.post(
      "http://8.129.86.121:8080/staff/info",
      this.staff_id
    )
      .then(res => {
        this.photo = res.data.staff_photo,
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
  },
  methods: {

    ToModify: function () {
      console.log(this.gender)
      this.$router.push({
        path: "/Modification",
        name: "Modification",
        params: {
          photo: this.photo,
          department: this.department,
          name: this.name,
          gender: this.gender,
          num: this.num,
          account: this.account,
          password: this.password,
          birth: this.birth,
          nation: this.nation,
          nativePlace: this.nativePlace,
          birthPlace: this.birthPlace,
          politicsStatus: this.politicsStatus,
          phone: this.phone,
          email: this.email,
          position: this.position,
          state: this.state,
          type: this.type,
          dateOnBroad: this.dateOnBroad,
          dateOfDeparture: this.dateOfDeparture,
          //performance:this.performance,
          //checkIn:this.checkIn,
          salary: this.salary,
          holiday: this.holiday,
          authority: this.authority
        }
      })
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
