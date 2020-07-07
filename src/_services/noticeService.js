import Vue from "vue"
import {URL} from '../config';
import { authHeader } from '../_helpers';

export const noticeService = {
    getNoticeList,
};

function getNoticeList(params = null) {
	let headers = authHeader();
    return Vue.http.get(URL.API_ROOT+"v1/api/external/notify",{headers});
}