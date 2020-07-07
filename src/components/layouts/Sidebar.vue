<template>
    <div class="sidebar">
        <div class="logo-sidebar" >
            <div class="img-logo-sibar"><img src="../../assets/images/avatar.jpg" alt="" height="60"></div>
            <h3>Xin chào <strong>{{ user.username }}</strong></h3>
            <div v-if="showall || user.role_code !='ADM'">
                <p >Còn lại <strong>{{user.voice_resources_avaiable}}</strong> phút</p>
                <p >Đến <strong>{{ user.expired_resources_date }}</strong></p>
                <p v-if="showall || user.role_code !='SAL' ">Máy nhánh <strong>{{ user.avaiable_branches_machine_number }}</strong></p>
            </div>

        </div>
        <div class="nav-sidebar">
            <div class="block-nav-sidebar">
                <h3>Quản lý khách hàng</h3>
                <ul>
                    <router-link tag="li" to="/customers" active-class="active"   >
                        <a title="Danh sách khách hàng" ><font-awesome-icon icon="users" /> <span>  Danh sách khách hàng </span></a>
                    </router-link>
                    <router-link tag="li" to="/potential" active-class="active" exact v-if="showall ||  user.role_code == 'CON' || user.role_code == 'SAL'  " >
                        <a title="Khách hàng tiềm năng"><font-awesome-icon icon="user" /> <span>  Khách hàng tiềm năng </span></a>
                    </router-link>
                    <router-link tag="li" to="/history" active-class="active"  >
                        <a title="Lịch sử cuộc gọi"><font-awesome-icon icon="history" /> <span>  Lịch sử cuộc gọi </span></a>
                    </router-link>

                    <router-link tag="li" to="/list_resources" active-class="active" exact v-if="user.role_code == 'ADM' ">
                        <a href="" title="Danh sách tài nguyên"><font-awesome-icon icon="exchange-alt" /><span> Danh sách tài nguyên </span></a>
                    </router-link>
                    <router-link tag="li" to="/resources" active-class="active" exact v-if="showall || user.role_code != 'SAL'" >
                        <a href="" title="Chuyển tài nguyên"><font-awesome-icon icon="exchange-alt" /><span> Chuyển tài nguyên </span></a>
                    </router-link>
                    <router-link tag="li" to="/reshistory" active-class="active" exact v-if=" user.role_code != 'SAL'" >
                        <a href="" title="Lịch sử chuyển tài nguyên"><font-awesome-icon icon="arrow-alt-circle-right" /><span> Lịch sử chuyển tài nguyên </span></a>
                    </router-link>

                    <router-link tag="li" to="/report" active-class="active" exact >
                        <a href="" title="Báo cáo khách hàng"><font-awesome-icon icon="archive" /><span> Báo cáo khách hàng </span></a>
                    </router-link>
                </ul>
            </div>

             <div class="block-nav-sidebar">
                <h3>Tài khoản</h3>
                <ul>
                    <router-link tag="li" to="/package" active-class="active" v-if="user.role_code == 'ADM' " >
                        <a title="Quản lý gói cước"><font-awesome-icon icon="user-cog" /> <span>  Quản lý gói cước </span></a>
                    </router-link>
                    <router-link tag="li" to="/leads" active-class="active"  v-if="user.role_code == 'ADM' "  >
                        <a title="Chia lead"><font-awesome-icon icon="user-cog" /> <span>  Chia lead </span></a>
                    </router-link>
                    <router-link tag="li" to="/users" active-class="active" v-if="showall ||  user.role_code != 'SAL' "  >
                        <a title="Quản lý tài khoản"><font-awesome-icon icon="user-cog" /> <span>  Quản lý tài khoản </span></a>
                    </router-link>
                    <!-- <router-link tag="li" to="/branch" active-class="active" v-if="showall ||  user.role_code == 'ADM' "  >
                        <a title="Quản lý tài khoản"><font-awesome-icon icon="blender-phone" /> <span>  Quản lý máy nhánh </span></a>
                    </router-link> -->
                    <router-link tag="li" to="/changepass" active-class="active" exact >
                        <a href="" title="Thông tin tài khoản"><font-awesome-icon icon="cog" /><span> Thông tin tài khoản </span></a>
                    </router-link>

                    <router-link tag="li" to="/view-logs" active-class="active" exact v-if=" user.role_code == 'ADM' " >
                        <a href="" title="Xem logs"><font-awesome-icon icon="exclamation-triangle" /><span> Xem logs </span></a>
                    </router-link>
                    <li><a href="javascript:;" title="Đăng xuất" v-on:click = logoutUser()><font-awesome-icon icon="lock" /><span> Đăng xuất </span></a></li>
                </ul>
            </div>
            <div class="button-toggle-bottom" @click="toggleSidebar()"><font-awesome-icon v-bind:icon="textIcon" /></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            block: Object
          },
          name: "Sidebar",
        async created(){
           // if(!this.user.length){
           //     this.$store.dispatch('stores/getDataUser',{self:this});
           // }
           // this.$store.dispatch('users/getInfo');
           // this.user = await this.$service.dataUserLogin().then(res => {return res.body;});
        },
        data(){
            return {
                user2: {},
                showall:false,
            }
        },
        mounted(){
            // this.user3 = this.$store.state.users.info;
        },
        methods:{
            logoutUser(){
                this.userToggle = false;
                this.$store.dispatch('authentication/logout',state);
                this.$router.push("/login");
            },
            getDataUser(){
                //this.user = this.$store.state.stores.dataUser
            },
            toggleSidebar(){
                let state = !this.stateSidebar;
                this.$cookies.set("togglebar",state);
                this.$store.dispatch('stores/setActiveSidebar',state);
            }
        },
        computed: {
            textIcon(){
                let stateSidebar = this.stateSidebar;
                return stateSidebar ? 'chevron-left' : 'chevron-right'
            },
            authorize () {

                return this.$store.state.authentication.user;
            },
            user() {
                return this.$store.state.users.info;
            },
            stateSidebar(){
                return this.$store.getters["stores/getActiveSidebar"];
            },
            titlePage(){
                return  this.$store.state.stores.titlePage;
            }
        },
        watch:{
        }
    }
</script>

<style scoped>

</style>