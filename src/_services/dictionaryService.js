import Vue from "vue"
import {URL} from '../config';
import { authHeader } from '../_helpers';

export const dictionaryService = {
    getTopic,
};

function getTopic(params = null) {
	let headers = authHeader();
    return Vue.http.get(URL.API_ROOT+"v1/api/account-managers/topic",{headers});
}