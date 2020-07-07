import Vue from "vue"
import {URL} from '../config';
import { authHeader } from '../_helpers';

export const resourceService = {
    getResoruce,
    getUserSend,
    getUserReviced,
    getTransId,
    updateResource,
    deleteResource
};

function getResoruce(data) {
	let headers = authHeader();
    return Vue.http.post(URL.API_ROOT+"v1/api/transfer-resources/search-contract?size="+data.limit+"&page="+data.page,data.data,{headers});
}

function getUserSend(value){
	let headers = authHeader();
    return Vue.http.get(URL.API_ROOT+"v1/api/transfer-resources/getUsen?rol_ui_send="+value,{headers});
}

function getUserReviced(obj){
	let headers = authHeader();
    return Vue.http.get(URL.API_ROOT+"v1/api/transfer-resources/getUrec?ui_s="+obj.userid +"&rol_ui_send="+obj.roleSend,{headers});
}

function getTransId(id){
	let headers = authHeader();
	// console.log(typeof id);
    return Vue.http.get(URL.API_ROOT+"v1/api/transfer-resources/"+id,{headers});
}

function updateResource(obj){
	let headers = authHeader();
    return Vue.http.put(URL.API_ROOT+"v1/api/transfer-resources",obj,{headers});
}

function deleteResource(id){
	let headers = authHeader();
    return Vue.http.delete(URL.API_ROOT+"v1/api/transfer-resources?id="+id,{headers});
}