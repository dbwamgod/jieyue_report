<template>
  <div id="mainApp">
    <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="width:100%;height:359px;background:#EDEDED;border-radius: 10px;">

            <div class="Agencytask">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="待处理" name="first" >
                  <div style="background:white;height:317px;border-radius: 0 0 10px 10px;">
                    <div style="margin-left: 42%;padding-top: 45px;">
                      <div><img :src="Nodata" alt=""></div>
                      <p style="font-size:16px;color:#54657E;margin-left:48px;margin-top: 18px;letter-spacing: 3px;">暂无数据…</p>
                    </div>
                    <!-- <div style="margin:0px auto;background:red;width:200px;height:200px;"></div> -->
                  </div>
                  <!-- <el-table :data="tableData" style="width: 100%"> -->

                  <!-- <el-table-column prop="address" :label="'共'+total+'条信息'"></el-table-column>
                    <el-table-column prop="date" label="发布时间" sortable></el-table-column> -->

                  <!-- </el-table> -->
                </el-tab-pane>
                <el-tab-pane label="已处理" name="second">
                  <div style="background:white;height:317px;">
                    <div style="margin-left: 42%;padding-top: 45px;">
                      <div><img :src="Nodata" alt=""></div>
                      <p style="font-size:16px;color:#54657E;margin-left:48px;margin-top: 18px;letter-spacing: 3px;">暂无数据…</p>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <div class="AgencytaskshuA" v-show="TaskCount.length !== 0"></div>
              <div class="AgencytaskshuB" v-show="TaskCount.length !== 0"></div>
              <div class="Agencytaskmore" v-show="TaskCount.length !== 0">更多<span style="vertical-align: super;">...</span></div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:14px;">
        <!-- 消息 -->
        <el-col :span="12">
          <div class="grid-content bg-purple" style="padding-right: 7px; position: relative;">
            <div style="background:#EDEDED;width:100%;height:465px;border-radius: 10px;">
              <div style="line-height:44px;padding:0 20px;">
                <span><img :src="xiaoxitongzhi" alt="" style="vertical-align: sub;;margin-right:10px;"></span><span
                  style="font-size:18px;font-weight: 700;">消息通知</span>
                <span style="float:right;font-size:14px;color:#4DA1FC;cursor: pointer;" @click="MoreManagementTasks" v-show="this.MessageFunctionLength != 0">更多</span>
              </div>
              <div style="background:white;height:416px;border-radius: 0 0 10px 10px;" v-show="tableData.length == 0">
                <el-table :data="tableData" style="width: 100%" stripe>

                  <el-table-column prop="address" :label="'内容'"></el-table-column>
                  <el-table-column prop="date" label="发布时间" sortable align='right'></el-table-column>

                </el-table>
                <div style="color:#BDBDBD;line-height:46px;font-size: 14px;"> <img :src="mailbox" alt="" style="margin-left: 12px;margin-right:3px;vertical-align: middle;"><span>共12条信息</span></div>
              </div>

              <div style="background:white;height:416px;border-radius: 0 0 10px 10px;" v-show="tableData.length !== 0">
                 <div style="width: 200px;height: 200px;margin: 0px auto;">
                   <div style="position: absolute;top: 50%;left: 40%;width: 100%;">
                     <img :src="Nocollection40" alt="" style="vertical-align: middle;"> <span style="font-size: 16px;color: rgb(84, 101, 126);letter-spacing: 1px;position: absolute; top: 10px;left: 43px;">暂无消息</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 日历 -->
        <el-col :span="12">
          <div class="grid-content bg-purple" style="width:100%;height:465px;background:#EDEDED;border-radius: 10px;margin-left: 7px;position: relative;">
            <!-- 头部 -->
            <div style="line-height:44px;padding:0 20px;position: relative;">
              <span><img :src="schedule" alt="" style="vertical-align: sub;margin-right:10px;"></span><span style="font-size:18px;font-weight: 700;">我的日程</span>
              <span style="float:right;font-size:12px;color:#4DA1FC;">
                <el-button type="text" @click="dialogVisible = true;dialogVisiblereste()">新建</el-button>
              </span>
              <el-dialog title="新建事件" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :show-close='false' :close-on-click-modal="false">
                <div style="position: absolute;top: -3px;right: 1px;width: 30px;height: 30px;color: #ccc;font-size: 20px;"
                  @click="dialogVisible = false;dialogVisibleCancel()">
                  <img :src="guanbitanchuang" alt="">
                  </div>

                <div class="demo-input-suffix" >
                  <div class="block valueDate" style="line-height: 30px;margin-bottom: 10px;">
                    <div class="demonstration"><span style="color:red;">*</span>日期：</div>
                    <!-- <el-date-picker v-model="valueDate" type="date" placeholder="选择日期"></el-date-picker> -->
                    <el-date-picker v-model="valueDate" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptions0" @focus='datetimeA' @blur="datetimeB"></el-date-picker>
                  </div>
                  <div class="datacontent" style="margin-bottom: 10px;">
                    <div style="float: left"><span style="color:red;">*</span>标题：</div>
                    <el-input placeholder="字数不能超过20个字符" v-model="inputTitle" ></el-input>
                  </div>
                  <div class="datacontent">
                  <div style="float: left"><span style="color:red;">*</span>内容：</div>
                  <el-input type="textarea" :rows="2" placeholder="字数不能超过100个字符" v-model="textarea"></el-input>
                  </div>
                 
                </div>

                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false;dialogVisibleCancel()">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleTextarea()">保存</el-button>
                </span>
              </el-dialog>
              <div id="Savesuccess" style="width:200px;height:50px;font-size:16px;background:#000000;opacity: 0.5;color:rgb(255, 255, 255);box-shadow: 0 0 black;position:absolute;top:-48px;left:-210px;z-index: 100000;text-align: center;
            " v-show="Savesuccess">保存成功</div>
            <div id="SavesuccessB" style="width:200px;height:50px;font-size:16px;background:#000000;opacity: 0.5;color:rgb(255, 255, 255);box-shadow: 0 0 black;position:absolute;top:-48px;left:-210px;z-index: 100000;text-align: center;
            " v-show="SavesuccessB">保存失败</div>
            </div>
            <!-- 日历部分 -->
            <div style="background:white;height:416px;padding: 0 15px;border-radius: 0 0 10px 10px;">
              <div style="height: 280px;background-color: rgb(255,255,255);padding-top: 17px;">
                <div id="calender">
                  <div id="celender_head">
                    <div id="left" class="celender_head" @click="left()">
                      <img :src="rilizuojiantou" alt="">
                    </div>
                    <div id="celender_head_inner" class="celender_head">
                      <p style="font-size: 18px;">{{dataheader}}</p>
                    </div>
                    <div id="right" class="celender_head" @click="right()">
                      <img :src="riliyoujiantou" alt="">
                    </div>
                  </div>
                  <div id="calender_body">
                    <table width="100%">
                      <tr class='head' style="color: #707070">
                        <td v-for="(head,index) in heads" :key='index'>{{head}}</td>
                      </tr>
                      <!-- border-radius: 50%;left: 50%;transform: translate(-50%);  ,item1.Memo_a == Memo_aindex?'Resolvingpower13':'Resolvingpower19' -->
                      <tr v-for="(item,index) in this.show" :key='index'  style=" position: relative;">  
                        <td :class="[{now: item1.now, last_month:item1.attr == 'last_month',next_month:item1.attr == 'next_month'}]"
                          v-for="(item1,index) in item " @click="showDate(item1,$event);" style="height: 32px;width: 32px;position: relative;"
                          :key='index' >
                          <span :style="item1.Memo_a == Memo_aindex?'border: 1px solid #5594eb;border-radius: 50%;':''" style="width: 29px;display: inline-block;line-height: 26px;">{{item1.num}}</span>
                          <span :style=" [Memo_c.indexOf(item1.Memo_a) > -1? {background:'red',position: 'absolute',left: '48%',bottom: '0px'}: '' ]" style="width:3px;height:3px;position: absolute;left: 48%;bottom: 10px;"></span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!-- <div id="calender_foot">
                    <p @click="backToday">回到今天</p>
                  </div> -->
                </div>
              </div>
              <!-- 显示日历内容 -->
              <div style="margin-top: 10px;border-top: 1px dashed #ccc;">
                <div style="height: 100px;overflow-y: auto;position: relative;">
                  <ul v-show="Memo_e.length>0">
                    <!-- <li class="headlineLi" style="padding-left: 23px;padding-right: 29px;line-height: 48px;height: 48px;"
                      v-for="(item,index) in headlines" @click="headlineLiC(index)" :key='index'>
                      <div class="headline" style="font-size: 16px;color: #333744;width: 100%;">{{item.name}}111</div>
                    </li> -->
                    <li style="list-style: inside;margin: 10px 15px;font-size: 14px;color: #c0c0c0;" v-for="(item,index) in this.Memo_e" :key="index">
                      <span class="newslimit">{{item.content}}</span>
                      <span style="float:right;">{{item.datas}}</span>
                    </li>
                  </ul>
                  <div v-show="Memo_e.length === 0">
                    <div>
                      <div style="padding-top: 30px;margin-left: 38%;">
                        <img :src="Nocollection40" alt=""> <span style="position: absolute;top: 42px;font-size: 16px;color: #54657E;">暂无工作事项</span> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import api from "../../api";
