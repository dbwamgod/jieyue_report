<template>

    <div style="height:100%; background-color: rgb(241, 242, 246)">
        报表系统
        <el-checkbox-group v-model="checkList" @change='handChange'>
            <el-checkbox v-for=" ( data, index) in checkboxList" :label="data.name" :key="index"></el-checkbox>
        </el-checkbox-group>
        <el-button @click="handClick">默认按钮</el-button>
        <div>
            <p v-for="(data, index) in screenList" style="color:red;" :key="index">
                <el-input v-model="form[data.key]" placeholder="请输入内容" @change='inpoutChange'></el-input>
                {{data.name}}/{{data.key}}
            </p>
        </div>
    <div>
   
    </div>
    <Vmodel v-model="pare" :value='typeValue'> </Vmodel>
    {{pare}}
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
  components: {
    Vmodel
  },
  created() {
    console.log(this.$router, this.$route);
  },
  methods: {
    handClick() {
      // console.log('screen',this.screenList);
      // console.log(this.form);
      let screenListKey = this.screenList.map(r => {
        return r.key;
      });
      console.log(screenListKey);
      for (let item in this.form) {
        if (screenListKey.indexOf(item) == -1) {
          delete this.form[item];
        }
      }
      console.log(this.form);
    },
    handChange(data) {
      this.screenList = data.map(r => {
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
      console.log(this.screenList);
    },
    inpoutChange() {}
  }
};
</script>
 
 <style>
</style>
 