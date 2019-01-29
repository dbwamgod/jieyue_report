<template>
  <div id="asideList" style="width:100%;height:100%;user-select:none;">
    <el-row style="width:100%;display: -webkit-box;display: flex;margin-top:50px;" :style="{marginTop:this.hideheaderaside?50+'px':'0'}">
      <!--侧边栏-->
      <el-col :span="2" style="width:auto;height:100%;position: fixed;z-index: 100;-box-flex:-webkit 1;flex:1;" class="aside" v-show="this.hideheaderaside">
        <!-- <div class="baobiaogongneng"></div> -->
        <div style="right: -3px;z-index: 999;width: 3px;height: 100%;background:rgba(0,0,0,.1);position: absolute;" id="DetectionHeight" @mousedown="drag"></div>
        <!--搜索框和收藏-->
        <div style="height: 100%;" v-show="val">
          <el-menu @open="openHandler" @close="closeHandler" :router="true" :default-active="defaultActive+''" :unique-opened="true" :default-openeds="openeds" style="height:100%;" :style="{width:ths+'px'}" class="zyside"  id="draga">
            <!--第一层-->
            <el-submenu v-for="(item,index) in this.ArrayData" :index="index+''" :unique-opened="true" :key="index">
              <template slot="title">
                <img :src="isOpen[index] ? xiajiantou : shangjiantou"/>
                <i :class=[item.icon]></i> {{item.name}}</template>
              <!--第二层-->
              <el-submenu v-for="(itema,index) in item.children" :index="itema.id +''" v-if="(!itema.children)" :key='index' >
                <!--第三层-->
                <template slot="title" v-show='itema.name'>{{itema.name}}{{itema.children == []}}</template>
                <el-menu-item-group v-for="(itemb,index) in itema.children" :index="itemb.id+''" :key="index">
                  <el-menu-item :index="itemb.id+''" @click="gotoPath(itemb.url, itemb.id, itemb.templateCode, itemb.name) ;addTab(editableTabsValue2,itemb.url,itemb.name,itemb.id,itemb.templateCode)">
                    <span class="activeAfte"></span>
                    {{itemb.name}}
                </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!--第二层-->
                <el-menu-item :index="itema.id+''" @click="gotoPath(itema.url,itema.id,itema.templateCode, itema.name) ;addTab(editableTabsValue2,itema.url,itema.name,itema.id,itema.templateCode)" v-for="(itema,index) in item.children" v-if="(itema.children)" :key='index'>
                  <span class="activeAfte"></span>
                  {{itema.name}}
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <!-- 收起之后的样式 -->
        <div v-show="!val" style="width:50px;height:100%;background:#3c404c;">
          <ul>
            <li v-for="(item,index) in this.ArrayData" :key="index" style="padding-top:12px;padding-left: 15px;">
              <i :class=[item.icon]></i>
            </li>
          </ul>
        </div>

      </el-col>

      <!--页面的内容-->
      <el-col :span="22" style="min-width:960px;-webkit-box-flex: 1;width:87%;height:100%;flex:1;position: relative;background: #f1f2f6" :style="this.hideheaderaside?({marginLeft:this.val?ths+'px':'50px'}) :({marginLeft:0+'px'})">
          <!--拖拽区域-->
          <!-- <div style="width: 3px;height: 100%;background:rgba(0,0,0,.1);position: absolute;" id="DetectionHeight" @mousedown="drag"></div> -->

          <div style="cursor: pointer;z-index:999" @click="hideV" v-show="this.hideheaderaside" :class="{hv:hl,hh:!hl}" :style="{left:ths+'px'}" v-if="val">
            <img :src="shouqizuocedaohangB" alt="">
          </div>

          <div style="z-index: 999;cursor: pointer" @click="hideV" v-show="this.hideheaderaside" :class="{hv:hl,hh:!hl}" :style="{ left:this.val?ths+'px':'50px'}" v-else>
            <img :src="shouqizuocedaohang" alt="">
          </div>

          <!--整体导航-->
          <div style="margin:21px 0 0 32px;" class="OverallNavigation">
          <!--触发器-->
            <el-tabs id="editableTabs" v-model="tabIndex" type="card" @tab-click="tabsn" closable 
                    @tab-remove="removeTab" style="z-index: 999;height: 32px;" v-show="Deletenavigationbar && $store.state.hideheaderaside">
              <el-tab-pane v-for="option in $store.state.editableTabs2" :label="option.title" :name="option.name+''" :key="option.templateCode"></el-tab-pane>
            </el-tabs>
          </div>
          <router-view style="margin: 0px 34px;"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import api from "../api";
