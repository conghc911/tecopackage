import { packageService } from '../_services/packageService';
export const packages = {
    namespaced: true,

    actions: {
        getPackage({commit}){
            let result = packageService.getPackage();
            result.then(res=>{
                let data = res.body;
                let arr = [];
                if(data.length){
                    for(let i=0; i<data.length;i++){
                        arr.push({id:data[i].id,label:data[i].package_code});
                    }
                }
                commit("listPackage",arr);
            },err=>{
                console.log(err);
            })
        },
        getListPackage({commit},obj){
            let result = packageService.getListPackage(obj);
            result.then(res=>{
                let data = res.body.body.content;
                data.total = res.body.body.totalElements;
                commit("listPackages",data);
            },err=>{
                console.log(err);
            })
        },
        async addPackage({commit},obj){
            let result = await packageService.addPackage(obj);
            let isOk = null;
            if(result.status == 200){
                isOk = true;
            }else{
                isOk = false;
            }
            return isOk;
        },
        async updatePackage({commit},obj){
            let result = await packageService.updatePackage(obj);
            let isOk = null;
            if(result.status == 200){
                isOk = true;
            }else{
                isOk = false;
            }
            return isOk;
        },

        async getRowPackage({commit},id){
            let result = await packageService.getRowPackage(id);
            return result;
        }
    },
    mutations: {
        listPackage(state,data){
            state.packages = data;
        },
        listPackages(state,data){
            state.listPackages = data;
        }
    },
    state: {
        packages:[],
        listPackages:[]
    },
    getters:{
        getPackage(state){
            return state.packages;
        },
        getPackages(state){
            return state.listPackages;
        },
        getTotalPackages(state){
            return state.listPackages.total;
        }
    }
}
