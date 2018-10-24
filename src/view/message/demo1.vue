<template>
  <div>
      <div id="calender">
        <div id="celender_head">
          <div id="left" class="celender_head" @click="left()"> < </div>
          <div id="celender_head_inner" class="celender_head"><p >{{header}}</p></div>
          <div id="right" class="celender_head" @click="right()"> > </div>
        </div>
        <el-button type="text" @click="dialogVisible == false ? true:false " style="width: 100%;">
          <div id="calender_body">
            <table width="100%">
              <tr class='head'>
                <td v-for="(head,index) in heads"  :key="index">{{head}}</td>
              </tr>
              <tr v-for="(item,index) in show"  :key="index">
                <td :class="{now: item1.now, last_month:item1.attr == 'last_month',next_month:item1.attr == 'next_month'}"
                    v-for="(item1,index) in item " @click="showDate(item1)"  :key="index">
                    {{item1.num}}
                    <p @click.stop="aaaaaa($event,index)">记事本</p>
                </td>
              </tr>
            </table>
          </div>
        </el-button>
        <div id="calender_foot">
          <p @click="backToday">回到今天</p>
        </div>
      </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        :clearable="true"
        v-model="textarea">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleTextarea">确 定</el-button>
      </span>
    </el-dialog>
    <!--<div>-->
      <!--{{this.textarea}}-->
    <!--</div>-->
    <select name="select" id="pro_areaCode" v-model="val">
      <option value="0000000000" selected="selected">请选择</option>
      <option v-for="(item,index) in lists"  :key="index">{{item,index}}</option>

      <!--<option value="110000">北京市</option>-->
      <!--<option value="120000" selected="selected">天津市</option>-->
      <!--<option value="130000">河北省</option>-->
      <!--<option value="140000">山西省</option>-->
      <!--<option value="150000">内蒙古自治区</option>-->
    </select>
    <select name="select" id="pro_areaCode" v-model="val">
      <option value="0000000000" selected="selected">请选择</option>
      <option v-for="(item,index) in lists"  :key="index">{{item,index}}</option>

      <!--<option value="110000">北京市</option>-->
      <!--<option value="120000" selected="selected">天津市</option>-->
      <!--<option value="130000">河北省</option>-->
      <!--<option value="140000">山西省</option>-->
      <!--<option value="150000">内蒙古自治区</option>-->
    </select>

    <div style="position: relative;">
      <div style="width: 1200px;height: 5px;background: black;margin-top: 122px;margin-bottom: 200px;"></div>
      <div style="position: absolute;top: -8px;">
        <ul>
          <li style="width: 20px;height: 20px;background: red;float: left"></li>
          <li style="width: 20px;height: 20px;background: red;float: left"></li>
          <li style="width: 20px;height: 20px;background: red;float: left"></li>
          <li style="width: 20px;height: 20px;background: red;float: left"></li>
          <li style="width: 20px;height: 20px;background: red;float: left"></li>
        </ul>
      </div>
    </div>
 
  <div>sdafasdf</div>
  </div>

</template>