import Toast from "../../toast/toast.js";
let moment = require("moment");
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      flipVerticalShowA: true,
      rilizuojiantou: require("../../assets/images/icon-rilizuojiantou.png"),
      riliyoujiantou: require("../../assets/images/icon-riliyoujiantou.png"),
      xinjianjishiben: require("../../assets/images/icon-xinjianjishiben.png"),
      xiaoxitongzhi: require("../../assets/images/icon-xiaoxitongzhi.png"),
      schedule: require("../../assets/images/schedule.png"),
      Nodata: require("../../assets/images/Nodata.png"),
      Nocollection: require("../../assets/images/Nocollection.png"),
      NocollectionB: require("../../assets/images/NocollectionB.png"),
      Nocollection40: require("../../assets/images/Nocollection40.png"),
      mailbox: require("../../assets/images/mailbox.png"), //guanbitanchuang
      guanbitanchuang: require("../../assets/images/guanbitanchuang.png"),
      body: "",
      dataheader: "",
      dataheaders: "",
      currentYear: "",
      currentMonth: "",
      currentDay: "",
      heads: ["日", "一", "二", "三", "四", "五", "六"],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      datas: [],
      show: [],
      dialogVisible: false,
      dialogVisibleA: false,
      textarea: "",
      arrText: "",
      inputTitle: "",
      hongdianA: false,
      headlines: [],
      valueDate: "",
      Memo_c: [],
      Memo_d: [],
      Memo_e: [],
      Memo_aindex: "",
      firstday1: "",
      tabsName: [
        {
          name: "待处理",
          isActive: true
        },
        {
          name: "已处理",
          isActive: false
        }
      ],
      active: false,
      tableData: [
        {
          date: "2016-05-02 12:50.04",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04 12:50.04",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01 12:50.04",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03 12:50.04",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03 12:50.04",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03 12:50.04",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03 12:50.04",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      total: 12,
      editableTabs2: [],
      activeName: "first",
      currentdate: "",
      Savesuccess: false,
      SavesuccessB: false,
      TaskCount: "",
      search: "",
      MessageFunctionLength: ""
    };
  },
  computed: {
    ...mapGetters(["hideheaderaside"])
  },
  watch: {},
  created() {
    this.setCalender(new Date());
    this.Queryriqi();
  },
  methods: {
    datetimeA() {
      document.getElementsByClassName("el-input__inner")[0].style.border =
        "1px solid #3A96F2";
    },
    datetimeB() {
      document.getElementsByClassName("el-input__inner")[0].style.border =
        "1px solid ";
    },
    datasTime() {
      let date = new Date();
      let preDate = new Date(date.getTime());
      let M =
        preDate.getMonth() + 1 < 10
          ? preDate.getMonth() + 1
          : preDate.getMonth() + 1;
      let D = preDate.getDate() + " ";
      this.M = M;
      this.D = D;

      let a = new Array("日", "一", "二", "三", "四", "五", "六");
      let week = new Date().getDay();
      let str = "星期" + a[week];
      this.str = str;

      //取每月多少天
      date.setMonth(M + 1);
      date.setDate(0);
      date.getDate();
      let jdu = parseInt(D / date.getDate() * 100);
      let baifen = 100;
      if (jdu > baifen) {
        jdu = 100;
      } else {
        let jdu = parseInt(D / date.getDate() * 100);
      }
      this.Speedofprogress = jdu;
    },
    initline() {
      this.datas = [];
      this.show = [];
    },
    backToday() {
      this.setCalender(new Date());
      this.Queryriqi();
    },
    getcurrentDates(calender_Date) {
      //传入正常的Date（）类型数据  获取上个月天数
      this.initline();
      let months = calender_Date.getMonth();
      months = months + 1;
      calender_Date.setMonth(months);
      calender_Date.setDate(0);
      return calender_Date.getDate();
    },
    getlastDates(calenderdDate) {
      //传入正常的Date（）类型数据 获取下个月天数
      let curDate = calenderdDate;
      curDate.setDate(0);
      return curDate.getDate();
    },
    left() {
      this.initline();
      var yy = this.currentYear;
      var mm = this.currentMonth;
      console.log(this.currentYear);
      console.log(this.currentMonth);
      var dd = 1;
      if (yy == new Date().getFullYear() && mm == new Date().getMonth() + 1) {
        dd = new Date().getDate();
      }
      if (mm == 0) {
        mm = 12;
        yy = yy - 1;
        this.currentMonth = mm;
        this.currentYear = yy;
      }
      var calenderrDate = yy + "-" + mm + "-" + dd;
      var calenderrDates = yy + "-" + (mm > 9 ? mm : "0" + mm);
      this.dataheaders = calenderrDate;
      this.setCalender(new Date(calenderrDate));
      console.log(this.dataheaders);
      this.Queryriqi();
    },
    right() {
      this.initline();
      var yy = this.currentYear;
      var mm = this.currentMonth + 2;
      var dd = 1;
      if (yy == new Date().getFullYear() && mm == new Date().getMonth() + 1) {
        dd = new Date().getDate();
      }
      if (mm > 12) {
        mm = 1;
        yy++;
        this.currentMonth = mm;
        this.currentYear = yy;
      }
      var calender__Date = yy + "-" + mm + "-" + dd;
      var calender__Dates = yy + "-" + (mm > 9 ? mm : "0" + mm);

      this.dataheaders = calender__Dates;
      this.setCalender(new Date(calender__Date));
      console.log(this.dataheaders);
      this.Queryriqi();
    },
    setCalender(dateNow) {
      //显示日历部分
      var firstday;
      var today = dateNow;
      var yy = today.getFullYear();
      this.currentYear = yy;
      var mm = today.getMonth() + 1; //today=2;mm=3
      this.currentMonth = mm - 1; //this.curr=2
      var dd = today.getDate();
      this.currentDay = dd; //30
      firstday = yy + "-" + mm + "-1"; //2018-3-1
      //本月第一天是星期几,也表示前面有几个空的天数
      var firstday_day = new Date(firstday).getDay();
      //日历头
      this.dataheader = yy + "年" + mm + "月";
      this.dataheaders = yy + "-" + (mm > 9 ? mm : "0" + mm);
      var cur_days = this.getcurrentDates(today);
      //上一月有多少天
      var last_days = this.getlastDates(dateNow);
      //上个月从哪天开始出现
      var last_first_day = last_days - firstday_day + 1;
      //firstline
      //存上个月的日期
      for (var i = last_first_day; i <= last_days; i++) {
        var date = new Object();
        date.num = i;
        date.Memo_a =
          yy + "-" + (mm == 1 ? 12 : mm - 1) + "-" + (i > 9 ? i : "0" + i);
        date.attr = "last_month";
        date.now = false;
        this.datas.push(date);
      }
      //temp存放换行前上一个数据
      //下一行第一个数字
      var num_second = 7 - firstday_day + 1;
      // //存本月日期
      for (var i = 1; i <= cur_days; i++) {
        var date = new Object();
        date.num = i;
        date.Memo_a =
          yy + "-" + (mm > 9 ? mm : "0" + mm) + "-" + (i > 9 ? i : "0" + i);
        date.attr = "this_month";
        if (
          i == this.currentDay &&
          this.currentMonth == new Date().getMonth() &&
          this.currentYear == new Date().getFullYear()
        ) {
          date.now = true;
        } else {
          date.now = false;
        }
        this.datas.push(date);
      }
      for (
        var i = 1;
        i <= 42 - cur_days - (last_days - last_first_day + 1);
        i++
      ) {
        var date = new Object();
        date.num = i;
        date.Memo_a =
          yy + "-" + (mm == 12 ? 1 : mm + 1) + "-" + (i > 9 ? i : "0" + i);
        date.attr = "next_month";
        this.datas.push(date);
      }
      var k = 0;
      for (var i = 0; i < 6; i++) {
        var line = new Array();
        for (var j = 0; j < 7; j++) {
          line.push(this.datas[k++]);
        }
        this.show.push(line);
      }
    },
    showDate(index, e) {
      this.currentDay = index.num;
      this.Memo_e = [];
      for (var i = 0; i < this.Memo_d.length; i++) {
        if (index.Memo_a == this.Memo_d[i].data) {
          this.Memo_e.push({
            datas: this.Memo_d[i].datas,
            content: this.Memo_d[i].content
          });
        }
      }
      this.Memo_aindex = index.Memo_a;
    }, //点击日期获取年月日--切換內容
    dialogVisibleTextarea(e) {
      var a = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      var b = /[0-9a-z]/i;
      var c = /^(?!(\s+$))/;
      var vm = this;
      if (this.inputTitle.length > 20) {
        Toast({
          message: "标题不能超过20个字符",
          duration: 2000
        });
      } else if (this.valueDate == null|| this.valueDate == ""  ) {
        Toast({
          message: "日期不能为空",
          duration: 2000
        });
      } else if (this.inputTitle.length == 0) {
        Toast({
          message: "标题不能位空",
          duration: 2000
        });
      } else if (this.textarea.length > 100) {
        Toast({
          message: "内容不能超过100个字符",
          duration: 2000
        });
        // this.textarea = "";

        // this.dialogVisible = true;
      } else if (this.textarea.length == 0) {
        Toast({
          message: "内容不能为空",
          duration: 2000
        });
      } else if (!c.test(this.textarea) || !c.test(this.inputTitle)) {
        Toast({
          message: "内容不能为空格或标题不能为空格",
          duration: 2000
        });
        if (!c.test(this.textarea) && !c.test(this.inputTitle)) {
          this.textarea = "";
          this.inputTitle = "";
        } else if (!c.test(this.inputTitle)) {
          this.inputTitle = "";
        } else if (!c.test(this.textarea)) {
          this.textarea = "";
        }
      } else {
        this.Savesuccess = true;
        this.setCalender(new Date());
        this.dialogVisible = false;
        this.inputTitle = this.inputTitle;
        this.textarea = this.textarea;
        this.headlines.push({
          name: this.inputTitle
        });
        //先获取日期 然后转一手 之后 赋值给Memo_b
        if (this.valueDate) {
          var d = new Date(this.valueDate);
          this.firstday1 =
            d.getFullYear() +
            "-" +
            (d.getMonth() + 1) +
            "-" +
            d.getDate() +
            " " +
            (d.getHours() > 9 ? d.getHours() : "0" + d.getHours()) +
            ":" +
            (d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes()) +
            ":" +
            (d.getSeconds() > 9 ? d.getSeconds() : "0" + d.getSeconds());
          var firstday =
            d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        } else {
          this.firstday1 = "";
        }
        this.$http
          .post(api.notepadAdd(), {
            content: this.textarea,
            eventData: this.firstday1,
            masterNo: "01",
            title: this.inputTitle
          })
          .then(res => {
            this.ArrayData = res.data.data;
            this.Queryriqi();
          })
          .catch(() => {});
        this.textarea = "";
        this.inputTitle = "";
        setTimeout(function() {
          vm.Savesuccess = false;
        }, 1000);
      }
    }, //控制点击确定之后状态
    dialogVisiblereste() {
      this.valueDate = "";
    },
    dialogVisibleCancel() {
      this.inputTitle = "";
      this.textarea = "";
      this.valueDate = "";
    },
    headlineLiC(index) {
      console.log(index);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    tabsSwitch: function(tabIndex) {
      var tabCardCollection = document.querySelectorAll(".tab-card"),
        len = tabCardCollection.length;

      for (var i = 0; i < len; i++) {
        tabCardCollection[i].style.display = "none";
        this.tabsName[i].isActive = false;
      }
      this.tabsName[tabIndex].isActive = true;
      tabCardCollection[tabIndex].style.display = "block";
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    MoreManagementTasks() {
      this.$router.push({
        path: "Messagenotification"
      });
      // this.editableTabs2 = this.$store.state.editableTabs2;
      // this.editableTabs2.push({
      //   title: "消息",
      //   name: 6,
      //   content: "demo2"
      // });
      // var arr = this.$store.state.editableTabs2;
      // var result = [];
      // var obj = {};
      // for (var i = 0; i < arr.length; i++) {
      //   if (!obj[arr[i].name]) {
      //     result.push(arr[i]);
      //     obj[arr[i].name] = true;
      //   }
      // }
      // this.$store.commit("SAVE_EDITABLETABS2", result);
    }, //任务的跳转
    handleClick(tab, event) {
      if (event.srcElement.id == "tab-first") {
        document.getElementById("tab-first").style.fontWeight = "700";
        document.getElementById("tab-second").style.fontWeight = "100";
      } else if (event.srcElement.id == "tab-second") {
        document.getElementById("tab-second").style.fontWeight = "700";
        document.getElementById("tab-first").style.fontWeight = "100";
      }
    },
    Queryriqi() {
      this.Memo_c = [];
      this.Memo_d = [];
      this.Memo_e = [];
      this.$http
        .post(api.notepadList(), {
          form: {
            eventData: this.dataheaders,
            formatter: "yyyy-MM-dd HH:mm:ss"
          }
        })
        .then(res => {
          this.ArrayData = res.data.data;
          // console.log(this.ArrayData)
          if (this.ArrayData.length != 0) {
            this.ArrayData.forEach(r => {
              if (r.eventData) {
                this.Memo_c.push(r.eventData.substring(0, 10));
                this.Memo_d.push({
                  data: r.eventData.substring(0, 10),
                  content: r.content,
                  datas: r.eventData
                });
              }
            });
            this.Memo_d.push({
              data: "2029-09-09",
              content: "11",
              datas: "2019-09-09 00::00:00"
            });

            this.currentdate = moment().format("YYYY-MM-DD");
            for (var i = 0; i < this.Memo_d.length; i++) {
              if (this.currentdate == this.Memo_d[i].data) {
                this.bbb = false;
                this.Memo_e.push({
                  datas: this.Memo_d[i].datas,
                  content: this.Memo_d[i].content
                });
              }
            }
          }
        })
        .catch(() => {});
    }, //查询日期内容
    TaskInterface() {
      this.TaskCount = 0;
    }, //任务接口留位子
    MessageFunction() {
      this.MessageFunctionLength = 0;
    } //消息接口留位子
  }
};
</script>
<style>
#mainApp .is-active {
  background-color: #8bd0ff;
}

