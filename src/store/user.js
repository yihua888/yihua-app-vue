import { defineStore } from 'pinia';
import { getCache, setCache } from "@/utils/cache";
import router from "@/router";
import { login,getPermission } from '@/service/user'
import { ElMessage } from 'element-plus';

export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            token: "",
            userInfo: {},
            userMenus: [],
            operation: [] ,
            permission:[]
        }
    },
    actions: {
        changeToken(token) {
            this.token = token
            setCache('token',token)
        },
        changeUserInfo(userInfo) {
            setCache('userInfo',userInfo)
            this.userInfo = userInfo;
        },
        changeOperation(operation) {
            setCache('operation',operation)
            this.operation = operation;
        },
        async changeUserMenus(menus) {
            this.userMenus = menus
            setCache('userMenus',menus)
            menus.forEach((route) => {
                router.addRoute("main",{
                    name:route.permissionName,
                    type: route.type,
                    icon : route.icon,
                    pId : route.pId,
                    path: route.path,
                    component: () => import(route.cpnURL)
                });
            });
        },
        changePermission(permission){
            setCache('permission',permission)
            this.permission = permission;
        },
        async accountLoginAction(loginForm) {
            try {
                const rst = await login(loginForm)
                // 1.发送到服务器进行登录验证。
                const {token,id} = rst.data
                this.changeToken(token)
                this.changeUserInfo({id,...loginForm})
                // 请求权限及菜单
                const rst1 = await getPermission()
                this.changePermission(rst1.data)
                const menus = []
                const operation = []
                rst1.data.filter(item=>{
                    if(item.type === 0){
                        operation.push(item.permissionCode)
                    }else if(item.permissionName !== "main"){
                        menus.push(item)
                    }
                })
                this.changeOperation(operation)
                await this.changeUserMenus(menus)
                // 2.跳转到主页
                router.push('/main')
            } catch (error) {
                console.log(error);
                ElMessage.error('账号或密码错误')
            }
        },
        loadLocalLogin() {
            const token = getCache("token");
            if (token) {
               this.changeToken(token)
            }
            const userInfo = getCache("userInfo");
            if (userInfo) {
               this.changeUserInfo(userInfo)
            }
            const userMenus = getCache("userMenus");
            if (userMenus) {
               this.changeUserMenus(userMenus)
            }
        }
    }
})
