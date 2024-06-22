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
const ALLEVENTS = 'api/getallevents/'
const GROUPADD = 'api/group/add/'
const GROUPJOIN = 'api/group/join/'
const UPDATEDETAIL = 'api/updatedetail/'
const DELETEEVENT = 'api/deleteevent/'
const DELETERESOURCES = 'api/resource/delete/'
const UPDATERESOURCES = 'api/resource/update/'
const ADDRESOURCE = 'api/resource/add/'
const COSTREMARKEXAMINE = 'api/costremark/examine/'
const CHATRECORD = 'api/chatrecord/'
const SENDCHAT = 'api/ws/chat/'
const SUBEVENTS = 'api/subevent/add/'
const COSTREMARKADD = 'api/costremark/add/'
const COMMENTADD = 'api/comment/add/'

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

export function ApiAllEvents(token) {
    console.log('request', ALLEVENTS);
    return axios({
        url: ALLEVENTS,
        method: 'post',
        data: {
            userToken: token
        }
    })
}

export function ApiGroupAdd(token, name, eventId) {
    console.log('request', GROUPADD)
    return axios({
        url: GROUPADD,
        method: 'post',
        data: {
            userToken: token,
            groupName: name,
            groupEventId: eventId
        }
    })
}

export function ApiGroupJoin(token, eventId, groupId, userId) {
    console.log('request', GROUPJOIN);
    return axios({
        url: GROUPJOIN,
        method: 'post',
        data: {
            userToken: token,
            groupEventId: eventId,
            groupId: groupId,
            groupUserId: userId
        }
    })
}

export function ApiUpdateBudget(token, eventId, budget) {
    console.log('request', UPDATEDETAIL);
    let data = {
        userToken: token,
        eventId: eventId,
        eventDetail: {
            event_budget: budget
        },
        eventBrief: {
        }
    }
    return axios({
        url: UPDATEDETAIL,
        method: 'post',
        data: data
    })
}

export function ApiUpdateSettings(token, eventId, maxperson, eventType, eventReady) {
    console.log('request', UPDATEDETAIL);
    return axios({
        url: UPDATEDETAIL,
        method: 'post',
        data: {
            userToken: token,
            eventId: eventId,
            eventDetail: {
                event_person_max: maxperson
            },
            eventBrief: {
                event_type: eventType,
                event_ready: eventReady
            }
        }
    })
}

export function ApiExamine(token, eventId, passed, reason) {
    console.log('request', EXAMINE);
    return axios({
        url: EXAMINE,
        method: 'post',
        data: {
            userToken: token,
            examineEventId: eventId,
            passed: passed,
            reason: reason
        }
    })
}

export function ApiDeleteEvent(token, eventId) {
    console.log('request', DELETEEVENT);
    return axios({
        url: DELETEEVENT,
        method: 'post',
        data: {
            userToken: token,
            eventId: eventId
        }
    })
}

export function ApiDeleteResources(token, eventId, resourceId) {
    console.log('request', DELETERESOURCES);
    return axios({
        url: DELETERESOURCES,
        method: 'post',
        data: {
            userToken: token,
            eventId: eventId,
            resourceId: resourceId
        }
    })
}

export function ApiUpdateResources(token, eventId, resourceId, condition) {
    console.log('request', UPDATERESOURCES);
    return axios({
        url: UPDATERESOURCES,
        method: 'post',
        data: {
            userToken: token,
            eventId: eventId,
            resourceId: resourceId,
            toUpdate: {
                resource_condition: condition
            }
        }
    })
}

export function ApiAddResources(token, eventId, resourceName, resourceNum) {
    console.log('request', ADDRESOURCE);
    return axios({
        url: ADDRESOURCE,
        method: 'post',
        data: {
            userToken: token,
            resourceEventId: eventId,
            resourceName: resourceName,
            resourceCondition: "缺少",
            resourceNum: resourceNum
        }
    })
}

export function ApiCostremarkExamine(token, costRemarkId, passed, remark) {
    console.log('request', COSTREMARKEXAMINE);
    return axios({
        url: COSTREMARKEXAMINE,
        method: 'post',
        data: {
            userToken: token,
            costRemarkId: costRemarkId,
            passed: passed,
            remark: remark
        }
    })
}

export function ApiCommentAdd(token, content, eventId, time) {
    console.log('request', COMMENTADD);
    return axios({
        url: COMMENTADD,
        method: 'post',
        data: {
            userToken: token,
            content: content,
            eventId: eventId,
            time: time
        }
    })
}

export function ApiCostremarkAdd(token, eventId, cost, reason) {
    console.log('request', COSTREMARKADD);
    return axios({
        url: COSTREMARKADD,
        method: 'post',
        data: {
            userToken: token,
            eventId: eventId,
            cost: cost,
            reason: reason
        }
    })
}

export function ApiChatRecord(token) {
    console.log('request', CHATRECORD);
    return axios({
        url: CHATRECORD,
        method: 'post',
        data: {
            userToken: token,
        }
    })
}

export function ApiSendChat(token, content, type, time, receiverId, eventId) {
    console.log('request', SENDCHAT);
    return axios({
        url: SENDCHAT,
        method: 'post',
        data: {
            userToken: token,
            content: content,
            chatType: type,
            time: time,
            receiverId: receiverId,
            eventId: eventId
        }
    })
}

export function ApiAddSubEvent(token, eventId, time, title, content, participants) {
    console.log('request', SUBEVENTS);
    return axios({
        url: SUBEVENTS,
        method: 'post',
        data: {
            userToken: token,
            eventId: eventId,
            time: time,
            title: title,
            content: content,
            participants: participants
        }
    })
}