.grid-content .newslimit {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 60%;
  display: inline-block;
  position: absolute;
  font-size: 14px;
}

/* 日期功能区 */
.grid-content .el-dialog__header {
  background-color: #ededed !important;
  padding: 0px 23px 0px !important;
  border-radius: 5px 5px 0 0;
}

.grid-content .el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  width: 60% !important;
  border-radius: 5px;
}

.grid-content .el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 90%;
}

.grid-content .el-textarea {
  display: inline-block;
  width: 90%;
  vertical-align: bottom;
  font-size: 14px;
}

.grid-content .el-dialog__footer {
  padding: 10px 40px 6px;
  text-align: right;
  box-sizing: border-box;
  border-top: 0.5px solid #e1e1e1;
}
.grid-content textarea {
  height: 200px;
}
.grid-content #calender_body tr {
  height: 35px;
}
.grid-content .el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #cccccc;
  display: inline-block;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  outline: 0;
  padding: 0 9px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  background: #fafafa;
}
.grid-content .el-textarea__inner {
  display: block;
  resize: vertical;
  padding: 5px 9px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  color: #cccccc;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.grid-content .datacontent .el-textarea__inner {
  background: #fafafa;
}
.grid-content .el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 31px;
}
.grid-content .el-icon-circle-close {
  padding-left: 0px;
  position: absolute;
  left: 10px;
}
.grid-content .dialog-footer .el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #ededed;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  padding: 8px 13px;
  font-size: 16px;
  border-radius: 4px;
  width: 67px;
  height: 32px;
}
.grid-content .el-button--primary {
  color: #fff !important;
  background: #5d99ec !important;
  border-color: #5d99ec;
}
.grid-content .el-dialog__body {
  padding: 18px 20px;
  color: #606266;
  font-size: 14px;
}
.grid-content .el-dialog {
  width: 700px !important;
}
.grid-content
  button.el-button.el-picker-panel__link-btn.el-button--default.el-button--mini.is-plain {
  margin-right: 8px;
}
.grid-content .el-picker-panel__footer {
  padding: 10px 0;
}
.grid-content .el-date-picker .el-picker-panel__content {
  width: 292px;
}
.grid-content  .el-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

