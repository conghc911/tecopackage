import { leadService } from '../_services/leadService.js';
export const lead = {
    namespaced: true,
    state: {
        totalLead:0,
        dataUser:[],
        dataLead:[]
    },
    getters:{
        getTotalLead(state){
            return state.totalLead;
        },
        getDataUser(state){
            return state.dataUser;
        },
        getDataLead(state){
            return state.dataLead;
        },
        getTotalDataLead(state){
            return state.dataLead.total;
        },
    },
    actions: {
        async delLead({commit},obj){
            let result = await leadService.delLead(obj);
            return result;
        },
        async createLead({commit},params){
            let result = await leadService.createLead(params);
            return result;
        },
        getTotalLead({commit}){
            let result = leadService.getTotalLead();
            result.then(res=>{
                commit("getTotalLead",res.body.second);
            },err=>{
                console.log(err);
            })
        },
        getListUser({commit}){
            let result = leadService.getListUser();
            result.then(res=>{
                let data = res.body.first;
                let dt = [];
                dt = data.map((item)=>{
                    return {id:item.user_id,label:item.username}
                })
                // console.log(dt);
                commit("getListUser",dt);
            },err=>{
                console.log(err);
            })
        },
        getLead({commit},obj){
            let result = leadService.getLead(obj);
            result.then(res=>{
                let dt = res.body.second;
                dt.total = res.body.first;
                commit("getLead",dt);
            },err=>{
                console.log(err);
            })
        }
    },
    mutations: {
        getTotalLead(state,dt){
            state.totalLead = dt;
        },
        getListUser(state,dt){
            state.dataUser = dt;
        },
        getLead(state,dt){
            state.dataLead = dt;
        }
    }
}
