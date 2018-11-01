<template>
  <div id="mainApp">

    <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="width:100%;height:300px;background:red;"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple" style="width:100%;height:300px;background:pink;" >2</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light" style="width:100%;height:300px;background:blue;" >3</div>
        </el-col>
      </el-row>
    </div>

    <!-- 日期记事本功能 -->
    <el-row v-show="flipVerticalShowA">
      <el-col :span="12">
        <div style="height: 270px;background-color: rgb(255,255,255);border-right: 1px solid #CBCBCB;padding-top: 17px;">
          <div id="calender">
            <div id="celender_head">
              <div id="left" class="celender_head" @click="left()">
                <img :src="rilizuojiantou" alt="">
              </div>
              <div id="celender_head_inner" class="celender_head">
                <p style="font-size: 18px;">{{header}}</p>
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
                <tr v-for="(item,index) in show" :key='index'>
                  <td :class="{now: item1.now, last_month:item1.attr == 'last_month',next_month:item1.attr == 'next_month'}"
                    v-for="(item1,index) in item " @click="showDate(item1,$event);" style="height: 28px;width: 28px;position: relative"
                    :key='index'>

                    <span :style="[Memo_b.indexOf(item1.Memo_a) > -1? {color:'red'}: '' ] ">{{item1.num}}</span>

                    <div :style=" hongdianA?'hongdian':'hongdianB'"></div>
                  </td>
                </tr>
              </table>
            </div>
            <div id="calender_foot">
              <p @click="backToday">回到今天</p>
            </div>
          </div>
        </div>
      </el-col>
      <!--添加记事本区域的内容-->
      <el-col :span="12" class="AddNotepad">
        <div style="height: 287px;background-color: rgb(255,255,255);">
          <div style="line-height: 50px;text-align: center;border-bottom: 1px solid #E1E1E1;">

            <span style="font-size: 18px;color: #333744;margin-right: 7px;">记事本</span>

            <el-button type="text" @click="dialogVisible = true"><img :src="xinjianjishiben" alt="" style="vertical-align: sub;"></el-button>
            <el-dialog title="添加内容" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">

              <div class="demo-input-suffix">
                <div class="block valueDate">
                  <div class="demonstration">时间：</div>
                  <el-date-picker v-model="valueDate" type="date" placeholder="选择日期"></el-date-picker>
                </div>
                <div style="float: left">标题：</div>
                <el-input placeholder="请输入内容" v-model="inputTitle" clearable></el-input>

              </div>


              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>

              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleTextarea">确 定</el-button>
              </span>
            </el-dialog>

          </div>
          <el-row>
            <el-col :span="12" style="border-right: 1px solid #E1E1E1; ">
              <div style="overflow-y: auto;height: 232px;">
                <ul>
                  <li class="headlineLi" style="padding-left: 23px;padding-right: 29px;line-height: 48px;height: 48px;"
                    v-for="(item,index) in headlines" @click="headlineLiC(index)" :key='index'>
                    <div class="headline" style="font-size: 16px;color: #333744;width: 100%;">{{item.name}}</div>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="overflow-y: auto;height: 232px;">
                b
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div id="app" class="box">
      <ul class="tabs clearfix">
        <li v-for="(tab,index) in tabsName" :key="index">
          <a href="#" class="tab-link" @click="tabsSwitch(index)" v-bind:class="{active:tab.isActive}">{{tab.name}}</a>
        </li>
        <li style="float:right;color:blue;margin-top: 20px;" @click="MoreManagementTasks">更多</li>
      </ul>


      <div class="cards" style="width: 100%;">
        <div class="tab-card" style="display: block;">
          <el-table :data="tableData" style="width: 100%">

            <el-table-column prop="address" :label="'共'+total+'条信息'"></el-table-column>
            <el-table-column prop="date" label="发布时间" sortable></el-table-column>

          </el-table>
        </div>
        <div class="tab-card">欢迎来到CSS模块</div>
      </div>
    </div>
    <div class="Agencytask">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待处理" name="first">
          <el-table :data="tableData" style="width: 100%">

            <el-table-column prop="address" :label="'共'+total+'条信息'"></el-table-column>
            <el-table-column prop="date" label="发布时间" sortable></el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已处理" name="second">配置管理</el-tab-pane>
      </el-tabs>
      <div class="Agencytaskshu">10</div>
      <div class="Agencytaskmore" @click="MoreManagementTasks">更多</div>
    </div>

  </div>
