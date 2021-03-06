//const _baseUrl = "http://bi.jieyuechina.com/api/" //正式环境
// const _baseUrl = 'http://10.50.180.111:10000/' //测试库
//const _baseUrl = 'http://172.18.101.118:10000/' //开发库
let _baseUrl = urlType();
// process.env.NODE_ENV === 'development' ?
//  _baseUrl = 'http://172.18.101.118:10000/':
//  process.env.NODE_ENV === 'test' ?
//   _baseUrl = 'http://10.50.180.111:10000/':
//   process.env.NODE_ENV === 'production' ?
//    _baseUrl = 'http://bi.jieyuechina.com/api/':'';
   function urlType() {
     switch (process.env.NODE_ENV){
       case 'development':
       return 'http://172.18.101.118:10000/'
       break;
       case 'test':
         return 'http://10.50.180.111:10000/'
       break;
       case 'production':
         return 'http://bi.jieyuechina.com/api/'
       break;
     }
   }


export default {
  //登录
  login() {
    return _baseUrl + 'mc-auth/auth/login'
  },
  /****简报***/
  pdng() { //判断用户是全国还是大区 -- 侧边栏接口  
    // return _baseUrl +'admin/menu/subject/list'
    // return _baseUrl +'saasbi/manager/menu/subject/list'
    return _baseUrl + 'saasbi/report/subject/list'
  },
  // 日历接口
  // 添加接口  传参：content: this.textarea（内容）, eventData: this.firstday1（日期 yyyy-mm-dd）, masterNo: "01",title: this.inputTitle(标题)
  notepadAdd() {
    return _baseUrl + 'saasbi/report/notepad/add'
  },
  //查询接口  传参：  form: {eventData: this.dataheaders(日期 yyyy-mm),formatter: "yyyy-MM-dd HH:mm:ss"}
  notepadList() {
    return _baseUrl + 'saasbi/report/notepad/list'
  },
  // 收藏接口
  // 查询接口  传参：form: {}
  userCollectList() {
    return _baseUrl + 'saasbi/report/userCollect/list'
  },
  // 添加接口 传参:"reportCode":"RPT_LN_LEND_DTL_RPT","masterNo":"01"'
  userCollectAdd() {
    return _baseUrl + 'saasbi/report/userCollect/add'
  },
  // 删除接口 传参： "reportCode":"RPT_LN_LEND_DTL_RPT"
  userCollectRemove() {
    return _baseUrl + 'saasbi/report/userCollect/remove'
  },
  //报表明细 （过滤条件 展示字段）获取
  reportRptFrame() {
    return _baseUrl + 'saasbi/report/rpt/frame'
  },
  //报表基本信息获取
  reportRptInfo() {
    return _baseUrl + 'saasbi/report/rpt/info'
  },
  //筛选条件获取
  reportRptFilterList() {
    return _baseUrl + 'saasbi/report/rpt/filter/list'
  },
  //筛选条件保存
  reportRptFilterAdd() {
    return _baseUrl + 'saasbi/report/rpt/filter/add'
  },
  //展示字段模糊搜索
  reportRptFieldSearch() {
    return _baseUrl + 'saasbi/report/rpt/field/search'
  },
  //展示字段保存
  reportFieldAdd() {
    return _baseUrl + 'saasbi/report/rpt/field/add'
  },
  //数据查询
  reportRptData() {
    return _baseUrl + 'saasbi/report/rpt/data'
  },
  //下载文件
  reportRptDataExport(data) {
    return _baseUrl + `saasbi/report/rpt/data/export?${data}`
  },
  //埋点 
  logCollection() {
    return _baseUrl + `/saasbi/event/log/collection`
  },


}
