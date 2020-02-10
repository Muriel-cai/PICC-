import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/components/index'
import showCon from '@/components/page/showCon'
import notice from '@/components/page/home/notice'
import welfare from '@/components/page/home/welfare/welfare'
import noodle from '@/components/page/home/welfare/noodle'
import physical from '@/components/page/home/welfare/physical'
import shops from '@/components/page/home/welfare/shops'
import share from '@/components/page/home/share'
import server from '@/components/page/home/server/server'
import phoneYy from '@/components/page/home/doctor/phoneYy'
import typeSigned from '@/components/page/system/typeSigned'
import administrator from '@/components/page/exercise/administrator'
import staffLimit from '@/components/page/exercise/staffLimit'
import staffResource from '@/components/page/exercise/staffResource'
import staff from '@/components/page/exercise/staff'
import  airticle from '@/components/airticle/WangEditorFather'
import  addInfo from '@/components/page/exercise/addInfo'

Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/',
      name: 'notice',
      component: notice,
      meta: {
        requiresAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },   
    {
      path: '/login',
      name: 'login',
      component: login
      
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },   
    {
      path:'/welfare',
      name:'welfare',
      meta: {
        requireAuth: true
      },
      component: welfare,
     
      // redirect:'/welfare/noodle',
      children:[
        {
          path:'noodle',
          name:'noodle',
          component:noodle
        },
        {
          path:'physical',
          name:'physical',
          component:physical
        },
        {
          path:'shops',
          name:'shops',
          component:shops
        }
      ]    
    },
    {
      path:'/share',
      name:'share',
      meta: {
        requireAuth: true
      },
      component:share
    },
    {
      path:'/server',
      name:'server',
      meta: {
        requireAuth: true
      },
      component:server
    },
    {
      path:'/phoneYy',
      name:'phoneYy',
      component:phoneYy,
       meta: {
        requireAuth: true
      }
    },
    {
      path:'/typeSigned',
      name:'typeSigned',
      component:typeSigned
    },
    {
      path:'/staff',
      name:'staff',
      component:staff,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/addInfo',
      name:'addInfo',
      component:addInfo
    },
    {
      path:'/administrator',
      name:'administrator',
      component:administrator
    },
    {
      path:'/staffLimit',
      name:'staffLimit',
      component:staffLimit
    },
    {
      path:'/staffResource',
      name:'staffResource',
      component:staffResource
    },
    {
      path:'/airticle',
      name:'airticle',
      component:airticle
    }
  ]
})
