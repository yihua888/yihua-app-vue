import {
  createRouter,
  createWebHistory
} from "vue-router";
// import { getCache } from "@/utils/cache";

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
  }]
},
{
  name: "NotFont",
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/NotFont/index.vue'),
  alias: '/404'
}
];

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