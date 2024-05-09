import { createRouter, createWebHashHistory } from 'vue-router'

//存储路径
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../components/Home.vue')
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('../components/User.vue')
    },
    {
        path: '/eventDetail',
        name: 'eventDetail',
        component: () => import('../components/EventDetail.vue')
    }
]

//创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// router.beforeEach((to, from, next) => {
//     //to:目标路径
//     //from:来源路径
//     //next:next()允许跳转
//     // let token = localStorage.getItem("token");
//     // if (token) {
//     //     next();
//     // } else {
//     //     next("/");
//     // }
// })

export default router