<script>
  export default {
    data (){
      return {
        body:'',header:'',currentYear:'',currentMonth:'',currentDay:'',
        heads:["日","一","二","三","四","五","六"],
        datas:[],
        show:[],
        dialogVisible: false,
        textarea: '',
        arrText:'',
        lists:['北京市','天津市','1','2','3','4','5','6'],
        val:'请选择',
        addnum:0
      }
    },
    created(){
      //this.setCalender(new Date())
      this.aaa()
    },
    watch:{
     /* val(){
          this.addnum = ++this.addnum;
      }*/
    },
    methods:{
      aaa(){
        var a  = 1 ;
        var b =  2 ;
        if(a==1){
          if(b ==2 ){
            return
          }
        }
        alert(111)
      },
      aaaaaa(e,index) {
       // console.log(e.target.html()) ;
       console.log(e.target.innerHTML);
        console.log(index);
        this.arrText=e.target.innerHTML
      },
      initline:function(){
        this.datas=[]
        this.show=[];
      },
      backToday:function(){
        this.setCalender(new Date())

      },
      getcurrentDates:function (calender_Date) {//传入正常的Date（）类型数据  获取上个月天数
        this.initline()
        var months=calender_Date.getMonth();
        months=months+1;
        calender_Date.setMonth(months);
        calender_Date.setDate(0)
        return calender_Date.getDate();
      },
      getlastDates:  function (calenderdDate) {//传入正常的Date（）类型数据 获取下个月天数
        var curDate = calenderdDate;
        curDate.setDate(0);
        return curDate.getDate();
      },
      left:function(){
        this.initline()
        var yy=this.currentYear;
        var mm=this.currentMonth;
        var dd=1
        if(yy==new Date().getFullYear()&&mm==new Date().getMonth()+1){
          dd=new Date().getDate();
        }
        if(mm==0){
          mm=12;yy=yy-1;
          this.currentMonth=mm;
          this.currentYear=yy;
        }
        var calenderrDate=yy+"-"+mm+"-"+dd;
        this.setCalender(new Date(calenderrDate));
      },
      right:function(){
        this.initline()
        var yy=this.currentYear;
        var mm=this.currentMonth+2;
        var dd=1
        if(yy==new Date().getFullYear()&&mm==new Date().getMonth()+1){
          dd=new Date().getDate();
        }
        if(mm>12){
          mm=1;yy++;
          this.currentMonth=mm;
          this.currentYear=yy;
        }
        var calender__Date=yy+"-"+mm+"-"+dd;
        this.setCalender(new Date(calender__Date));
      },
      setCalender:function(dateNow){
        //显示日历部分
        var firstday;
        var today = dateNow;
        var yy = today.getFullYear();
        this.currentYear=yy;
        var mm = today.getMonth() + 1;//today=2;mm=3
        this.currentMonth=mm-1;//this.curr=2
        var dd = today.getDate();
        this.currentDay=dd;//30
        firstday = yy + "-" + mm + "-1";//2018-3-1
        //本月第一天是星期几,也表示前面有几个空的天数
        var firstday_day = new Date(firstday).getDay();
        //日历头
        this.header=yy+"年"+mm+"月";
        var cur_days = this.getcurrentDates(today);
        //上一月有多少天
        var last_days = this.getlastDates(dateNow);
        //上个月从哪天开始出现
        var last_first_day = last_days - firstday_day + 1;
        //firstline
        //存上个月的日期
        for (var i = last_first_day; i <= last_days;i++) {
          var date=new Object();
          date.num=i;
          date.attr='last_month'
          date.now=false
          this.datas.push(date);
          // this.dateData.firstline.push(date);
        }
        //temp存放换行前上一个数据
        //下一行第一个数字
        var num_second = 7 - firstday_day + 1;
        // //存本月日期
        for (var i = 1; i <= cur_days; i++) {
          var date=new Object();
          date.num=i;
          date.attr='this_month'
          if(i == this.currentDay && this.currentMonth == new Date().getMonth()&&this.currentYear==new Date().getFullYear()){
            date.now=true
          }else{
            date.now=false
          }
          this.datas.push(date);
        }
        for(var i=1;i<=42-cur_days-(last_days-last_first_day+1);i++){
          var date=new Object();
          date.num=i;
          date.attr='next_month'
          this.datas.push(date);
        }

        var k=0;
        for(var i=0;i<6;i++){
          var line=new Array();
          for(var j=0;j<7;j++){
            line.push(this.datas[k++]);
          }
          this.show.push(line);
        }

      },
      showDate(index){

        if(index.attr == 'last_month'){

           this.currentMonth = this.currentMonth

          // console.log('月',this.currentMonth);
        }else if(index.attr == 'next_month'){

           this.currentMonth = this.currentMonth+2

          // console.log('月',this.currentMonth+2);
        }else{

           this.currentMonth = this.currentMonth+1

          // console.log('月',this.currentMonth+1);
        }
        this.currentDay = index.num
        // console.log('年',this.currentYear);
        // console.log('月',this.currentMonth);
        // console.log('日',index.num);
        // if(this.textarea){
          this.dialogVisible = true;
        // }
        this.textarea = '';
      }, //点击日期获取年与日日---控制弹出框
      dialogVisibleTextarea(){

          // console.log('年', this.currentYear);
          // console.log('月', this.currentMonth);
          // console.log('日', this.currentDay);
          this.dialogVisible = false;
          this.setCalender(new Date())
          this.textarea =  this.textarea;

      }, //控制点击确定之后状态
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    },
    beforeRouteEnter (to, from, next) {
      //  console.log(to)
      //  console.log(from)
      //  console.log(next)
       next();
   },

  }
</script>
<style lang="less scoped>

  @red: red;
  @gray:rgb(248,248,248);

  #calender{
    overflow:auto ;
    position: relative;
    top: 73px;
    left: 93px;
    width: 23%;
    border:2px solid rgb(170, 105, 231);

    #celender_head{
      height: 40px;
      width: 100%;
      background-color: blue;
      cursor: pointer;

      .celender_head{
        line-height: 40px;
        text-align: center;
        height: 40px;
      }

      #left{
        height: 40px;
        width: 40px;
        float: left;
        color: white;
      }

      #celender_head_inner{
        height: 40px;
        width: 80px;
        float: left;
        margin-left: 60px;
        line-height:40px
      }

      #right{
        height: 40px;
        width: 40px;
        float: left;
        margin-left: 60px;
        color: white;
      }

      p{
        color: white;
        font-size: 10px;
        text-align: center;
      }
    }

    #calender_body {

      .head td:hover{
        background-color: @gray
      }

      td{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        &:hover{
          background-color: @red;
        }
        &.now {
          color: white;
          background: red;
        }

      }
      .last_month {
        color:lightgray;
        &:hover {
          background-color: @gray
        }
      }

      .next_month{
        color:lightgray;
        &:hover {
          background-color: @gray
        }
      }
    }


    #calender_foot{
      background-color: @gray;
      text-align: center;
      line-height:40px;
      p{
        color: blue;
        font-size: 10px;
      }
    }
  }


</style>
