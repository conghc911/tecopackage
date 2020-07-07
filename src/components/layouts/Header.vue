<template>
    <div class="header">
        <div class="logo-header" @click = "homepage">
            <div class="control-toggle-sidebar" @click="toggleSidebar()" title="Menu"><span><font-awesome-icon icon="bars" /></span></div>
            <img src="../../assets/images/logo-ai-telesale.png" alt="">
            <span class="slogan-head">Smart Telesale</span>
            <div class="title_menu">/ <span>{{titlePage }}</span></div>
        </div>
        <div class="control-user">
            <div class="title-control-user" v-on:click='showToggle()' >
                <span><font-awesome-icon icon="user-cog" /></span> 
                <span>Tài khoản </span>
                <span class="bar_notice"><font-awesome-icon icon="bell" /><i>(0)</i></span>
            </div>
            <transition name="toggleUser">
            <div class="drop-control-user" v-show="userToggle">
                <span class="icon-toggle-user"><font-awesome-icon icon="caret-up" /></span>
                <ul>
                    <!-- <li><a href=""><font-awesome-icon icon="info-circle" /> Chi tiết tài khoản</a></li> -->
                    <router-link tag="li" to="/changepass" active-class="active" exact >
                        <a href=""><font-awesome-icon icon="cog" /> Thông tin tài khoản</a>
                    </router-link>
                    <router-link tag="li" to="/testopt">
                        <a href=""><font-awesome-icon icon="notes-medical" /> Kiểm tra hệ thống</a>
                    </router-link>
                    <li><a href="" v-on:click = logoutUser()><font-awesome-icon icon="lock" /> Đăng xuất</a></li>
                </ul>
            </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {

        data(){
            return {
                userToggle:false,
            }
        },
        methods:{
            showToggle(){
                this.userToggle = !this.userToggle;
            },
            logoutUser(){
                this.userToggle = false;
                this.$store.dispatch('authentication/logout',state);
            },
            toggleSidebar(){
                let state = !this.stateSidebar;
                this.$cookies.set("togglebar",state);
                this.$store.dispatch('stores/setActiveSidebar',state);
            },
            homepage(){
                if(this.$route.name != "customers"){
                    this.$router.push("/customers");
                }
            }
        },
        computed: {
            user () {
                return this.$store.state.authentication.user;
            },
            info () {
                return this.$store.state.users.info;
            },
            stateSidebar(){
                return this.$store.getters["stores/getActiveSidebar"];
            },
            titlePage(){
                return  this.$store.state.stores.titlePage;
            }
        },
        created(){
           
        },
        watch:{
            $route (to, from){
                // clear alert on location change
                 this.userToggle = false;
            }
        }
    }
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    border-bottom: 1px solid #ccc;
}
.logo-header img {
    height: 45px;
}
.title-control-user {
    font-weight: bold;
    text-align: right;
    color:  #333;
    cursor: pointer;
    padding-right:35px;
}
.title-control-user:hover{
    color:#333;
}
.control-user {
    width: 180px;
    position: relative;
}
.drop-control-user {
    float: left;
    width: 100%;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: absolute;
    top: 30px;
    right: -15px;
    /* display: none; */
}
.drop-control-user ul li {
    float: left;
    width: 100%;
}
.block-nav-sidebar ul li:hover {
    background: #36589d;
}
.drop-control-user ul li a {
    float: left;
    width: 100%;
    color: #333;
    padding: 8px 10px;
    font-size: 14px;
}
.drop-control-user ul li a:hover {
    background: #f3f3f3;
    text-decoration: none;
}
.logo-header span {
    color:  #333;
    font-size: 17px;
    padding-left: 10px;
}
.logo-header {
    display: flex;
    align-items: center;
    cursor:pointer;
}
.control-toggle-sidebar {
    padding-right: 10px;
    cursor: pointer;
}
.drop-control-user ul li svg {
    color: #ccc;
}
.drop-control-user ul li a svg {
    margin-right: 10px;
}
span.icon-toggle-user {
    position: absolute;
    top: -16px;
    right: 40px;
    color: #8e8e8e;
}
span.bar_notice i {
    font-weight: normal;
    font-style: normal;
    color: #333;
    font-size: 10px;
    position: absolute;
    top: 5px;
}
span.bar_notice {
    position: absolute;
    top: -15px;
    font-size: 20px;
    right: 10px;
    color: #f15b40;
    animation-name: tada;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}
@keyframes tada {
    0% {
        transform: rotate(-20deg);
    }

    100% {
        transform: rotate(20deg);
    }
}


 /* enter */
 .toggleUser-enter{
   opacity: 0;
 }
 .toggleUser-enter-active{
   transition: 0.3s all;
 }
 /* leave */
 .toggleUser-leave{
   opacity: 1;
 }
 .toggleUser-leave-active{
    transition: 0.3s all;
    opacity: 0;
 }
</style>