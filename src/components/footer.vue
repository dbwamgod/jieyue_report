<template>
    <div style="width: 100%;height: 40px;line-height:40px;background:#1f283a;position: fixed;bottom: 0px;z-index: 999;color: #BCC9DB;">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <span style="font-size: 14px">地址：</span>
          <span style="font-size: 12px">中国北京市东城区银河SOHO大厦C座9层</span>
        </el-col>
        <el-col :span="6">
          <span style="font-size: 14px">联系我们：</span>
          <span style="font-size: 12px">sinan@jieyuechina.com</span>
        </el-col>
        <el-col :span="6">
          <span style="margin-left: 100px;font-size: 14px;">官网地址：</span>
          <span style="font-size: 12px;">www.jieyue.sinan.***.com</span>
        </el-col>
      </el-row>
    </div>
</template>

<script>

  export default {
    name:"bottoms",
    data () {

      return {

      }
    },
    components:{

    },
    created:function(){

    },
    methods: {


    },
    watch: {

    }
  }
</script>
<style scoped>

</style>