</template>
<script>
import api from "../../api";
export default {
  data() {
    return {
      flipVerticalShowA: true,
      rilizuojiantou: require("../../assets/images/icon-rilizuojiantou.png"),
      riliyoujiantou: require("../../assets/images/icon-riliyoujiantou.png"),
      xinjianjishiben: require("../../assets/images/icon-xinjianjishiben.png"),
      body: "",
      header: "",
      currentYear: "",
      currentMonth: "",
      currentDay: "",
      heads: ["日", "一", "二", "三", "四", "五", "六"],
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
      Memo_b: [],
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
        }
      ],
      total: 12,
      editableTabs2: [],
      activeName: "first"
    };
  },
  mounted() {
    this.setCalender(new Date());
  },
  methods: {
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
      this.setCalender(new Date(calenderrDate));
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
      this.setCalender(new Date(calender__Date));
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
      this.header = yy + "年" + mm + "月";
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
        date.Memo_a = yy + "-" + (mm == 1 ? 12 : mm - 1) + "-" + i;
        date.attr = "last_month";
        date.now = false;
        date.hongdian = false;
        this.datas.push(date);
      }
      //temp存放换行前上一个数据
      //下一行第一个数字
      var num_second = 7 - firstday_day + 1;
      // //存本月日期
      for (var i = 1; i <= cur_days; i++) {
        var date = new Object();
        date.num = i;
        date.Memo_a = yy + "-" + mm + "-" + i;
        date.attr = "this_month";
        if (
          i == this.currentDay &&
          this.currentMonth == new Date().getMonth() &&
          this.currentYear == new Date().getFullYear()
        ) {
          date.now = true;
          date.hongdian = true;
        } else {
          date.now = false;
          date.hongdian = false;
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
        date.Memo_a = yy + "-" + (mm == 12 ? 1 : mm + 1) + "-" + i;
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
      this.setCalender(new Date());
      if (index.attr == "last_month") {
        this.currentMonth = this.currentMonth;
      } else if (index.attr == "next_month") {
        this.currentMonth = this.currentMonth + 2;
      } else {
        this.currentMonth = this.currentMonth + 1;
      }
      this.currentDay = index.num;
    }, //点击日期获取年月日--切換內容
    dialogVisibleTextarea(e) {
      this.setCalender(new Date());
      this.dialogVisible = false;
      this.textarea = this.textarea;
      this.inputTitle = this.inputTitle;
      this.headlines.push({
        name: this.inputTitle
      });
      this.textarea = "";
      this.inputTitle = "";

      //先获取日期 然后转一手 之后 赋值给Memo_b
      if (this.valueDate) {
        var firstday;
        var Memo_c;
        var today = this.valueDate;
        var yy = today.getFullYear();
        this.currentYear = yy;
        var mm = today.getMonth() + 1; //today=2;mm=3
        this.currentMonth = mm - 1; //this.curr=2
        var dd = today.getDate();
        this.currentDay = dd; //30
        firstday = yy + "-" + mm + "-" + dd; //2018-3-1
        this.Memo_b.push(firstday);
      }
    }, //控制点击确定之后状态
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
        path: "demo2"
      });
      this.editableTabs2 = this.$store.state.editableTabs2;
      this.editableTabs2.push({
        title: "待办任务",
        name: 6,
        content: "demo2"
      });
      var arr = this.$store.state.editableTabs2;
      var result = [];
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i].name]) {
          result.push(arr[i]);
          obj[arr[i].name] = true;
        }
      }
      this.$store.commit("SAVE_EDITABLETABS2", result);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
#calender {
  overflow: auto;
  width: 90%;
  margin-left: 33px;
}

#celender_head {
  height: 40px;
  width: 100%;
  cursor: pointer;
}

.celender_head {
  line-height: 40px;
  text-align: center;
  height: 40px;
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
  margin-left: 60px;
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

#calender_body td span:hover {
  color: white;
  background: #5594eb;
  width: 28px;
  height: 28px;
  display: inline-block;
  border-radius: 50%;
}

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
  font-size: inherit;
  height: 30px;
  line-height: 30px;
  padding: 0 38px;
  width: 200px !important;
  background: white;
  border: 1px solid;
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
}

#mainApp .Agencytaskshu {
  padding: 2px;
  background-color: red;
  position: absolute;
  top: -1px;
  left: 46px;
  border-radius: 50%;
}
</style>