import { userService } from '../_services';
import { router } from '../routers';

const JwtDecoder = require("jwt-decode");

const user = JSON.parse(localStorage.getItem('user'));

const jwt = user ?  JwtDecoder(user.token) : null;

const initialState = user
    ? { status: { loggedIn: true }, message: { isShow: false, text: "Đăng nhập thành công.",class: "success" }, jwt: jwt, user: user }
    : { status: { },  message:{ isShow: false, text: "Đăng nhập thất bại.", class: "danger" }, jwt: {} , user: null };


export const authentication = {
    namespaced: true,
    state: initialState,
    getters:{
        getJwtAtTime(state){
            return state.jwt.exp;
        }
    },
    actions: {
        loadUserStorage({ dispatch, commit }){
             commit('loadUserStorage');
        },
        login({ dispatch, commit }, { username, password }) {
            //commit('loginRequest', { username: username });

            userService.login(username, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        router.push('/');
                    },
                    error => {
                        commit('loginFailure', error);
                        // dispatch('alert/error', error, { root: true });
                    }
                );
        },
        logout({ commit }) {
            userService.logout();
            commit('logout');
        },
        refreshToken({ dispatch, commit }){
            ///cap nhat jwt
            userService.refreshToken()
            .then(
                    user =>{
                        commit('refreshToken', user);
                    }
                );
        }
    },
    mutations: {
        loadUserStorage(state){
            if(state.status.loggedIn){

            }else{
                let auth = localStorage.getItem('user');
                if(auth && auth.token){
                    state.user = auth;
                    state.jwt = JwtDecoder(auth.token);
                }
            }
        },
        loginRequest(state, user) {
            // state.status = { loggingIn: true };
            // state.user = user;
        },
        loginSuccess(state, user) {

            state.status = { loggedIn: true };
            state.user = user;
            state.message = { isShow: true, text: "Đăng nhập thành công.", class: "success"  };

            if(user.token){
                state.jwt = JwtDecoder(user.token);
                // console.log(state.jwt);
            }
        },
        loginFailure(state,err) {
            state.status = {};
            state.message = {  isShow: true, text: err, class: "danger" };
            state.user = null;
            state.jwt = {};
        },
        logout(state) {
            state.status = {};
            state.message = {};
            state.user = null;
            state.jwt = {};
        },
        refreshToken(state, user){
            state.user.token = user.token;
            state.user.message = user.message;
            state.user.time = user.time;
            
            if(user.token){
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(state.user));
                state.jwt = JwtDecoder(user.token);
            }
        }
    }
}
