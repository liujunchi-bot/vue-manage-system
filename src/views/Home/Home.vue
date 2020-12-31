<template>
  <el-row class="home" :gutter="20">
    <el-col :span="24" style="margin: 0 auto;text-align:center">
      <img :src="homepageImg" style="width:70%"/>
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
      homepageImg: require('../../assets/images/homepage.png'),
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
