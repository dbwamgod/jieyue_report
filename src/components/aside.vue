<template>
  <div id="asideList" style="width:100%;height:100%;user-select:none;">
    <el-row style="width:100%;display: -webkit-box;display: flex;margin-top:50px;">

        <!--侧边栏-->
        <el-col :span="2" style="height:100%;position: fixed;z-index: 100;-box-flex:-webkit 1;flex:1;" :style="defaultActives == 1?'margin-top:0px':'margin-top:180px' ">
              <!--搜索框和收藏-->
          <div  style="height: 100%;"  v-show="val" >
              <el-menu  :router="true" :default-active="defaultActive+''" :unique-opened="true" style="height:100%;" :style="{width:ths+'px'}" class="zyside" >
                  <!--第一层-->
                  <el-submenu v-for="(item,index) in this.ArrayData" :index="item.id +''" :unique-opened="true" :key="index"> 
                    <template slot="title"><i :class=[item.icon]></i>{{item.name}}</template>
                    <!--第二层-->
                    <el-submenu   v-for="(itema,index) in item.children" :index="itema.id +''" v-if="itema.children != undefined" :key="index"> 
                      <!--第三层-->
                      <template slot="title" v-show = 'itema.name'>{{itema.name}}</template>
                      <el-menu-item-group  v-for="(itemb,index) in itema.children" :index="itemb.id +''"  :key="index">
                        <el-menu-item  :index="itemb.id+''" @click="gotoPath(itemb.url,itemb.id) ;addTab(editableTabsValue2,itemb.url,itemb.name,itemb.id)">{{itemb.name}}</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                    <!--第二层-->
                    <el-menu-item  v-if="itema.children == undefined " :index="itema.id+''" @click="gotoPath(itema.url,itema.id) ;addTab(editableTabsValue2,itema.url,itema.name,itema.id)" v-for="(itema,index) in item.children"  :key="index">{{itema.name}}</el-menu-item>
                  </el-submenu>
                </el-menu >
          </div>

        </el-col>

        <!--页面的内容-->
      <el-col :span="22" style="-webkit-box-flex: 1;width:87%;height:100%;flex:1;position: relative;background: #f1f2f6" :style="{ marginLeft:this.val?ths+'px':'0px'}" :class="{ ml:vl }">

        <div style="width: 2px;height: 100%;background:rgba(0,0,0,.1);position: absolute;" id="DetectionHeight"></div>

        <div style="cursor: pointer;z-index:999" @click="hideV" :class="{hv:hl,hh:!hl}" :style="{left:ths-15+'px'}" v-if="val">
          <img :src="shouqizuocedaohang" alt="">
        </div>

        <div style="z-index: 999;cursor: pointer" @click="hideV" :class="{hv:hl,hh:!hl}" :style="{ left:this.val?ths+'px':'0px'}" v-else>
          <img :src="shouqiyoucedaohang" alt="">
        </div>
        <!--整体导航-->
        <div style="margin: 16px;">
            <!--图标-->
            <el-dropdown trigger="hover" style="float: left;width: 52px;height: 32px;line-height: 35px;text-align: center;">
              <span class="el-dropdown-link" style="padding:3px 16px;height: 26px;display: inline-block;background: #3C404C;border-radius: 4px 4px 0 0;" @click="buttonMainD">
                 <!--<i class="iconfont icon-yong-zhuye" style="font-size: 24px;width: 80px; height: 39px;display: inline-block;" @click="buttonMainD"></i>-->
                <img :src="fanhuishouye" alt="" style="width: 20px;height: 20px">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >
                  <span @click="handleFullScreen">
                     <span v-text="fullscreen ? `取消全屏`:`全屏`"></span>
                  </span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="buttonMainA">
                     关闭当前
                  </span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="buttonMainB">关闭全部</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          <!--触发器-->
            <el-tabs id="editableTabs" v-model="editableTabsValue2" type="card" @tab-click="tabsn"  closable @tab-remove="removeTab" style="z-index: 999;margin-left: 52px;height: 32px;background: #ffffff;">

               <el-tab-pane   v-for="option in $store.state.editableTabs2" :label="option.title" :name="option.content" :key="option.name" ></el-tab-pane>

                  <!-- <div  v-show="pageShow" style="text-align:center;height:auto;width:80px;background-color: red;position: fixed;z-index: 999;" :style="{top:this.pageShowtop+'px',left:this.pageShowleft+'px'}">

                      <div style="padding: 10px;cursor: pointer" @click="buttonMainC">关闭当前</div>
                      <div style="border: 1px solid black;"></div>
                      <div style="padding: 10px;cursor: pointer" @click="buttonMainB">关闭全部</div>
                      <div style="border: 1px solid black;"></div>
                      <div style="padding: 10px;cursor: pointer" @click="buttonMainF">关闭其他</div>
                  </div> -->

            </el-tabs>
        </div>
        <router-view style="margin: 16px;"></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {mapState,mapActions,mapGetters} from 'vuex'
  import api from '../api'
  export default {
    data() {
      return {
        pageShowUrl:'',
        pageShowtop:0,
        pageShowleft:0,
        pageShow:false,
        fullscreen:false,
        defaultActive:'',
        defaultActives:1,
        hackReset:true,
        abc: null,
        ArrayData: null,
        vl:true,
        hl:true,
        timeout:  null,
        stateList:"",
        serchDatalist:[],
        editableTabsValue2: '1',
        editableTabs2: [],
        tabIndex: 1,
        tabName:[],
        indexCode:0,
        cid:"",
        aUrl:"",
        tags:"",
        ths:'198',
        fanhuishouye:require('../assets/images/icon-fanhuishouye.png'),//小房子 icon-shouqizuocedaohang
        shouqizuocedaohang:require('../assets/images/icon-shouqizuocedaohang.png'),// icon-sousuo.png
      }
    },
    props: {
      listArr: Array,
      statrA:String,
      required: true
    },
    computed:{
      ...mapState(['state_router']),
      ...mapGetters(['val']),
    },
    watch:{
      state_router(){
        this.defaultActive = this.state_router;
      },
      CollectionNameLis:function () {
        this.CollectionNameLislength = this.CollectionNameLis.length;
      }
    },
    created(){
      this.aside();
    },
    beforeUpdate(){
      this.defaultActive = this.state_router;
    },
    mounted(){
      this.editableTabsValue3("editableTabs")
      this.editableTabsValue4("asideList");
    },
    methods: {
      ...mapActions(['stateRouter','saveData']),
     tabsn(tab, event){
          this.$router.push({path:tab.name})
      },
      aside(event){
        this.$http.get(api.pdng(),
        ).then((res) => {
          // this.ArrayData = res.data.data;
          this.ArrayData=[
            {name:'今天1',id:1,url:'demo',children:[{name:'今天1',id:4,url:'demo'}]},
            {name:'今天2',id:2,url:'demo1',children:[{name:'今天2-1',id:5,url:'demo1'}]},
            {name:'今天3',id:3,url:'demo2'}
          ]
          let serchData = res.data.data;
          serchData.forEach((seriesA)=>{
            if( seriesA.children){
              seriesA.children.forEach((seriesB)=>{
                if(seriesB.children){
                  seriesB.children.forEach((seriesC)=>{
                    this.serchDatalist.push({
                      value:seriesC.name,
                      url:seriesC.url,
                      index:seriesC.id
                    })
                  })
                }
              })
            }
            // 刷新之后跳转主页
            // this.$router.push(name="mainApp")
          })
          this.restaurants = this.loadAll();
        }).catch(() => {
        });
      }, //调接口渲染侧边栏接口--跳转主页--存储侧边栏name
      gotoPath(address,id){
        this.$router.push({path:address});
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
      }, //点击跳转--添加在导航栏
      hideV(){
        if(this.vl){
          this.saveData (false) ;
          this.defaultActives = 0
        }else{
          this.saveData (true) ;
          this.defaultActives = 1
        }
        this.vl = !this.vl
        this.hl = !this.hl
        this.$store.commit('SAVE_EDITABLETABS2',[2])
      },//点击 隐藏和打开侧边栏
      addTab(targetName,a,b,c) {
        // a 路径 b 名字  c id
        let str = a; ///saas/message/nationwide
        var index = str .lastIndexOf("\/");
        let d  = str .substring(index + 1, str .length);
        console.log(d)
        if(d){
          if(this.tabName.indexOf(c) == -1){
            let newTabName = ++this.tabIndex + '';
            this.editableTabs2.push({
              title:b,
              name:c,
              content:d
            });
            this.tabName.push(c);
            this.editableTabsValue2 = newTabName;
          
            this.$store.commit('SAVE_EDITABLETABS2',this.editableTabs2);
            console.log(this.$store.state.editableTabs2);
          }
        }

      },//点击侧边栏 添加在导航栏上
      removeTab(targetName) {
        // console.log(this.$store.state.editableTabs2);
        let tabs = this.$store.state.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue2 = activeName;
        console.log('start');
        if(this.$store.state.editableTabs2.length == 1){
          this.editableTabs2 = tabs.filter(tab => tab.content !== targetName);
          this.tabName = [];
           console.log('start1');
           this.$store.commit('SAVE_EDITABLETABS2',this.editableTabs2);
          return this.$router.push(name="mainApp");
        }else{
           console.log('start2');
          this.editableTabs2 = tabs.filter(tab => tab.content !== targetName);
          //遍历editableTabs2 找到id 添加进去
          this.$store.commit('SAVE_EDITABLETABS2',this.editableTabs2);
          this.tabName = this.editableTabs2.map(r=>r.name);
          let pathInfo =  this.editableTabs2[this.editableTabs2.length-1].content
          this.$router.push({path:pathInfo})
        }
      }, //删除导航栏
      handleFullScreen(){
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      },//图标--全屏显示
      buttonMainA(event){
        let str = event.target.baseURI; ///saas/message/nationwide
        var index = str .lastIndexOf("\/");
        let targetName  = str .substring(index + 1, str .length);
        console.log(this.editableTabs2);
        if(this.editableTabs2.length == 0){
          this.tabName = []
          return this.$router.push(name="mainApp")
        }else if(this.editableTabs2.length == 1){
          this.tabName = []
          this.editableTabs2 = this.editableTabs2.filter(tab => tab.content !== targetName);
          return this.$router.push(name="mainApp")
        }else{
          this.editableTabs2 = this.editableTabs2.filter(tab => tab.content !== targetName);
          //遍历editableTabs2 找到id 添加进去
          this.tabName = this.editableTabs2.map(r=>r.name)
          // 跳转页面
          let pathInfo =  this.editableTabs2[this.editableTabs2.length - 1].content
          this.$router.push({path:pathInfo})
        }
      },//图标--关闭当前
      buttonMainB(event){
        let targetName = event.target.baseURI.split('#')[1];
        let tabs = this.editableTabs2;
        // this.editableTabs2 = tabs[0];
        // let pathInfo =  this.editableTabs2.content;
        // this.$router.push({path:pathInfo})
        // 把tabName清空 下次在填入nameid
        this.$router.push(name="mainApp")
        this.tabName = [];
        this.editableTabs2 =[]
      },//图标--关闭全部
      buttonMainF(event){
        let str = event.target.baseURI; ///saas/message/nationwide
        var index = str.lastIndexOf("\/");
        let targetName  = str.substring(index + 1, str.length); // nationwide
         if(this.editableTabs2.length == 1){
            return ;
         }else{
           this.editableTabs2 = this.editableTabs2.filter(tab => tab.content == targetName);
          // //遍历editableTabs2 找到id 添加进去
          this.tabName = this.editableTabs2.map(r=>r.name)
          // // 跳转页面
          let pathInfo =  this.editableTabs2[this.editableTabs2.length - 1].content;
          this.$router.push({path:pathInfo})
        }
      },// 关闭其他
      buttonMainC(){
        let str = this.pageShowUrl;
        var index = str.lastIndexOf("\/");
        let targetName  = str.substring(index + 1, str.length);
        if(targetName == 'mainApp'){
          this.$router.push(name="mainApp")
        }

        if(this.editableTabs2.length == 1){
          this.editableTabs2 = this.editableTabs2.filter(tab => tab.content !== targetName);
          //遍历editableTabs2 找到id 添加进去
          this.tabName = []
          return this.$router.push(name="mainApp")
        }else{
          this.editableTabs2 = this.editableTabs2.filter(tab => tab.content !== targetName);
          //遍历editableTabs2 找到id 添加进去
          this.tabName = this.editableTabs2.map(r=>r.name)
          // 跳转页面
          let pathInfo =  this.editableTabs2[this.editableTabs2.length - 1].content
          this.$router.push({path:pathInfo})
        }

      },//导航关闭当前
      editableTabsValue3(editableTabsValue3) {
        let _this = this;
        document.getElementById(editableTabsValue3).oncontextmenu= function (event) {
          if(event.target.baseURI !== 'http://localhost:8080/#/saas/message/mainApp'){
            _this.pageShowtop = event.clientY+25;
            _this.pageShowleft = event.clientX-27;
            _this.pageShow = true;
            // 查找url nationwide
            let str = event.target.id;
            let index = str.lastIndexOf("-");
            _this.pageShowUrl = str.substring(index + 1, str.length);
          }

          return false;
        }
      }, //定位xy轴
      editableTabsValue4(editableTabsValue4){
        let _this = this;
        document.getElementById(editableTabsValue4).onclick= function (event) {
          _this.pageShow = false;
        }
      }, //点击左键隐藏
      buttonMainD(){
        this.$router.push(name="mainApp")
      },//图标--回主页
      }
    }
