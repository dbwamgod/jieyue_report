<template>
    <div class="home">
        <el-container  style="width: 100%;height: 100%;">
            <headers></headers>
        </el-container>
    </div>
</template>

<script>
import headers from '@/components/header'
    export default {
        name: 'home',
        data () {

            return {
                
            }
        },
        components:{
            headers,
        },
        created:function(){
            
        },
        methods: {

            
        },
        watch: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home{
        width: 100%;
        height: 100%;
        /*overflow: hidden;*/
      /*overflow-x: hidden;*/
    }
    .home .el-container{
        width: 100%;
        height: 100%;
    }
    .el-aside {
    	color: #333;
  	}
</style>
