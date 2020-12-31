<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Nick</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2019-10-20</span></p>
          <p>上次登录地点：<span>北京</span></p>
        </div>
      </el-card>
    </el-col>
    
    <el-col :span="16">
      <img :src="logoImg"/>
    </el-col>
  </el-row>
</template>

<script>
import Echart from '../../components/EChart'
export default {
  components: {
    Echart
  },
  data() {
    return {
      userImg: require('../../assets/images/user.png'),
      logoImg: require('../../assets/images/logoRaw.png'),
    }
  },
  methods: {
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/home';
</style>
