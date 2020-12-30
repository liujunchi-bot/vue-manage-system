import axios from 'axios';
import store from '../store';


axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials=true
axios.defaults.params = {}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(store.state.user.token){
    config.headers.common['token']=store.state.user.token
    config.headers.token = store.state.user.token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response.data);
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

//封装获取数据
export const oGet = (url) => {
  return new Promise((resolve, reject) => {
    console.log(url)
    axios.get(url, { emulateJSON: true })
      .then(res => {
        resolve(res.data)
        console.log(res.data)
      }, err => {
        console.log(err)
        reject(err)
      }).catch(err => {
        reject(err)
      })
  })
};
//封装发送数据
export const oPost = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        console.log("1111111" + params)
        resolve(res.data)
      }, err => {
        console.log("1111111" + err)
        reject(err)
      }).catch(err => {
        reject(err)
      })
  })
}
//封装修改数据
export const oUpdate = (url, param, params) => {
  return new Promise((resolve, reject) => {
    axios.patch(url, param, params)
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      }).catch(err => {
        reject(err)
      })
  })
}
//封装删除数据
export const oRemove = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, params)
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      }).catch(err => {
        reject(err)
      })
  })
}

export default {
  _get (url) {
    return oGet(url);
  },
  _remove (url, user) {
    // var project_id = user.project_id;
    //alert("remove+   "+project_id)
    return oRemove(url, user);

  },

  _removeUsers (url, param) {
    return oRemove(url + "?project_id" + param);
  },

  _post (url, params) {
    return oPost(url, params);
  },

  _update (url, param, params) {
    return oUpdate(url + param, params);
  },


}