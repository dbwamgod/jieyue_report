<template>

  <div id="report-index">
    <div class="report-index-header">
      <div class="screen-config-item">
        <div class="screen-left">
          <div class="screen-left-item" @click="handClickScreen">
            <span>筛选条件</span>
            <img :src="require('@/assets/images/Signout.png')" alt="">
          </div>
          <div class="screen-left-item" @click="handClickShowWord">
            <span>字段展示</span>
          </div>
        </div>
        <div class="screen-right">
          <div class="screen-right-item">

          </div>
          <div class="screen-right-item">

          </div>
          <div class="screen-right-item">

          </div>

        </div>
      </div>

      <div class="show-screen-list">
        <el-row :gutter="10" style="padding-left:17px;border-size:border-box;">
          <el-col :span="20">
            <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-form-item v-for="(data, index) in screenList" :label="data.name">
                <el-input v-model="form[data.key]" placeholder="请输入内容" style="width:140px;" v-if="data.key=='input'" @change='inpoutChange'></el-input>
                <el-date-picker v-model="form[data.key]" type="date" placeholder="选择日期" :value-format="'yyyy-MM-dd'" v-if="data.key=='date'" style="width:140px;">
                </el-date-picker>
                <el-date-picker v-model="form[data.key]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-if="data.key=='submit'" style="width:240px;">
                </el-date-picker>
              </el-form-item>
              <p v-if="!screenList.length" style="height:40px;"></p>
            </el-form>

          </el-col>
          <el-col :span="4" style="text-align:right;">
            <el-button type="primary" style="margin-right:12px;" @click="handSubmit">查询</el-button>
          </el-col>
        </el-row>
      </div>

    </div>

    <div class="report-content-table">

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>

    </div>
    <!-- 筛选条件弹框 -->
    <el-dialog title="筛选条件" :visible.sync="dialogVisible" width="850px" :before-close="handleClose">
      <div>
        <el-checkbox-group v-model="checkList">
          <span v-for=" ( data, index) in checkboxList" style="display:inline-block;margin-right:30px; margin-bottom:20px; ">
            <el-checkbox :label="data.name" :key="index"></el-checkbox>
            <el-input placeholder="审批人" style="width:140px;margin-left:10px;" disabled v-if="data.key=='input'"></el-input>
            <el-date-picker type="date" placeholder="选择日期" disabled v-if="data.key=='date'" style="width:140px;margin-left:10px;">
            </el-date-picker>
            <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" disabled v-if="data.key=='submit'" style="width:240px;margin-left:10px;">
            </el-date-picker>
          </span>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">重置</el-button>
        <el-button type="primary" @click="handClick">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="字段展示" :visible.sync="dialogVisibleWord" width="720px" :before-close="handleCloseWord">
      <div class="wordDialog-header">
        <span>选中状态：</span>
        <el-input placeholder="请输入中文" v-model="wordDialogScreen" style="width:280px;">
          <img slot="suffix" class="el-input__icon el-icon-date" :src="require('@/assets/images/Signout.png')" alt="">
        </el-input>
      </div>
      <div style="padding-left:74px;padding-right:15px;box-sizing:border-box;margin-top:10px;">
        <div class="wordDialog-content">
          <div class="wordDialog-content-header clearfloat">
            <p class="wordDialog-content-header-l fl">全部</p>
            <p class="wordDialog-content-header-r fr">
              <el-checkbox v-model="checkedAllScreen" @change="changeAllScreen">全选</el-checkbox>
            </p>
          </div>
          <div class="wordDialog-content-check">
            <el-checkbox-group v-model="checkListWord">
              <el-checkbox v-for="(data, index) in checkListWordShow" :label="data.name" :key="index" style="margin-left:14px;"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div style="padding-left:74px;padding-right:15px;box-sizing:border-box;margin-top:10px;" v-if="!!checkListWord.length">
        <div class="wordDialog-content" style="height:190px;padding-left:13px;padding-top:15px;box-sizing:border-box;">
          <el-row >
            <el-col :span="3">
              已选字段
            </el-col>
            <el-col :span="21">
              <div class="wordDialog-selected" v-for="item in checkListWord">
                {{item}}
                <i class="el-icon-error wordDialog-selected-delete" @click="handClickremove(item)"></i>
              </div>
            </el-col>
          </el-row>

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleWord = false">取消</el-button>
        <el-button type="primary" @click="handClickWord">确定</el-button>
      </span>
    </el-dialog>
    <!-- 报表系统
        <el-checkbox-group v-model="checkList" @change='handChange'>
            <el-checkbox v-for=" ( data, index) in checkboxList" :label="data.name" :key="index"></el-checkbox>
        </el-checkbox-group>
        <el-button @click="handClick">默认按钮</el-button>
        <div>
            <p v-for="(data, index) in screenList" style="color:red;" :key="index">
                <el-input v-model="form[data.key]" placeholder="请输入内容" @change='inpoutChange'></el-input>
                {{data.name}}/{{data.key}}
            </p>
        </div> -->

  </div>
