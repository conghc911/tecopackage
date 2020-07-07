import Vue from 'vue';
import Router from 'vue-router';

const Customer = resolve => require(["./components/customers/Customer.vue"], resolve);
const Potential = resolve => require(["./components/customers/Potential.vue"], resolve);
const History = resolve => require(["./components/customers/History.vue"], resolve);
const Users = resolve => require(["./components/customers/Users.vue"], resolve);
const User = resolve => require(["./components/customers/User.vue"], resolve);
const Changepass = resolve => require(["./components/customers/Changepass.vue"], resolve);
const Resources = resolve => require(["./components/customers/Resources.vue"], resolve);
const Reshistory = resolve => require(["./components/customers/Reshistory.vue"], resolve);
const Report = resolve => require(["./components/customers/Report.vue"], resolve);
const Branch = resolve => require(["./components/customers/Branch.vue"], resolve);
const Notice = resolve => require(["./components/customers/Notice.vue"], resolve);
const List_resources = resolve => require(["./components/customers/List_resources.vue"], resolve);
const Package = resolve => require(["./components/customers/Package.vue"], resolve);
const Lead = resolve => require(["./components/customers/Lead.vue"], resolve);

// const BlackList = resolve => require(["./components/customers/BlackList.vue"], resolve);
const Login = resolve => require(["./components/login/Login.vue"], resolve);
const Home = resolve => require(["./components/home/Home.vue"], resolve);
const Testopt = resolve => require(["./components/checksytem/Testopt.vue"], resolve);
const Logs = resolve => require(["./components/errors/Logs.vue"], resolve);
const Errors = resolve => require(["./components/layouts/404"], resolve);

// import ListResource from "./components/customers/Listresource";
import ListResource from "./components/customers/List_resources.vue";

const routes = [
    // { path:'/', name:'home', component:Home },
    { path:'/', redirect:'/customers' },
    { path:'/login', name:'login', component:Login },
    { path: '/customers', name: 'customers', component: Customer },
    { path: '/potential', name: 'potential', component: Potential },
    { path: '/history', name: 'history', component: History },
    { path: '/users', name: 'users', component: User },
    // { path: '/user', name: 'user', component: User },
    { path: '/changepass', name: 'changepass', component: Changepass },
    { path: '/resources', name: 'resources', component: Resources },
    { path: '/list_resources', name: 'list_resources', component: List_resources },
    { path: '/package', name: 'package', component: Package },
    { path: '/leads', name: 'leads', component: Lead },
    // { path: '/list_resources', name: 'listresource', component: ListResource },
    // { path: '/blacklist', name: 'blacklist', component: BlackList },
    { path: '/reshistory', name: 'reshistory', component: Reshistory },
    { path: '/report', name: 'report', component: Report },
    { path:'/html', name:'html', component:Home },
    { path:'/testopt', name:'testopt', component:Testopt },
    { path:'/view-logs', name:'logs', component:Logs },
    // { path:'/branch', name:'branch', component:Branch },
    // { path:'/notice', name:'notice', component:Notice },
    { path: '/404', name:'error',component:Errors },
    { path:'*', redirect: '/404' }
];

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: routes
});


router.beforeEach((to, from, next) => {
  // console.log(to.path);
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});