import {
  createRouter,
  createWebHistory
} from "vue-router";
// import { getCache } from "@/utils/cache";

// TODO:后续通过动态路由添加
const defaultMenus = [
  {
    path:'/main/algorithm',
    name: 'algorithm',
    component:()=>import('@/views/main/algorithm/algorithm.vue')
  },
  {
    path:'/main/cpnViews',
    name: 'cpnViews',
    component:()=>import('@/views/main/cpnViews/cpnViews.vue')
  },
  {
    path:'/main/mycase',
    name: 'mycase',
    component:()=>import('@/views/main/mycase/mycase.vue')
  },
  {
    path:'/main/myutils',
    name: 'myutils',
    component:()=>import('@/views/main/myutils/myutils.vue')
  },
  {
    path:'/main/nodePlugin',
    name: 'nodePlugin',
    component:()=>import('@/views/main/nodePlugin/nodePlugin.vue')
  },
  {
    path: '/main/sql',
    name: 'sql',
    component: import('@/views/main/sql/sql.vue')
  }
]

const routes = [{
  path: "/login",
  name: "login",
  component: () => import("@/views/login/index.vue"),
},
{
  path: "/main",
  name: "main",
  component: () => import("@/views/main/index.vue"),
  children: [{
    path: '/main/system',
    name: 'system',
    component: () => import('@/views/main/system/index.vue')
  },...defaultMenus]
},
{
  name: "NotFont",
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/NotFont/index.vue'),
  alias: '/404'
}];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to) => {
  if (to.path === '/') {
    return '/main'
  }

  if (to.path === '/main') {
    return 'main/system'
  }
})
export default router;