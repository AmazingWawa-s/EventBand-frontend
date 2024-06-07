import axios from "axios";

const BASE_URL = 'http://192.168.43.66:8000'
// const LOGIN = `${BASE_URL}/login/`
const LOGIN = 'api/login/'
const REGISTER = 'api/register/'
const LOGOFF = 'api/logoff/'
const CHANGEPWD = 'api/changepwd/'
const SUPERLOGIN = 'api/superlogin/'
const CREATEEVENT = 'api/createevent/private/'
const LOADUSERPAGE = 'api/loaduserpage/'
const EVENTDETAIL = 'api/eventdetail/'

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

export function ApiRegister(name, password) {
    console.log('request:', REGISTER);
    return axios({
        url: REGISTER,
        method: 'post',
        data: {
            userName: name,
            userPassword: password,
        }
    })
}

export function ApiLogoff(token) {
    console.log('request:', LOGOFF);
    return axios({
        url: LOGOFF,
        method: 'post',
        data: {
            userToken: token,
        }
    })
}

export function ApiChangepwd(token, password) {
    console.log('request:', CHANGEPWD);
    return axios({
        url: CHANGEPWD,
        method: 'post',
        data: {
            userToken: token,
            userNewPassword: password
        }
    })
}

export function ApiSuperlogin(name, password) {
    console.log('request:', SUPERLOGIN);
    return axios({
        url: SUPERLOGIN,
        method: 'post',
        data: {
            userName: name,
            userPassword: password
        }
    })
}

export function ApiCreateEvent(token, eventStartDate, eventEndDate, eventStartTime, eventEndTime, eventName, eventDescription, eventLocationId) {
    console.log('request:', CREATEEVENT);
    return axios({
        url: CREATEEVENT,
        method: 'post',
        data: {
            userToken: token,
            eventStartDate: eventStartDate,
            eventEndDate: eventEndDate,
            eventStartTime: eventStartTime,
            eventEndTime: eventEndTime,
            eventName: eventName,
            eventDescription: eventDescription,
            eventLocationId: eventLocationId
        }
    })
}

export function ApiLoadUserPage(token) {
    console.log('request', LOADUSERPAGE);
    console.log('data:token:', token)
    return axios({
        url: LOADUSERPAGE,
        method: 'post',
        data: {
            userToken: token
        }
    })
}

export function ApiEventDetail(token, id) {
    console.log('request', EVENTDETAIL);
    return axios({
        url: EVENTDETAIL,
        method: 'post',
        data: {
            userToken: token,
            eventId: id
        }
    })
}