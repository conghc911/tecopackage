import Vue from "vue"
import Vuex from "vuex"

let { URL } = require("../config");
let URL_API = URL.API_LEAD;
var has_data_user = false;
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isActiveSidebar:true,
        titlePage: '',
        dataUser: [],
        dataTopic:null,
        dataCountry:null,
    },
    getters:{
        // trang thai sidebar
        getActiveSidebar : (state) =>{
            return state.isActiveSidebar
        }
    },
    mutations:{
        // trang thai sidebar
        setActiveSidebar(state,value){
            state.isActiveSidebar = value;
        },
        // home vue. demo
        getDataUser(state,value){
            state.dataUser = value
        },
        //set data chu de
        setDataTopic(state,value){
            state.dataTopic = value;
        },
        //set data dist (tinh / thanh pho)
        setDataCountry(state,value){
            state.dataCountry = value;
        }
    },
    actions:{
        // trang thai sidebar
        setActiveSidebar ({commit},value){
            commit('setActiveSidebar',value)
        },
        // home vue. demo
        getDataUser({commit},{self}){
            // if(has_data_user==true){
            //     console.log( "0" );
            //     if(self.getDataUser){
            //         self.getDataUser();
            //     }
            //     return;
            // }
            // has_data_user = true;

            Vue.http.get('v1/api/account-managers/profile').then(res=>{
                commit('getDataUser',res.body.body);
                self.getDataUser();
            });
        },
        //commit data chu de
        setDataTopic({commit},{self}){
            Vue.http.get('v1/api/account-managers/topic').then(res=>{
                let data = res.body.body;
                let dataNew = [];
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        dataNew.push({
                            id: parseInt(data[i].topic_id),
                            label: ( data[i].topic_code )
                        });
                    }
                }
                let obj = [
                    {id:-1,label:'Tất cả',children:dataNew}
                  ];
                commit('setDataTopic',obj);
                self.setDataTopic();
            });
        },
        //commit data dict (tinh thanh pho) dataCountry
        setDataCountry({commit},{self}){
            let obj = {
                act: "QUERY",
                k: "LOCATION_PROVINCE",
                limit: 1000
            };

            Vue.http.post(URL_API + "dict", obj).then(res=>{
                let data = res.body.second;
                let dataNew = [];
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        dataNew.push({
                            id: parseInt(data[i].id1),
                            label: ( data[i].display1 )
                        });
                    }
                }
                commit('setDataCountry',dataNew);
                self.setDataCountry();
            });
        }
    }
})