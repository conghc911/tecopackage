import { dictionaryService } from '../_services/dictionaryService.js';

import { router } from '../routers';

export const dictionary = {
    namespaced: true,
    state: {
        topic:[]
    },
    getters:{
        getterTopic(state){
            return state.topic;
        }
    },
    actions: {
        getTopic({commit}){
            let result = dictionaryService.getTopic();
            let data = [];
            result.then(res=>{
                let dt = res.body.body
                if(dt && dt.length > 0){
                    for(let i=0; i<dt.length; i++){
                        data.push({id:dt[i].topic_id,label:dt[i].topic_name});
                    }
                }
                commit('getTopic',data);
                // console.log(res);
            },err=>{
                console.log(err);
            });
        }
    },
    mutations: {
        getTopic(state,data){
            state.topic = data;
        }
    }
}