</script>
<style>
  #asideList .ml{
    margin-left: 198px;
  }
  #asideList .hv{
    position: fixed;top: 400px;
  }
  #asideList .hh{
    position: fixed;top: 400px;
  }
  #asideList .el-submenu .el-menu-item{
    min-width:0!important;
    color: white!important;
    font-size: 14px;
  }
  #asideList .el-submenu__title {
    font-size: 16px;
    color: #CCCCCC!important;
    padding: 0 11px;
    cursor: pointer;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    font-weight: 400;
    font-family:  "Microsoft YaHei";
    padding-left: 20px;
  }
  #asideList .el-submenu__title:hover {
    background-color: #295a94!important;
  }
  #asideList .el-menu-item:focus , .el-menu-item:hover{
    background-color:#295a94!important;
  }
  #asideList .el-menu {
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: rgba(0,0,0,0);
    border: 0px;
    border-radius: 1px;
  }
  #asideList .zyside{
    background: #3c404c;
  }
  #asideList .el-submenu [class^=el-icon-] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 17px;
  }
  #asideList .el-submenu__icon-arrow {
    position: absolute;
    top: 53%;
    right: 20px;
    margin-top: -7px;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
    font-size: 12px;
    font-weight: 600;
  }
  #asideList .el-input__inner {
    -webkit-appearance: none;
    background-color: #333744;
    background-image: none;
    border-radius: 0px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #CCCCCC;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: none;
    border: none;
    padding: 0 29px;
    width: 150px!important;
    margin-left: 15px;
  }
  #asideList .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    background: #3c404c;
  }
  #asideList .el-col-18 {
    width: 69%;
  }
  .my-autocomplete  li {
    line-height: normal;
    padding: 7px;
  }
  #asideList .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 5px!important;
  }
  #asideList .el-icon-close:before {
    display: block!important;
  }
  #asideList .buttonMain{
    margin: 0 2px 0 10px;
    line-height: 32px;
    height: 32px;
    text-align: center;
    border-bottom: 0;
    border-radius: 2px;
    float: left;
    width: 80px;
    border: 1px solid #e4e7ed;
  }
  #asideList .CollectionName{
    width: 18px!important;
    height: 18px;
    display: inline-block;
    position: absolute;
    top: 17px;
    cursor: pointer;
  }
  #asideList .CollectionName img{
    width: 18px!important;
    height: 18px;
  }
  #asideList .sousuoguanbi img{
    width: 14px!important;
  }
  #asideList .CollectionNames{
    width: 140px;
    background: white;
    position: absolute;
    left: -120px;
    top: 20px;
    z-index: 1;
    background-color: black;
    color: white;
    border: 1px solid white;
  }
  #asideList .el-badge__content.is-fixed {
    position: absolute;
    top: 12px;
    right: 18px;
  }
  #asideList .el-input__icon{
    margin-left: 12px;
     }
  #asideList .el-tabs--card>.el-tabs__header{
    border: 0;
  }
  #asideList .el-tabs__item{
    height: 32px;
    line-height: 32px;
  }
  #asideList .el-tabs__nav-wrap{
    margin-left: -5px;
  }
  #asideList .el-tabs__item.is-active{
    color: black
  }
  @media screen and (min-width:1024px) and (max-width:1360px){

    #asideList .CollectionName{
      right: -77px;
    }
    #asideList #editableTabs{
      width: 96%;
    }
  }
  @media screen and (min-width:1360px) and (max-width:1540px){
 
    #asideList .CollectionName{
      right: -78px;
    }
  }
  @media screen and (min-width:1540px) and (max-width:1740px){
  
    #asideList .CollectionName{
      right: -55px;
    }
  }
  @media screen and (min-width:1740px) and (max-width:1920px){
  
    #asideList .CollectionName{
      right: -35px;
    }
    #asideList #editableTabs{
      width: 96%;
    }
  }

</style>
