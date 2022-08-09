import { createRouter, createWebHashHistory } from 'vue-router'

import one from "../components/face/one.vue";
import two from "../components/face/two.vue";
import face from "../components/Face.vue";
import error from "../components/error.vue";
import Home from "../components/Home.vue";

//路由数组
const routes = [
    {
        //基本格式
        path: "/",
        name: "face",
        component: face,
        children:[
            {
                path: "one",
                name: "first",
                component: one,
            },
            {
                path: "two",
                name: "second",
                component: two,
            }
        ]
    },
    {
        path: "/404",
        name: "error",
        component: error,
    },
    {
        path: "/face_manager_page",
        name: "Manager",
        component: Home,
    }
]

//路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes //上面的路由数组
})

//导出路由对象，在main.js中引用
export default router
