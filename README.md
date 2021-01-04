# vue-tag
vue中实现tag标签
### 1，安装scss插件
```html
npm i node-sass sass-loader -S
```
### 2，安装element-ui
```html
npm i element-ui -S
```
```js
main.js中引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```
### App.vue
```html
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
 ```
 ```css
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
</style>
```

### main.js
```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
 
Vue.config.productionTip = false
 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

### router文件夹下的index.js


```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
 
Vue.use(VueRouter)
 
const routes = [
  {
    path: '/',
    name: 'home',
    redirect:'/index',
    component: Home,
    meta:{title:'首页'},
    children:[
      {
        path:'/index',
        name:'index',
        component:()=>import('@/views/index.vue'),
        meta:{
          title:'系统首页',
          hideclose:true
        }
      },
      {
        path:'/test/test1',
        name:'test1',
        component:()=>import('@/views/test/test1.vue'),
        meta:{
          title:'test1'
        }
      },
      {
        path:'/test/test2',
        name:'test2',
        component:()=>import('@/views/test/test2.vue'),
        meta:{
          title:'test2'
        }
      }
    ]
  }
]
 
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
 
export default router
```

### common文件夹目录
### bus.js
```html
import Vue from 'vue';
// 使用 Event Bus
const bus = new Vue();
export default bus;
header.vue

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
```
```js
<script>
  import bus from './bus'
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
 ```
 ```css
<style lang='scss'>
 
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
```
### aside.vue
```html
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
```
```js
<script>
import bus from './bus';
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
              path: "/test/test1",
              title: "test1",
              icon: "el-icon-crop"
            },
            {
              path: "/test/test2",
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
```
```css
<style lang='scss'>
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
```

### tag.vue
```html
<template>
  <div class="_tag">
    <el-scrollbar style="margin-right: 6px;">
      <div class="left">
        <el-tag
          v-for="tag in tagsList"
          :key="tag.title"
          :closable="!tag.hideclose"
          :type="isActive(tag)"
          @close="handleCloseTag(tag)"
        >
          <router-link :to="tag.path" class="tag-title">{{ tag.title }}</router-link>
        </el-tag>
      </div>
    </el-scrollbar>
 
    <el-dropdown @command="handleCloseBtn" class="_dropdown">
      <el-button type="primary" size="small">
        标签选项
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeOther">关闭其它</el-dropdown-item>
        <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
```
```css
<style lang="scss">
._tag {
  // border: 1px solid green;
  flex: 0 0 40px;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  justify-content: space-between;
  .left {
    display: flex;
    height: 40px;
    align-items: center;
    .el-tag {
      margin-left: 6px;
      .tag-title {
        color: black;
        padding: 8px 2px;
        text-decoration: none;
      }
    }
  }
  ._dropdown {
    height: 40px;
    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) -3px 0px 15px 3px;
    padding: 0 5px;
  }
}
</style>
 ```
 ```js
