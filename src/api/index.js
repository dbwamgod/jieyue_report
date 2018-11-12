 // const _baseUrl = "http://bi.jieyuechina.com/api/" //正式环境
// const _baseUrl = 'http://172.18.101.112:10000/'//测试库
const _baseUrl = 'http://172.18.101.118:10000/'//开发库
//const _baseUrl = 'http://172.18.101.111:10000/'//内部正式环境


export default {
    //登录
    login(){
      return _baseUrl +'mc-auth/auth/login'
    },
    /****简报***/
    pdng(){//判断用户是全国还是大区 -- 侧边栏接口  
      // return _baseUrl +'admin/menu/subject/list'
      // return _baseUrl +'saasbi/manager/menu/subject/list'
      return _baseUrl +'saasbi/report/menu/subject/list'
    },
    // 日历接口
    // 添加接口  /notepad/list
    notepadadd(){
      return _baseUrl +'saasbi/report/notepad/add'
    },
    //查询接口
    notepadlist(){
      return _baseUrl +'saasbi/report/notepad/list'
    },
    // 收藏接口
    // 查询接口
    userCollectlist(){
      return _baseUrl +'saasbi/report/userCollect/list'
    },
    // 添加接口
    userCollectadd(){
      return _baseUrl +'saasbi/report/userCollect/add'
    },
    // 删除接口
    userCollectremove(){
      return _baseUrl +'saasbi/report/userCollect/remove'
    },
 
}
