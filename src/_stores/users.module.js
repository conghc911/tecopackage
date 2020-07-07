import { userService } from '../_services';

import { router } from '../routers';

export const users = {
    namespaced: true,
    state: {
        info: { },
        dataUserRole:[],
        dataListUser:[]
    },
    getters:{
        getInfo : (state) =>{
            return state.info;
        },
        getterDataUserRole(state){
            return state.dataUserRole;
        },
        getterDataListUser(state){
            return state.dataListUser;
        },
        getterTotalDataListUser(state){
            return state.dataListUser.total;
        }

    },
    actions: {
        async undoResource({commit},id){
            let result = await userService.undoResource(id);
            return result;
        },
        async getUserCurrent({commit},id){
            let result = await userService.getUserCurrent(id);
            // result.then(res=>{
            //     console.log(res);
            // },err=>{
            //     console.log(err);
            // })
            return result;
        },
        createUser({commit},obj){
            let result = userService.createUser(obj);
            result.then(res=>{
                console.log(res);
            },err=>{
                console.log(err);
            })
        },
        async updateUser({commit},obj){
            let result = userService.updateUser(obj);
            let data = null;
            await result.then(res=>{
                data = (res);
            },err=>{
                data = (err);
            })
            // console.log(data);
            return data;
        },
        getListUser({commit},obj){
            let result = userService.getListUser(obj);
            result.then(res=>{
                let dt = res.body.body.content;
                dt.total = res.body.body.totalElements
                commit('getListUser',dt);
            },err=>{
                console.log(err);
            })
        },
        getUserRole({commit},value){
            let result = userService.getUserRole(value);
            result.then(res=>{
                // console.log(res);
                let dt = res.body.body;
                let data = dt.map((item)=>{
                    return {id:item.role_code,label:item.role_name}
                })
                commit('getUserRole',data);
            },err=>{
                console.log(err);
            })
        },
        getInfo({ commit }) {

            commit('getInfoRequest');

            userService.getInfo()
                .then(
                    users => commit('getInfoSuccess', users),
                    error => commit('getInfoFailure', error)
                );
        },
        delUser({commit},obj){
            let result = userService.delUser(obj);
            result.then(res=>{
                console.log(res);
            },err=>{
                console.log(err);
            })
        }
    },
    mutations: {
        getListUser(state,dt){
            state.dataListUser = dt;
        },
        getUserRole(state,dt){
            state.dataUserRole = dt;
        },
        getInfoRequest(state) {
            // console.log("getInfoRequest");
            // state.info = { loading: true };
        },
        getInfoSuccess(state, users) {
            // console.log("getInfoSuccess");
            state.info = users;
        },
        getInfoFailure(state, error) {
            if(error){
                if(error.status == 406){
                    window.alert(error.message);
                    router.push("/login");
                }else if( (error.status == 403 && error.error == "Forbidden" && error.message == "Access Denied") || error.status == 401 ){
                    // window.alert(error.message);
                    router.push("/login");
                }

            }
            // state.info = {};
            // if(error.status==406 || error.status==401 ){
            //     router.push("/login");
            // } else if (error.status==403 && error.message == 'Access Denied') {
            //     router.push("/login");
            // }
        }
    }
}
