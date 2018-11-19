<template>
  <!--头部内容-->
  <div style="width: 100%;height:100%;" class="xiaoheader" id="xiaoheader">

    <div v-show="ArrayData">
      <div class="zyheader" style="line-height:50px;height:50px;width:100%;padding:0px;position: fixed;top: 0;z-index: 999;"
        v-show="this.hideheaderaside">
        <div class="fl logo1" v-show="val" style="cursor: pointer;line-height:50px;height:50px;width: 160px;">
          <img :src="pclogo" alt="logo图标" style="height: 31px;width: 103px;margin-top: 9px;margin-right: 11px;">
        </div>
        <div class="fl logo1" v-show="!val" style="cursor: pointer;line-height:50px;height:50px;width: 50px;">
          <img :src="logoshouqi" alt="" style="margin-left: -2px;margin-top: 10px;">
        </div>
        <!-- 退出 -->
        <div class='fr userOut' style="margin-left: 17px;margin-right: 20px;position: relative;">
          <div @click="outLogin"  @mouseenter="outLoginenter()" @mouseleave="outLoginleave()">
            <img :src="Signout" style="vertical-align: sub;">
            <div style="background: white;position: absolute;top: 39px;right: -14px;width: 39px;line-height: 30px;color: black;border: 0.5px solid #c2c2c2 " v-show="this.outLogins">退出</div>
          </div>
        </div>

        <div class='fr' style="border: 1px solid #14171A;height: 48px;"></div>
        <!-- 收藏 -->
        <div class='fr userOut' style="width:60px;position: relative;" @click="Collection()" @mouseenter="Collectionenter()" @mouseleave="Collectionleave()">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            <img :src="shoucangAA" alt="" style="margin-top: 16px;" v-show="!Collectiondisplay">
            <img :src="shoucangB" alt="" style="margin-top: 16px;" v-show="Collectiondisplay">
          </span>
          <div style="background: white;position: absolute;top: 39px;right: 9px;width: 40px;line-height: 30px;color: black;border: 0.5px solid #c2c2c2 " v-show="this.Collections">收藏</div>
        </div>

        <div class='fr' style="border: 1px solid #14171A;height: 48px;"></div>
        <!-- 返回首页 -->
        <div class='fr userOut' style="width:60px;" @click="HomePage" @mouseenter="HomePageenter()" @mouseleave="HomePageleave()">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            <img :src="FrontpageclickA" alt="" style="margin-top: 15px;" v-show="shoucangboolen">
            <img :src="FrontpageclickB" alt="" style="margin-top: 15px;" v-show="!shoucangboolen">
          </span>
          <div style="background: white;position: absolute;top: 39px;right: 125px;width: 40px;line-height: 30px;color: black;border: 0.5px solid #c2c2c2 " v-show="this.HomePages">首页</div>
        </div>

        <div class='fr' style="border: 1px solid #14171A;height: 48px;"></div>
        <!--用户名-->
        <div class='fr userOut' style="margin-right: 10px;">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            <img :src="user" alt="" style="vertical-align: sub;margin-bottom: 3px;margin-right: 4px;">
            <span style="color: #BCC9DB">您好 {{name}}</span>
          </span>
        </div>
        <!-- ========================== -->
        <!-- <div class='fr userOut' style="width:120px;margin-right: 10px;" @click="shoucangadd">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            <span style="color: #BCC9DB">测试收藏添加接口</span>
          </span>
        </div>
        <div class='fr userOut' style="width:120px;margin-right: 10px;" @click="shoucangdelete">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            <span style="color: #BCC9DB">测试收藏删除接口</span>
          </span>
        </div> -->
      </div>
      <div style="height:100%;width: 100%;border: none;">
        <el-container>
          <asides :listArr="arr"></asides>
          <!--<asides :listArr="arr" :statrA="stateA"  v-if="hackReset"></asides>-->
          <!--<div style="width: 100%;height: 50px;background:red;position: fixed;bottom: 0px;">asdf</div>-->
        </el-container>
      </div>
      <!-- 收藏功能 -->
      <div style="width:244px;background:white;position: absolute;top: 60px;right: 48px;border-radius: 7px;padding:12px;text-align: initial;z-index: 999;box-shadow: 0 2px 4px 0 rgba(190,190,190,0.50);"
        v-show="Collectiondisplay">
        <div class="triangle_border_up" v-show="Collectiondisplay"><span></span></div>
        <div v-show="this.shoucangAlength != 0" style="height:100px;">
          <ul>
            <li style="list-style: inside;color: black;cursor: pointer;" v-for="(item,index) in shoucangdata" :key="index" @click="Collectionpage(item.reportUrl,item.reportName,item.id,item.reportCode)">
              <span style="color:#707070;">{{item.reportName}}</span>
              <span style="float:right;color:#707070;">{{item.createTime}}</span>
            </li>
          </ul>
        </div>
        <div style="height:100px;" v-show="this.shoucangAlength == 0">
          <div style="padding-top: 30px;margin-left: 30%;">
            <img :src="Nocollection" alt="" style="vertical-align:middle;"> 暂无收藏
          </div>
        </div>
        <div style="border:1px dashed rgba(0, 0, 0, 0.07) "></div>
        <div style="margin-top:5px;"><span style="float:right;color:#4DA1FC;">更多...</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import asides from "@/components/aside";
