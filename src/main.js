import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VueResource from "vue-resource"
import excel from 'vue-excel-export'
import VueCookies from 'vue-cookies'

/*
  * START vee validate
*/
import VeeValidate, { Validator } from 'vee-validate'
import vi from 'vee-validate/dist/locale/vi'
const config_v = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'inputs ', //Default is fields
  delay: 0,
  locale: 'vi',
};
Validator.localize({ vi: vi })
Vue.use(VeeValidate, config_v)
/* ----END vee validate--- */

// import AsyncComputed from 'vue-async-computed'

import App from './App.vue'

import { router } from './routers'
import { store } from './_stores'

let { URL } = require("./config");
let URL_API = URL.API_ROOT;

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueResource)
Vue.use(excel)
Vue.use(VueCookies)
// Vue.use(AsyncComputed);


// set cookie sidebar
// VueCookies.config('7d')
// VueCookies.set('toggleSidebar',true);

//URL api root
Vue.http.options.root= URL_API;

Vue.http.interceptors.push(( req, next ) => {
  let arr_request = [];
  let auth = localStorage.getItem('user');
  if( auth == "undefined" || auth == "null" || auth == undefined || auth == undefined || auth == '' ){
    // req.headers.set('Authorization',"");
  }else{
    req.headers.set('Authorization',"Bearer " + JSON.parse(auth).token );
  }

  next( res => {
      // if(res && res.status === 406){
        // router.push("/login");
      // }
  });
});

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faUserLock, faUser, faUserCog, faBars, faUsers, faUserCheck, faHistory, faListUl, faFileSignature, faPhoneVolume, faArchive, faExchangeAlt, faArrowAltCircleRight, faInfoCircle, faLock, faCog, faCaretUp, faChevronRight, faChevronLeft, faSearch, faSortDown, faCaretRight, faUserPlus, faEdit, faUndo, faHeadphones,faDownload,faClock,faBlenderPhone,faTrashAlt,faExclamationTriangle,faNotesMedical,faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faUserLock, faUser, faUserCog, faBars, faUsers, faUserCheck, faHistory, faListUl, faFileSignature, faPhoneVolume, faArchive, faExchangeAlt, faArrowAltCircleRight, faInfoCircle, faLock, faCog, faCaretUp, faChevronRight, faChevronLeft, faSearch, faSortDown, faCaretRight, faUserPlus, faEdit, faUndo, faHeadphones, faDownload,faClock,faBlenderPhone,faTrashAlt,faExclamationTriangle,faNotesMedical,faBell)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// import './custom.css'

export const eventBus = new Vue();


new Vue({
  el: '#app',
  router: router,
  store,
  methods: {
     disableCallPopupVue: function() {
          this.$broadcast('disableCallPopupVueEvent');
    },
  },
  render: h => h(App)
})
