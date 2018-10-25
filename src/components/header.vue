<template>
  <!--头部内容-->
  <div style="width: 100%;height:100%;" class="xiaoheader" id="xiaoheader">

    <div v-show="ArrayData">
      <div class="zyheader" style="line-height:50px;height:50px;width:100%;padding:0px;position: fixed;top: 0;z-index: 999;">
        <div class="fl logo1" v-show="val" style="cursor: pointer;line-height:50px;height:50px;width: 198px;">
          <img :src="pclogo" alt="logo图标" style="height: 31px;width: 103px;margin-top: 9px;">
        </div>
        <!--安全退出-->
        <div class='fr userOut' style="margin-left: 17px;margin-right: 20px;">
          <div @click="outLogin">
            <img :src="Signout" style="vertical-align: sub;"> 安全退出
          </div>
        </div>
        <div class='fr' style="border: 1px solid #14171A;height: 48px;"></div>
        <!--用户名-->
        <div class='fr userOut' style="width:100px;margin-right: 10px;">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            <img :src="user" alt="" style="vertical-align: sub;margin-bottom: 3px;margin-right: 4px;">
            <span style="color: white">{{name}}</span>
          </span>
        </div>
        <div class='fr userOut' style="width:100px;margin-right: 10px;">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
           1
          </span>
        </div>
        <div class='fr userOut' style="width:100px;margin-right: 10px;">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            2
          </span>
        </div>
        <div class='fr userOut' style="width:100px;margin-right: 10px;">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
           3
          </span>
        </div>
        <div class='fr userOut' style="width:100px;margin-right: 10px;">
          <span class="el-dropdown-link" style="color: rgba(135,157,227,0.40);font-size: 15px;">
            4
          </span>
        </div>

      </div>
      <div style="height:100%;width: 100%;border: none;margin-bottom: 40px">
        <el-container>
          <asides :listArr="arr"></asides>
          <!--<asides :listArr="arr" :statrA="stateA"  v-if="hackReset"></asides>-->
          <!--<div style="width: 100%;height: 50px;background:red;position: fixed;bottom: 0px;">asdf</div>-->
        </el-container>
      </div>
    </div>

    <!--<ivd style="width: 100%;height: 40px;background:#1f283a;position: fixed;bottom: 0px;z-index: 999;">asdf</div>-->
    <bottoms></bottoms>
  </div>
</template>

<script>
  import asides from "@/components/aside";
  import bottoms from "@/components/footer";
  import {
    mapActions,
    mapGetters
  } from "vuex";
  import api from "../api";
  export default {
    data() {
      return {
        name: "admin",
        mrRouter: "",
        mrIndex: "",
        stateA: "",
        hackReset: true,
        arr: [],
        pclogo: require("../assets/images/pclogo.png"),
        Signout: require("../assets/images/Signout.png"),
        user: require("../assets/images/user.png")
      };
    },
    computed: {
      ...mapGetters(["val"])
    },
    created: function () {
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
      asides,
      bottoms
    },
    methods: {
      ...mapActions(["stateRouter", "saveData"]),
      outLogin() {
        localStorage.removeItem("userName");
        localStorage.removeItem("userid");
        localStorage.removeItem("password");
        this.$router.push({
          name: "Login"
        });
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
</style>