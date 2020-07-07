import Vue from "vue"
import {URL} from '../config';
import { authHeader } from '../_helpers';

export const leadService = {
    createLead,
    getTotalLead,
    getListUser,
    getLead,
    delLead
};

function delLead(obj){
    let headers = authHeader();
    return Vue.http.post(URL.API_LEAD+"delete/parcel",obj,{headers});
}

function createLead(obj) {
	let headers = authHeader();
    return Vue.http.post(URL.API_LEAD+"parcel",obj,{headers});
}

function getTotalLead(){
    let headers = authHeader();
    return Vue.http.get(URL.API_LEAD+"count/hobby",{headers});
}

function getListUser(){
    let headers = authHeader();
    return Vue.http.get(URL.API_LEAD+"user",{headers});
}

function getLead(obj){
    let headers = authHeader();
    return Vue.http.post(URL.API_LEAD+"search/parcel",{limit:obj.limit,page:obj.page},{headers});
}