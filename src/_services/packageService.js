import Vue from "vue"
import {URL} from '../config';
import { authHeader } from '../_helpers';

export const packageService = {
    getPackage,
    addPackage,
    getListPackage,
    getRowPackage,
    updatePackage
};

function getPackage(params = null) {
	let headers = authHeader();
    return Vue.http.get(URL.API_ROOT+"v1/api/calls/package-data",{headers});
}

function addPackage(obj){
    let headers = authHeader();
    return Vue.http.post(URL.API_ROOT+"v1/api/package",obj,{headers});
}


function updatePackage(obj){
    let headers = authHeader();
    return Vue.http.put(URL.API_ROOT+"v1/api/package",obj,{headers});
}


// lay danh sach package da tao
function getListPackage(obj){
    console.log(obj);
    let headers = authHeader();
    return Vue.http.post(URL.API_ROOT+"v1/api/package/search?size="+obj.limit+"&page="+obj.page,obj.data,{headers});
}

function getRowPackage(id){
    let headers = authHeader();
    return Vue.http.get(URL.API_ROOT+"v1/api/package/"+id,{headers});
}