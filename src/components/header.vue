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
          logo图
        </div>

        <div class='fr userOut' style="margin-left: 17px;margin-right: 20px;">
          <div @click="outLogin">
            <img :src="Signout" style="vertical-align: sub;">
          </div>
        </div>
        <div class='fr' style="border: 1px solid #14171A;height: 48px;"></div>
        <div class='fr userOut' style="width:60px;position: relative;" @click="Collection()">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            <img :src="shoucang" alt="" style="margin-top: 16px;">
          </span>
          <div class="triangle_border_up" v-show="Collectiondisplay"><span></span></div>
          <div style="width:244px;background:white;position: absolute;top: 60px;right: -13px;border-radius: 7px;padding:10px;text-align: initial;"
            v-show="Collectiondisplay">
            <div>
              <ul>
                <li style="list-style: inside;color: black;"><span style="color:#707070;">借款明细表</span><span style="float:right;color:#707070;">2018.10.17</span></li>
              </ul>
            </div>
            <div style="border:1px solid pink"></div>
            <div style="margin-top:5px;"><span style="float:right;color:#4DA1FC;">更多...</span></div>
          </div>
        </div>
        <div class='fr' style="border: 1px solid #14171A;height: 48px;"></div>
        <div class='fr userOut' style="width:60px;" @click="HomePage">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            <img :src="fanhuishouye" alt="" style="margin-top: 15px;">
          </span>
        </div>
        <div class='fr' style="border: 1px solid #14171A;height: 48px;"></div>
        <!--用户名-->
        <div class='fr userOut' style="width:100px;margin-right: 10px;">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            <img :src="user" alt="" style="vertical-align: sub;margin-bottom: 3px;margin-right: 4px;">
            <span style="color: #BCC9DB">您好 {{name}}</span>
          </span>
        </div>
      </div>
      <div style="height:100%;width: 100%;border: none;">
        <el-container>
          <asides :listArr="arr"></asides>
          <!--<asides :listArr="arr" :statrA="stateA"  v-if="hackReset"></asides>-->
          <!--<div style="width: 100%;height: 50px;background:red;position: fixed;bottom: 0px;">asdf</div>-->
        </el-container>
      </div>
      <!-- 收藏功能 -->

    </div>

    <!--<ivd style="width: 100%;height: 40px;background:#1f283a;position: fixed;bottom: 0px;z-index: 999;">asdf</div>-->
    <!-- <bottoms></bottoms> -->
  </div>
</template>

<script>
import asides from "@/components/aside";
// import bottoms from "@/components/footer";
import { mapActions, mapGetters } from "vuex";
import api from "../api";
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
      shoucang:require("../assets/images/shoucang.png"),
      fanhuishouye:require("../assets/images/icon-fanhuishouye.png")
    };
  },
  computed: {
    ...mapGetters(["val", "hideheaderaside"])
  },
  created: function() {
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
    HomePage() {
      this.$router.push((name = "mainApp"));
    },
    Collection() {
      this.Collectiondisplay = !this.Collectiondisplay;
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
  border-width: 0 30px 30px;
  border-style: solid;
  border-color: transparent transparent #333; /*透明 透明  灰*/
  margin: 40px auto;
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
  top: -40px;
  left: 0px;
}
</style>
