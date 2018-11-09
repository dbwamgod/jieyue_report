<template>
  <div>
    <div style="width:100%;line-height: 50px;">
      <span style="width: 3px;height: 12px;background: #75AFFF;display: inline-block;"></span>
      <span style="font-size: 16px;color: #333744;">消息通知</span>
      <span style="float:right;font-size: 16px;color: #5594EB;" @click="Messagebacks"><img :src="Messageback" alt=""
          style="vertical-align: sub;margin-right:10px;">返回</span>
    </div>
    <div class="Messagenotification">
      <el-table :data="tableData" style="width: 100%;" stripe>
        <el-table-column type="index" width="50"> </el-table-column>

        <el-table-column label="标题">
          <template slot-scope="scope">
            <div :class="scope.row.type==0?'a':'b'" style="text-decoration:underline;cursor:pointer;" @click="getMore2(scope.row);dialogVisible = true">{{
              scope.row.content }}</div>
          </template>
        </el-table-column>

        <el-table-column label="发布时间" prop="date" sortable align='right'> </el-table-column>
      </el-table>

      <el-dialog title="内容" :visible.sync="dialogVisible" width="30%" center>
        <span>{{this.row.content}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="block" style="text-align: right;margin-top:10px;">
      <el-pagination @size-change="MessagehandleSizeChange" @current-change="MessagehandleCurrentChange" :current-page="messagecurrentPage-0"
        :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Messageback: require("../../assets/images/back.png"),
      messagecurrentPage: "",
      tableData: [
        {
          date: "2016-05-02 12:00:02",
          type: "0",
          content: "back我的内容我的内容我的内容我的内容我的内容1"
        },
        {
          date: "2016-05-04 12:00:02",
          content: "我的内容我的内容我的内容我的内容2",
          type: "0"
        },
        {
          date: "2016-05-01 12:00:02",
          content: "我的内容我的内容我的内容我的内容3",
          type: "0"
        },
        {
          date: "2016-05-03 12:00:02",
          content: "我的内容我的内容我的内容我的内容4",
          type: "1"
        },
        {
          date: "2016-05-03 12:00:02",
          content: "我的内容我的内容我的内容我的内容4",
          type: "1"
        },
        {
          date: "2016-05-03 12:00:02",
          content: "我的内容我的内容我的内容我的内容4",
          type: "1"
        },
        {
          date: "2016-05-03 12:00:02",
          content: "我的内容我的内容我的内容我的内容4",
          type: "0"
        },
        {
          date: "2016-05-03 12:00:02",
          content: "我的内容我的内容我的内容我的内容4",
          type: "0"
        },
        {
          date: "2016-05-03 12:00:02",
          content: "我的内容我的内容我的内容我的内容4",
          type: "0"
        },
        {
          date: "2016-05-03 12:00:02",
          content: "我的内容我的内容我的内容我的内容4",
          type: "1"
        }
      ],
      dialogVisible: false,
      row: ""
    };
  },
  created() {},
  methods: {
    Messagebacks() {
      this.$router.go(-1);
    },
    MessagehandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    MessagehandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getMore2(row) {
      this.row = row;
      console.log(row);
    }
  }
};
</script>
<style>
.Messagenotification .el-table th {
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
  text-align: center;
}

.Messagenotification td.el-table_1_column_3 {
  text-align: right;
  padding-right: 45px;
}
.Messagenotification td.el-table_1_column_8 {
  text-align: right;
  padding-right: 45px;
}
.Messagenotification .has-gutter tr th:nth-child(3) {
  text-align: right;
  padding-right: 45px;
}
.Messagenotification  .el-table__row td:nth-child(3){
  padding-right: 45px;
}
.a {
  color: balck;
}

.b {
  color: gold;
}
</style>
