import {createRouter,createWebHashHistory} from 'vue-router'

//存储路径
const routes=[
    {
        path:'/',
        name:'home',
        component: ()=>import('../components/Home.vue')
    },
    {
        path:'/user',
        name:'user',
        component:()=>import('../components/User.vue')
    }
]

//创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router