export default {
  data() {
    return {
      pageShowUrl: "",
      pageShowtop: 0,
      pageShowleft: 0,
      pageShow: false,
      fullscreen: false,
      defaultActive: "",
      hackReset: true,
      abc: null,
      ArrayData: null,
      vl: true,
      hl: true,
      timeout: null,
      stateList: "",
      serchDatalist: [],
      editableTabsValue2: "1",
      editableTabs2: [],
      tabIndex: this.state_router+'',
      tabName: [],
      indexCode: 0,
      ths:'160',
      fanhuishouye: require("../assets/images/icon-fanhuishouye.png"), //小房子 icon-shouqizuocedaohang
      shouqizuocedaohang: require("../assets/images/icon-shouqizuocedaohang.png"), // icon-sousuo.png
      shouqizuocedaohangB: require("../assets/images/icon-shouqizuocedaohangB.png"), // icon-sousuo.png
      Deletenavigationbar: JSON.parse(
        localStorage.getItem("Deletenavigationbar")
      ),
      shangjiantou: require("../assets/images/icon-shangjiantou.png"),
      xiajiantou: require("../assets/images/icon-xiajiantou.png"),
      openeds: [],
      uniqueOpened: false,
      isOpen: [false]
    };
  },
  computed: {
    ...mapState(["state_router"]),
    ...mapGetters(["val", "hideheaderaside"])
  },
  watch: {
    state_router() {
      //console.log(this.state_router,'----')
      this.defaultActive = this.state_router;
      this.tabIndex = this.state_router+'';
    },
    CollectionNameLis: function() {
      this.CollectionNameLis = this.CollectionNameLis.length;
    },
    $route(to, from) {
      this.editableTabsValue2 = to.name;
      if (this.editableTabsValue2 == "mainApp") {
        localStorage.setItem("editableTabs2", JSON.stringify([]));
        this.Deletenavigationbar = false;
        localStorage.setItem("reportCode", JSON.stringify([]));
        localStorage.setItem("Savearray", JSON.stringify([]));
        this.stateRouter("");
        this.openeds = [];
        this.$set(this.isOpen, 0, false);
      }
    }
  },
  beforeUpdate() {
    this.defaultActive = this.state_router;
    console.log(this.defaultActive)
    this.tabIndex = this.state_router+'';
    var srt = JSON.parse(localStorage.getItem("editableTabs2"));
    if (srt.length) {
      this.Deletenavigationbar = true;
    }
  },
  created() {
    this.aside();
    this.Navigationstate();
  },
  mounted(){
    this.editableTabsValue4("asideList");
  },
  methods: {
    ...mapActions(["stateRouter", "saveData", "saveDatal"]),
    editableTabsValue4(editableTabsValue4){
        let _this = this;
        document.getElementById(editableTabsValue4).onclick= function (event) {
          _this.pageShow = false;
        }
    },
    openHandler(index) {
      this.$set(this.isOpen, index, true);
    },
    closeHandler(index) {
      this.$set(this.isOpen, index, false);
    },
    Navigationstate() {
      this.editableTabs2 =
        JSON.parse(localStorage.getItem("editableTabs2")) || [];
      this.$store.commit("SAVE_EDITABLETABS2", this.editableTabs2);
    }, //刷新之前保存导航栏
    tabsn(tab, event) {
      let titleName = this.$store.state.editableTabs2.filter(
        item => item.name == this.tabIndex
      )[0].title;
      this.$store.state.state_router=tab.name;
      this.$router.push({
        path: tab.content,
        query: {
          reportCode: JSON.parse(localStorage.getItem("reportCode")),
          titleName
        }
      });
      
    },
    aside() {
      this.$http
        .post(api.pdng(), {
          masterNo: "06"
        })
        .then(res => {
          this.ArrayData = res.data.data;
        })
        .catch(() => {});
    }, //调接口渲染侧边栏接口--跳转主页--存储侧边栏name
    gotoPath(address, id, templateCode, titleName) {
      this.$router.push({
        path: address,
        query: { reportCode: templateCode, titleName }
      });
      
      localStorage.setItem("reportCode", JSON.stringify(templateCode));
      this.stateRouter(id);
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
    }, //点击跳转--添加在导航栏
    hideV() {
      if (this.vl) {
        this.saveData(false);
      } else {
        this.saveData(true);
      }
      this.vl = !this.vl;
      this.hl = !this.hl;
    }, //点击 隐藏和打开侧边栏
    addTab(targetName, a, b, c, f) {
      // a 路径 b 名字  c id
      let d = a;
      if (d) {
        if (localStorage.getItem("Savearray")) {
          if (localStorage.getItem("Savearray").indexOf(f) == -1) {
            this.tabIndex=c+"";
            this.editableTabs2 = JSON.parse(
              localStorage.getItem("editableTabs2")
            );
            this.editableTabs2.push({
              title: b,
              name: c,
              content: d,
              reportCode: f
            });
            this.tabName.push(f);
            //this.editableTabsValue2 = this.tabIndex;
            console.log(this.editableTabsValue2 +'******')
          }
        } else {
          if (this.tabName.indexOf(c) == -1) {
            this.tabIndex=c+"";
            this.editableTabs2.push({
              title: b,
              name: c,
              content: d,
              reportCode: f
            });
            this.tabName.push(f);
            this.editableTabsValue2 = this.tabIndex;
          }
        }
        //this.$store.state.Savearray =this.editableTabs2.map(r => r.reportCode)
        this.Deletenavigationbar =
          localStorage.setItem("Deletenavigationbar", JSON.stringify("true")) ||
          JSON.parse(localStorage.getItem("Deletenavigationbar"));
        if (this.tabName.length != 0) {
          this.$store.commit("SAVE_EDITABLETABS3", this.tabName);
        }
        if (this.editableTabs2.length != 0) {
          this.$store.commit("SAVE_EDITABLETABS2", this.editableTabs2);
        }
      }
    }, //点击侧边栏 添加在导航栏上
    removeTab(targetName) {
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
      //console.log(this.$store.state.editableTabs2.length)
      if (this.$store.state.editableTabs2.length == 1) {
        //console.log(this.$store.state.editableTabs2,"======")
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
        this.tabName = [];
        // this.$store.commit("this.editableTabs2", this.editableTabs2);
        localStorage.setItem(
          "editableTabs2",
          JSON.stringify(this.editableTabs2)
        );
       
        if (localStorage.removeItem("Deletenavigationbar")) {
          localStorage.removeItem("Deletenavigationbar");
        }
        this.$store.commit("SAVE_EDITABLETABS3", []);
        // localStorage.setItem("Deletenavigationbar", JSON.stringify("false"))
        this.Deletenavigationbar = false;
        return this.$router.push((name = "mainApp"));
      } else {
        if (tabs) {
          this.editableTabs2 = tabs.filter(tab => tab.name != targetName);
        }
        localStorage.setItem(
          "editableTabs2",
          JSON.stringify(this.editableTabs2)
        );
        this.$store.state.Savearray =this.editableTabs2.map(r => r.reportCode)
        this.$store.state.editableTabs2=this.editableTabs2;
        this.$store.state.state_router= this.editableTabs2[this.editableTabs2.length - 1]
          .name;
        //$store.state.editableTabs2
        //遍历editableTabs2 找到id 添加进去
        this.tabName = this.editableTabs2.map(r => r.reportCode);
        this.$store.commit("SAVE_EDITABLETABS3", this.tabName);
        let titleName = this.editableTabs2[this.editableTabs2.length - 1]
          .title;
        //console.log(this.editableTabs2[this.editableTabs2.length - 1],"#######")
        localStorage.setItem("reportCode",JSON.stringify(this.editableTabs2[this.editableTabs2.length - 1]
          .reportCode));
        let pathInfo = this.editableTabs2[this.editableTabs2.length - 1]
          .content;
        this.$router.push({
            path: pathInfo,
            query: {
              reportCode: JSON.parse(localStorage.getItem("reportCode")),
              titleName
            }
        });
        
        this.$store.state.state_router=this.editableTabs2[this.editableTabs2.length - 1]
          .name;
      }
    },//拖拽侧边栏
    drag(e,index){
        let evt = e || window.e;
        // console.log(evt.target);
        // console.log(evt.target.parentNode);
        //
        // // if(evt.path[1].value !== 0 && evt.path[0].value !== 0){
          var div1 = evt.target, // 得到div1对象
            _this = this,
            leftW = div1.offsetWidth;
        let disX = evt.clientX ;   // 鼠标横坐标 - div1的left

        // 鼠标移动时
          document.onmousemove = function(e) {

            var evnt = e || window.e;
            var x = evnt.clientX - disX;
            //console.log(evnt.clientX);
            //console.log(disX);
            // console.log(x);
            // console.log(leftW);
            evnt.preventDefault()
            // div1.style.width=disX+x+leftW+'px';  || parseInt(evnt.clientX) >=368
            _this.ths =disX+x+leftW;
            if(evnt.clientX <= 160 ){
              _this.ths = '160' ;
              x = 160 +  'px';
              document.onmousemove=null;
            }else if(evnt.clientX >= 550 ){
              _this.ths = '550' ;
              x = 550 +  'px';
            }

          };
          // 鼠标抬起时
          document.onmouseup = function() {
            document.onmousemove =null;
          };
        // }

        },
  }
};
</script>
<style>
#DetectionHeight{
    cursor: w-resize;
  }
