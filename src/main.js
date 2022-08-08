import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

/*
* to 要跳转到哪里
* from 从哪里跳转来
* next 是一个方法，可以传入下一个跳转路由的路径，如果不传参数，代表直接跳转到to这个路由
*/
router.beforeEach((to, from, next) => {
    //进行判断，如果to路径没有匹配到现有的任何一个路由
    //作用：当to的路由为空时不跳转，同时当from的路由也为空时，则跳转到 404 页面
    if (to.matched.length === 0){
        next("/404");
    }else {
        if (to.path === '/'){
            next("/one");
        }else {
            next();
        }
    }

})

createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app')

