import { defineStore } from "pinia";

export const useStore = defineStore('id', {
    state: () => ({
        isLogin: false,
        token: '',
        systemInform: '', //type:INVITE,
        userName: '',
        locationList: null,
        todolist: []
    }),
})