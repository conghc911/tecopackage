<template>
  <div>
    <mains>
      <breakcrumb-app>Chuyển tài nguyên</breakcrumb-app>
      <div id="content-box">
        <b-container>
          <b-col cols="12" v-if="isNotice">
            <b-alert show variant="success">{{ notice }}</b-alert>
          </b-col>
          <div class="top-head-box margin-frm mx-auto" style="width:600px">
            <form id="resource" :class="{'btn-isCancel':isCancel}">
              <b-row>
                <b-col
                  cols="12"
                  md="12"
                  lg="12"
                  class="frm-group-cs"
                  v-bind:class="{'error-groups': $v.valueUser.$error }"
                >
                  <b-input-group :prepend-html="taikhoan" class="mb-2 mr-sm-2 mb-sm-0">
                    <treeselect
                      v-model="$v.valueUser.$model"
                      :multiple="false"
                      placeholder="Lựa chọn"
                      noOptionsText="Chưa có dữ liệu"
                      noResultsText="Không có dữ liệu"
                      :options="dataUser"
                    />
                  </b-input-group>
                  <span class="errors" v-if="!$v.valueUser.required">Không bỏ trống tài khoản.</span>
                </b-col>
                <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                  <b-input-group prepend="Ngày ký hợp đồng" class="mb-2 mr-sm-2 mb-sm-0">
                    <div class="custom-prepend">
                      <date-picker
                        v-model="ngayKy"
                        :lang="lang"
                        value-type="format"
                        format="YYYY-MM-DD"
                        :shortcuts="shortcuts"
                      ></date-picker>
                    </div>
                  </b-input-group>
                </b-col>
                <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                  <b-input-group prepend="Số hợp đồng" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id placeholder="Số hợp đồng" v-model="valueContactNumber"></b-input>
                  </b-input-group>
                </b-col>
                <b-col
                  cols="12"
                  md="12"
                  lg="12"
                  class="frm-group-cs"
                  v-bind:class="{'error-groups': $v.soPhutChuyen.$error }"
                >
                  <b-input-group :prepend-html="tainguyechuyen" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input
                      id
                      v-model="$v.soPhutChuyen.$model"
                      placeholder="Số phút chuyển"
                      type="text"
                      onkeypress="if ( isNaN(this.value + String.fromCharCode(event.keyCode) )) return false;"
                    ></b-input>
                  </b-input-group>
                  <span
                    class="errors"
                    v-if="!$v.soPhutChuyen.required"
                  >Không bỏ trống tài nguyên chuyển.</span>
                </b-col>
                <b-col
                  cols="12"
                  md="12"
                  lg="12"
                  class="frm-group-cs"
                  v-bind:class="{'error-groups': $v.ngayHetHan.$error }"
                >
                  <b-input-group :prepend-html="datehethan" class="mb-2 mr-sm-2 mb-sm-0">
                    <div class="custom-prepend">
                      <date-picker
                        :disabled="isDisableNgayHetHan == false"
                        v-model="$v.ngayHetHan.$model"
                        :not-before=" notBefore "
                        :lang="lang"
                        value-type="format"
                        format="YYYY-MM-DD"
                        :shortcuts="shortcuts"
                      ></date-picker>
                    </div>
                  </b-input-group>
                  <span class="errors" v-if="!$v.ngayHetHan.required">Chọn ngày hết hạn.</span>
                </b-col>
                <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                  <b-input-group prepend="Ghi chú" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id v-model="valueNote" placeholder="Nhập nội dung"></b-input>
                  </b-input-group>
                </b-col>
              </b-row>

              <div class="mx-auto btn-filter" style="width:300px">
                <button type="button" class="moveItem" @click="handleChuyen($event)">
                  <font-awesome-icon icon="exchange-alt" />
                  <span>Chuyển</span>
                </button>
                <button type="button" class="resetItem" @click="resetForm()">
                  <font-awesome-icon icon="undo" />
                  <span>Hủy</span>
                </button>
              </div>
            </form>
          </div>

          <!-- danh sach khach hang -->
        </b-container>
      </div>
      <!-- popup add branch -->
      <b-modal id="bv-modal-success" title="Thông báo!" hide-footer :noCloseOnEsc="true" :noCloseOnBackdrop="true" :centered="true" >
        <div class="d-block text-center">
            <span class="title_success"> {{notiteMsg}}</span>
            <div class="popup-footer">
              <b-col cols="12">
                <b-button
                  type="button"
                  variant="danger"
                  class="mt-3"
                  @click="$bvModal.hide('bv-modal-success')"
                >Đóng</b-button>
              </b-col>
            </div>
        </div>
      </b-modal>
    </mains>
  </div>
</template>

<script>
import Mains from "../Main.vue";
import Breakcrumb from "../layouts/Breakcrumb.vue";
import Treeselect from "@riophae/vue-treeselect";
import DatePicker from "vue2-datepicker";

import { required } from "vuelidate/lib/validators";

let stringImport = require("../../_helpers/string");

