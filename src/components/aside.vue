<template>
  <div id="asideList" style="width:100%;height:100%;user-select:none;">
    <el-row style="width:100%;display: -webkit-box;display: flex;margin-top:50px;">
      <!--侧边栏-->
      <el-col :span="2" style="height:100%;position: fixed;z-index: 100;-box-flex:-webkit 1;flex:1;" class="aside">
        <!--搜索框和收藏-->
        <div style="height: 100%;" v-show="val">
          <el-menu :router="true" :default-active="defaultActive+''" :unique-opened="true" style="height:100%;" :style="{width:ths+'px'}"
            class="zyside">
            <!--第一层-->
            
            <el-submenu v-for="(item,index) in this.ArrayData" :index="item.id +''" :unique-opened="true" :key="index">
              <template slot="title"><i :class=[item.icon]></i>{{item.name}}111</template>
              <!--第二层-->
              <el-submenu v-for="(itema,index) in item.children" :index="itema.id +''" v-if="itema.children != undefined"
                :key="index">
                <!--第三层-->
                <template slot="title" v-show='itema.name'>{{itema.name}}</template>
                <el-menu-item-group v-for="(itemb,index) in itema.children" :index="itemb.id +''" :key="index">
                  <el-menu-item :index="itemb.id+''" @click="gotoPath(itemb.url,itemb.id) ;addTab(editableTabsValue2,itemb.url,itemb.name,itemb.id)">{{itemb.name}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!--第二层-->
              <el-menu-item v-if="itema.children == undefined " :index="itema.id+''" @click="gotoPath(itema.url,itema.id) ;addTab(editableTabsValue2,itema.url,itema.name,itema.id)"
                v-for="(itema,index) in item.children" :key="index">{{itema.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div v-show="!val" style="width:50px;height:100%;background:#3c404c;">
          <ul>
            <li v-for="(icons,index) in icon" :key="index">{{icons.name}}</li>
          </ul>
        </div>

      </el-col>

      <!--页面的内容-->
      <el-col :span="22" style="-webkit-box-flex: 1;width:87%;height:100%;flex:1;position: relative;background: #f1f2f6"
        :style="{ marginLeft:this.val?ths+'px':'50px'}">

        <div style="width: 2px;height: 100%;background:rgba(0,0,0,.1);position: absolute;" id="DetectionHeight"></div>

        <div style="cursor: pointer;z-index:999" @click="hideV" :class="{hv:hl,hh:!hl}" :style="{left:ths-2+'px'}" v-if="val">
          <img :src="shouqizuocedaohang" alt="">
        </div> 

         <div style="z-index: 999;cursor: pointer" @click="hideV" :class="{hv:hl,hh:!hl}" :style="{ left:this.val?ths+'px':'49px'}"
          v-else>
          <img :src="shouqizuocedaohang" alt="">
        </div> 

        <!--整体导航-->
        <div style="margin: 16px;" class="OverallNavigation">
          <!--图标-->

          <!-- <span class="el-dropdown-link" style="float: left;padding:3px 16px;height: 26px;display: inline-block;background: #3C404C;border-radius: 4px 4px 0 0;"
            @click="buttonMainD">
            <img :src="fanhuishouye" alt="" style="width: 20px;height: 20px">
          </span> -->

          <!--触发器-->
          <el-tabs id="editableTabs" v-model="editableTabsValue2" type="card" @tab-click="tabsn" closable @tab-remove="removeTab"
            style="z-index: 999;height: 32px;background: #ffffff;" v-show="Deletenavigationbar">
            <el-tab-pane v-for="option in $store.state.editableTabs2" :label="option.title" :name="option.content" :key="option.name"></el-tab-pane>
          </el-tabs>
        </div>
        <router-view style="margin: 16px;"></router-view>
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
      tabIndex: 1,
      tabName: [],
      indexCode: 0,
      ths: "198",
      fanhuishouye: require("../assets/images/icon-fanhuishouye.png"), //小房子 icon-shouqizuocedaohang
      shouqizuocedaohang: require("../assets/images/icon-shouqizuocedaohang.png"), // icon-sousuo.png
      icon: [{ name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }],
      Deletenavigationbar: false
    };
  },
  computed: {
    ...mapState(["state_router"]),
    ...mapGetters(["val"])
  },
  watch: {
    state_router() {
      this.defaultActive = this.state_router;
    },
    CollectionNameLis: function() {
      this.CollectionNameLislength = this.CollectionNameLis.length;
    }
  },
  created() {
    this.aside();
  },
  beforeUpdate() {
    this.defaultActive = this.state_router;
  },
  mounted() {},
  methods: {
    ...mapActions(["stateRouter", "saveData"]),
    tabsn(tab, event) {
      this.$router.push({
        path: tab.name
      });
    },
    aside(event) {
      this.ArrayData = [
        {
          name: "今天1",
          id: 1,
          url: "demo",
          children: [
            {
              name: "今天1",
              id: 4,
              url: "demo"
            }
          ]
        },
        {
          name: "今天2",
          id: 2,
          url: "demo1",
          children: [
            {
              name: "今天2-1",
              id: 5,
              url: "demo1"
            }
          ]
        },
        {
          name: "今天3",
          id: 3,
          url: "demo2"
        }
      ];

      this.$http
        .get(api.pdng())
        .then(res => {
          // this.ArrayData = res.data.data;
          this.ArrayData = [
            {
              name: "今天1",
              id: 1,
              url: "demo",
              children: [
                {
                  name: "今天1",
                  id: 4,
                  url: "demo"
                }
              ]
            },
            {
              name: "今天2",
              id: 2,
              url: "demo1",
              children: [
                {
                  name: "今天2-1",
                  id: 5,
                  url: "demo1"
                }
              ]
            },
            {
              name: "今天3",
              id: 3,
              url: "demo2"
            }
          ];
          // let serchData = res.data.data;
          // serchData.forEach(seriesA => {
          //   if (seriesA.children) {
          //     seriesA.children.forEach(seriesB => {
          //       if (seriesB.children) {
          //         seriesB.children.forEach(seriesC => {
          //           this.serchDatalist.push({
          //             value: seriesC.name,
          //             url: seriesC.url,
          //             index: seriesC.id
          //           });
          //         });
          //       }
          //     });
          //   }
          //   // 刷新之后跳转主页
          //   // this.$router.push(name="mainApp")
          // });
          this.restaurants = this.loadAll();
        })
        .catch(() => {});
    }, //调接口渲染侧边栏接口--跳转主页--存储侧边栏name
    gotoPath(address, id) {
      this.$router.push({
        path: address
      });
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
    addTab(targetName, a, b, c) {
      // a 路径 b 名字  c id
      let str = a; ///saas/message/nationwide
      var index = str.lastIndexOf("/");
      let d = str.substring(index + 1, str.length);
      if (d) {
        if (this.tabName.indexOf(c) == -1) {
          let newTabName = ++this.tabIndex + "";
          this.editableTabs2.push({
            title: b,
            name: c,
            content: d
          });
          this.tabName.push(c);
          this.editableTabsValue2 = newTabName;

          this.$store.commit("SAVE_EDITABLETABS2", this.editableTabs2);
          this.Deletenavigationbar = true;
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
      if (this.$store.state.editableTabs2.length == 1) {
        this.Deletenavigationbar = false;
        this.editableTabs2 = tabs.filter(tab => tab.content !== targetName);
        this.tabName = [];
        this.$store.commit("SAVE_EDITABLETABS2", this.editableTabs2);
        return this.$router.push((name = "mainApp"));
      } else {
        this.editableTabs2 = tabs.filter(tab => tab.content !== targetName);
        //遍历editableTabs2 找到id 添加进去
        this.$store.commit("SAVE_EDITABLETABS2", this.editableTabs2);
        this.tabName = this.editableTabs2.map(r => r.name);
        let pathInfo = this.editableTabs2[this.editableTabs2.length - 1]
          .content;
        this.$router.push({
          path: pathInfo
        });
      }
    }, //删除导航栏
    buttonMainD() {
      this.$router.push((name = "mainApp"));
    } //图标--回主页
  }
};
</script>
<style>
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
  padding-left: 20px;
}

#asideList .aside .el-submenu__title:hover {
  background-color: #295a94 !important;
}

#asideList .aside .el-menu-item:focus,
#asideList .aside .el-menu-item:hover {
  background-color: #295a94 !important;
}

#asideList .el-menu {
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: rgba(0, 0, 0, 0);
  border: 0px;
  border-radius: 1px;
}

#asideList .zyside {
  background: #3c404c;
}

#asideList .el-icon-close:before {
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

#asideList .el-tabs__nav-wrap {
  margin-left: 1px;
}

#asideList .el-tabs__item.is-active {
  color: black;
}

@media screen and (min-width: 1024px) and (max-width: 1360px) {
  #asideList #editableTabs {
    width: 96%;
  }
}

@media screen and (min-width: 1740px) and (max-width: 1920px) {
  #asideList #editableTabs {
    width: 96%;
  }
}
</style>