</template>
 <script>
import Vmodel from "@/view/reportTemplate/Vmodel";
export default {
  name: "reportIndex",
  data() {
    return {
      typeValue: "asfd",
      pare: false,
      dialogVisible: false, //筛选条件TYPE
      dialogVisibleWord: false, //字段
      wordDialogScreen: "",
      checkedAllScreen: false,
      form: {},
      screenList: [],
      checkList: [],
      checkListWord: [],
      wordShowList: [],
      checkListWordShow: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
        { name: "6" },
        { name: "7" },
        { name: "8" }
      ],
      tableData: [
        { date: 123, name: "123123123" },
        { date: 123, name: "123123123" }
      ],
      checkboxList: [
        {
          name: "时间",
          type: "time",
          key: "date"
        },
        {
          name: "搜索",
          type: "input",
          key: "input"
        },
        {
          name: "提交",
          type: "submit",
          key: "submit"
        }
      ]
    };
  },
  components: {
    Vmodel
  },
  created() {},
  watch: {
    checkListWord(newData) {
      if (newData.length === this.checkListWordShow.length) {
        this.checkedAllScreen = true;
      } else {
        this.checkedAllScreen = false;
      }
    }
  },
  methods: {
    handClick() {
      this.screenList = this.checkList.map(r => {
        let info = {};
        this.checkboxList.forEach(item => {
          if (item.name === r) {
            info.name = item.name;
            info.key = item.key;
            info.type = item.type;
          }
        });
        return info;
      });
      let screenListKey = this.screenList.map(r => {
        return r.key;
      });
      for (let item in this.form) {
        if (screenListKey.indexOf(item) == -1) {
          delete this.form[item];
        }
      }
      this.dialogVisible = false;
    },
    handClickWord() {
      this.dialogVisibleWord = false;
    },
    handSubmit() {
      console.log(this.form);
    },
    inpoutChange() {},
    handleClose() {
      this.dialogVisible = false;
      console.log("2222");
    },
    handClickScreen() {
      this.dialogVisible = true;
    },
    handleCloseWord() {
      this.dialogVisibleWord = false;
    },
    handClickShowWord() {
      this.dialogVisibleWord = true;
    },
    changeAllScreen(data) {
      if (data) {
        this.checkListWord = this.checkListWordShow.map(item => {
          return item.name;
        });
      } else {
        this.checkListWord = [];
      }
    },
    handClickremove(data) {
      let index =this.checkListWord.indexOf(data);
      this.checkListWord.splice(index,1)
    }
  }
};
</script>
 
 <style lang="less" scoped>
#report-index {
  & > .report-index-header {
    min-height: 112px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(226, 226, 226, 0.5);
    border-radius: 5px;
    & > .screen-config-item {
      height: 55px;
      border-bottom: 1px solid #e6e6e6;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .screen-left {
        display: -webkit-flex;
        display: flex;
        height: 34px;
        .screen-left-item {
          text-align: center;
          width: 98px;
          height: 32px;
          line-height: 32px;
          background: #fafafa;
          border: 1px solid #d9d9d9;
          margin-left: 17px;
          cursor: pointer;
          transition: 0.5s;
          &:hover {
            border-color: #3a96f2;
          }
          img {
            vertical-align: middle;
            width: 8px;
            height: 8px;
            // background:url(../../assets/images/password.png) no-repeat ;
          }
        }
      }
      .screen-right {
        height: 34px;
        display: -webkit-flex;
        display: flex;
        .screen-right-item {
          width: 34px;
          height: 34px;
          background: #ececec;
          margin-right: 12px;
          cursor: pointer;
        }
      }
    }
    & > .show-screen-list {
      margin-top: 12px;
      .el-form-item {
        margin-bottom: 9px;
      }
    }
  }

  & > .report-content-table {
    margin-top: 10px;
  }
  .wordDialog-header {
    font-size: 14px;
  }
  .wordDialog-content {
    border: 1px solid #c9c9c9;
    height: 260px;
    .wordDialog-content-header {
      height: 38px;
      background: #ededed;
      .wordDialog-content-header-l {
        font-size: 14px;
        color: #5d99ec;
        height: 34px;
        line-height: 34px;
        border-bottom: 3px solid #5d99ec;
        margin-left: 14px;
      }
      .wordDialog-content-header-r {
        height: 38px;
        line-height: 38px;
        margin-right: 14px;
      }
    }
    .wordDialog-content-check {
      margin-top: 19px;
      height: 200px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .wordDialog-selected {
      display: inline-block;
      position: relative;
      width:100px;
      height:34px;
      line-height: 34px;
      text-align: center;
      border: 1px solid #3a96f2;
      font-size: 14px;
      color: #008fff;
      letter-spacing: -0.34px;
      margin: 0 20px 20px 0;
      .wordDialog-selected-delete{
        position: absolute;
        top:-8px;
        right:-8px;
        font-size: 16px;
        color: #A2A2A2;
        z-index: 2;
        background: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>

 