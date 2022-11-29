import { createPinia } from 'pinia'
import router from "@/router";
import { getCache } from "@/utils/cache";

const store = createPinia()

export const  useMenus = () => {
    if(!getCache('userMenus')) return ;
    getCache('userMenus').forEach((route) => {
        router.addRoute("main",{
            name:route.permissionName,
            type: route.type,
            icon : route.icon,
            pId : route.pId,
            path: route.path,
            component: () => import(route.cpnURL)
        });
    });
}

export default store
