<template>
  <div class="sidebar">
    <el-menu
      :collapse="isCollapse"
      :default-active="$route.path"
      class="el-menu-vertical-demo menu"
      active-text-color="#10B9D3"
      unique-opened
      router
    >
      <el-menu-item index="/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <template v-for="(menu_one,i) in menuData" >
        <el-submenu :key="i" :index="menu_one.path">
          <template slot="title">
            <i :class="menu_one.icon"></i>
            <span>{{menu_one.title}}</span>
          </template>
          <el-menu-item
            v-for="(menu_two,i) in menu_one.subs"
            :key="i"
            :index="menu_two.path"
          >
            <i :class="menu_two.icon"></i>
            <span>{{menu_two.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
  import bus from '../common/bus';
  export default {
    data() {
      return {
        isCollapse: false,
        menuData: [
          {
            icon: "el-icon-map-location",
            title: "Test",
            path: "p_mapManger",
            subs: [
              {
                path: "/test",
                title: "test1",
                icon: "el-icon-crop"
              },
              {
                path: "/news",
                title: "test2",
                icon: "el-icon-crop"
              }
            ]
          }
        ]
      };
    },
    created() {
      bus.$on('collapse', msg => {
        this.isCollapse = msg;
      });
    }
  }
</script>
<style lang='less'>
  .sidebar {
    display: flex;
    flex-flow: column nowrap;
    height: 100vh;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 300px;
    }
    .menu{
      height: 100%;
    }
  }
</style>
