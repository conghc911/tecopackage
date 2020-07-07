<template>
  <div>
    <mains>
      <div id="content-box">
        <b-container>
          <b-col cols="12" v-if="isNotice">
            <b-alert show variant="success">{{ notice }}</b-alert>
          </b-col>
          <div class="top-head-box margin-frm">
            <form>
              <b-row>
                <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Vai trò" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        v-model="objFilter.role_code"
                        :multiple="false"
                        :options="dataMod"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        @input="handleChangeVaitro($event)"
                      />
                    </b-input-group>
                  </b-col>
                </b-col>
                <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Tên đăng nhập" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        v-model="objFilter.username_list"
                        :multiple="true"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        :options="userRole"
                      />
                    </b-input-group>
                  </b-col>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Trạng thái" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        v-model="objFilter.status"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        :multiple="false"
                        :options="dataStatus"
                      />
                    </b-input-group>
                  </b-col>
                </b-col>
                <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Ngày tạo" class="mb-2 mr-sm-2 mb-sm-0">
                      <div class="custom-prepend">
                        <date-picker
                          v-model="time3"
                          :lang="lang"
                          range
                          value-type="format"
                          format="YYYY-MM-DD"
                          range-separator =" đến "
                          :shortcuts="shortcuts"
                        ></date-picker>
                      </div>
                    </b-input-group>
                  </b-col>
                </b-col>
              </b-row>
              <div class="mx-auto btn-filter" style="width:500px">
                <button v-on:click="handleFilter($event)">
                  <font-awesome-icon icon="search" /> Lọc
                </button>
                <span class="addnew addUser" @click="$bvModal.show('bv-modal-create'), resetForm() ">
                  <font-awesome-icon icon="user-plus" /> Thêm mới
                </span>

                <!-- download file exel -->
                <!-- <export-excel
                  class="btn-exel"
                  :fields="fieldsData"
                  worksheet="Quản lý tài khoản"
                  name="quan_ly_tai_khoan.xls"
                  :fetch="fetchDataHistory"
                  :before-generate="startDownload"
                  :before-finish="finishDownload"
                >
                  <span class="addnew " >
                    <font-awesome-icon icon="download" /> Tải về
                  </span>
                </export-excel> -->

              </div>
            </form>
          </div>
          <!-- danh sach khach hang -->
          <div class="control-list-box">
            <div class="head-list">
              <div class="left-head-list">
                <span>Hiển thị</span>
                <select v-model="perPage" value="10">
                  <option value="3">3</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>bản ghi</span>
              </div>
              <div class="right-head-list">
                <p>
                  Hiển thị bản ghi
                  <strong>1 - {{perPage}}</strong> trên tổng số
                  <strong>{{ totalData }}</strong> bản ghi
                </p>
              </div>
            </div>
            <div class="body-table" v-bind:class="{'activemod': myrule != 1}">
              <b-table id="my-table-customer" hover :items="listUser" :fields="fields" responsive>
                <template v-slot:cell(role_code)="vaitro">
                  <span>{{ getRules(vaitro.value) }}</span>
                </template>

                <template v-slot:cell(status)="trangthai">
                  <span v-if="trangthai.value == 1 " class="aleftCao">Hoạt động</span>
                  <span v-if="trangthai.value != 1 " class="aleftThap">Không hoạt động</span>
                </template>

                <template v-slot:cell(action)="thaotac">
                    <span
                        class="aleftCao"
                        title="Sửa"
                        @click="handleEditUser(thaotac.item.user_id),$bvModal.show('bv-modal-create')"
                    >
                        <font-awesome-icon icon="edit" />
                    </span>

                    <span
                        v-if="userRoleCurrent != 'MOD'"
                        class="aleftThap"
                        title="Thu hồi"
                        @click="$bvModal.show('bv-modal-undo-resource'); themTaiNguyen(thaotac.item)"
                    >
                        <font-awesome-icon icon="undo" />
                    </span>
                    <span
                        v-if="userRoleCurrent == 'ADM'"
                        class="aleftThap"
                        title="Xóa"
                        @click="handleDelUser(thaotac)"
                    >
                        <font-awesome-icon icon="trash-alt" />
                    </span>

                </template>
              </b-table>
                <!-- phan trang -->
                <Pagination
                    v-if="totalData"
                    :totalRow="totalData"
                    :perPage="parseInt(perPage)"
                    :actionName="actionNamePagi"
                    :dataQuery="dataQuery"
                    :dataObject="true"
                    @getPageCurrent="pageCurrent = $event" />

                <div class="no-data" v-if="totalData == 0" id="nodata-search" >
                    <p>Không có dữ liệu.</p>
                </div>

            </div>
          </div>
        </b-container>
        <!-- popup create -->
        <b-modal
          @hide="resetForm()"
          id="bv-modal-create"
          hide-footer
          :noCloseOnEsc="true"
          :noCloseOnBackdrop="true"
        >
          <template v-slot:modal-title>
            <h3>{{titleModal}}</h3>
          </template>
          <div class="d-block text-center">
            <form v-on:submit.prevent="submit" id="form-user">
              <b-row>
                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group :prepend-html="vaitro_pre" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        v-validate="'required'" data-vv-as="Vai trò"
                        name="role"
                        v-model="objCreate.role_code"
                        :multiple="false"
                        :options="dataMod"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                      />
                    </b-input-group>
                    <span class="error">{{ errors.first('role') }}</span>
                  </b-col>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" md="6" lg="6" >
                    <b-col class="frm-group-cs custom-prepend-report">
                        <b-input-group :prepend-html="ho_pre" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-input v-validate="'required'" data-vv-as="Họ" name="first_name" placeholder="Họ" v-model="objCreate.first_name"></b-input>
                        </b-input-group>
                        <span class="error">{{ errors.first('first_name') }}</span>
                    </b-col>
                </b-col>
                <b-col cols="12" md="6" lg="6">
                    <b-col class="frm-group-cs custom-prepend-report">
                        <b-input-group :prepend-html="ten_pre" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-input v-validate="'required'" data-vv-as="Tên" name="last_name" placeholder="Tên" v-model="objCreate.last_name"></b-input>
                        </b-input-group>
                        <span class="error">{{ errors.first('first_name') }}</span>
                    </b-col>
                </b-col>
                <b-col cols="12">
                    <b-col class="frm-group-cs">
                        <b-input-group :prepend-html="tendangnhap_pre" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-input v-validate="'required|alpha_dash'" data-vv-as="Tên đăng nhập" name="username" placeholder="Tên đăng nhập" v-model="objCreate.username"></b-input>
                        </b-input-group>
                        <span class="error">{{ errors.first('username') }}</span>
                    </b-col>
                </b-col>
                <b-col cols="12">
                    <b-col class="frm-group-cs">
                        <b-input-group :prepend-html="matkhau_pre" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-input v-validate="'required'" data-vv-as="Mật khẩu" name="password" ref="password" placeholder="Mật khẩu" type="password" v-model="objCreate.password"></b-input>
                        </b-input-group>
                        <span class="error">{{ errors.first('password') }}</span>
                    </b-col>
                </b-col>
                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group :prepend-html="nhaplai_pre" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-input v-validate="'required|confirmed:password'" data-vv-as="Nhập lại mật khẩu" v-model="repassword" name="repassword" placeholder="Nhập lại mật khẩu" type="password"></b-input>
                    </b-input-group>
                    <span class="error">{{ errors.first('repassword') }}</span>
                  </b-col>
                </b-col>

                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Email" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-input  v-validate="'email'" data-vv-as="Mật khẩu" name="email" placeholder="Email" v-model="objCreate.email"></b-input>
                    </b-input-group>
                    <span class="error">{{ errors.first('email') }}</span>
                  </b-col>
                </b-col>
                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Số điện thoại" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-input v-validate="{ numeric:true,regex: /^0[9|8|7|5|3][0-9]{8}$/ }" data-vv-as="Số điện thoại" name="phone" placeholder="Số điện thoại" type="text" v-model="objCreate.phone_number"></b-input>
                    </b-input-group>
                    <span class="error">{{ errors.first('phone') }}</span>
                  </b-col>
                </b-col>


                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group :prepend-html="somaynhanh_pre" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-input
                            placeholder="Nhập số máy nhánh"
                            type="number"
                            v-validate="'required|numeric'" data-vv-as="Số máy nhánh" name="num"
                            v-model="objCreate.total_branches_machine_number"
                        ></b-input>
                    </b-input-group>
                    <span class="error">{{ errors.first('num') }}</span>
                  </b-col>
                </b-col>

                <b-col cols="12" v-if="!isAdd">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend-html="Hạn tài nguyên" class="mb-2 mr-sm-2 mb-sm-0 custom-prependd">
                        <date-picker
                            v-model="objCreate.expired_resources_date"
                            :lang="lang"
                            value-type="format"
                            format="YYYY-MM-DD"
                            :shortcuts="shortcuts"
                        ></date-picker>
                    </b-input-group>
                    <span class="error">{{ errors.first('num') }}</span>
                  </b-col>
                </b-col>

                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Trạng thái" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        v-validate="'required'" data-vv-as="Trạng thái" name="status"
                        :multiple="false"
                        :options="dataStatus"
                        :value="1"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        v-model="objCreate.status"
                      />
                    </b-input-group>
                    <span class="error">{{ errors.first('status') }}</span>
                  </b-col>
                </b-col>
              </b-row>
              <div class="popup-footer">
                <b-col cols="12">
                  <b-button
                    class="mt-3"
                    variant="primary"
                    v-on:click="submit_create($event)"
                  >{{titleAction}}</b-button>
                  <b-button
                    variant="danger"
                    class="mt-3"
                    @click="$bvModal.hide('bv-modal-create')"
                  >Đóng</b-button>
                </b-col>
              </div>
            </form>
          </div>
        </b-modal>
        <!-- end popup create -->


        <!-- popup unde resource -->
        <b-modal
          :noCloseOnEsc="true"
          :noCloseOnBackdrop="true"
          id="bv-modal-undo-resource"
          hide-footer
        >
          <template v-slot:modal-title>
            <h3>Thu hồi tài nguyên</h3>
          </template>
          <div class="d-block text-center">
            <div class="undo-resource">
              <p>
                Tài nguyên hiện có:
                <b>{{ taiNguyenKhaDung }}</b>
              </p>
              <span>
                Bạn có muốn thu hồi tài nguyên của tài khoản
                <b>{{ taiKhoanHienTai }}</b> này không?
              </span>
            </div>
          </div>
          <div class="popup-footer btn-call">
            <b-col cols="12">
              <b-button
                class="mt-3"
                variant="primary"
                :disabled="taiNguyenKhaDung ==0 "
                v-on:click="handleUndoResource(userID)"
              >Đồng ý</b-button>
              <b-button
                variant="danger"
                class="mt-3"
                @click="$bvModal.hide('bv-modal-undo-resource')"
              >Hủy</b-button>
            </b-col>
          </div>
        </b-modal>
        <!-- end popup undo resource -->
        <!-- popup add success -->
        <b-modal id="bv-modal-success" title="Thông báo!" hide-footer :noCloseOnEsc="true" :noCloseOnBackdrop="true" :centered="true" >
          <div class="d-block text-center">
              <span class="title_success" v-html="notiteMsg"></span>
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
      </div>
    </mains>
  </div>
