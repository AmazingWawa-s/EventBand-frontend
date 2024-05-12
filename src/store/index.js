import { defineStore } from "pinia";
export const useStore = defineStore('id', {
    state: () => ({
        isLogin: false,
        currentMenu: null,
        menu: [
        ],
        token: '',
        notice: ''
    }),
})