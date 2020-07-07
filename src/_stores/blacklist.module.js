import { blacklistService } from '../_services/blacklistService.js';

export const blacklist = {
    namespaced: true,
    state: {
        blacklist:[],
        userId:[],
        topic:[],
    },
    getters:{
        getterBlacklist(state){
            return state.blacklist;
        },
        getterTotalData(state){
            return state.blacklist.total;
        },
        getterUserId(state){
            return state.userId;
        },
        getterTopic(state){
            return state.topic;
        }
    },
    actions: {
        getBlacklist({commit},obj){
            let result = blacklistService.getBlacklist(obj);
            result.then(res=>{
                let data = res.body.body.content;
                data.total = res.body.body.totalElements;
                commit('getBlacklist',data);
                // console.log(data);
            },err=>{
                console.log(err);
            });
        },
        getUserId({commit}){
            let result = blacklistService.getUserId();
            let data = [];
            result.then(res=>{
                if(res.body && res.body.length > 0){
                    for(let i=0; i<res.body.length; i++){
                        data.push({id:res.body[i].user_id,label:res.body[i].username});
                    }
                }
            commit('getUserId',data);
            },err=>{
                console.log(err);
            });
        },
        getTopicUserId({commit},id){
            let result = blacklistService.getTopicUserId(id);
            let data = [];
            result.then(res=>{
                let dt = res.body;
                if(dt && dt.length > 0){
                    for(let i=0; i<dt.length; i++){
                        data.push({id:dt[i].topic_id,label:dt[i].topic_name});
                    }
                }
                commit('getTopicUserId',data);
                // console.log(res.body);
            },err=>{
                console.log(err);
            });
        },
        addBlacklist({commit},obj){
            // console.log(obj);return;
            let result = blacklistService.addBlacklist(obj);
            result.then(res=>{
                console.log(res);
            },err=>{
                console.log(err);
            });
        },
        delBlacklist({commit},id){
            let result = blacklistService.delBlacklist(id);
            // let msg = 0;
            // result.then(res=>{
            //     // console.log(res);
            // },err=>{
            //     // console.log(err);
            // });
        }
    },
    mutations: {
        getBlacklist(state,data){
            state.blacklist = data;
        },
        getUserId(state,data){
            state.userId = data;
        },
        getTopicUserId(state,data){
            state.topic = data;
        }
    }
}
