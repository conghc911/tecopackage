<template>
    <div id="home"  v-bind:class="{ 'sidebar-minisize' : !isShowSidebar }" >
        <div class="left-page" @click="handLeftClick()">
            <div id="sidebar">
                <sidebar-app
                    v-bind:isShowSidebar='isShowSidebar'
                ></sidebar-app>
            </div>
        </div>
        <div class="right-page">
            <div id="header">
                <header-app></header-app>
            </div>
            <div id="main-content">
                <slot/>
            </div>
            <div id="footer">
                <footer-app></footer-app>
            </div>
        </div>
        
    </div>
</template>

<script>
    import Sidebar from "./layouts/Sidebar.vue";
    import Header from "./layouts/Header.vue";
    import Footer from "./layouts/Footer.vue";




    export default {
        computed: {
            user2 () {
                return this.$store.state.authentication.user;
            },
            info () {
                return this.$store.state.users.info;
            },
            isShowSidebar(){
                return this.$store.getters["stores/getActiveSidebar"];
            },
            jwtAtTime(){
                return this.$store.getters["authentication/getJwtAtTime"];
            }
        },
        mounted(){
            //this.$root.checkUserLogin();
            this.refreshToken();
        },
        beforeCreate() {
           this.$store.dispatch('users/getInfo');
        },
        created(){
            // this.$store.dispatch('authentication/loadUserStorage');

            this.$cookies.config('30d');
            if(this.$cookies.isKey("togglebar")){
                let result = this.$cookies.get("togglebar") == 'false' ? false : true;
                this.$store.commit('stores/setActiveSidebar',result);
            }
        },

        data(){
            return {
                intervalid: null
            }
        },
        components:{
           "sidebar-app":Sidebar, 
           "header-app":Header, 
           "footer-app":Footer,
        },
        methods:{
            refreshToken(){
                const exp = this.jwtAtTime;

                if(!exp){
                    return;
                }
                //second
                const nowT = ((new Date()).getTime()/1000 )|0;
                let delta = exp - nowT - 10;
                // console.log("nowT" + nowT);
                // console.log("exp" + exp);
                // console.log("delta" + delta);
                if(delta <0 ){
                    delta= 30;
                }
                if(delta > 60*30 ){
                    delta= 60*30;
                }
                delta  = delta * 1000;
                console.log(delta);
                const self = this;
                self.intervalid = setInterval(function(){
                        self.$store.dispatch('authentication/refreshToken');
                    }, delta);
            },
            handLeftClick(){
                if(window.innerWidth <= 768){
                    this.$store.commit('stores/setActiveSidebar',true);
                }
            }
        },
        watch:{
        },
    }
</script>

<style scoped>


</style>