</template>

<script>
import Mains from "../Main.vue";
import Pagination from "../layouts/Pagination";
import Treeselect from "@riophae/vue-treeselect";
import DatePicker from "vue2-datepicker";

import { helper } from "../../_helpers/helper";

let stringImport = require("../../_helpers/string");
let dateImport = require("../../_helpers/date");

export default {

    created(){
        this.checkRuleUser();
        this.$store.dispatch("users/getListUser",{limit:this.perPage,page:0,data:this.dataQuery});
    },
    mounted() {
        this.setTitlePage();
    },
    data() {
    return {
        userID:null,
        isAdd:true,
        titleModal:"Thêm mới tài khoản",
        titleAction:"Thêm mới",
        actionNamePagi:'users/getListUser',
        repassword:null,
        isNotice:false,
        dataUser:[],
        taiNguyenKhaDung:0,
        taiKhoanHienTai:0,
        notiteMsg:'',
        objCreate:{},
        objFilter:{},
        //define exel export
        titleExcel:'Xuất',
        exelData: [],
        fieldsData: {
            Stt: "stt",
            "Tên đăng nhập": "tên_đăng_nhập",
            "Ngày khởi tạo": "ngày_khởi_tạo",
            "Tài nguyên khả dụng": "tài_nguyên_khả_dụng",
            "Ngày hết hạn": "ngày_hết_hạn",
            "Trạng thái": "trạng_tháii",
            "Vai trò": "vai_trò"
        },
        //end define exel export
        dataStatus: [
            { id: "1", label: "Hoạt động" },
            { id: "2", label: "Không hoạt đông" }
        ],
        time3: "",
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
                this.time3 = [new Date(), new Date()];
                this.hanTaiNguyen = [new Date(), new Date()];
            }
            }
        ],

        fields: [
            { key: "stt", label:'#', sortable: true, thClass: "classStt" },
            { key: "username", label:'Tên đăng nhập', sortable: false },
            { key: "created_date", label:'Ngày khởi tạo', sortable: false },
            { key: "voice_resources_avaiable", label:'Tài nguyên khả dụng', sortable: false, thClass: "classDQT" },
            { key: "expired_resources_date", label:'Ngày hết hạn', sortable: false },
            { key: "status", label:'Trạng thái', sortable: true },
            { key: "role_code", label:'Vai trò', sortable: false, thClass: "classVaitro" },
            { key: "action", label:'Thao tác', sortable: false ,thClass: "widht3"}
        ],
        items: [],
        itemsEdit: [],
        lengthRow: 10,
        perPage: 10,
        currentPage: 1,
        totalRow: 0,
        variant: "light"
        }
  },
  components: {
    Treeselect,
    DatePicker,
    Mains,
    Pagination
  },
    methods: {
        async handleUndoResource(userid){
            console.log(userid);
            let result = await this.$store.dispatch("users/undoResource",userid);
            this.notiteMsg = result.body.message;
            this.$bvModal.hide("bv-modal-undo-resource");
            this.$bvModal.show("bv-modal-success");
            this.$store.dispatch("users/getListUser",{limit:this.perPage,page:0,data:this.dataQuery});
            // console.log(res);
        },
        themTaiNguyen(obj){
            console.log(obj);
            this.taiNguyenKhaDung = obj.voice_resources_avaiable;
            this.taiKhoanHienTai = obj.username;
            this.userID = obj.user_id;
        },
        async handleEditUser(id){
            this.titleModal = "Sửa tài khoản";
            this.titleAction = "Cập nhật";
            this.isAdd = false;
            let user = await this.$store.dispatch("users/getUserCurrent",id);
            // console.log(user.body.body);
            this.objCreate = user.body.body;
            this.objCreate.password = "*****";
            this.repassword = "*****";
            // delete this.objCreate.password;
        },
        handleFilter(e){
            e.preventDefault();
            this.$store.dispatch("users/getListUser",{limit:this.perPage,page:0,data:this.dataQuery});
        },
        resetForm() {
            setTimeout(()=>{
                this.objCreate = {};
            },1500);

            this.isAdd = true;
            titleModal:"Thêm mới tài khoản";
            titleAction:"Thêm mới"
        },
        //get nguoi dung theo vai tro
        handleChangeVaitro(value){
            this.$store.dispatch("users/getUserRole",value);
        },
        // them moi nguoi dung
        async submit_create(){
            let isValidate = await this.$validator.validateAll();
            if(this.isAdd){
                console.log('themoi');
                if(isValidate){
                    let result = this.$store.dispatch("users/createUser",this.objCreate);
                }
            }else{
                console.log('capnhat');
                if(isValidate){
                    let result = await this.$store.dispatch("users/updateUser",this.objCreate);
                    // console.log(result);
                    // this.notiteMsg = result.body.message;
                    // this.$bvModal.show("bv-modal-success");
                    window.alert(result.body.message);
                    if(result.body.message == "Cập nhật thành công."){
                        this.$bvModal.hide("bv-modal-create");
                        this.$store.dispatch("users/getListUser",{limit:this.perPage,page:0,data:this.dataQuery});
                    }
                }
            }

        },
        getRules(rulename) {
            return helper.getRule(rulename);
        },
        async fetchDataHistory() {
        },
        startDownload() {
        },
        finishDownload() {
        },
        setTitlePage() {
            this.$store.state.stores.titlePage = "Quản lý tài khoản";
        },
        checkRuleUser() {
            if (this.user.role_code == "SAL") {
                this.$router.push("/");
            }
        }
    },
    computed: {
        totalData(){
            return this.$store.getters['users/getterTotalDataListUser'];
        },
        listUser(){
            return this.$store.getters['users/getterDataListUser'];
        },
        userRole(){
            return this.$store.getters['users/getterDataUserRole'];
        },
        dataQuery(){
            return {
                created_date_from: this.time3 ? this.time3[0] : null,
                created_date_to: this.time3 ? this.time3[1] : null,
                role_code: this.objFilter.role_code ? this.objFilter.role_code : null,
                status: this.objFilter.status ? this.objFilter.status : null,
                username_list: this.objFilter.username_list ? this.objFilter.username_list : [],
            }
        },
        rows() {
            return this.items.length;
        },
        vaitro_pre(){
            return 'Vai trò <span>(*)</span>';
        },
        ho_pre(){
            return 'Họ <span>(*)</span>';
        },
        ten_pre(){
            return 'Tên <span>(*)</span>';
        },
        tendangnhap_pre(){
            return 'Tên đăng nhập <span>(*)</span>';
        },
        matkhau_pre(){
            return 'Mật khẩu <span>(*)</span>';
        },
        nhaplai_pre(){
            return 'Nhập lại mật khẩu <span>(*)</span>';
        },
        chude_pre(){
            return 'Chủ đề <span>(*)</span>';
        },
        somaynhanh_pre(){
            return 'Số máy nhánh <span>(*)</span>';
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
        },
        myrule(){
            return this.$store.state.stores.rules;
        },
        userRoleCurrent() {
            return this.$store.state.users.info.role_code;
        },
        dataMod(){
            let role = this.user.role_code;
            if(role == 'ADM'){
                return [{id:'MOD',label:'Moderator'},{id:'CON',label:'Contract Owner'},{id:'SAL',label:'Sale'}]
            }else if(role == 'MOD'){
                return [{id:'CON',label:'Contract Owner'}]
            }else if(role == 'CON'){
                return [{id:'SAL',label:'Sale'}]
            }else{
                return [];
            }
        }
    },
  watch: {
    lengthRow(value) {
      this.perPage = this.lengthRow;
    },
    perPage(value) {
        this.$store.dispatch("users/getListUser",{limit:parseInt(value),page:0,data:this.dataQuery});
    },
    ruleName(value){
      if(value =='SAL'){
        this.soMayNhanh = 1;
      }
    }
  }
};
</script>


<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>
<style scoped>
.input-name-text span {
    color: #f00;
    padding-left: 5px;
}
.input-name-text {
    background-color: #f7f7f7;
    width: 180px;
    font-size: 14px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #ced4da;
    border-radius: 0.25rem 0 0 0.25rem;
}
.cus-edit-field {
    display: flex;
}
.input-name-ac {
    background-color: #f7f7f7;
    font-size: 14px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: right;
    white-space: nowrap;
    border: 1px solid #ced4da;
    border-left: 0;
    border-right: 0;
}
.input-name-oac input {
    border-radius: 0 3px 3px 0;
    width: 100%;
    float: left;
}
.input-name-oac {
    flex-grow: 1;
}
</style>