#asideList .marginLeft0 {
  margin-left: 0px;
}
#asideList .marginLeft1 {
  margin-left: 160px;
}
#asideList .hv {
  position: fixed;
  top: 66px;
}

#asideList .hh {
  position: fixed;
  top: 66px;
}

#asideList .el-submenu .el-menu-item {
  min-width: 0 !important;
  color: white !important;
  font-size: 14px;
}

#asideList .aside .el-submenu__title {
  font-size: 16px;
  color: #cccccc !important;
  padding: 0 11px;
  cursor: pointer;
  -webkit-transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  font-weight: 400;
  font-family: "Microsoft YaHei";
  padding-left: 10px !important;
}
#asideList .aside .el-submenu__icon-arrow {
  position: absolute;
  top: 54%;
  right: 11px;
  margin-top: -7px;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  font-size: 12px;
}

#asideList .aside .el-submenu__title:hover {
  background-color: #3c404c !important;
}

#asideList .aside .el-menu-item:focus,
#asideList .aside .el-menu-item:hover {
  background-color: #2d65ad !important;
}
#asideList .aside .el-submenu .el-submenu__icon-arrow {
  display: none;
}
#asideList .aside .el-submenu {
  position: relative;
}
#asideList .aside .el-submenu img {
  position: absolute;
  top: 18px;
  right: 3px;
}

