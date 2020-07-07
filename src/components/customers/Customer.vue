<template>
  <div>
    <mains>
      <!-- <breakcrumb-app>Danh sách khách hàng</breakcrumb-app> -->
      <div id="content-box">
        <b-container>
          <div class="top-head-box">
            <form>
              <b-row>
                <b-col cols="12" md="4" lg="4">
                  <b-form-group>
                    <label for="city-list">Giới tính</label>
                    <treeselect
                      v-model="valueSex"
                      :multiple="false"
                      :options="dataSex"
                      placeholder="Lựa chọn"
                      noOptionsText="Chưa có dữ liệu"
                      noResultsText="Không có dữ liệu"
                      @input="handleFilter()"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4" lg="4">
                  <b-form-group>
                    <label for="city-list">Tỉnh/T.phố</label>
                    <treeselect
                      v-model="valueCity"
                      :multiple="false"
                      :options="dataCity"
                      @input="
                        changeTinh($event);
                        updateCookieCity();
                        handleFilter();
                      "
                      placeholder="Lựa chọn"
                      noOptionsText="Chưa có dữ liệu"
                      noResultsText="Không có dữ liệu"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4" lg="4">
                  <b-form-group>
                    <label for="city-list">Quận/Huyện</label>
                    <treeselect
                      v-model="valueCountry"
                      :multiple="false"
                      :options="dataCountry"
                      placeholder="Lựa chọn"
                      noOptionsText="Chưa có dữ liệu"
                      noResultsText="Không có dữ liệu"
                      @input="
                        updateCookieCountry();
                        handleFilter();
                      "
                    />
                  </b-form-group>
                </b-col>
              </b-row>

              <div class="mx-auto btn-filter" style="width:200px">
                <button type="button" @click="handleFilter()">
                  <font-awesome-icon icon="search" />Lọc
                </button>
              </div>
            </form>
          </div>
          <!-- danh sach khach hang -->
          <div class="control-list-box">
            <div class="head-list">
              <div class="left-head-list">
                <span>Hiển thị</span>
                <select v-model="perPage" value="10">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>bản ghi</span>
              </div>
              <div class="right-head-list" style="display:none;">
                <p>
                  Hiển thị bản ghi
                  <strong>1 - {{ perPage }}</strong> trên tổng số
                  <strong>
                    {{
                    totalRow > 0 ? "~ " + totalRow : totalRow
                    }}
                  </strong>
                  bản ghi
                </p>
              </div>
            </div>

            <div class="body-table">
              <b-table id="my-table-customer" hover responsive :items="items" :fields="fields">
                <!-- <template v-slot:title>Popover Title</template> -->

                <template v-slot:cell(chủ_đề)="chude">
                  {{
                  textConvertHobbi(chude.value)
                  }}
                </template>
                <template v-slot:cell(Điểm_quan_tâm)="diemquantam">
                  {{
                  diemquantam.value >= 50
                  ? "50+"
                  : parseInt(diemquantam.value)
                  }}
                </template>

                <template v-slot:cell(số_điện_thoại)="thaotac">
                  <span
                    :id="
                      'called-' +
                        thaotac.item.isdn_id +
                        '_' +
                        thaotac.item.idHobby
                    "
                    class="aleftcall"
                    :class="{ 'connected-phone': thaotac.item.connected == 0 }"
                    @click="handleCall(thaotac.item)"
                  >
                    <font-awesome-icon icon="headphones" />
                    {{ thaotac.value }}
                    <b
                      class="connected"
                      title="Số đã được gọi"
                      v-if="thaotac.item.connected == 0"
                    >*</b>
                  </span>
                  <b-tooltip
                    :target="
                      'called-' +
                        thaotac.item.isdn_id +
                        '_' +
                        thaotac.item.idHobby
                    "
                    placement="right"
                  >
                    {{
                    thaotac.item.connected == 0
                    ? "Đã gọi " +
                    thaotac.item.connected_day_c +
                    " lần trong ngày"
                    : "Gọi điện"
                    }}
                  </b-tooltip>
                </template>
              </b-table>
              <div id="nodata-search" v-if="isNodata || items.length == 0">Không có dữ liệu!</div>
              <div id="pagination" v-if="!(items.length == 0 && curentPage == 1)">
                <ul>
                  <li v-if="curentPage == 1" class="noHover">
                    <a>« Trang đầu</a>
                  </li>
                  <li v-if="curentPage > 1" class="withHover">
                    <a @click="handlePagi(1, perPage)">« Trang đầu</a>
                  </li>
                  <li v-if="curentPage == 1" class="noHover">
                    <a>‹ Trước</a>
                  </li>
                  <li v-if="curentPage > 1" class="withHover">
                    <a @click="handlePagi(curentPage - 1, perPage)">‹ Trước</a>
                  </li>
                  <li v-if="items.length > 0 && curentPage > 2" class="noHover number-text">
                    <a>...</a>
                  </li>
                  <li v-for="item in paginations" v-bind:key="item" class="number-text">
                    <a
                      @click="handlePagi(item, perPage)"
                      v-bind:class="{
                        active: isActive(item),
                        disble: isDisble(item),
                        withHover: !isActive(item),
                      }"
                    >{{ item }}</a>
                  </li>
                  <li v-if="items.length >= perPage" class="noHover number-text">
                    <a>...</a>
                  </li>
                  <li
                    v-if="
                      curentPage == totalCurrentPage ||
                        items.length == 0 ||
                        items.length < perPage
                    "
                    class="noHover"
                  >
                    <a>Tiếp ›</a>
                  </li>
                  <li
                    v-if="
                      curentPage < totalCurrentPage &&
                        items.length != 0 &&
                        items.length >= perPage
                    "
                    class="withHover"
                  >
                    <a @click="handlePagi(curentPage + 1, perPage)">Tiếp ›</a>
                  </li>
                  <!-- <li v-if="curentPage == totalCurrentPage" class="noHover">
                    <a>»</a>
                  </li>-->
                  <!--  <li v-if="curentPage < totalCurrentPage">
                    <a @click="handlePagi(totalCurrentPage,perPage)">»</a>
                  </li>-->
                </ul>
              </div>
            </div>
          </div>
        </b-container>
      </div>
    <!-- popup call -->
    <b-modal
        id="bv-modal-call"
        :noCloseOnEsc="true"
        :noCloseOnBackdrop="true"
        hide-footer
        class="hiddenPopup"
        @click="changeIsCall()"
        @hidden="destroyFormCalling()"
      >
        <template v-slot:modal-title>
            <h3><font-awesome-icon icon="user" /> {{ labelTitle }} <strong class="color-phone">#{{ phoneCurrent }}</strong></h3>
        </template>
        <div id="block-call">
            <div class="line-top-info">
                <div class="line-left-info-top" v-if="objUser">
                    <div class="item-line-info">
                        <h3 class="title-line-info">Gói cước đang sử dụng</h3>
                        <div class="content-line-info">
                            <div class="list-package-item" v-for="(item,index) in objUser.package_data_users" :key="index">
                                <div class="desc-package-item">
                                    <h4>- {{item.package_code}}</h4>
                                    <p>Cước phí: {{item.price}}</p>
                                    <p>Chu kỳ: {{item.cycle}}</p>
                                    <p>Tài nguyên: {{item.resources}}</p>
                                    <p>Loại: <font>{{item.typeStr}}</font></p>
                                </div>
                                <div class="button-dk" :class="{'active':idPackage==item.id}">
                                    <button class="used_package">Đang dùng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-line-info">
                        <h3 class="title-line-info">Gói cước khuyến nghị</h3>
                        <div class="content-line-info">
                            <div class="list-package-item" v-for="(item,index) in objUser.package_data_registers" :key="index">
                                <div class="desc-package-item">
                                    <h4>- {{item.package_code}}</h4>
                                    <p>Cước phí: {{item.price}}</p>
                                    <p>Chu kỳ: {{item.cycle}}</p>
                                    <p>Tài nguyên: {{item.resources}}</p>
                                    <p>Loại: <font>{{item.typeStr}}</font></p>
                                </div>
                                <div class="button-dk" :class="{'active':idPackage==item.id}">
                                    <button @click="handleRegister(item)">Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line-right-info-top">
                    <div class="d-block text-center" v-if="callStage == 1">
                        <div class="icon-user-show" v-if="false">
                            <span>
                            <font-awesome-icon icon="user" />
                            </span>
                        </div>
                        <h3>Bạn có muốn thực hiện cuộc gọi?</h3>
                        <span class="showPhoneNumber">{{ phoneCurrent }}</span>
                    </div>

                    <div class="d-block text-center" v-if="callStage == 2">
                        <div class="icon-lock-show">
                            <span>
                            <font-awesome-icon icon="clock" />
                            </span>
                            <label id="CallMinutes">00</label>:
                            <label id="CallSeconds">00</label>

                        </div>
                        <div id="callstatusid"></div>
                        <div class="content-info-call">
                                <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                                <b-input-group prepend="Đánh giá" class="mb-2 mr-sm-2 mb-sm-0">
                                    <treeselect
                                    v-model="valueFavorite"
                                    :multiple="false"
                                    placeholder="Mức độ quan tâm"
                                    :options="dataFavorite"
                                    />
                                </b-input-group>
                                </b-col>
                            <!-- <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                                <b-input-group prepend="Gói cước" class="mb-2 mr-sm-2 mb-sm-0">
                                    <treeselect
                                    v-model="valuePackage"
                                    :multiple="false"
                                    placeholder="Gói cước"
                                    :options="listPackage"
                                    />
                                </b-input-group>
                            </b-col> -->
                            <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                                <b-input-group prepend="Ghi chú" class="mb-2 mr-sm-2 mb-sm-0">
                                    <b-form-textarea
                                    id="textarea"
                                    v-model="text"
                                    placeholder="Ghi chú..."
                                    rows="3"
                                    max-rows="3"
                                    ></b-form-textarea>
                                </b-input-group>
                            </b-col>
                            <b-col cols="12" v-if="objRegisterPackage">
                                <p>Gói đăng ký: {{objRegisterPackage.package_code}}</p>
                                <button class="handleno huydk" @click="unRegisterPackage(objRegisterPackage)">Hủy đăng ký</button>
                            </b-col>
                        </div>
                    </div>

                    <div class="mx-auto btn-call" style="width: 400px;" v-if="callStage == 1">
                        <button
                            :class="{ disable: !this.enableCall }"
                            class="mt-3 handleyes"
                            id="callButton"
                            title="Có"
                            @click="handleYesCall(phoneCurrent)"
                        >Có</button>
                        <button
                            class="mt-3 handleno"
                            title="Không"
                            @click="$bvModal.hide('bv-modal-call'), handleNoCall(phoneCurrent)"
                        >Không</button>
                    </div>

                    <div class="mx-auto btn-call end-call" style="width: 400px;" v-if="callStage == 2">
                        <!-- endcall -->
                        <b-button
                            class="mt-3 handleno"
                            :disabled="isEndcall"
                            title="Kết thúc"
                            @click="handleSaveCall(phoneCurrent, false), handleEndCall()"
                            >Kết thúc
                            <!-- <img src="../../assets/images/icon_end.jpg" alt /> -->
                            </b-button>
                        <b-button
                            class="mt-3 handleyes"
                            title="Lưu"
                            @click="handleSaveCall(phoneCurrent, true)"
                        >Lưu</b-button>
                    </div>
                </div>
            </div>
            <!-- end .line-top-info -->
            <div class="line-bottom-info" v-if="objUser">
                <h3 class="title-line-info">Danh sách gói cước kinh doanh</h3>
                <div class="box-bottom-info" v-if="objUser.packageAll.length">
                    <div class="item-bottom-info" v-for="(item,index) in objUser.packageAll" :key="index">
                        <h3 class="title-package">{{item.title}}</h3>
                        <div class="content-line-info" >
                            <div class="list-package-item" v-for="(item_sub,index_sub) in item.package_data" :key="index_sub">
                                <div class="desc-package-item">
                                    <h4>- {{item_sub.package_code}}</h4>
                                    <p>Cước phí: {{item_sub.price}}</p>
                                    <p>Chu kỳ: {{item_sub.cycle}}</p>
                                    <p>Tài nguyên: {{item_sub.resources}}</p>
                                </div>
                                <div class="button-dk" :class="{'active':idPackage==item_sub.id}">
                                    <button @click="handleRegister(item_sub)">Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end .line-bottom-info -->
        </div>
        <!-- end #block-call -->
    </b-modal>
    </mains>
  </div>