import api from "../api";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "admin",
      mrRouter: "",
      mrIndex: "",
      stateA: "",
      hackReset: true,
      Collectiondisplay: false,
      arr: [],
      pclogo: require("../assets/images/pclogo.png"),
      Signout: require("../assets/images/Signout.png"),
      user: require("../assets/images/user.png"),
      shoucangAA: require("../assets/images/shoucangA.png"),
      shoucangB: require("../assets/images/shoucangB.png"),
      FrontpageclickA: require("../assets/images/FrontpageclickA.png"),
      FrontpageclickB: require("../assets/images/FrontpageclickB.png"),
      Frontpageurl: window.location.search,
      Nocollection: require("../assets/images/Nocollection.png"),
      logoshouqi: require("../assets/images/logoshouqi.png"),
      shoucangA: [],
      shoucangdata: [],
      shoucangboolen: false,
      outLogins: false,
      Collections: false,
      HomePages: false,
      shoucangAlength: "",
      editableTabs2: [],
      shoucangdeleteId: "",
      ArrayDataA: []
    };
  },
  computed: {
    ...mapState(["state_router"]),
    ...mapGetters(["val", "hideheaderaside"])
  },
  created() {
    if (localStorage.getItem("userName")) {
      this.name = localStorage.getItem("userName");
    }
    if (localStorage.getItem("password")) {
      this.ruleForm2 = localStorage.getItem("password");
    }
    if (
      localStorage.getItem("xiaohong") == null ||
      localStorage.getItem("xiaohong") == false
    ) {
      this.lockScr = false;
      this.ArrayData = true;
    } else {
      this.lockScr = true;
      this.ArrayData = false;
    }
    // 刷新之后重新赋值
    this.editableTabs2 = JSON.parse(localStorage.getItem("editableTabs2"));
    this.shoucangAs();
    this.Frontpageclick();
  },
  components: {
    asides
  },
  methods: {
    ...mapActions(["stateRouter", "saveData", "saveDatal"]),
    outLogin() {
      localStorage.removeItem("userName");
      localStorage.removeItem("userid");
      localStorage.removeItem("password");
      this.$router.push({
        name: "Login"
      });
      if (
        localStorage.getItem("xiaohong") == null ||
        localStorage.getItem("xiaohong") == false
      ) {
        this.lockScr = false;
        this.ArrayData = true;
      } else {
        this.lockScr = true;
        this.ArrayData = false;
      }
    },
    outLoginenter() {
      this.outLogins = true;
    },
    outLoginleave() {
      this.outLogins = false;
    },
    HomePage() {
      this.$router.push((name = "mainApp"));
       if (localStorage.removeItem("Deletenavigationbar")) {
          localStorage.removeItem("Deletenavigationbar");
        }
      // localStorage.setItem("Deletenavigationbar", JSON.stringify("false"))
    },
    HomePageenter() {
      this.HomePages = true;
    },
    HomePageleave() {
      this.HomePages = false;
    },
    Collection() {
      this.Collectiondisplay = !this.Collectiondisplay;
      this.Collections = false;
    },
    Collectionenter() {
      this.Collections = true;
    },
    Collectionleave() {
      this.Collections = false;
    },
    Collectionpage(url, names, id, reportCode) {
      this.editableTabs2 = JSON.parse(localStorage.getItem("editableTabs2"));
      if (this.editableTabs2.length == 0) {
        this.editableTabs2 = [];
        this.editableTabs2.push({
          title: names,
          name: id,
          content: url,
          reportCode: reportCode
        });
      } else {
        var a = [];
        console.log(this.editableTabs2);
        this.editableTabs2.forEach(r => {
          a.push(r.content);
        });

        if (a.indexOf(url) == -1) {
          this.editableTabs2.push({
            title: names,
            name: id,
            content: url,
            reportCode: reportCode
          });
        }
      }
       localStorage.setItem("Deletenavigationbar", JSON.stringify("true"))
      this.$router.push({ path: url, query: { reportCode: reportCode } });
      this.Collectiondisplay = !this.Collectiondisplay;
      this.$store.commit("SAVE_EDITABLETABS2", this.editableTabs2);
    }, //收藏功能点击事件
    shoucangAs() {
      this.$http
        .post(api.userCollectList(), {
          form: {}
        })
        .then(res => {
          this.ArrayDataA = res.data.data;
          // console.log(this.ArrayDataA )
          var shoucangdata = [];
          this.ArrayDataA.forEach(r => {
            this.shoucangdata.push({
              reportName: r.reportName,
              reportCode: r.reportCode,
              createTime: r.createTime.substring(0, 10),
              id: r.id,
              reportUrl: r.reportUrl
            });
          });
          this.shoucangAlength = this.shoucangdata.length;
          // console.log(this.shoucangdata)
        })
        .catch(() => {});
    }, //收藏功能接口
    // shoucangadd(){
    //   this.$http
    //     .post(api.userCollectAdd(), {
    //       "reportCode":"RPT_LN_LEND_DTL_RPT",
    //       "masterNo" :'01',
    //     })
    //     .then(res => {
    //       this.ArrayData = res.data.data;
    //       console.log(this.ArrayData)

    //       this.shoucangAs();
    //     })
    //     .catch(() => {});
    // },//收藏添加功能接口
    // shoucangdelete(){
    //   console.log(this.shoucangdata)
    //   // this.shoucangdata.forEach((r)=>{
    //   //   if(r.collectionName == '菜单借款明细表'){
    //   //     this.shoucangdeleteId = r.id;
    //   //   }
    //   // })
    //   this.$http
    //     .post(api.userCollectRemove(), {
    //     //  'datas':[this.shoucangdeleteId]
    //     // "reportCode":"RPT_LN_LEND_DTL_RPT"
    //      "reportCode":"RPT_LN_LEND_DTL_RPT"
    //     })
    //     .then(res => {
    //       //  this.shoucangAs();
    //     })
    //     .catch(() => {});
    // },//收藏删除功能接口
    Frontpageclick() {
      if (this.$route.path == "/saas/message/mainApp") {
        this.shoucangboolen = true;
      } else {
        this.shoucangboolen = false;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.Frontpageclick();
    }
  }
};
</script>

<style>
.xiaoheader .zyheader {
  background: #1f283a;
}

.xiaoheader .logo1 {
  width: 180px;
  text-align: center;
  background-color: #000000;
}

.xiaoheader .userFont {
  text-align: center;
  color: #879de3;
  font-size: 20px;
  margin-left: 14px;
  font-family: PingFangSC-Medium;
}

.xiaoheader .userOut {
  text-align: center;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.triangle_border_up {
  width: 0;
  height: 0;
  border-width: 0 9px 13px;
  border-style: solid;
  border-color: transparent transparent #fff;
  margin: -5px auto;
  position: relative;
}

.triangle_border_up span {
  display: block;
  width: 0;
  height: 0;
  border-width: 0 6px 10px;
  border-style: solid;
  border-color: transparent transparent #fff;
  position: absolute;
  top: -13px;
  left: 98px;
}
</style>