/* 消息功能区 */
.grid-content th.el-table_22_column_43.is-leaf {
  text-align: center;
}

.grid-content th.el-table_1_column_2.is-leaf.is-sortable {
  text-align: right;
}

.grid-content td.el-table_1_column_2 {
  text-align: right;
}
.grid-content .el-table td,
.el-table th {
  padding: 10px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
}

/* 任务功能区 */
#mainApp .AgencytaskshuA {
  padding: 5px;
  background-color: red;
  position: absolute;
  top: 8px;
  left: 103px;
  border-radius: 50%;
  z-index: 999;
}
#mainApp .AgencytaskshuB {
  padding: 5px;
  background-color: red;
  position: absolute;
  top: 8px;
  left: 199px;
  border-radius: 50%;
  z-index: 999;
}

#mainApp .Agencytask .el-tabs__item {
  padding: 10px 17px !important;
  height: 31px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 12px;
  display: inline-block;
  list-style: none;
  font-size: 16px;
  font-weight: inherit;
  color: #838383;
  position: relative;
  margin-left: 10px;
}

#mainApp .Agencytask .el-tabs__item.is-active {
  color: #008fff;
  background: white;
  border-radius: 10px 10px 0 0;
  border: 0 !important;
}

#mainApp .Agencytask .el-tabs__nav-scroll {
  overflow: hidden;
  padding: 10px 0 0 17px;
}

