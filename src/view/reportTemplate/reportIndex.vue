<template>
    <div style="height:100%; background-color: rgb(241, 242, 246)">
        报表系统
        <el-checkbox-group v-model="checkList" @change='handChange'>
            <el-checkbox v-for=" ( data, index) in checkboxList" :label="data.name"></el-checkbox>
        </el-checkbox-group>
        <el-button @click="handClick">默认按钮</el-button>
        <div>
            <p v-for="(data, index) in screenList" style="color:red;" >
                <el-input v-model="form[data.key]" placeholder="请输入内容" @change='inpoutChange'></el-input>
                {{data.name}}/{{data.key}}
            </p>
        </div>
    </div>
</template>
 <script>
export default {
  name: "reportIndex",
  data() {
    return {
      form: {},
      screenList: [],
      checkList: [],
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
  created() {
    console.log(this.$router, this.$route);
  },
  methods: {
    handClick() {
      console.log(this.form);
    },
    handChange(data) {
      this.screenList= data.map(r=>{
          let info={};
          this.checkboxList.forEach(item=>{
              if(item.name===r){
                  info.name=item.name;
                  info.key=item.key;
              }
          })
          return info;
      })
   
    },
    inpoutChange () {
        
    }
  }
};
</script>
 
 <style>
</style>
 