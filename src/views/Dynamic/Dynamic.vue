<template>
  <div class="notice">
    <div class="noticeTitle">
      动&nbsp;&nbsp;态
    </div>
    <div class="textBox">
    <div class="message">
      <a href="#">
        {{textArr[0].tag}}：{{textArr[0].title}}
      </a>
    </div>
    <div class="message">
      <a href="#">
        {{textArr[1].tag}}：{{textArr[1].title}}
      </a>
    </div>
    <div class="message">
      <a href="#">
        {{textArr[2].tag}}：{{textArr[2].title}}
      </a>
    </div>
    <div class="message">
      <a href="#">
        {{textArr[3].tag}}：{{textArr[3].title}}
      </a>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      animate: false,
      textArr: [
        { tag: '张三', title: '于2020-11-20:23:00 删除了项目1' },
        { tag: '李四', title: '于2020-11-19:22:00 增加了项目2' },
        { tag: '项目2', title: '于2020-11-19:22:00 完成进度' },
        { tag: '项目2', title: '于2020-11-19:22:00 审核成功' },
        { tag: '项目3', title: '于2020-11-19:22:00 完成进度' },
        { tag: '项目3', title: '于2020-11-19:22:00 审核成功' },
       { tag: '项目4', title: '于2020-11-19:22:00 完成进度' },
        { tag: '项目4', title: '于2020-11-19:22:00 审核成功' },
       { tag: '项目5', title: '于2020-11-19:22:00 完成进度' },
        { tag: '项目5', title: '于2020-11-19:22:00 审核成功' },
      ]
    }
  },
  methods: {
    switchFarm () {
      this.$u.navigate('/switchFarm/')
    },
    scroll () {
      this.animate = true
      setTimeout(() => {
        this.textArr.push(this.textArr[0])
        this.textArr.shift()
        this.animate = false
      }, 500)
    }
  },
  mounted () {
    setInterval(this.scroll, 3000)
  },
  beforeDestroy () {}
}
</script>

<style>
.notice {
  width: 94%;
  height: 35%;
  margin: 20px auto;
  border-radius: 5px;
}
.noticeTitle {
  /* align: "center"; */
  font-size: 25px;
  left:650px;
  top: 150px;
  /* margin: 5px auto; */
  color: rgb(123, 153, 197);
  font-weight: bolder;
  position: absolute;
}
.textBox{
  background-color: rgb(146, 199, 223);
  width: 350px;
  height: 220px;
  align: "center";
  position: absolute;
  left:500px;
  top: 200px;
  border: 4px solid rgb(90, 157, 184);
}

.message {
  width: 90%;
  margin : 5px auto;
  height: 30px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  }
</style>
