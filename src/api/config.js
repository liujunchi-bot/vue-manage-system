import axios from 'axios'

// 创建一个axios实例
const service = axios.create({
  // 请求超时时间
  timeout: 3000
})

<<<<<<< HEAD
=======


>>>>>>> 063914fcb6272dad5051d1c7f468e3b90df92a11
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    console.log(err)
  }
)

service.interceptors.response.use(
  response => {
    let res = {}
    res.status = response.status
    res.data = response.data
    return res
  },
  err => console.log(err)
)

export default service