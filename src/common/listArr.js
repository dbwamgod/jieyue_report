class listArrs{
    // static jbList = [
	  //   		{
	  //     			index:"1",
	  //     			title:'简报',
	  //     			icon:'el-icon-view',
	  //     			list:[
	  //     				{
	  //     				 	index:"1-1",
	  //     				 	textc:'全国简报',
	  //     				 	routes:'/saas/briefing/nationwide'
	  //     				},
	  //     				{
	  //     					index:"21-",
	  //     					textc:'大区简报',
	  //     					routes:'/saas/briefing/regionEcharts'
	  //     				}
	  //     			]
	  //     		}
	  //   	]
   	static msgList = [
            {
              id:"1",
              title:'组织架构',
              icon:'el-icon-news',
              child:[{
                id:"11",
                title:'捷越普惠',
                child:[
                    {
                      id:"111",
                      title:'全国简报',
                      routes:'/saas/message/nationwide'
                    },
                    {
                      id:"121",
                      title:'大区简报',
                      routes:'/saas/message/regionEcharts'
                    }
                  ],
                }]
            },
      {
        id:"2",
        title:'管理驾驶舱',
        icon:'el-icon-news',
        child:[
          {
            id:"21",
            title:'全国简报',
            routes:'/saas/message/nationwide',
          },
          {
            id:"22",
            title:'大区简报',
            routes:'/saas/message/regionEcharts',
          }
        ]
      },
      {
        id:"3",
        title:'系统架构',
        icon:'el-icon-news',
        child:[
          {
            id:"31",
            title:'应用市场统计报表',
            routes:'/saas/message/marketReport',
          },
          {
            id:"32",
            title:'应用市场用户数据',
            routes:'/saas/message/marketReport',
          },
          {
            id:"33",
            title:'推广渠道统计报表',
            routes:'/saas/message/channelReport',
          },
          {
            id:"34",
            title:'推广渠道用户数据',
            routes:'/saas/message/channelData',
          },
        ]
      },
      ]
  }
export default{
    listArrs
};
