import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    if (username === 'admin' || username === 'wp') {
      // 判断账号和密码是否对应
      if (username === 'admin' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/dynamic',
                name: 'dynamic',
                label: '项目动态',
                icon: 's-home',
                url: 'Dynamic/Dynamic'
              },
              {
                path: '/',
                name: 'home',
                label: '项目统计',
                icon: 's-home',
                url: 'Home/Home'
              },
              {
                path: '/video',
                name: 'video',
                label: '合同管理',
                icon: 'video-play',
                url: 'VideoManage/VideoManage'
              },
              {
                path: '/user',
                name: 'user',
                label: '项目列表',
                icon: 'user',
                url: 'UserManage/UserManage'
              },
              {
                label: '文档管理',
                icon: 'location',
                children: [
                  {
                    path: "/design",
                    name: "设计文档",
                    label: '设计文档',
                    icon: 'setting',
                    url: 'Other/PageOne'
                  },
                  {
                    path: "/audit",
                    name: "审计文档",
                    label: '审计文档',
                    icon: 'setting',
                    url: 'Other/PageTwo'
                  },
                  {
                    path: "/xz",
                    name: "行政文档",
                    label: '行政文档',
                    icon: 'setting',
                    url: 'Other/PageThree'
                  },
                  {
                    path: "/dangan",
                    name: "档案文档",
                    label: '档案文档',
                    icon: 'setting',
                    url: 'Other/PageFour'
                  }

                ]
              },
              {
                label: '前台管理',
                icon: 'user',
                children: [
                  {
                    path: "/bussiness-scope",
                    name: "业务范围维护",
                    label: '业务范围维护',
                    icon: 'setting',
                    url: 'Front/BussinessScope'
                  },
                  {
                    path: "/case",
                    name: "经典案例维护",
                    label: '经典案例维护',
                    icon: 'setting',
                    url: 'Front/Case'
                  },
                  {
                    path: "/case-processing",
                    name: "处理案例维护",
                    label: '处理案例维护',
                    icon: 'setting',
                    url: 'Front/CaseProcessing'
                  },
                  {
                    path: "/people",
                    name: "会计师维护",
                    label: '会计师维护',
                    icon: 'setting',
                    url: 'Front/People'
                  },
                  {
                    path: "/information",
                    name: "联系信息维护",
                    label: '联系信息维护',
                    icon: 'setting',
                    url: 'Front/Information'
                  },
                  {
                    path: "/knowledge",
                    name: "问答系统维护",
                    label: '问答系统维护',
                    icon: 'setting',
                    url: 'Front/Knowledge'
                  }
                ]
              }
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else if (username === 'wp' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              },
              {
                path: '/video',
                name: 'video',
                label: '视频管理页',
                icon: 'video-play',
                url: 'VideoManage/VideoManage'
              }
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else {
        return {
          code: -999,
          data: {
            message: '密码错误'
          }
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '用户不存在'
        }
      }
    }
  }
}
