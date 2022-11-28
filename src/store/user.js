import { defineStore } from 'pinia';
import { getCache, setCache } from "@/utils/cache";
import router from "@/router";

export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            token: "",
            userInfo: {},
            userMenus: [],
            operation: []
        }
    },
    actions: {
        changeToken(token) {
            this.token = token
        },
        changeUserInfo(userInfo) {
            this.userInfo = userInfo;
        },
        changeOperation(operation) {
            this.operation = operation;
        },
        changeUserMenus() {

        },
        accountLoginAction(loginForm) {
            // console.log(loginForm);
            // TODO:
            // 1.发送到服务器进行登录验证，并请求权限及菜单

            // 2.跳转到主页
            router.push('/main')
        },
        loadLocalLogin() {
            const token = getCache("token");
            if (token) {
                commit("changeToken", token);
                // 请求权限
            }
            const userInfo = getCache("userInfo");
            if (userInfo) {
                commit("changeUserInfo", userInfo);
            }
            const userMenus = getCache("userMenus");
            if (userMenus) {
                commit("changeUserMenus", userMenus);
            }
        }
    }
})