</template>

<script>
import Mains from "../Main.vue";
import Breakcrumb from "../layouts/Breakcrumb.vue";
import Treeselect from "@riophae/vue-treeselect";
import DatePicker from "vue2-datepicker";

import { ASYNC_SEARCH } from "@riophae/vue-treeselect";

let customerCall = require("../../assets/js/customer");
let stringImport = require("../../_helpers/string");

let { URL } = require("../../config");
let URL_API = URL.API_LEAD;
const today = new Date();
export default {
  beforeDestroy() {
    customerCall.cleanAll();
  },
  created() {
    //lay danh sach package
    this.$store.dispatch("packages/getPackage");
    // this.checkingEnableCall();
    this.isLoading = false;
    //this.handleFilter();
  },
  mounted() {
    this.isLoading = true;
    // this.$root.checkUserLogin();
    this.loadColumnUser();

    this.getChude();
    this.getTinh();
    // this.getAge();
    // this.getGender();
    this.setTitlePage();

    let vOld = this.$cookies.get("c-valueAge");
    const that = this;

    vOld = this.$cookies.get("c-perPage");
    if (vOld !== undefined && vOld !== null) {
      this.perPage = parseInt(vOld);
      // console.log(vOld);
    }

    this.getCustomers();
    this.isLoading = false;
    //this.handleFilter();
    // console.log("mounted end");
  },
  data() {
    return {
        objRegisterPackage:null,
        idPackage:null,
        objUser:null,
        valuePackage: null,
        package_data_user: null,
        utm: null,
        isEndcall: false, // define button endcall
        isLoading: false,
        captionText: "Bạn có muốn thực hiện cuộc gọi?",
        enableCall: false,
        pageMax: 0,
        dataUserLogin: null,
        isNodata: true,
        // searchHobby:[{id:1,label:'Ky nang IT'}],
        // user: {},
        idcall: null,
        calling: false,
        // userIdCurrent: null,
        stateCall: 0,
        scoreCurrent: 0,
        totalCurrentPage: 0,
        valuePage: null,
        // userCurrent: this.$root.getUserLogin(),
        isAllowCallBunton: false, // khoi tao button call disble if false
        idHobbyCurrent: null, //id chu de hien tai
        isdnIdCurrent: null, // isdn id hien tai
        idPhoneNumberCurrent: null, // id so dien thoai call hien tai
        // get authToken --> customers.js
        getAuthToken: customerCall.getAuthToken,
        hobby_list_state: false,
        phoneCurrent: null,
        labelTitle: "Cuộc gọi",
        callStage: 0,
        isCalling: false,
        text: "",
        //
        valueChude: [],
        valueChudeAll: [],
        valueAge: null,
        valueNetwork: null,
        valueSex: null,
        valueCity: null,
        valueCountry: null,
        valueMucdo: null,
        valueFavorite: null,
        dataFavorite: [
            { id: "1", label: "Quan tâm" },
            { id: "0", label: "Không quan tâm" }
        ],
        dataMucdo: [
            { id: "1", label: "Mức độ cao" },
            { id: "2", label: "Mức độ trung bình" },
            { id: "3", label: "Mức độ thấp" }
        ],
        dataChude: [],
        dataAge: [
            { id: 1, label: "<18" },
            { id: 2, label: "18-24" },
            { id: 3, label: "25-34" },
            { id: 4, label: "35-44" },
            { id: 5, label: "45-54" },
            { id: 6, label: ">55" }
        ],
        dataSex: [
            { id: 0, label: "Nam" },
            { id: 1, label: "Nữ" },
            { id: 2, label: "Không xác định" }
        ],
        dataCity: [],
        dataCountry: [],
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
            }
            }
        ],

        // fields: [
        //   { key: "#", sortable: true, thClass: "classStt" },
        //   { key: "số_điện_thoại", label: "Số điện thoại", sortable: false },
        //   { key: "chủ_đề", label: "Chủ đề", sortable: false },
        //   { key: "Điểm_quan_tâm", label: "Điểm quan tâm", sortable: true },
        //   { key: "khu_vực", label: "Khu vực", sortable: false },
        //   { key: "thanh_phố", label: "Tỉnh/TP", sortable: false },
        //   { key: "giới_tính", label: "Giới tính", sortable: false },
        //   { key: "khoảng_tuổi", label: "Khoảng tuổi", sortable: true }
        // ],
        items: [],
        curentPage: 1,
        lengthRow: 30,
        perPage: 10,
        oldPerPage: 10,
        // currentPage: 1,
        totalRow: 0,
        paginations: [],
        intervalId: null
    };
  },
  components: {
    Treeselect,
    DatePicker,
    Mains,
    "breakcrumb-app": Breakcrumb
  },
  events: {
    disableCallPopupVueEvent: function() {
      this.$bvModal.hide("bv-modal-call");
    }
  },
  methods: {
        //huy dang ky goi cuoc
        unRegisterPackage(obj){
            if(!confirm("Bạn muốn hủy đăng ký gói cước này không?")){
                return;
            }
            this.idPackage = null;
            this.objRegisterPackage = null;
        },
        //dang ky goi cuoc
        handleRegister(obj){
            console.log(obj);
            if(!this.isCalling){
                window.alert("Vui lòng thực hiện cuộc gọi để đăng ký gói cước này.");
                return;
            }
            console.log('dangkygoicuoc');
            this.idPackage = obj.id;
            this.objRegisterPackage = obj;
        },
        limiter(e) {
        if (e.length > 5) {
            // console.log(' you can only select two', e)
            e.pop();
            // this.textNotice = "Bạn chỉ chọn được tối đa 5 chủ đề.";
        }
        },

        updateCookieSex() {
        // console.log(this.valueSex);
        if (this.valueSex !== undefined && this.valueSex !== null) {
            this.$cookies.set("c-valueSex", this.valueSex, "7d");
        } else {
            this.$cookies.remove("c-valueSex");
        }
        },
        updateCookieCity() {
        // console.log(this.valueCity);
        if (this.valueCity !== undefined && this.valueCity !== null) {
            this.$cookies.set("c-valueCity", this.valueCity, "7d");
        } else {
            this.$cookies.remove("c-valueCity");
        }
        },
        updateCookieCountry() {
        // console.log(this.valueCountry);
        if (this.valueCountry !== undefined && this.valueCountry !== null) {
            this.$cookies.set("c-valueCountry", this.valueCountry, "7d");
        } else {
            this.$cookies.remove("c-valueCountry");
        }
        },

        checkingEnableCall() {
        const self = this;
        self.intervalId = setInterval(function() {
            // console.log(self.enableCall);
            self.enableCall = customerCall.getCsVoiceEnable();
            if (self.enableCall && self.intervalId) {
            clearInterval(self.intervalId);
            }
        }, 500);
        },
        async getCustomers() {
          // this.idPackage = null;
          let that = this;
          let obj = {
              page: this.curentPage - 1,
              // page:0,
              limit: parseInt(this.perPage)
          };

          //

          if (this.valueSex) {
              obj.gender = {
              value: this.valueSex
              };
          }
          if (this.valueCity) {
              obj.province = {
              value: this.valueCity
              };
          }
          if (this.valueCountry) {
              obj.district = {
              value: this.valueCountry
              };
          }

          if (typeof this.time3 == "object") {
          } else {
              this.time3 = [stringImport.getLastWeek(), stringImport.getToday()];
          }

          obj.day = {
              // from: this.time3[0],
              // to: this.time3[1]
              from: "2020-05-05",
              to: "2020-06-29"
          };

        this.$http.post(URL_API + "lead/query", obj).then(
            res => {
            // console.log(res);
            if (res.status == 200 && res.body != "") {
                let dataNew = [];
                let result = res.body.second.second;
                this.isNodata = res.body.second.first <= 0;
                if (result.length) {
                this.isNodata = false;
                this.totalRow = res.body.second.first;
                let totalPage = Math.ceil(
                    (res.body.second.first - 1) / this.perPage
                );

                this.paginations = stringImport.pagination(
                    this.curentPage,
                    totalPage
                );

                if (result.length < this.perPage) {
                    for (var i = this.paginations.length - 1; i >= 0; i--) {
                    var pi = this.paginations[i];
                    if (pi > this.curentPage) {
                        this.paginations.pop();
                    }
                    }
                }

                this.totalCurrentPage = totalPage;
                // console.log( totalPage );
                for (let key in result) {
                    let obj = {
                    isActive: true,
                    idHobby: result[key].hobby_id,
                    isdn_id: result[key].isdn_id,
                    "#": result[key].stt,
                    số_điện_thoại: result[key].masked_isdn,
                    // chủ_đề: result[key].hobby_name,
                    // Điểm_quan_tâm: result[key].freq,
                    khu_vực: result[key].district_name,
                    thanh_phố: result[key].province_name,
                    giới_tính: stringImport.genderConverter(result[key].gender),
                    // khoảng_tuổi: result[key].age_name,
                    utm: result[key].utm,
                    mã: "#" + result[key].isdn_id,
                    connected: result[key].connected_day,
                    connected_day_c: result[key].connected_day_c,
                    package_data_user: result[key].package_data_user,
                    package_data_users: result[key].package_data_users,
                    package_data_registers: result[key].package_data_registers,
                    package_data_register: result[key].package_data_register,
                    packageAll: result[key].packageAll,
                    _rowVariant:
                        result[key].connected_day == 0 ? "connected" : "unconnected"
                    };
                    dataNew.push(obj);
                }
                } else {
                }
                this.items = dataNew;
            }
            },
            error => {
            this.isNodata = true;
            }
        );
    },
    async getChude() {
      await this.$http.get("v1/api/account-managers/topic").then(
        res => {
          if (res.status == 200 && res.body != "") {
            let data = res.body.body;
            let dataNew = [];
            let dataObjAll = [];
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                // if (i >= 500) break;
                dataNew.push({
                  id: parseInt(data[i].topic_id),
                  label: data[i].topic_name
                });
              }
            }
            dataObjAll = dataNew;

            this.dataChude = [
              { id: -1, label: "Tất cả", children: dataObjAll }
            ];

            let vOld = this.$cookies.get("c-valueChude");
            if (vOld !== undefined && vOld !== null) {
              vOld = JSON.parse(vOld);
              var vOldCook = [];
              if (vOld.length == 1 && vOld.includes(-1)) {
                dataObjAll.forEach(function(item, idx) {
                  vOldCook.push(item.id);
                });
              } else {
                dataObjAll.forEach(function(item, idx) {
                  if (vOld.includes(item.id)) {
                    vOldCook.push(item.id);
                  }
                });
              }

              this.valueChude = vOldCook;
            }
          }
        },
        error => {}
      );
    },
    async getTinh() {
      let obj = {
        act: "QUERY",
        k: "LOCATION_PROVINCE",
        limit: 100

        // "first_name":"h",
        // "second_name":"d",
        // "limit": 121,
        // "page": 3
      };
      await this.$http.post(URL_API + "dict", obj).then(res => {
        if (res.status == 200 && res.body != "") {
          let dataNew = [];
          if (res.body.second.length) {
            // console.log( res.body.second );
            for (let key in res.body.second) {
              dataNew.push({
                id: res.body.second[key].id1,
                label: res.body.second[key].display1
              });
            }
          }
          this.dataCity = dataNew;
          let vOld = this.$cookies.get("c-valueCity");
          const that = this;
          if (vOld !== undefined && vOld !== null) {
            vOld = parseInt(vOld);
            this.dataCity.forEach(function(item, index) {
              if (vOld == item.id) {
                that.valueCity = vOld;
              }
            });
          }
        }
      });
    },
    async getAge() {
      let obj = {
        act: "QUERY",
        k: "AGE",
        limit: 100
      };
      await this.$http.post(URL_API + "dict", obj).then(res => {
        // console.log( res );
        if (res.status == 200 && res.body != "") {
          let dataNew = [];
          if (res.body.second.length) {
            // console.log( res.body.second );
            for (let key in res.body.second) {
              dataNew.push({
                id: res.body.second[key].id1,
                label: res.body.second[key].display1
              });
            }
          }
          this.dataAge = dataNew;
          let vOld = this.$cookies.get("c-valueAge");
          const that = this;
          if (vOld !== undefined && vOld !== null) {
            vOld = parseInt(vOld);
            this.dataAge.forEach(function(item, index) {
              if (vOld == item.id) {
                that.valueAge = vOld;
              }
            });
          }
        }
      });
    },
    async getGender() {
      let obj = {
        act: "QUERY",
        k: "GENDER",
        limit: 100
      };
      await this.$http.post(URL_API + "dict", obj).then(res => {
        // console.log( res );
        if (res.status == 200 && res.body != "") {
          let dataNew = [];
          if (res.body.second.length) {
            // console.log( res.body.second );
            for (let key in res.body.second) {
              dataNew.push({
                id: res.body.second[key].id1,
                label: stringImport.genderConverter(
                  res.body.second[key].display1
                )
              });
            }
          }
          //  console.log( dataNew );
          this.dataSex = dataNew;
          let vOld = this.$cookies.get("c-valueSex");
          const that = this;
          if (vOld !== undefined && vOld !== null) {
            vOld = parseInt(vOld);
            this.dataSex.forEach(function(item, index) {
              if (vOld == item.id) {
                that.valueSex = vOld;
              }
            });
          }
        }
      });
    },
    loadColumnUser() {
      // let role = this.$root.getUserLogin();
      // const role = this.user;
      // console.log(role);
      // if (role.role == "CON" || role.role == "SAL") {
      //   this.fields = [
      //     { key: "#", sortable: true, thClass: "classStt" },
      //     { key: "số_điện_thoại", label: "Số điện thoại", sortable: false },
      //     { key: "chủ_đề", label: "Chủ đề", sortable: false },
      //     { key: "Điểm_quan_tâm", label: "Điểm quan tâm", sortable: true },
      //     { key: "khu_vực", label: "Khu vực", sortable: false },
      //     { key: "thành_phố", label: "Tỉnh/TP", sortable: true },
      //     // { key: "mã", sortable: false },
      //     { key: "giới_tính", label: "Giới tính", sortable: false },
      //     { key: "khoảng_tuổi", label: "Khoảng tuổi", sortable: true },
      //     { key: "thao_tác", label: "Thao tác", sortable: false }
      //   ];
      // }
    },
    // change tinh thanh pho lay quan huyen
    async changeTinh(val) {
      if (typeof val != "undefined") {
        let obj = {
          act: "QUERY",
          k: "LOCATION", // lay huyen
          limit: 200,
          id1: val
          // "first_name":"h",
          // "second_name":"d",
          // "limit": 121,
          // "page": 3
        };
        await this.$http.post(URL_API + "dict", obj).then(res => {
          // console.log( res );
          if (res.status == 200 && res.body != "") {
            // console.log( res );
            let dataNew = [];
            if (res.body.second.length) {
              // console.log( res.body.second );
              for (let key in res.body.second) {
                dataNew.push({
                  id: res.body.second[key].id2,
                  label: res.body.second[key].display2
                });
              }
            }
            this.dataCountry = dataNew;
            let vOld = this.$cookies.get("c-valueCountry");
            const that = this;
            if (vOld !== undefined && vOld !== null) {
              vOld = parseInt(vOld);
              this.dataCountry.forEach(function(item, index) {
                if (vOld == item.id) {
                  that.valueCountry = vOld;
                }
              });
            }
          }
        });
      } else {
        this.dataCountry = [];
      }
    },
    handleFilter(limit = false) {
      console.log("Filter");
      if (this.isLoading) {
        console.log("Disable Loading");
        return;
      }
      let pagecurent = 0;
      this.curentPage = 1;
      let fromdate = "";
      let todate = "";
      let that = this;
      let mangChudeId = [];

      let obj = {
        page: 0,
        limit: limit ? parseInt(limit) : parseInt(this.perPage)
      };

      if (!(this.valueSex === null || this.valueSex === undefined)) {
        obj.gender = {
          value: this.valueSex
        };
      }

      if (this.valueCity) {
        obj.province = {
          value: this.valueCity
        };
      }

      if (this.valueCountry) {
        obj.district = {
          value: this.valueCountry
        };
      }

      if (typeof this.time3 == "object") {
        if (this.time3[0] == "") {
        } else {
          obj.day = {
            from: fromdate,
            to: todate
          };
        }
      }

      // console.log(this.valueChudeAll);
      this.$http.post(URL_API + "lead/query", obj).then(
        res => {
          // console.log("handleFilter");
          // console.log(res);
          if (res.status == 200 && res.body != "") {
            // console.log( res );
            let dataNew = [];
            let result = res.body.second.second;
            this.isNodata = res.body.second.first <= 0;

            if (result.length > 0) {
              this.isNodata = false;
              //paginaton
              this.totalRow = res.body.second.first;
              let totalPage = Math.ceil(
                (res.body.second.first - 1) / this.perPage
              );
              // if(result.length==obj.limit){
              //   totalPage +=1;
              // }
              this.paginations = stringImport.pagination(
                this.curentPage,
                totalPage
              );

              if (result.length < this.perPage) {
                for (var i = this.paginations.length - 1; i >= 0; i--) {
                  var pi = this.paginations[i];
                  if (pi > this.curentPage) {
                    this.paginations.pop();
                  }
                }
              }

              this.totalCurrentPage = totalPage;
              for (let key in result) {
                let obj = {
                  isActive: true,
                  idHobby: result[key].hobby_id,
                  isdn_id: result[key].isdn_id,
                  "#": parseInt(key) + 1,
                  số_điện_thoại: result[key].masked_isdn,
                  // chủ_đề: stringImport.textConverter(result[key].hobby_name),
                  // Điểm_quan_tâm: result[key].freq,
                  khu_vực: result[key].district_name,
                  thanh_phố: result[key].province_name,
                  giới_tính: stringImport.genderConverter(result[key].gender),
                  // khoảng_tuổi: result[key].age_name,
                  utm: result[key].utm,
                  package_data_user: result[key].package_data_user,
                  package_data_register: result[key].package_data_register,
                  connected: result[key].connected_day,
                  connected_day_c: result[key].connected_day_c,
                  _rowVariant:
                    result[key].connected_day == 0 ? "connected" : "unconnected"
                };
                dataNew.push(obj);
              }
            } else {
              (this.paginations = []), (this.totalRow = 0);
              this.totalCurrentPage = 0;
            }
            this.items = dataNew;
          }
        },
        error => {
          this.isNodata = true;
        }
      );
      // e.preventDefault();
    },
    async handleCall(thaotac) {
        console.log(thaotac);
        this.objUser = thaotac;
        let phone = thaotac.số_điện_thoại;
        let idhobby = thaotac.idHobby;
        let isdnid = thaotac.isdn_id;
        let scorecurrent = thaotac.Điểm_quan_tâm;
        let utm = thaotac.utm;
        let package_data_user = thaotac.package_data_user;

        //Khi Sale click vào SDT thì gọi function sau //  chrome block cái autoplay
        // customerCall.activate();
        let checkCall = false;
        if (this.user.role_code == "SAL" || this.user.role_code == "CON") {
            checkCall = true;
        } else {
            checkCall = false;
        }
        if (checkCall) {
            this.callStage = 1;
            this.$bvModal.show("bv-modal-call");

            // this.isCalling = true;
            let that = this;
            this.phoneCurrent = phone;
            this.labelTitle = "Cuộc gọi";
            this.idHobbyCurrent = idhobby;
            this.isdnIdCurrent = isdnid;
            this.scoreCurrent = scorecurrent;
            this.utm = parseInt(utm);
            this.package_data_user = package_data_user;

            // console.log(isdnid);
            // set token in customers.js
            let auth = localStorage.getItem("user");
            // let auth = this.credential;
            if (
            auth == "undefined" ||
            auth == "null" ||
            auth == undefined ||
            auth == undefined ||
            auth == ""
            ) {
            } else {
            that.setAuthToken("Bearer " + JSON.parse(auth).token);
            }
            // console.log(this.$configUrl.API_ROOT);
            customerCall.setServiceUrl(this.$configUrl.API_ROOT);
            this.isCalling = false;
            const stateInit = await customerCall.initCall();
            if (stateInit != 2) {
            }

            this.isAllowCallBunton = true;

            console.log("handleCall End! ");
        } else {
            alert("Bạn không được quyền sử dụng tính năng này!");
        }
    },
    async handleYesCall(phone) {
      console.log("handleYesCall");
      this.isEndcall = false;
      this.captionText = "Đang khởi tạo kênh kết nối tới khách hàng.";
      let obj = {};
      let idStatus = null;
      obj.user_id = this.userIdCurrent;
      obj.isdn_id = this.isdnIdCurrent ? this.isdnIdCurrent : "";
      obj.hobby_id = this.idHobbyCurrent;
      obj.masked_isdn = this.phoneCurrent;
      obj.freq = this.scoreCurrent;
      obj.rating = 3;
      obj.category = 0;
      obj.status = this.stateCall;
      obj.duration = 0;
      obj.utm = this.utm ? this.utm : 0;

      obj.ctx = 0;

      customerCall.transferObj(obj); //Truyen obj tu client sang websocket

      // call api ==> ID ( set ID history call)
      await this.$http.post(URL_API + "call/status", obj).then(
        res => {
          if (res.status == 200 && res.body != "") {
            let data = res.body;
            if (data.first == "SUCCESS" || data.first == "RECORD_EXISTED") {
              idStatus = data.second.id;
            }
          }
        },
        error => {
          obj = null;
          alert("Lỗi kết nối tới máy chủ! ");
          this.$bvModal.hide("bv-modal-call");
        }
      );
      console.log(1);
      if (obj == null) {
        // alert("Lỗi kết nối tới máy chủ! ");
        this.$bvModal.hide("bv-modal-call");
        customerCall.clearStateFromBrowser();
        return;
      }

      if (!customerCall.getCsVoiceEnable()) {
        this.captionText = "Chưa kết nối đến hệ thống thoại!";
        // this.$bvModal.hide('bv-modal-call');
        customerCall.clearStateFromBrowser();
        return;
      }

      this.idcall = idStatus;
      obj.id = idStatus;
      obj.context = 0;
      window.onbeforeunload = function() {
        return "";
      };
      this.labelTitle = "Ghi chú cuộc gọi";
      this.captionText = "Đang khởi tạo kênh kết nối tới khách hàng.";
      // this.enableCall = true;
      this.callStage = 2;
      this.isCalling = true;

      customerCall.takeCall(
        this.isdnIdCurrent,
        obj.user_id,
        obj.hobby_id,
        obj.masked_isdn,
        obj.freq,
        obj.id,
        this.utm,
        obj.ctx
      );
      console.log("Start call");
    },
    handleNoCall(phone) {
      window.onbeforeunload = null;
      customerCall.finishCall();
      this.callStage = 0;
      this.isCalling = false;
      this.calling = false;
    },
    async unregisterCall(isdn_id, user_id) {
      let obj = {
        isdn_id: isdn_id,
        user_id: user_id,
        reverse: 1
      };
      await this.$http.post(this.$configUrl.API_LEAD + "call/register", obj);
    },
    handleSaveCall(phone, btn) {
        window.onbeforeunload = null;
        this.callStage = 0;
        this.isCalling = false;
        this.calling = false;

        let timeCall = customerCall.getTotalCallTime();
        let obj = {};
        obj.user_id = this.userIdCurrent;
        obj.isdn_id = this.isdnIdCurrent ? this.isdnIdCurrent : "";
        obj.hobby_id = this.idHobbyCurrent;
        obj.rating = this.valueMucdo ? this.valueMucdo : 3;
        obj.note = this.text;
        obj.duration = parseInt(timeCall);
        //danh sach han che
        if (this.valueFavorite == 3) {
            obj.category = 0;
            this.$store.dispatch("blacklist/addBlacklist", {
            phone_number: obj.isdn_id,
            user_id: obj.user_id,
            topic_id: obj.hobby_id
            });
        } else {
            obj.category = this.valueFavorite ? this.valueFavorite : 0;
        }

        // obj.id = this.idPhoneNumberCurrent;
        obj.freq = this.scoreCurrent;
        obj.masked_isdn = this.phoneCurrent;
        if (timeCall !== 0) {
            this.calling = true;
            //user action
            obj.status = "UA1";
        } else {
            //user action
            this.calling = false;
            obj.status = "UA2";
        }

        obj.id = this.idcall;
        obj.note = obj.note.slice(0, 1000);
        obj.utm = this.utm ? this.utm : 0;
        obj.ctx = 0;
        //truyen them goi cuoc
        //  obj.package = this.valuePackage ? this.valuePackage : 0;

        obj.package_old = this.package_data_user;

        //neu an luu cuoc goi btn = true;
        if (btn) {
          // console.log(this.objRegisterPackage);
          if(this.objRegisterPackage && this.objRegisterPackage.id){
              if(!confirm("Bạn chắc chắn đăng ký gói cước này không?")){
                this.idPackage = null;
                this.objRegisterPackage = null;
              }
          }
          obj.package = this.objRegisterPackage ? this.objRegisterPackage.id : 0;

          customerCall.transferObj(obj); //Truyen obj tu client sang websocket
          customerCall.finishCall(); // ket thuc cuoc goi
          this.$store.dispatch("users/getInfo"); // goi lai thong tin nguoi dung
          this.unregisterCall(this.isdnIdCurrent, this.userIdCurrent);

          this.callStage = 0;
          this.$bvModal.hide("bv-modal-call");
        }else{
          this.callStage = 2;
        }
        setTimeout(this.getCustomers, 300);

    },
    handlePagi(value, perPage) {
      this.curentPage = value;
      this.perPage = perPage;
      let that = this;
      // console.log( value );
      if (typeof value == "number") {
        let obj = {
          page: value - 1,
          limit: parseInt(this.perPage)
        };

        // console.log( this.valueSex );
        if (!(this.valueSex === null || this.valueSex === undefined)) {
          obj.gender = {
            value: this.valueSex
          };
        }

        if (this.valueCity) {
          obj.province = {
            value: this.valueCity
          };
        }

        if (this.valueCountry) {
          obj.district = {
            value: this.valueCountry
          };
        }

        this.$http.post(URL_API + "lead/query", obj).then(res => {
          if (res.status == 200 && res.body != "") {
            // console.log( res );
            let dataNew = [];
            let result = res.body.second.second;
            if (result.length) {
              if (result.length < 10) {
                this.pageMax = this.curentPage;
              }
              //paginations
              this.totalRow = res.body.second.first;
              let totalPage = Math.ceil(
                (res.body.second.first - 1) / this.perPage
              );
              // if(result.length==obj.limit){
              //   totalPage +=1;
              // }
              this.totalCurrentPage = totalPage;
              this.paginations = stringImport.pagination(value, totalPage);
              if (result.length < this.perPage) {
                for (var i = this.paginations.length - 1; i >= 0; i--) {
                  var pi = this.paginations[i];
                  if (pi > this.curentPage) {
                    this.paginations.pop();
                  }
                }
              }
              // console.log( 12 );

              for (let key in result) {
                let obj = {
                  isActive: true,
                  idHobby: result[key].hobby_id,
                  isdn_id: result[key].isdn_id,
                  "#": result[key].stt,
                  số_điện_thoại: result[key].masked_isdn,
                  // chủ_đề: stringImport.textConverter(result[key].hobby_name),
                  // Điểm_quan_tâm: result[key].freq,
                  khu_vực: result[key].district_name,
                  thanh_phố: result[key].province_name,
                  giới_tính: stringImport.genderConverter(result[key].gender),
                  // khoảng_tuổi: result[key].age_name,
                  utm: result[key].utm,
                  package_data_user: result[key].package_data_user,
                  package_data_register: result[key].package_data_register,
                  connected: result[key].connected_day,
                  connected_day_c: result[key].connected_day_c,
                  _rowVariant:
                    result[key].connected_day == 0 ? "connected" : "unconnected"
                };
                dataNew.push(obj);
              }
            }
            this.items = dataNew;
          }
        });
      }
    },
    searchHobby({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        let options = null;
        setTimeout(() => {
          this.$http
            .get("v1/api/account-managers/topic?topic_name=" + searchQuery)
            .then(
              res => {
                if (res.body != "") {
                  let data = res.body.body;
                  let dataNew = [];
                  let dataObjAll = [];
                  if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                      if (i >= 500) break;
                      dataNew.push({
                        id: parseInt(data[i].topic_id),
                        label: data[i].topic_name
                      });
                    }
                  }
                  dataObjAll = dataNew;
                  callback(null, dataObjAll);
                  // this.dataChude = dataObjAll;
                } else {
                }
              },
              err => {}
            );
        }, 500);
      }
    },
    changeIsCall() {
      this.callStage = 1;
      this.isCalling = false;
    },
    resetModal(e) {
      // console.log( e );
      this.callStage = 0;
      window.onbeforeunload = null;
      this.isCalling = false;
      this.stateCall = 0;
      customerCall.finishCall();
      e.preventDefault();
    },
    destroyFormCalling() {
      if (this.callStage == 2) {
        let flag = window.confirm("Bạn có muốn kết thúc cuộc gọi này không?");
        if (flag) {
          this.callStage = 0;
          this.stateCall = 0;
          this.isCalling = false;
          window.onbeforeunload = null;
          this.handleSaveCall(this.phoneCurrent, true);
          // customerCall.finishCall();
        } else {
          this.callStage = 1;
          this.$bvModal.show("bv-modal-call");
        }
      } else {
        this.callStage = 0;
      }
      this.valueMucdo = null;
      this.valueFavorite = null;
      this.text = "";
    },
    textConvertHobbi(value) {
      return stringImport.textConverter(value);
    },
    setAuthToken(token) {
      customerCall.setAuthToken(token);
    },
    isActive(value) {
      if (value == this.curentPage) {
        return true;
      } else {
        return false;
      }
    },
    isDisble(value) {
      if (value == "..." || value == "....") {
        return true;
      } else {
        return false;
      }
    },
    handCheckCall() {
      if (this.isAllowCallBunton == false) {
        return "disble";
      }
    },
    goPaginations(value, perPage) {
      let page = parseInt(value);
      if (page > 0 && page <= this.totalCurrentPage) {
        // page = page - 1;
        this.handlePagi(page, perPage);
      }
    },
    setTitlePage() {
      this.$store.state.stores.titlePage = "Danh sách khách hàng";
    },
    leaving() {
      console.log("ban dang reload");
    },
    getDataUser() {},
    handleEndCall() {
        // this.isEndcall = true;
        //return (this.isEndcall = true);
    }
  },
  computed: {
    listPackage() {
      return this.$store.getters["packages/getPackage"];
    },
    rows() {
      return this.items.length;
    },
    authentication() {
      return this.$store.state.authentication.user;
    },
    userCurrent() {
      return this.$store.state.users.info;
    },
    userIdCurrent() {
      if (this.$store.state.users.info) {
        return this.$store.state.users.info.user_id;
      }
      return -1;
    },
    credential() {
      return this.$store.state.authentication.user;
    },
    user() {
      let d = this.$store.state.users.info;
      if (d && d.role_code) {
        return d;
      } else {
        return this.$service.getUserLogin();
      }
    },
    fields() {
      const role = this.user;
      if (role.role_code == "CON" || role.role_code == "SAL") {
        return [
          { key: "#", sortable: true, thClass: "classStt" },
          { key: "số_điện_thoại", label: "Số điện thoại", sortable: false },
          { key: "package_data_user", label: "Gói đang dùng", sortable: false },
          {
            key: "package_data_register",
            label: "Gói mời dùng",
            sortable: false
          },
          // { key: "chủ_đề", label: "Chủ đề", sortable: false },
          // { key: "Điểm_quan_tâm", label: "Điểm quan tâm", sortable: true },
          { key: "khu_vực", label: "Khu vực", sortable: false },
          { key: "thanh_phố", label: "Tỉnh/TP", sortable: true },
          // { key: "mã", sortable: false },

          { key: "giới_tính", label: "Giới tính", sortable: false }
          // { key: "khoảng_tuổi", label: "Khoảng tuổi", sortable: true },
          // { key: "thao_tác", label: "Thao tác", sortable: false }
        ];
      } else {
        return [
          { key: "#", sortable: true, thClass: "classStt" },
          { key: "số_điện_thoại", label: "Số điện thoại", sortable: false },
          { key: "package_data_user", label: "Gói đang dùng", sortable: false },
          {
            key: "package_data_register",
            label: "Gói mời dùng",
            sortable: false
          },
          // { key: "chủ_đề", label: "Chủ đề", sortable: false },
          // { key: "Điểm_quan_tâm", label: "Điểm quan tâm", sortable: true },
          { key: "khu_vực", label: "Khu vực", sortable: false },
          { key: "thanh_phố", label: "Tỉnh/TP", sortable: false },
          { key: "giới_tính", label: "Giới tính", sortable: false }
          // { key: "khoảng_tuổi", label: "Khoảng tuổi", sortable: true }
        ];
      }
    }
  },
  watch: {
    lengthRow(value) {
      this.perPage = this.lengthRow;
    },
    valueCity(value) {
      if (typeof value == "undefined") {
        this.valueCountry = null;
      }
    },
    perPage(value) {
      this.handleFilter(value);
    },
    curentPage(value) {
      this.curentPage = value;
    }
  }
};
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>
<style scoped></style>