export default {
  mounted() {
    // this.$root.checkUserLogin();
    this.checkRuleUser();
    this.getListUserLogin();
    this.getNumberContact();
    this.setTitlePage();
  },
  data() {
    return {
      // user:[],
      notiteMsg:null,
      isCancel : false,
      isDisableNgayHetHan: true,
      soPhutChuyen: "",
      valueNote: "",
      valueContactNumber: "",
      valueUser: null,
      dataUser: [],
      ngayKy: "",
      ngayHetHan: "",
      notice: [],
      isNotice: false,
      lang: {
        days: ["CN", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7"],
        months: [
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12"
        ],
        pickers: ["Sau 7 ngày", "Sau 30 ngày", "Trước 7 ngày", "Trước 30 ngày"],
        placeholder: {
          date: "Chọn ngày",
          dateRange: "Khoảng thời gian"
        }
      },

      shortcuts: [
        {
          text: "Hôm nay",
          onClick: () => {
            this.ngayKy = [new Date(), new Date()];
            this.ngayHetHan = [new Date(), new Date()];
          }
        }
      ],
      variant: "light"
    };
  },
  components: {
    Treeselect,
    DatePicker,
    Mains,
    "breakcrumb-app": Breakcrumb
  },
  validations: {
    valueUser: { required },
    ngayHetHan: { required },
    soPhutChuyen: { required }
  },
  methods: {
    async getListUserLogin() {
      if(!this.user.role_code){
          return [];
      }
      // console.log(this.user);
      let URL = 'v1/api/account-managers/suggest-name';
      if(this.user.role_code =="MOD"){
        URL = URL + '?roleCodeSelected=CON'
      }else if(this.user.role_code =="CON"){
        URL = URL + '?roleCodeSelected=SAL'
      }else{
        URL = URL + '?roleCodeSelected=MOD'
      }
      // console.log(URL)

      // let d = [];
      await this.$http.get(URL).then(res => {
        if (res.status == 200) {
          let dataNew = [];
          let data = res.body.body;
          if (data.length > 0) {
            for (let i in data) {
              // dataNew.push( { id: data[i].trim(),label: data[i] } );
              dataNew.push({ id: data[i].user_id, label: data[i].username });
            }
          }
          this.dataUser = dataNew;
          // d = dataNew;
        }
      });
      // console.log(d);
      // return d;
    },
    getNumberContact() {
      this.$http.get("v1/api/transfer-resources/contract-number").then(res => {
        if (res.status == 200) {
          this.valueContactNumber = res.body.body;
        }
      });
    },

    async handleChuyen(e) {
      // console.log( this.user );
      this.isCancel = false
      let msg = '';
      let checkchuyen = false;
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("errors");
      } else {
        let obj = {
          contract_number: this.valueContactNumber,
          contract_signing_date: this.ngayKy,
          expired_resource_date: this.$v.ngayHetHan.$model,
          note: this.valueNote ? this.valueNote.slice(0,100) : '',
          sms_resource_transfer: 0,
          username: this.$v.valueUser.$model,
          voice_resources_transfer: this.soPhutChuyen,
          user_id_receiver:this.$v.valueUser.$model,
        };
        if( stringImport.checkSyntax(this.soPhutChuyen) ){
          alert('Số phút chuyển không được chứa các ký tự số và ký tự đặc biệt!')
          return false;
        }
        // console.log( obj );
        await this.$http.post("v1/api/transfer-resources/check", obj).then(resp=>{
          msg = resp.body.body
        },err => {
          alert("Có lỗi khi chuyển tài nguyên. \n" + err.body.message);
          checkchuyen = true;
          return false;
        });
        // console.log( msg );
        
        
        if(!checkchuyen){
          let confirms = confirm(msg);
          if(confirms){
            this.$http.post("v1/api/transfer-resources", obj).then(
              res => {
                if (res.status == 200) {
                  // this.isDisableNgayHetHan = false;
                  this.notiteMsg = "Chuyển tài nguyên thành công!";
                  this.$bvModal.show('bv-modal-success');
                  this.resetForm();
                  // this.$store.dispatch('stores/getDataUser',{self:this});
                  this.$store.dispatch('users/getInfo',{self:this});
                }
              },
              err => {
                alert("Có lỗi khi chuyển tài nguyên. \n" + err.body.message);
              }
            );
          }
        }
      }

      e.preventDefault();
    },
    getDataUser(){
    },
    resetForm() {
      this.soPhutChuyen =null;
      this.isCancel = true;
      this.isNotice = false;
      this.valueUser = null;
      this.ngayKy = null;
      this.ngayHetHan = null;
      this.valueNote = null;
      this.$v.$reset();
      this.getNumberContact();
    },
    setTitlePage() {
      this.$store.state.stores.titlePage = "Chuyển tài nguyên";
    },
    checkRuleUser() {
      // let result = this.$service.dataUserLogin();
      // result.then(res => {
      //   if (res.status == 200 && res.body != "") {
      //     this.user = res.body.body;
      //     if (res.body.body.role_code == "SAL") {
      //       this.$router.push("/customers");
      //     }
      //   }
      // });
      if (this.user.role_code == "SAL") {
        this.$router.push("/customers");
      }
    }
  },
  computed: {
    notBefore() {
      if (this.ngayKy) {
        return stringImport.getDateNext(this.ngayKy);
      }
    },
    taikhoan(){
      return 'Tài khoản <span>(*)</span>';
    },
    datehethan(){
      return 'Ngày hết hạn <span>(*)</span>';
    },
    tainguyechuyen(){
      return 'Tài nguyên chuyển <span>(*)</span>';
    },
    credential () {
        return this.$store.state.authentication.user;
    },
    user () {
        let d =  this.$store.state.users.info;
        if(d && d.role_code){
          return d;
        }else{
          return this.$service.getUserLogin();
        }
    }
  },
  asyncComputed: {
    // dataUser() {
    //    return this.getListUserLogin();
    // }
  },
  watch: {
    ngayKy(value) {
      // if (value != "" && value != null) {
      //   this.isDisableNgayHetHan = true;
      // } else {
      //   this.isDisableNgayHetHan = false;
      // }
    },
    soPhutChuyen(value) {
      if (parseInt(value) < 0) {
        alert("Tài nguyên chuyển phải là số nguyên dương.");
        this.soPhutChuyen = 0;
      }
     
    }
  }
};
</script>


<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>