#mainApp .Agencytask .el-tabs__active-bar {
  width: 0 !important;
}

#mainApp .Agencytask .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0;
}

#mainApp .Agencytask .el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0px;
  z-index: 1;
}
#mainApp .Agencytask .grid-content.bg-purple-dark {
  border-radius: 10px !important;
}

#mainApp #tab-first {
  border: 1px solid #d5d5d5;
  border-radius: 10px 10px 0 0;
  border-bottom: 0;
}

#mainApp #tab-second {
  border: 1px solid #d5d5d5;
  border-radius: 10px 10px 0 0;
  border-bottom: 0;
}

#calender {
  overflow: auto;
  margin: 0 auto;
}

#celender_head {
  height: 40px;
  width: 61%;
  min-width: 500px;
  line-height: 44px;
  cursor: pointer;
  margin: 0 auto;
}

#left {
  height: 40px;
  width: 40px;
  float: left;
  margin-left: 25%;
}

#celender_head_inner {
  height: 40px;
  width: 98px;
  float: left;
  margin-left: 39px;
  line-height: 40px;
}

#right {
  height: 40px;
  width: 40px;
  float: left;
  margin-left: 60px;
}

#right p {
  color: white;
  font-size: 10px;
  text-align: center;
}

#calender_body td {
  width: 28px;
  text-align: center;
  line-height: 28px;
}

