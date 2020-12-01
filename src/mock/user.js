import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      // id: Mock.Random.guid(),
      // number: Mock.Random.natural(1,100000),
      // name: Mock.Random.cname(),
      //   "category|1": [
      //     "税审",
      //     "年审"
      //   ],
      // client: Mock.Random.cname(),
      // contract: Mock.Random.cword(10),
      //   "state|1": [
      //   "已完成",
      //   "进行中"
      // ],
      // finish_time: Mock.Random.date()
      "type|1": [
        "财务审计",
        "工程审计",
        "税务审计"
      ],
      project_name: Mock.Random.cname(),
      id: Mock.Random.guid(),
      cname: Mock.Random.cname(),
      name: Mock.Random.cname(),
      addr: Mock.mock("@county(true)"),
      "age|18-60": 1,
      birth: Mock.Random.date(),
      upbirth: Mock.Random.datetime(),
      rebirth: Mock.Random.datetime(),
      sex: Mock.Random.integer(0, 1),
      version: Mock.Random.integer(),
      blproject: Mock.Random.name(),
      "state|1": [
        "已完成",
        "进行中",
        "审核中"
      ],
      // name: Mock.Random.cname(),
      "category|1": [
        "税审",
        "年审"
      ],
      "client|1": [
        "WXN2",
        "北京三联永信科技有限公司",
        "asdf",
        "湖南大学软件学院",
        "谷歌",
        "腾讯",
        "阿里"
      ],
      "contract|1": [
        "湖北光明会计所签章系统",
        "中南大学专项经费审计业务约定书",
        "工程造价",
        "WXN2",
        "dsafadf",
        "asdf",
        "Micro Lee",
        "测试123"
      ],
      "department|1": [
        "销售部",
        "运营部",
        "研发部",
        "策划部"
      ],
      reportNo: Mock.Random.natural(1, 100000),
      project_type: Mock.Random.cword(10),
      partner: Mock.Random.cname(),
      number: Mock.Random.natural(1, 10000),
      quality_control: Mock.Random.cname(),
      leader: Mock.Random.cname(),
      group_members: Mock.Random.cname(),
      accountant: Mock.Random.cname(),
      cost_engineer: Mock.Random.cname(),
      tax_accountant: Mock.Random.cname(),
      suggestion: Mock.Random.cword(10),
      start_time: Mock.Random.date(),
      finish_time: Mock.Random.date(),
      organization: Mock.Random.cname(),
      total_assets: Mock.Random.natural(10000, 1000000),
      check_money: Mock.Random.natural(10000, 1000000),
      reduction_money: Mock.Random.natural(10000, 1000000),
      proname: Mock.Random.string(5),
      dname: Mock.Random.cname(),
      fileversion: Mock.Random.float(0, 0, 1, 1)
    })
  )
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: config => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)
    console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    // console("oageList")
    console.log(pageList)
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  /**
   * 增加用户
   * @param number, name, category, client, contract, state, finish_time
   * @return {{code: number, data: {message: string}}}
   */
  createUser: config => {
    const { number, name, category, client, contract, state, finish_time } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      number: number,
      name: name,
      category: category,
      client: client,
      contract: contract,
      state: state,
      finish_time: finish_time
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    const { id } = param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 20000,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改用户
   * @param id, name, category, client, contract, state, finish_time
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: config => {
    const { id, number, name, category, client, contract, state, finish_time } = JSON.parse(config.body)
    List.some(u => {
      if (u.id === id) {
        alert("修改成功！")
        u.number = number
        u.name = name
        u.category = category
        u.client = client
        u.contract = contract
        u.state = state
        u.finish_time = finish_time
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  }
}
