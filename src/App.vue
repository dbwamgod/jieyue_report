<template>
  <div id="app">

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  name: "App",
  data() {
    return {
      bock: true
    };
  },
  created: function() {
    Array.prototype.remove = function(val, key) {
      for (let i = 0; i < this.length; i++) {
        if (this[i][key] === val[key] || this[i] == val) {
          this.splice(i, 1);
        }
      }
    };
    Array.prototype.removeRepet = function() {
      let arr = this;
      let unique = {};
      arr.forEach(item => {
        unique[JSON.stringify(item)] = item;
      });
      arr = Object.keys(unique).map(data => {
        return JSON.parse(data);
      });
      return arr;
    };
  },
  methods: {
    reload() {
      this.bock = false;
      this.$nextTick(function() {
        this.bock = true;
      });
    }
  }
};
</script>

<style>
/*公共样式*/
* {
  margin: 0;
  padding: 0;
}
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
legend,
button,
input,
textarea,
th,
td {
  margin: 0;
  padding: 0;
}
body,
button,
input,
select,
textarea {
  font: 12px/1.5tahoma, arial, \5b8b\4f53;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
}
address,
cite,
dfn,
em,
var {
  font-style: normal;
}
code,
kbd,
pre,
samp {
  font-family: couriernew, courier, monospace;
}
small {
  font-size: 12px;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
sup {
  vertical-align: text-top;
}
sub {
  vertical-align: text-bottom;
}
legend {
  color: #000;
}
fieldset,
img {
  border: 0;
}
button,
input,
select,
textarea {
  font-size: 100%;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: "微软雅黑";
  overflow: auto;
  background: rgb(241, 242, 246);
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.abs {
  position: absolute;
}
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.el-dialog__header {
  background-color: #ededed !important;
  padding: 8px 15px !important;
}
.el-dialog__header .el-dialog__title {
  font-size: 16px;
  color: #333744;
  font-weight: 700;
}
.el-table thead {
  color: #2D323A !important; 
}
.el-table {
  color: #4e5e71 !important;
}
.el-tag + .el-tag {
  margin-left: 10px !important;
}
.el-slider__bar {
  background-color: #67c23a !important;
}
.el-slider__button {
  border: 2px solid #67c23a !important;
}
.reportLists .el-table td,
.reportLists .el-table th.is-leaf {
  border: none !important;
}
.el-table .IsActive {
  color: #ff0000 !important;
}
.el-icon-arrow-left:before {
  content: "\E600";
  font-weight: bolder;
  cursor: pointer;
}
.typeValue .el-input {
  width: 85% !important;
}
.warning-row {
  background:#f9f9f9 !important;
}
.tree {
  background: #fff;
  padding: 20px 0 !important;
}
.el-tree-node__label {
  font-size: 16px !important;
}
.el-tree-node__content {
  height: 40px !important;
  line-height: 40px !important;
}
.el-autocomplete {
  float: left !important;
  width: 100% !important;
}
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.el-menu-item,
.el-submenu__title {
  height: 50px;
  line-height: 50px;
}
.el-submenu__title {
  font-weight: bold;
}
td {
  border-left: 0px !important;
  border-top: 0px !important;
}
tr:first-of-type td:first-of-type {
  visibility: visible !important;
}
/*弹出框去掉x*/
.el-icon-close:before {
  display: block !important;
}
.el-dialog__close {
  /* display: none!important; */
  font-size: 22px;
  font-weight: 700!important;
}
.el-dialog__headerbtn {
  top: 11px!important;
}
.el-table td div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* .el-table__header th,
.el-table__header tr {
  background-color: #ededed !important;
} */
.el-table {
  color: #2d323a !important;
  font-size: 14px;
}
.el-submenu .is-active::before {
  content: "";
  background-color: #8bd0ff;
  width: 4px;
  height: 50px;
  position: absolute;
  left: 0;
}
.el-button--primary{
  background-color:#5D99EC !important;
}
.el-dialog__header{
  border-radius: 5px 5px 0 0;
}
.el-dialog__footer{
   border-radius: 0 0 5px 5px;
}

.el-pagination.is-background .btn-next, 
.el-pagination.is-background .btn-prev, 
.el-pagination.is-background .el-pager li{
   background-color: #fafafa;
   border: 1px solid #E3E3E3;
}
.el-table td, .el-table th{
  padding-top:8px;
}
</style>
