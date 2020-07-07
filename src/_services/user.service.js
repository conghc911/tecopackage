import Vue from "vue"
import {URL} from '../config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getInfo,
    refreshToken,
    delUser,

    createUser,
    getListUser,
    getUserRole,
    getUserCurrent,
    updateUser,
    undoResource
};

// conghc
function undoResource(id){
    let headers = authHeader();
    return Vue.http.get(URL.API_ROOT+"v1/api/transfer-resources/evict?ui="+id,{headers});
}
function createUser(obj){
    let headers = authHeader();
    return Vue.http.post(URL.API_ROOT+"v1/api/account-managers",obj,{headers});
}

function updateUser(obj){
    let headers = authHeader();
    return Vue.http.put(URL.API_ROOT+"v1/api/account-managers",obj,{headers});
}


function getListUser(obj){
    let headers = authHeader();
    return Vue.http.post(URL.API_ROOT+"v1/api/account-managers/search?size="+obj.limit+'&page='+obj.page,obj.data,{headers});
}

function getUserRole(value){
    let headers = authHeader();
    return Vue.http.get(URL.API_ROOT+"v1/api/account-managers/role",{headers});
}

function getUserCurrent(id){
    let headers = authHeader();
    return Vue.http.get(URL.API_ROOT+"v1/api/account-managers/"+id,{headers});
}
// end conghc

export const leadHttp = {
    get : leadGet,
    post :leadPost
};

export const userHttp = {
    get:userGet,
    post:userPost
};

export const service = {
    getToken:getToken,
    getUserLogin:getUserLogin,
    dataUserLogin:dataUserLogin
}

Vue.prototype.$service = service;
Vue.prototype.$leadHttp = leadHttp;
Vue.prototype.$userHttp = userHttp;



 function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',"pwd": password },
        body: JSON.stringify({uname:username})
    };

    return fetch(`${URL.API_ROOT}v1/api/account-managers/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if(user && user.body){
                // console.log(user);
                user = { username:username, token:user.body.access_token , role: user.body.rol, message: user.message,time : user.time };

                // login successful if there's a jwt token in the response
                if (user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                }
            }

            return user;
        });
}

function logout() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    // this.$http.get("v1/api/account-managers/logout");
    // fetch(`${URL.apiUrl}v1/api/account-managers/logout`, requestOptions);
    // remove user from local storage to log user out
    localStorage.removeItem('user_info');
    localStorage.removeItem('user');
}

function refreshToken(){
///v1/api/account-managers/refresh-token
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${URL.API_ROOT}v1/api/account-managers/refresh-token`,requestOptions)
    .then(handleResponse)
    .then( user => {
            // console.log(user);
            if(user && user.body){
                // console.log(user);
                // user = { token:user.body.access_token };
                user = { token:user.body.access_token ,message: user.message,time : user.time };
            }
            return user;
        });
}

function delUser(obj){
    let headers = authHeader();
    console.log(obj);
    return Vue.http.delete(URL.API_ROOT+"v1/api/account-managers",{body:obj},{headers});
    // return Vue.http.delete(URL.API_ROOT+"v1/api/account-managers?user_id="+obj.user_id+'&username='+obj.username,{headers});
}


function getInfo() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${URL.API_ROOT}v1/api/account-managers/profile`,requestOptions)
    // .then(handleResponse)
    .then( response => {
        return response.text().then(result => {
            const res = result && JSON.parse(result);
            if(res.body){
                localStorage.setItem("user_info", JSON.stringify(res.body));
            }
            if (!response.ok || res.status == 406) {
               return Promise.reject(res);
            }
            return res.body
        });
        // if(user.body){
        //     localStorage.setItem("user_info", JSON.stringify(user.body));
        // }
        // console.log(user.body)
        // return user.body;
    });
}

function leadPost(path,obj) {
    return httpPost(`${URL.API_LEAD}` + path,obj);
}

function leadGet(path) {
    return httpGet(`${URL.API_LEAD}` + path);
}

function userPost(path,obj) {
    return httpPost(`${URL.API_ROOT}` + path,obj);
}

function userGet(path) {
    return httpGet(`${URL.API_ROOT}` + path);
}

function httpPost(path,obj) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(obj)
    };

    return fetch(path, requestOptions).then(handleResponse);
}

function httpGet(path) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(path, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {

        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


function getToken(){
      let auth = localStorage.getItem('user');
      let token  = '';
      if( auth == "undefined" || auth == "null" || auth == undefined || auth == undefined || auth == '' ){
        token = ''
      }else{
        token = JSON.parse(auth).token
      }
      return token;
};
function getUserLogin(){
      let user = {};
      let auth = localStorage.getItem('user_info');
      if( auth == "undefined" || auth == "null" || auth == undefined || auth == undefined || auth == '' ){
        user = {};
      }else{
        user= JSON.parse(auth);
      }
      return user;
};

function dataUserLogin(){
    return httpGet(`${URL.API_ROOT}` +'v1/api/account-managers/profile');
};

