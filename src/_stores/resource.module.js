import { resourceService } from '../_services/resourceService.js';

// import { router } from '../routers';

export const resource = {
    namespaced: true,
    state: {
        resourceList:[],
        getterTotalData:0,
        userSend:[],
        userReviced:[],
        getTransId:{}
    },
    getters:{
        resourceList(state){
            return state.resourceList;
        },
        getterTotalData(state){
            return state.resourceList.total;
        },
        getterUserSend(state){
            return state.userSend;
        },
        getterUserReviced(state){
            return state.userReviced;
        },
        getterTransId(state){
            return state.getTransId;
        }
    },
    actions: {
        getResource({commit},data){
            let result = resourceService.getResoruce(data);
            result.then(res=>{
                let dt = res.body.body.content;
                dt.total = res.body.body.totalElements;
                // console.log(dt);
                commit('getResource',dt);
            },err=>{
                console.log(err);
            })
        },
        getUserSend({commit},value){
            let result = resourceService.getUserSend(value);
            result.then(res=>{
                let dt = res.body.body;
                let data = [];
                if(dt.length){
                    for(let i=0;i<dt.length;i++){
                        data.push({id:dt[i].user_id,label:dt[i].username})
                    }
                }
                commit('getUserSend',data);
            },err=>{
                console.log(err);
            })
        },
        getUserReviced({commit},value){
            let result = resourceService.getUserReviced(value);
            result.then(res=>{
                // console.log(res);
                let dt = res.body.body;
                let data = [];
                if(dt.length){
                    for(let i=0;i<dt.length;i++){
                        data.push({id:dt[i].user_id,label:dt[i].username})
                    }
                }
                commit('getUserReviced',data);
            },err=>{
                console.log(err);
            })
        },
        async getTransId({commit},id){
            let result = resourceService.getTransId(id);
            let dt = null;
            await result.then(res=>{
                dt = res.body.body;
                // console.log(dt);
                // commit('getTransId',dt);
            },err=>{
                console.log(err);
            })
            return dt;
        },
        async updateResource({commit},obj){
            let result = resourceService.updateResource(obj);
            let state = null;
            await result.then(res=>{
                state = 1;
            },err=>{
                state = 0;
            });
            return state;
        },
        async deleteResource({commit},id){
            let result = resourceService.deleteResource(id);
            let msg = "";
            await result.then(res=>{
                msg = res.body.message;
            },err=>{
                msg = res.body.message;
            });
            return msg;
        }
    },
    mutations: {
        getResource(state,data){
            state.resourceList = data;
        },
        getUserSend(state,data){
            state.userSend = data;
        },
        getUserReviced(state,data){
            state.userReviced = data;
        },
        getTransId(state,data){
            state.getTransId = data;
        }
    }
}
