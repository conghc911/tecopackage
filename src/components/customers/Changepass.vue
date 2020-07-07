<template>
  <div>
    <mains>
      <div id="content-box">
        <b-container>
          <div class="top-head-box margin-frm mx-auto" style="width:700px">
            <div id="thongtintk">
              <ul class="tab-thongtin">
                <li @click="changeTab(1)" :class="{'active': tabActiveT}"><a href="javascript:;">Thông tin</a></li>
                <li @click="changeTab(2)" :class="{'active': tabActiveM}"><a href="javascript:;">Mật khẩu</a></li>
              </ul>
              <div class="thongtintab">
                <form id="resource" >
                <div class="thongtin-tk-left" v-if="tabThongtin">
                  <!--  -->
                    <b-row>
                      <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                        <b-input-group prepend="Tài khoản" class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input id="" v-model="usercurrent" disabled ></b-input>
                        </b-input-group>
                      </b-col>

                      <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                        <b-row>
                          <b-col cols="12" md="6" lg="6" class="frm-group-cs">
                            <b-input-group prepend="Họ" class="mb-2 mr-sm-2 mb-sm-0">
                              <b-input id="" type="text" v-model="fistname" placeholder="Họ"></b-input>
                            </b-input-group>
                          </b-col>
                          <b-col cols="12" md="6" lg="6" class="frm-group-cs">
                            <b-input-group prepend="Tên" class="mb-2 mr-sm-2 mb-sm-0">
                              <b-input id="" type="text" v-model="lastname" placeholder="Tên"></b-input>
                            </b-input-group>
                          </b-col>
                        </b-row>
                      </b-col>

                      <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                        <b-input-group prepend="Email" class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input type="text" v-model="email" ></b-input>
                        </b-input-group>
                      </b-col>
                      <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                        <b-input-group prepend="Số điện thoại"  class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input type="number" v-model="phonenumber" ></b-input>
                        </b-input-group>
                      </b-col>

                      <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                        <b-input-group prepend="Hạn tài nguyên"  class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input type="text" disabled :value="hantainguyen" ></b-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                  <!--  -->
                </div>
                <div class="thongtin-tk-right" v-if="tabMatkhau" :class="{'isCanle':isClickButtonUpdate}">
                  <b-row>
                    <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                        <b-input-group prepend="Mật khẩu cũ" class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input id="" type="password" v-model="passold" placeholder="Mật khẩu cũ"></b-input>
                          <span v-if="errors.passold" class="span-error">Nhập mật khẩu cũ</span>
                        </b-input-group>
                      </b-col>
                      <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                        <b-input-group prepend="Mật khẩu mới" class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input id="" type="password" v-model="passnew" placeholder="Mật khẩu mới"></b-input>
                          <span v-if="errors.passnew" class="span-error">Nhập mật khẩu mới</span>
                        </b-input-group>
                      </b-col>
                      <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                        <b-input-group prepend="Nhập lại mật khẩu" class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input id="" type="password" v-model="repassnew" placeholder="Nhập lại mật khẩu mới"></b-input>
                          <span v-if="wrongpass" class="span-error">Mật khẩu mới không khớp</span>
                        </b-input-group>
                      </b-col>
                    </b-row> 
                </div>
                <!--  -->
                    <div class="mx-auto btn-filter" style="width:300px">
                      <button class="moveItem" @click="handeUpdate($event)" v-if="tabThongtin">
                        <font-awesome-icon icon="exchange-alt" />
                        <span>Cập nhật</span>
                      </button>
                      <button class="moveItem" @click="handeChangePass($event)" v-if="tabMatkhau">
                        <font-awesome-icon icon="exchange-alt" />
                        <span>Cập nhật</span>
                      </button>
                      <button type="button" class="resetItem" @click="resetForm()" >
                        <font-awesome-icon icon="undo" />
                        <span>Hủy bỏ</span>
                      </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
          
        </b-container>
      </div>
    </mains>
  </div>
</template>

<script>
import Mains from "../Main.vue";

let stringImport = require("../../_helpers/string");
import { required } from "vuelidate/lib/validators";

