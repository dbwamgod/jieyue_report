 // const _baseUrl = "http://bi.jieyuechina.com/api/" //正式环境
// const _baseUrl = 'http://172.18.101.112:10000/'//测试库
const _baseUrl = 'http://172.18.101.118:10000/'//开发库
//const _baseUrl = 'http://172.18.101.111:10000/'//内部正式环境


export default {
    login(){//登录
      return _baseUrl +'mc-auth/auth/login'
    },
    /****简报***/
    getnationwide(){//获取全国简报数据
   		// return _baseUrl +'admin/briefing/list'
      // return _baseUrl +'saasbi/manager/briefing/list'
      return _baseUrl +'saasbi/report/briefing/list'
    },
    pdng(){//判断用户是全国还是大区 -- 侧边栏接口
      // return _baseUrl +'admin/menu/subject/list'
      // return _baseUrl +'saasbi/manager/menu/subject/list'
      return _baseUrl +'saasbi/report/menu/subject/list'
    },
    xialak(){//获取大区数目
      // return _baseUrl +'admin/org/child'
      // return _baseUrl +'saasbi/manager/org/child'
      return _baseUrl +'saasbi/report/org/child'
    }
}
