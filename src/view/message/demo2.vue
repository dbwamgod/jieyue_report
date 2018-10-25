<template>
  <div>
       <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index"  width="50"> </el-table-column>

            <el-table-column label="内容" >
              <template slot-scope="scope">
                 <div :class="scope.row.type==0?'a':'b'" style="text-decoration:underline;cursor:pointer;" @click="getMore2(scope.row);dialogVisible = true">{{ scope.row.content }}</div>
              </template>
            </el-table-column>

            <el-table-column label="发布时间" prop="date" sortable > </el-table-column>
       </el-table>

          <el-dialog
            title="内容" :visible.sync="dialogVisible" width="30%" center>
            <span>{{this.row.content}}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
              
      </div>
</template>

<script>
  export default {
    data (){
      return {
         tableData: [{
          date: '2016-05-02 12:00:02',
          type:'0',
          content: '我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容1'
        }, {
          date: '2016-05-04 12:00:02',
          content: '我的内容我的内容我的内容我的内容2',
          type:'0'
        }, {
          date: '2016-05-01 12:00:02',
          content: '我的内容我的内容我的内容我的内容3',
          type:'0'
        }, {
          date: '2016-05-03 12:00:02',
          content: '我的内容我的内容我的内容我的内容4',
          type:'1'
        }],
         dialogVisible: false,
         row:''
      }
    },
    created(){
      
    },
    methods:{ 
      aaa(){
        alert(1)
      },
      centerDialogVisible(){
        alert(1)
      },
      getMore2(row){
          this.row = row
          console.log(row)
      }
   },

  }
</script>
<style>
 .a{
   color: balck;
 }
 .b{
   color:gold
 }

</style>