/* #calender_body td span:hover {
  color: white;
  background: #5594eb;
  width: 28px;
  height: 28px;
  display: inline-block;
  border-radius: 50%;
} */

#calender_body td.now {
  color: white;
}

#calender_body td.now span {
  color: white;
  background: #5594eb;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: inline-block;
}

#calender_body td .hongdian {
  position: absolute;
  background-color: red;
  width: 4px;
  height: 4px;
  display: inline-block;
  border-radius: 50%;
  margin-left: -2px;
  bottom: 3px;
  left: 50%;
}

.last_month {
  color: lightgray;
}

.next_month {
  color: lightgray;
}

#calender_foot {
  background-color: rgb(248, 248, 248);
  text-align: center;
  line-height: 37px;
  width: 89%;
  margin: 0 auto;
}

#calender_foot p {
  color: #707070;
  font-size: 10px;
}

#mainApp .AddNotepad .headline {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

#mainApp .AddNotepad .headlineLi:hover {
  background: #f3fbff;
}

#mainApp .AddNotepad .el-dialog__header {
  background-color: #8a3284 !important;
  padding: 0 !important;
}

#mainApp .AddNotepad .el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 86%;
  background: #fff;
  text-align: left;
}

#mainApp .valueDate .el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 86% !important;
  background: #fff;
}

