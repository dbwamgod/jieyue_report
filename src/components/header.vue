<template>
  <!--头部内容-->
  <div style="width: 100%;height:100%;" class="xiaoheader" id="xiaoheader" @click="bodyEvent">

    <div v-show="ArrayData">
      <div class="zyheader" style="line-height:50px;height:50px;width:100%;padding:0px;position: fixed;top: 0;z-index: 999;" v-show="this.hideheaderaside">
        <div class="fl logo1" style="cursor: pointer;line-height:50px;height:50px;width: 160px;">
          <img :src="pclogo" alt="logo图标" style="height: 31px;width: 103px;margin-top: 9px;margin-right: 11px;">
        </div>
        <!-- <div class="fl logo1" v-show="val" style="cursor: pointer;line-height:50px;height:50px;width: 160px;">
          <img :src="pclogo" alt="logo图标" style="height: 31px;width: 103px;margin-top: 9px;margin-right: 11px;">
        </div> -->
        <!-- <div class="fl logo1" v-show="!val" style="line-height:50px;height:50px;width: 50px;">
          <img :src="logoshouqi" alt="" style="margin-left: -2px;margin-top: 10px;">
        </div> -->
        <!-- 退出 -->
        <div class='fr userOut' style="margin-left: 17px;margin-right: 20px;line-height: 58px;position: relative;  cursor: pointer;">
          <div @click="outLogin"  @mouseenter="outLoginenter()" @mouseleave="outLoginleave()">
            <img :src="Signout" style="vertical-align: sub;">
            <div style="background: white;position: absolute;top: 39px;right: -14px;width: 39px;line-height: 17px;height: 17px;color:#54657E;font-size: 12px;border: 0.5px solid #c2c2c2;" v-show="this.outLogins">退出</div>
          </div>
        </div>

        <div class='fr' style="border: 1px solid #14171A;height: 48px;box-shadow: -1px 0px 0px 0px #383535;"></div>
        <!-- 收藏 -->
        <div class='fr userOut' style="width:60px;position: relative;  cursor: pointer;"  @click.stop="Collection()" @mouseenter="Collectionenter()" @mouseleave="Collectionleave()">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            <img :src="shoucangAA" alt="" style="margin-top: 16px;" v-show="!Collectiondisplay">
            <img :src="shoucangB" alt="" style="margin-top: 16px;" v-show="Collectiondisplay">
          </span>
          <div style="background: white;position: absolute;top: 39px;right: 9px;width: 40px;height: 17px;line-height: 17px;color: #54657E;font-size: 12px;border: 0.5px solid #c2c2c2; " v-show="this.Collections">收藏</div>
        </div>

        <div class='fr' style="border: 1px solid #14171A;height: 48px;box-shadow: -1px 0px 0px 0px #383535;"></div>
        <!-- 返回首页 -->
        <div class='fr userOut' style="width:60px;  cursor: pointer;" @click="HomePage" @mouseenter="HomePageenter()" @mouseleave="HomePageleave()">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            <img :src="FrontpageclickA" alt="" style="margin-top: 15px;" v-show="!shoucangboolen">
            <img :src="FrontpageclickB" alt="" style="margin-top: 15px;" v-show="shoucangboolen">
          </span>
          <div style="background: white;position: absolute;top: 39px;right: 125px;width: 40px;line-height: 17px;color: #54657E;font-size: 12px;border: 0.5px solid #c2c2c2; " v-show="this.HomePages">首页</div>
        </div>

        <div class='fr' style="border: 1px solid #14171A;height: 48px;box-shadow: -1px 0px 0px 0px #383535;"></div>
        <!--用户名-->
        <div class='fr userOut' style="margin-right: 15px;">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            <img :src="user" alt="" style="vertical-align: sub;margin-bottom: 1px;margin-right: 4px;">
            <span style="color: #BCC9DB;font-size: 14px;letter-spacing: 0;text-align: right;">您好 {{name}}</span>
          </span>
        </div>
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
      <div  @click.stop="Collectiona()" style="width:244px;background:white;position: absolute;top: 60px;right: 48px;border-radius: 7px;padding:12px;text-align: initial;z-index: 999;border:0.5px solid #C2C2C2;" v-show="Collectiondisplay">
        <div class="triangle_border_up" v-show="Collectiondisplay">
          <img :src="sanjiao" alt="" style="width: 10px;height: 10px;position: absolute;top: -17px;left: 88px;">
          <!-- <span></span> -->
        </div>
        <div v-show="this.shoucangAlength != 0" :style="this.shoucangAlength > 0?'height:100px':''">
          <ul>
            <li style="list-style: inside;color: black;cursor: pointer;" v-for="(item,index) in shoucangdata" :key="index" @click="Collectionpage(item.reportUrl,item.reportName,item.id,item.reportCode)">
              <span style="color:#707070;">{{item.reportName}}</span>
              <span style="float:right;color:#707070;">{{item.createTime}}</span>
            </li>
          </ul>
        </div>
        <div style="height:100px;" v-show="this.shoucangAlength == 0">
          <div style="padding-top: 31px;margin-left: 33%;position: relative;">
            <img :src="Nocollection30" alt="" style="vertical-align:middle;"> <span style="position: absolute;left: 32px;top: 38px;">暂无收藏</span>
          </div>
        </div>
        <div style="border:1px dashed rgba(0, 0, 0, 0.07) " v-show="this.shoucangAlengthB > 5"></div>
        <div style="margin-top:5px;" v-show="this.shoucangAlengthB  > 5">
          <span style="float:right;color:#4DA1FC;">...</span>
          <span style="float:right;color:#4DA1FC;" @click='moreShoucang'>更多</span>
        </div>
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
      Nocollection30: require("../assets/images/Nocollection30.png"),
      logoshouqi: require("../assets/images/logoshouqi.png"),
      sanjiao: require("../assets/images/sanjiao.png"),
      shoucangA: [],
      shoucangdata: [],
      shoucangboolen: false,
      outLogins: false,
      Collections: false,
      HomePages: false,
      shoucangAlength: "",
      editableTabs2: [],
      shoucangdeleteId: "",
      ArrayDataA: [],
      shoucangAlengthB: ""
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
      this.$http.post(api.logCollection(), {
        account: sessionStorage.getItem("userPhone"),
        masterNo: "06",
        sysNo: "PcReport",
        modelNo: "999",
        optionNo: "nothing",
        params: []
      });
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
      if (
        window.location.hash.slice(window.location.hash.lastIndexOf("/") + 1) ==
        "mainApp"
      ) {
        location.reload();
      }
      this.$router.push((name = "mainApp"));

      if (localStorage.removeItem("Deletenavigationbar")) {
        localStorage.removeItem("Deletenavigationbar");
      }
    },
    HomePageenter() {
      this.HomePages = true;
    },
    HomePageleave() {
      this.HomePages = false;
    },
    bodyEvent(event){
       if(this.Collectiondisplay){
         this.Collectiondisplay = false;
       }
    },
    Collectiona(){
      
    },
    Collection(event) {
        this.shoucangAs();
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
      console.log(names,id,url)
      this.$store.state.state_router = id;
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
      // if(this.tabName.length != 0){
      //             this.$store.commit("SAVE_EDITABLETABS3", this.tabName);
      //         }
      localStorage.setItem("Deletenavigationbar", JSON.stringify("true"));
      this.$router.push({
        path: url,
        query: { reportCode: reportCode, titleName: names }
      });
      localStorage.setItem("Savearray", JSON.stringify(reportCode));
      localStorage.setItem("reportCode", JSON.stringify(reportCode));
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
          if (this.ArrayDataA.length != 0) {
            this.shoucangdata = [];
            this.ArrayDataA.forEach(r => {
              this.shoucangdata.push({
                reportName: r.reportName,
                reportCode: r.reportCode,
                createTime: r.createTime.substring(0, 10),
                id: r.id,
                reportUrl: r.reportUrl
              });
            });

            if (this.shoucangdata.length > 0) {
              this.shoucangAlength = this.shoucangdata.length;
              this.shoucangAlengthB = this.shoucangdata.length;
              if (this.shoucangdata.length > 5) {
                this.shoucangdata = this.shoucangdata.splice(0, 5);
              }
            }
          } else {
            this.shoucangAlength = 0;
          }
        })

        .catch(() => {});
    }, //收藏功能接口
    moreShoucang() {
      this.$http
        .post(api.userCollectList(), {
          form: {}
        })
        .then(res => {
          this.ArrayDataA = res.data.data;

          this.shoucangdata = [];
          this.ArrayDataA.forEach(r => {
            this.shoucangdata.push({
              reportName: r.reportName,
              reportCode: r.reportCode,
              createTime: r.createTime.substring(0, 10),
              id: r.id,
              reportUrl: r.reportUrl
            });
          });

          this.shoucangAlengthB = 0;
          this.shoucangdata = this.shoucangdata;
        })
        .catch(() => {});
    }, //收藏更多功能
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
      this.Collectiondisplay=false;
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
