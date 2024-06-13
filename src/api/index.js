import axios from "axios";

const BASE_URL = 'http://192.168.43.67:8000'
// const LOGIN = `${BASE_URL}/login/`
const LOGIN = 'api/login/'
const REGISTER = 'api/register/'
const LOGOFF = 'api/logoff/'
const CHANGEPWD = 'api/changepwd/'
const SUPERLOGIN = 'api/superlogin/'
const CREATEEVENT = 'api/createevent/private/'
const LOADUSERPAGE = 'api/loaduserpage/'
const EVENTDETAIL = 'api/eventdetail/'
const INVITE = 'api/invite/'
const JOINEVENT = 'api/joinevent/'
const PUBLICEVENTS = 'api/publicevents/'
const GETEXAMINEEVENTS = 'api/getexamineevents/'
const DELETEPARTICIPANT = 'api/deleteparticipant/'
const EXAMINE = 'api/examine/'
const WIDTHDRAW = 'api/withdraw/'
const TEST = 'api/test/'

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

export function ApiCreateEvent(token, eventStartDate, eventEndDate, eventStartTime, eventEndTime, eventName, eventDescription, eventLocationId, personNum) {
    console.log('request:', CREATEEVENT);
    let data = {
        userToken: token,
        eventStartDate: eventStartDate,
        eventEndDate: eventEndDate,
        eventStartTime: eventStartTime,
        eventEndTime: eventEndTime,
        eventName: eventName,
        eventDescription: eventDescription,
        eventLocation: eventLocationId,
        eventType: 0,
        personNum: personNum
    }
    console.log(data)
    return axios({
        url: CREATEEVENT,
        method: 'post',
        data: data
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

export function ApiInvite(token, id) {
    console.log('request', INVITE);
    return axios({
        url: INVITE,
        method: 'post',
        data: {
            userToken: token,
            eventId: id
        }
    })
}

export function ApiJoinEvent(token, inviteCode) {
    console.log('request', JOINEVENT);
    return axios({
        url: JOINEVENT,
        method: 'post',
        data: {
            userToken: token,
            inviteCode: inviteCode
        }
    })
}

export function ApiPublicEvents(token) {
    console.log('request', PUBLICEVENTS);
    return axios({
        url: PUBLICEVENTS,
        method: 'post',
        data: {
            userToken: token
        }
    })
}

export function ApiGetexamineevents(token) {
    console.log('request', GETEXAMINEEVENTS);
    return axios({
        url: GETEXAMINEEVENTS,
        method: 'post',
        data: {
            userToken: token
        }
    })
}

export function ApiExamine(token, id) {
    console.log('request', EXAMINE);
    return axios({
        url: EXAMINE,
        method: 'post',
        data: {
            userToken: token,
            eventId: id
        }
    })
}

export function ApiDeleteParticipant(token, userId, eventId) {
    console.log('request', DELETEPARTICIPANT);
    return axios({
        url: DELETEPARTICIPANT,
        method: 'post',
        data: {
            userToken: token,
            userId: userId,
            eventId: eventId
        }
    })
}

export function ApiWithdraw(token, eventId) {
    console.log('request', WIDTHDRAW);
    return axios({
        url: WIDTHDRAW,
        method: 'post',
        data: {
            userToken: token,
            eventId: eventId
        }
    })
}

export function ApiTest(token) {
    console.log('request', TEST);
    return axios({
        url: TEST,
        method: 'post',
        data: {
            userToken: token
        }
    })
}