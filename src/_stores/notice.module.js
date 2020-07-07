import { noticeService } from '../_services/noticeService.js';

import { router } from '../routers';

export const notice = {
    namespaced: true,
    state: {
        noticeList:[]
    },
    getters:{
        noticeList(state){
            return state.noticeList;
        }
    },
    actions: {
        getNoticeList({commit},params){
            let result = noticeService.getNoticeList(params);
            result.then(res=>{
                let data = res.body.body;
                let obj = data;
                if(data.length){
                    for(let i=0; i< data.length; i++){
                        obj[i].stt = i+1;
                    }
                }
                // console.log(obj);
                commit("getNoticeList",obj);
            },err=>{
                console.log(err);
            })
        }
    },
    mutations: {
        getNoticeList(state,data){
            state.noticeList = data;
        }
    }
}