export default {
  mounted(){
    // this.$root.checkUserLogin();
    this.checkRuleUser();
    this.setTitlePage();
  },
  data() {
    return {
      isClickButtonUpdate:false,
      tabThongtin:true,
      tabMatkhau:false,
      tabActiveT:true,
      tabActiveM:false,
      user:{},
      wrongpass:false,
      errors:{
        passold:false,
        passnew:false
      },
      passold:null,
      passnew:null,
      repassnew:null,
      usercurrent:null,

      fistname: null,
      lastname: null,
      email:null,
      phonenumber:null,
      hantainguyen:null,
      
    };
  },
  components: {
    Mains,
  },
  methods:{
    setTitlePage(){
      this.$store.state.stores.titlePage = "Đổi mật khẩu"
    },
    async checkRuleUser(){
      let result = this.$service.dataUserLogin();
      await result.then(res => {
          if (res.body != "") {
            this.user = res.body,
            this.usercurrent = res.body.username,
            this.fistname = res.body.first_name,
            this.lastname = res.body.last_name,
            this.email = res.body.email,
            this.phonenumber = res.body.phone_number,
            this.hantainguyen = res.body.expired_resources_date
        }
      });
    },
    changeTab(e){
      if(e == 1){
        this.tabMatkhau = false;
        this.tabThongtin = true;
        this.tabActiveT = true;
        this.tabActiveM = false;
      }else{
        this.tabMatkhau = true;
        this.tabThongtin = false;
        this.tabActiveT = false;
        this.tabActiveM = true;
      }
    },
    checkPassOld(value){
      // let passCurrent = this.user.
    },
    handeUpdate(e){
      this.isClickButtonUpdate = false;
      let obj = this.user;
      obj.first_name = this.fistname,
      obj.last_name = this.lastname,
      obj.email = this.email,
      obj.phone_number = this.phonenumber
      // let obj = {
      //   "first_name": this.fistname,
      //   "last_name": this.lastname,
      //   "email": this.email,
      //   "phone_number": this.phonenumber,

        // role_code: null,
        // status: 1,
        // topic_list: 1,
        // username: 1,
        // user_id: 1,
        // expired_resources_date:1,
        // total_branches_machine_number: 1 ,
        // avaiable_branches_machine_number: 1,
      // }
      if(stringImport.checkInputUser(this.fistname) || stringImport.checkInputUser(this.lastname) ){
          alert('Trường họ và tên không được chứa các ký tự số và ký tự đặc biệt!')
          e.preventDefault();
          return false;
        }
      this.$http.put('v1/api/account-managers',obj).then(res=>{
        // console.log( res );
        alert(res.body.message);
        this.checkRuleUser();
      },err => {
        // console.log( err );
        alert(err.body.message);
      });

      e.preventDefault();
    },
    handeChangePass(e){
      this.isClickButtonUpdate = false;
      if(!this.passold){
        this.errors.passold = true
      }
      if(!this.passnew){
        this.errors.passnew = true
      }
      if(this.passnew != this.repassnew){
        this.errors.wrongpass = true
      }

      if(this.passold && this.passnew && !this.wrongpass && this.repassnew == this.passnew){
        let obj = {
          "password_current": this.passold,
          "password_new": this.passnew,
          "user_id": this.user.user_id,
          "username": this.usercurrent,
        }
        // console.log( obj );
        this.$http.put('v1/api/account-managers/change-pass',obj).then(res=>{
          // console.log( res );
          alert(res.body.message);
          this.$router.push("/login");
        },err => {
          // console.log( err );
          alert(err.body.message);
        });
      }
      
      e.preventDefault();
    },
    resetForm(){
      // this.$router.go();
      this.checkRuleUser();
      this.isClickButtonUpdate = true;
      this.passold = null;
      this.passnew = null;
      this.repassnew = null;
    }

  },
  computed: {
    credential () {
        return this.$store.state.authentication.user;
    },
    info () {
         let d =  this.$store.state.users.info;
        if(d && d.role_code){
          return d;
        }else{
          return this.$service.getUserLogin();
        }
    }
  },
  watch: {
    repassnew(value){
      if(this.passnew){
        if( value !== this.passnew){
          this.wrongpass = true;
          this.isClickButtonUpdate = false;
        }else{
          this.wrongpass = false;
        }
      }
    },
    passold(value){
      if(!value){
        this.errors.passold = true;
      }else{
        this.errors.passold = false;
      }
    },
    passnew(value){
      if(!value){
        this.errors.passnew = true;
      }else{
        this.errors.passnew = false;
        if(this.repassnew === value){
          this.wrongpass = false;
        }else{
          this.wrongpass = true;
          this.isClickButtonUpdate = false;
        }
      }
    }
  }
};
</script>