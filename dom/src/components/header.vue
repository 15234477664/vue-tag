<template>
  <div class="header">
    <div class="left">
      <ul>
        <li  class="collapse-btn"  @click="collapseChange">
          <i class="el-icon-menu"></i>
        </li>
      </ul>
    </div>

  </div>

</template>
<script>
  import bus from '../common/bus'
  export default{
    data(){
      return{
        isCollapse:false,
      }
    },
    methods:{
      collapseChange(){
        this.isCollapse=!this.isCollapse
        bus.$emit('collapse',this.isCollapse)
      }}}
</script>

<style lang='less'>

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    // font-size: 22px;
    color: #fff;
    background-color: #11c26d;
    height: 60px;
    .left{
      .collapse-btn {
        width: 45px;
      }
    }
    ul {
      list-style: none;
      li {
        float: left;
        line-height: 60px;
        height: 60px;
        text-align: center;
        padding: 0 10px;
        cursor: pointer;
      }
      i {
        line-height: 60px;
      }
      li:hover {
        background-color: #337ecc;

      }
    }
  }
</style>
