import { resolve } from 'core-js/fn/promise'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login', resolve)
    },
    {
      path: '/view',
      name: 'view',
      component:()=>import("@/views/UserManage/ViewUser", resolve)
    },

    {
      path:"/Modification",
      name:"Modification",
      component:()=>import("@/views/UserManage/Modification", resolve)
    },

    {
      path:"/AllUser",
      name:"AllUser",
      component:()=>import("@/views/UserManage/AllUser", resolve)
    }
  ]
})