#mainApp .valueDate .el-input__inner {
  -webkit-appearance: none;
  background-image: none;
  border-radius: 0px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #cccccc;
  display: inline-block;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  padding: 0 28px;
  width: 200px !important;
  background: white;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  background: #fafafa;
}

#mainApp .valueDate .demonstration {
  float: left;
}

#mainApp .valueDate .el-input__suffix {
  width: 20px;
  left: 154px;
}

#mainApp .box {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

#mainApp .tabs li {
  float: left;
  margin-right: 8px;
  list-style: none;
}

#mainApp .tabs .tab-link {
  display: block;
  width: 90px;
  height: 49px;
  text-align: center;
  line-height: 49px;
  text-decoration: none;
}

.tabs .tab-link.active {
  height: 47px;
  border-bottom: 1px solid blue;
  transition: 0.3s;
  color: blue;
}

#mainApp .cards {
  float: left;
}

#mainApp .cards .tab-card {
  display: none;
}

#mainApp .clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}

.clearfix {
  zoom: 1;
}

#mainApp .Agencytask {
  position: relative;
  width: 100%;
  height: 100%;
}

#mainApp .Agencytaskmore {
  position: absolute;
  top: 6px;
  right: 10px;
  cursor: pointer;
  color: #409eff;
}
</style>