<script>
export default {
  data() {
    return {
      tagsList: []
    };
  },
  mounted() {
    this.setTags(this.$route);
    // console.log("this.$route:", this.$route);
  },
  methods: {
    //设置标签
    setTags(route) {
      const isExsit = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      if (isExsit == false) {
        this.tagsList.push({
          title: route.meta.title, //标签名
          name: route.name, //路由里的name对应vue页的name,标签列表里的name可以做vue页面缓存
          path: route.fullPath, //路由
          hideclose: route.meta.hideclose ? route.meta.hideclose : false //是否隐藏关闭
        });
      }
    },
    //关闭标签
    handleCloseTag(tag) {
      this.tagsList.splice(this.tagsList.indexOf(tag), 1);
      // array.splice(index,howmany) 从索引为index处删除howmany个元素
      if (this.tagsList.length > 0) {
        this.$router.push(this.tagsList[this.tagsList.length - 1].path);
      } else {
        // this.$router.push("/index");
        this.$router.push({ name: "sadmasMain" });
      }
    },
    //关闭功能按钮
    handleCloseBtn(command) {
      if (command == "closeOther") {
        //关闭其它,保留没有删除的标签。find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
        var activeTag = this.tagsList.find(item => {
          return item.path == this.$route.fullPath;
        }); //查找第一个满足的
        var noCloseTags = this.getNoCloseTabs();
        if (
          noCloseTags.some(item => {
            return item.path == activeTag.path && item.title == activeTag.title;
          }) == false
        ) {
          //不包含
          noCloseTags = noCloseTags.concat(activeTag);
        }
        this.tagsList = noCloseTags;
      } else if (command == "closeAll") {
        //关闭所有,保留没有删除的标签
        this.tagsList = this.getNoCloseTabs();
        this.$router.push(this.tagsList[this.tagsList.length - 1].path);
      }
    },
    getNoCloseTabs() {
      //获取没有删除的标签
      var noCloseList = this.tagsList.filter(item => {
        return item.hideclose == true;
      });
      return noCloseList;
    },
    //是否选中
    isActive(tag) {
      if (tag.path == this.$route.fullPath) {
        return "";
      } else {
        return "info";
      }
    }
  },
  watch: {
    //路由变化,设置标签
    $route(newValue, oldValue) {
      this.setTags(newValue);
    }
  }
};
</script>
```

### footer.vue
```html
<template>
  <el-footer class="_footer">
    <span class="text">footer@2019</span>
  </el-footer>
</template>
<style lang="scss">
._footer {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top:1px solid #e6e6e6;
  .text {
    color: #606266;
  }
}
</style>
```
### test文件夹目录
### test1.vue
```html
<template>
    <div class="test1">这是test1.vue</div>
</template>
<style lang="scss">
.test1 {
  display: flex;
  flex: auto;
}
</style>
```
### test2.vue
```html
<template>
    <div class="test2">这是test2.vue</div>
</template>
<style lang="scss">
.test2 {
  display: flex;
  flex: auto;
}
</style>
```
### index.vue
```html
<template>
    <div>首页</div>
</template>
```

### Home.vue
```html
<template>
 
  <div class="homeContainer">
     <vAside></vAside>
     <div class="headContainer">
        <vHeader></vHeader>
           <div class="tagContainer">
               <vTag></vTag>
               <div class="mainContainer">
                  <div class="main">
                     <router-view></router-view>
                  </div>
                  <vFooter class="footer"></vFooter>
               </div>
            </div>
      </div>
  </div>
  
</template>
```
```js
<script>
import vHeader from '@/views/common/header';
import vAside from '@/views/common/aside';
import vTag from '@/views/common/tag';
import vFooter from '@/views/common/footer';
 
export default {
  data() {
    return {
         isCollapse: false
    };
  },
  components: { vHeader, vAside,vTag,vFooter}
};
</script>
```
```css
<style lang='scss'>
.homeContainer{
  // border: 1px solid red;
        box-sizing: border-box;
 
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
    .headContainer{
        // border: 1px solid red;
        box-sizing: border-box;
 
      display: flex;
      flex-flow: column nowrap;
      flex: auto;
      .tagContainer{
        //  border: 1px solid blue;
         display: flex;
         flex-flow: column nowrap;
         flex: auto;
 
          .mainContainer{
            // border: 1px solid blue;
            background-color: #f0f0f0; //灰色背景
 
            box-sizing: border-box;
            display: flex;
            flex-flow: column nowrap;
            flex: auto;
            
            overflow: auto;
            height: calc(100vh - 100px);
 
            .main{
              // border:1px solid green;
              padding: 10px;
 
              display: flex;
                flex: auto;
            // overflow: auto;
 
            }
            .footer{
            // border: 1px solid orange;
 
              flex: 0 0 60px;
            }
 
          }
      }
 
  }
  
}
 
</style>
```
转载地址：https://blog.csdn.net/qq_40323256/article/details/103004188
