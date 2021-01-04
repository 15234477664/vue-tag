import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'

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
        path:'/test',
        name:'test',
        component:()=>import('@/views/test.vue'),
        meta:{
          title:'test'
        }
      },
      {
        path:'/news',
        name:'news',
        component:()=>import('@/views/news.vue'),
        meta:{
          title:'news'
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