#asideList .el-menu {
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: rgba(0, 0, 0, 0);
  border: 0px;
}

#asideList .zyside {
  background: #3c404c;
}

#asideList .OverallNavigation .el-icon-close:before {
  display: block !important;
}

#asideList .OverallNavigation .el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  background: #3c404c;
}

#asideList .OverallNavigation .el-tabs__item {
  height: 32px;
  line-height: 32px;
}

#asideList #editableTabs {
  width: 100%;
}
.baobiaogongneng {
  width: 18px;
  height: 18px;
  background: url(../assets/images/icon-baobiaogongneng.png) no-repeat;
  display: inline-block;
}
#editableTabs > .el-tabs__header {
  border: none;
}
#editableTabs > .el-tabs__header .el-tabs__nav {
  border-radius: 15px 15px 0 0;
}
#editableTabs > .el-tabs__header .el-tabs__item.is-active {
  background: #2d65ad;
}
#editableTabs > .el-tabs__header .el-tabs__item {
  border-bottom-color: transparent;
  background: #8b8b8b;
  color: #fff;
  font-size: 16px;
  border-radius: 8px 8px 0 0;
  padding: 0 11px;
}
#editableTabs > .el-tabs__header .el-tabs__item .el-icon-close {
  width: 22px;
  font-size: 20px;
  height: 22px;
  line-height: 22px;
}
#asideList .el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 33px !important;
  min-width: 200px;
}
#asideList .el-submenu .is-active {
  background: #2d65ad;
}
.el-submenu .is-active .activeAfte {
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-left: 4px solid #8bd0ff;
  position: absolute;
  left: 4px;
  top: calc(50% - 4px);
}
</style>
