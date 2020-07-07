import Vue from "vue"
import {URL} from '../config';
import { authHeader } from '../_helpers';

export const blacklistService = {
    getUserId,
    getTopicUserId,
    addBlacklist,
    getBlacklist,
    delBlacklist
};

function getBlacklist(obj){
	let headers = authHeader();
    return Vue.http.post(URL.API_ROOT+"v1/api/black-list/search-back-list?size="+obj.limit+"&page="+obj.page,obj.data,{headers});
}

function getUserId(params = null) {
	let headers = authHeader();
    return Vue.http.get(URL.API_ROOT+"v1/api/black-list/list-user",{headers});
}

function getTopicUserId(id) {
	let headers = authHeader();
    return Vue.http.get(URL.API_ROOT+"v1/api/black-list/list-topic-user?user_id="+id,{headers});
}

function addBlacklist(obj){
	let headers = authHeader();
    return Vue.http.post(URL.API_ROOT+"v1/api/black-list",obj,{headers});
}

function delBlacklist(id){
	let headers = authHeader();
    return Vue.http.delete(URL.API_ROOT+"v1/api/black-list?id="+id,{headers});
}