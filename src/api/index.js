import axios from "axios";

const BASE_URL = 'http://192.168.43.66:8000'
// const LOGIN = `${BASE_URL}/login/`
const LOGIN = 'api/login/'

export function ApiLogin(name, password) {
    console.log('request:', LOGIN);
    return axios({
        url: LOGIN,
        method: 'post',
        data: {
            userName: name,
            userPassword: password,
        }
    })
}
