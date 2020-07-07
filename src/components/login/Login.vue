<template>
  <div id="login-app">
    <b-container>
      <div class="content-login-app">
        <div class="frm-login-app mx-auto">
          <div class="handleNotice" v-if="status.isShow">
            <b-alert
              v-bind:variant="status.class"
              class="handleNoticeItem"
              show
            >{{ status.text }}</b-alert>
          </div>
          <!-- <p>{{ errors.name }}</p> -->
          <div class="box-login-app">
            <div class="logo-app">
              <img src="../../assets/images/logo-ai-telesale.png" alt />
              <span>Dịch vụ mới</span>
            </div>
            <div class="content-from-login">
              <b-form>
                <b-input-group
                  class="mb-2 mr-sm-2 mb-sm-0 group-ip"
                  v-bind:class="{'error-groups': $v.username.$error, 'success-groups': !$v.username.$invalid }"
                >
                <div class="icon-u"><font-awesome-icon icon="user" /></div>
                  <b-input id placeholder="Tên đăng nhập" v-model="$v.username.$model"></b-input>
                  <span class="error" v-if="!$v.username.required">Không bỏ trống tên đăng nhập.</span>
                  <span
                    class="error"
                    v-if="!$v.username.minLength"
                  >Độ dài phải lớn hơn {{ $v.username.$params.minLength.min }} ký tự.</span>
                </b-input-group>
                <b-input-group

                  class="mb-2 mr-sm-2 mb-sm-0 group-ip"
                  v-bind:class="{'error-groups':$v.password.$error,'success-groups': !$v.username.$invalid}"
                >
                <div class="icon-u"><font-awesome-icon icon="lock" /></div>
                  <b-input id placeholder="Mật khẩu" type="password" v-model="$v.password.$model"></b-input>
                  <span class="error" v-if="!$v.password.required">Không bỏ trống tên mật khẩu.</span>
                  <span
                    class="error"
                    v-if="!$v.password.minLength"
                  >Độ dài phải lớn hơn {{ $v.password.$params.minLength.min }} ký tự.</span>
                </b-input-group>
                <b-input-group class="mb-2 mr-sm-2 mb-sm-0 group-ip">
                  <b-button type="submit" variant="primary" @click="handleSubmit($event)">Đăng nhập</b-button>
                </b-input-group>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(3)
    },
    password: {
      required,
      minLength: minLength(3)
    }
  },
  methods: {
    handleSubmit (e) {
            this.$v.$touch();
            this.error = "";
            if (this.$v.$invalid) {
              console.log("errors");
              return;
            }
            const username = this.$v.username.$model;
            const password = btoa(this.$v.password.$model);
            this.submitted = true;
            const { dispatch } = this.$store;
            if (username && password) {
                dispatch('authentication/login', { username, password });
            }
            if(e){
              e.preventDefault();
            }
     },
    // submit() {
    //   this.$v.$touch();
    //   this.error = "";
    //   if (this.$v.$invalid) {
    //     console.log("errors");
    //   } else {
    //     let user = {
    //       uname: this.$v.username.$model
    //     };
    //     this.$http
    //       .post(
    //         "v1/api/account-managers/login",
    //         user,
    //         { headers: { pwd: btoa(this.$v.password.$model) } }
    //       )
    //       .then(
    //         res => {
    //           console.log(res);
    //           if (res.status == 200) {

    //             let loginUser = {};
    //             let data= null;

    //             loginUser.username = this.$v.username.$model;
    //             loginUser.token = res.body.body.access_token;
    //             loginUser.role = res.body.body.rol;

    //             localStorage.setItem('access_token', JSON.stringify(loginUser));

    //             // localStorage.setItem("access_token","Bearer "+token);

    //             // this.$store.commit("setLogin", true);

    //             this.status = {
    //               isShow: false,
    //               text: "Đăng nhập thành công.",
    //               class: "success"
    //             };
    //             setTimeout(() => {
    //               this.$router.push("/customers");
    //             }, 500);
    //           }
    //         },
    //         err => {
    //           // console.log( err );
    //           this.status = {
    //             isShow: true,
    //             text: err.body.message,
    //             class: "danger"
    //           };
    //           // this.$store.commit("unsetLogin", false);
    //         }
    //       );
    //   }
    // }
  },
  mounted(){
    // this.pageLoad();
  },
  computed: {
      loggingIn () {
          return this.$store.state.authentication.status.loggingIn;
      },
      status(){
          return this.$store.state.authentication.message;
      },
      usericon(){
        return '<span><font-awesome-icon icon="user" /></span>';
      }
  },
  created () {
      // reset login status
      this.$store.dispatch('authentication/logout');
  },

};
</script>

<style scoped>
div#login-app {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    position: relative;
    min-height: 100vh;
    background: #e6e6e6 url("../../assets/images/bg_login.jpg") no-repeat center;
    /* background: #e6e6e6 url(https://ecopa.com/wp-content/uploads/2016/07/contact-bg.jpg)no-repeat center; */
    background-size: cover;
}
div#login-app:before {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    background: #00000073;
}
.logo-app img {
  height: 80px;
}
.logo-app {
  float: left;
  width: 100%;
  text-align: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
}
.content-from-login {
  float: left;
  width: 100%;
}
.group-ip {
  margin-bottom: 15px !important;
  float: left;
  width: 100%;
}
.group-ip:last-child {
  display: flex;
  justify-content: flex-end;
}
.frm-login-app {
  text-align: center;
}
.box-login-app {
  max-width: 500px;
  display: inline-block;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  position: relative;
}
.logo-app span {
  font-weight: bold;
  color: #f15a40;
  font-size: 20px;
  padding-left: 10px;
}
.content-from-login .btn-primary {
  color: #fff;
  background-color: #f15a40;
  border-color: #f15a40;
}
.input-group-text {
  background: #f15a40;
  color: #fff;
  width: 45px;
  text-align: center;
  display: flex;
  justify-content: center;
}
.error-groups span {
  display: block;
}
.error {
  float: left;
  width: 100%;
  text-align: left;
  font-size: 13px;
  color: #ff7534;
  margin-top: 5px;
  font-style: italic;
  display: none;
  padding-left: 60px;
}
.error-groups input {
  border: 1px solid #ff7534;
}
.content-from-login input {
  font-size: 13px;
  height: 38px;
}
.group-ip.success-groups input {
  border: 1px solid #009121;
}
</style>