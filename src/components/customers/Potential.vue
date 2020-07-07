<template>
  <div>
    <mains>
      <breakcrumb-app>Khách hàng yêu thích</breakcrumb-app>
      <div id="content-box">
        <b-container>
          <div class="top-head-box">
            <form>
              <b-row>
                <!-- <b-col cols="12" md="6" lg="4" v-if="user.role_code != 'SAL'">
                  <b-form-group>
                    <label for="city-list">Vai trò</label>
                    <treeselect
                      v-model="valueMod"
                      :multiple="false"
                      :options="dataMod"
                      placeholder="Lựa chọn"
                      noOptionsText="Chưa có dữ liệu"
                      noResultsText="Không có dữ liệu"
                      @input="getUserRol($event)"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6" lg="4" v-if="user.role_code != 'SAL'">
                  <b-form-group>
                    <label for="city-list">Tài khoản</label>
                    <treeselect
                      v-model="valueUser"
                      :multiple="false"
                      :options="dataUser"
                      placeholder="Lựa chọn"
                      noOptionsText="Chưa có dữ liệu"
                      noResultsText="Không có dữ liệu"
                      @input ="handleFilter()"
                    />
                  </b-form-group>
                </b-col> -->

                <!-- <b-col cols="12" md="6" lg="4">
                  <b-form-group>
                    <label for="city-list">Mức độ quan tâm</label>
                    <treeselect
                      v-model="valuePotential"
                      :multiple="false"
                      :options="dataPotential"
                      placeholder="Lựa chọn"
                      noOptionsText="Chưa có dữ liệu"
                      noResultsText="Không có dữ liệu"
                       @input ="handleFilter()"
                    />
                  </b-form-group>
                </b-col> -->
                <b-col cols="12" md="6" lg="4" offset-md="4">
                  <b-form-group>
                    <label for="city-list">Khoảng thời gian gọi điện</label>
                    <date-picker
                      v-model="time3"
                      :lang="lang"
                      range
                      value-type="format"
                      format="YYYY-MM-DD"
                      range-separator =" đến "
                      :shortcuts="shortcuts"
                       @input ="handleFilter()"
                    ></date-picker>
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="mx-auto btn-filter" style="width:400px">
                <button type="submit" @click="handleFilter($event)">
                  <font-awesome-icon icon="search" /> Lọc
                </button>
                <!-- download file exel -->
                <export-excel
                  class="btn-exel"
                  :fields="fieldsData"
                  worksheet="Khách hàng yêu thích"
                  name="khach_hang_yeu_thich.xls"
                  :fetch="fetchDataHistory"
                  :before-generate="startDownload"
                  :before-finish="finishDownload"
                >
                  <span class="addnew" >
                    <font-awesome-icon icon="download" /> Tải về
                  </span>
                </export-excel>
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
              <div class="right-head-list">
                <p>
                  Hiển thị bản ghi
                  <strong>1 - {{perPage}}</strong> trên tổng số
                  <strong>{{ totalRow }}</strong> bản ghi
                </p>
              </div>
            </div>
            <!-- @row-clicked="handleShowDetail($event)" -->
            <div class="body-table" v-bind:class="{'favoriteSale': myrule == 4}">
              <b-table id="my-table-potential" hover responsive :items="items" :fields="fields">
                <template v-slot:cell(vai_trò)="vaitro">
                  <span>{{ textConverter(vaitro.value) }}</span>
                </template>
                <template v-slot:cell(Điểm)="diemquantam">
                  {{ diemquantam.value >= 50 ? "50+" : parseInt(diemquantam.value) }}
                </template>
                <template v-slot:cell(số_điện_thoại)="goilai">
                  <span
                  :id=" 'called-'+goilai.item.isdn_id +'_' + goilai.item.idHobby"
                  class="aleftcall"
                  :class="{'connected-phone':goilai.item.expired == 1}"
                  @click="handleCall(goilai.item)"
                  ><font-awesome-icon icon="headphones" />
                    {{goilai.value}}
                    <b class="connected" v-if="goilai.item.expired == 1">*</b>
                  </span>
                  <b-tooltip
                      :target="'called-'+goilai.item.isdn_id +'_' + goilai.item.idHobby"
                      placement="right"
                      >
                      {{ goilai.item.expired == 1 ? "Hết lượt gọi trong ngày" : 'Gọi lại'}}
                  </b-tooltip>
                </template>

                <template v-slot:cell(người_liên_hệ)="nguoilienhe">
                  <div>
                    <span class="nguoilienhe">{{nguoilienhe.value}}</span>
                  </div>
                </template>
                <template v-slot:cell(note)="row">
                  {{row.item.note.slice(0,40)}}
                </template>

                <template v-slot:cell(thao_tác)="thaotac">
                  <div>
                    <span class="chitiet" title="Chi tiết" @click="handleDetail(thaotac.item),$bvModal.show('bv-modal-detail'),handleShow()">
                      <font-awesome-icon icon="info-circle" />
                    </span>
                    <span
                    class="aleftThap"
                    title="Xóa khỏi yêu thích"
                    @click="$bvModal.show('bv-modal-del-potential'), handleDelPotential(thaotac.item)">
                    <font-awesome-icon icon="trash-alt" />
                  </span>
                  </div>
                </template>

                <template v-slot:cell(quan_tâm)="mucdoquantam">
                  <span v-if="mucdoquantam.value == 1 " class="aleftCao">Cao</span>
                  <span v-if="mucdoquantam.value == 2 " class="aleftTrungbinh">Trung bình</span>
                  <span
                    v-if="mucdoquantam.value == 3 || mucdoquantam.value == 0 "
                    class="aleftThap"
                  >Thấp</span>
                  <span
                    v-if="mucdoquantam.value == 'Trung bình'"
                    class="aleftTb"
                  >{{mucdoquantam.value}}</span>
                </template>

                <template v-slot:cell(trạng_thái)="trangthai">
                  <span
                    v-if="trangthai.value != 1 "
                    class="aleftThap"
                    title="Không quan tâm"
                  >Không quan tâm</span>
                  <span v-if="trangthai.value == 1 " class="aleftcall" title="Quan tâm">Quan tâm</span>
                </template>

              </b-table>

              <!-- pagination -->
              <div class="no-data" v-if="items.length == 0" id="nodata-search" >
                <p>Không có dữ liệu.</p>
              </div>
              <div id="pagination" v-if="totalRow > 0">
                <ul>
                  <li v-if="curentPage == 1" class="noHover" ><a>« Trang đầu</a></li>
                  <li v-if="curentPage > 1" class="withHover"><a @click="handlePagi(1,perPage)">« Trang đầu</a></li>
                  <li v-if="curentPage == 1" class="noHover"><a>‹ Trước</a></li>
                  <li v-if="curentPage > 1"  class="withHover"><a @click="handlePagi(curentPage - 1,perPage)" >‹ Trước</a></li>
                  <li v-for="(item) in paginations" v-bind:key="item" class="number-text">
                    <a
                      @click="handlePagi(item,perPage)"
                      v-bind:class="{'active': isActive(item),'withHover': !isActive(item)}"
                    >{{ item }}</a>
                  </li>
                  <li v-if="items.length >= perPage && totalCurrentPage -1 > curentPage " class="noHover number-text">
                    <a>...</a>
                  </li>
                  <li v-if="totalCurrentPage > 1 && totalCurrentPage != curentPage " class="withHover"><a @click="handlePagi(curentPage + 1,perPage)" >Sau ›</a></li>
                  <li v-if="totalCurrentPage == 1 || totalCurrentPage == curentPage" class="noHover"><a>Sau ›</a></li>
                  <li v-if="totalCurrentPage == 1 || totalCurrentPage == curentPage" class="noHover"><a>Trang cuối »</a></li>
                  <li v-if="totalCurrentPage > 1 && totalCurrentPage != curentPage" class="withHover"><a @click="handlePagi(totalCurrentPage,perPage)">Trang cuối »</a></li>

                  <!-- <li :class="{'nopage':totalCurrentPage < 2}">
                    <input type="text" v-model="valuePage" />
                  </li>
                  <li class="gopagi" :class="{'nopage':totalCurrentPage < 2}">
                    <input type="button" value="Đi tới" @click="goPaginations(valuePage,perPage)" />
                  </li> -->
                </ul>
              </div>

            </div>
          </div>
        </b-container>
        <!--  -->
        <b-modal
          :noCloseOnEsc="true"
          :noCloseOnBackdrop="true"
          id="bv-modal-del-potential"
          hide-footer
        >
          <template v-slot:modal-title>
            <h3>Khách hàng yêu thích</h3>
          </template>
          <div class="d-block text-center">
            <div class="undo-resource">

              <span>
                Bạn có muốn xóa số này khỏi khách hàng yêu thích không?
              </span>
            </div>
          </div>
          <div class="popup-footer btn-call">
            <b-col cols="12">
              <b-button
                class="mt-3"
                variant="primary"
                v-on:click="handleYesDel()"
              >Đồng ý</b-button>
              <b-button
                variant="danger"
                class="mt-3"
                @click="$bvModal.hide('bv-modal-del-potential')"
              >Hủy</b-button>
            </b-col>
          </div>
        </b-modal>
        <!-- end popup undo resource -->
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

        <!--  -->
        <b-modal id="bv-modal-detail" hide-footer>
          <template v-slot:modal-title>
            <h3>Chi tiết khách hàng tiềm năng <strong>#{{dataPopupDetail.isdn_id.slice(0,8)}} - {{ dataPopupDetail.masked_isdn}}</strong>
            </h3>
          </template>
          <div class="d-block text-center">
            <b-row>
              <!-- <b-col cols="12">
                <b-col class="frm-group-cs">
                  <b-input-group prepend="Mức độ quan tâm" class="mb-2 mr-sm-2 mb-sm-0">
                    <treeselect
                      v-model="dataPopupDetail.quan_tâm"
                      :multiple="false"
                      :options="dataPotential"
                      placeholder="Mức độ quan tâm"
                    />
                  </b-input-group>
                </b-col>
              </b-col> -->
              <b-col cols="12">
                <b-col class="frm-group-cs">
                  <b-input-group prepend="Mức độ quan tâm" class="mb-2 mr-sm-2 mb-sm-0">
                    <treeselect
                      v-model="dataPopupDetail.trạng_thái"
                      :multiple="false"
                      :options="dataFavorite"
                      placeholder="Trạng thái"
                    />
                  </b-input-group>
                </b-col>
              </b-col>
              <b-col cols="12">
                <b-col class="frm-group-cs">
                  <b-form-textarea
                    id="textarea"
                    placeholder="Ghi chú"
                    rows="3"
                    max-rows="6"
                    v-model="dataPopupDetail.note"
                  ></b-form-textarea>
                </b-col>
              </b-col>
            </b-row>
          </div>
          <div class="btn-submit">
            <b-button  type='button' class block @click="$bvModal.hide('bv-modal-detail'), handleUpdate()">Lưu</b-button>
            <b-button
              class="handleno closes"
              title="Đóng"
              @click="$bvModal.hide('bv-modal-detail')"
            >Đóng</b-button>
          </div>
        </b-modal>
      </div>
    </mains>
  </div>
</template>

<script>
import Mains from "../Main.vue";
import Breakcrumb from "../layouts/Breakcrumb.vue";
import Treeselect from "@riophae/vue-treeselect";
import DatePicker from "vue2-datepicker";
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";

let { URL } = require("../../config");
let URL_API = URL.API_LEAD;

let stringImport = require("../../_helpers/string");
let customerCall = require("../../assets/js/customer");

export default {
  beforeDestroy(){
      customerCall.cleanAll();
  },
  mounted() {
    // this.$root.checkUserLogin();
    this.loadColumnUser();
    this.getChude();
    this.setTitlePage();
    this.getDataFavorite();
  },
  created(){
    //lay danh sach package
    this.$store.dispatch("packages/getPackage");
    this.checkRuleUser();
  },
  data() {
    return {
        objRegisterPackage:null,
        idPackage:null,
        objUser:null,
        valuePackage:null,
        package_data_user:'',
        utm:null,
        enableCall: false,
        isEndcall:false, // define button endcall
        objDelPotential:null,//define obj handle del potential
        // call
        calling: false,
        phoneCurrent: null,
        callStage:0,
        isCalling: false,
        labelTitle: "Cuộc gọi",
        valueMucdo: null,
        dataMucdo: [
            { id: "1", label: "Mức độ cao" },
            { id: "2", label: "Mức độ trung bình" },
            { id: "3", label: "Mức độ thấp" }
        ],
        valueFavorite: null,

        text: "",
        idHobbyCurrent: null, //id chu de hien tai
        isdnIdCurrent: null, // isdn id hien tai
        scoreCurrent: 0,
        isAllowCallBunton: false, // khoi tao button call disble if false
        idPhoneNumberCurrent: null, // id so dien thoai call hien tai

        userIdCurrent: null,
        stateCall: 0,
        idcall: null,
        // end call
        dataPopupDetail: {},
        //define exel export
        titleExel:'Xuất',
        exelData: [],
        fieldsData: {
            Stt: "stt",
            "Số điện thoại": "số_điện_thoại",
            "Chủ đề": "chủ_đề",
            Điểm: "Điểm",
            "Quan tâm": "quan_tâmm",
            "Thời gian gọi": "thời_gian_gọi",
            "Trạng thái": "trạng_tháii",
            "Gọi lại": "gọi_lại",
            "Người liên hệ": "người_liên_hệ",
            "Vai trò": "vai_trò"
        },
        //end define exel export
        // user: {},
        totalCurrentPage: 0,
        valuePage: null,
        //
        valueChude: [],
        valueChudeAll: null,
        valuePotential: null,
        valueMod: null,
        valueUser: null,
        valueCity: null,
        valueCountry: null,
        dataChude: [],
        paginations: [],
        dataPotential: [
            { id: "1", label: "Cao" },
            { id: "2", label: "Trung bình" },
            { id: "3", label: "Thấp" }
        ],
        dataFavorite: [
            { id: "1", label: "Quan tâm" },
            { id: "0", label: "Không quan tâm" }
        ],
        // dataMod: [],
        dataUser: [],
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
      //   { key: "stt",label:'#', sortable: true, thClass: "classStt" },
      //   { key: "số_điện_thoại",label:'Số điện thoại', sortable: false },
      //   { key: "chủ_đề", label:'Chủ đề', sortable: false },
      //   { key: "Điểm", label:'Điểm', sortable: true },
      //   { key: "quan_tâm", label:'Quan tâm', sortable: false },
      //   { key: "thời_gian_gọi", label:'Thời gian gọi', sortable: false },
      //   { key: "trạng_thái", label:'Trạng thái', sortable: true },
      //   { key: "vai_trò", label:'Vai trò', sortable: false },
      //   { key: "người_liên_hệ", label:'Người liên hệ', sortable: false }
      // ],
      items: [],
      lengthRow: 10,
      perPage: 10,
      curentPage: 1,
      totalRow: 0,
      variant: "light"
    };
  },
  components: {
    Treeselect,
    DatePicker,
    Mains,
    "breakcrumb-app": Breakcrumb
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
      if(e.length > 5) {
      // console.log(' you can only select two', e)
        e.pop();
      // this.textNotice = "Bạn chỉ chọn được tối đa 5 chủ đề.";
      }
    },
    loadColumnUser() {
      let role = this.user;
      if (role.role == "CON" || role.role == "SAL") {
        this.fields = [
          { key: "stt",label:'#', sortable: true, thClass: "classStt" },
          { key: "số_điện_thoại",label:'Số điện thoại', sortable: false },
          // { key: "chủ_đề", label:'Chủ đề', sortable: false },
          // { key: "Điểm", label:'Điểm', sortable: true, thClass: "classDQT" },
          // { key: "quan_tâm", label:'Quan tâm', sortable: false },
          { key: "thời_gian_gọi", label:'Thời gian gọi', sortable: false },
          { key: "trạng_thái", label:'Quan tâm', sortable: true },
          { key: "người_liên_hệ", label:'Người liên hệ', sortable: false },
          { key: "vai_trò", label:'Vai trò', sortable: false, thClass: "classVaitro" },
          // { key: "gọi_lại", label:'Gọi lại', sortable: false, thClass: "classVaitro" },
          { key: "thao_tác", label:'Thao tác', sortable: false }
        ];
      }
    },
    handleDelPotential(value){
      this.objDelPotential = {
        "isdn_id": value.isdn_id ? value.isdn_id : "",
        "user_id": value.user_id ? parseInt(value.user_id) : 0
      }
    },
    handleYesDel(){
      if(this.objDelPotential && this.objDelPotential.isdn_id != ""){
        this.$http.post(URL_API+'favorite/delete',this.objDelPotential).then();
        this.$bvModal.hide("bv-modal-del-potential");
        this.getDataFavorite();
      }
    },
    getVaitro(role) {
      // this.dataMod = [{
      //     id: "SAL",
      //     label: "Sale"
      //     }];

      // if(role == 'CON'){
      //   this.dataMod .push({
      //     id: "CON",
      //     label: "Contract Owner"
      //     }
      //   );
      // }
    },
    getUserRol(e) {
      // console.log( this.user );
      if ( e != undefined) {
        this.$http.get("v1/api/account-managers/suggest-name/?roleCodeSelected=" + e).then(res => {
          if (res.status == 200) {
            this.valueUser = null;
            let dataNew = [];
            let data = res.body.body;
            for (let i in data) {
              // dataNew.push({ id: data[i].trim(), label: data[i] });
              dataNew.push({
                id: parseInt(data[i].user_id),
                label: data[i].username
              });
            }
            if (data.length > 0) {

            }else if(this.user.role_code==e){
              dataNew = [{id:this.user.user_id,label:this.user.username}];
            }
            this.dataUser = dataNew;
            if(dataNew.length>0){
              this.valueUser  = dataNew[0].id;
            }
          }
        });
      }else{
        this.valueUser = null;
        this.dataUser = []
      }
    },
    getChude() {
      this.$http.get("v1/api/account-managers/topic").then(res => {
        if (res.status == 200 && res.body != "") {
          let data = res.body.body;
          let mangChudeId = [];
          let dataNew = [];
          let dataObjAll = [];
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              // if (i >= 500) break;
              dataNew.push({
                id: parseInt(data[i].topic_id),
                label: (data[i].topic_name)
              });
              mangChudeId.push(parseInt(data[i].topic_id));
            }
          }
          this.valueChudeAll = mangChudeId;
          dataObjAll = dataNew;
          this.dataChude = [
            {id:-1,label:'Tất cả',children:dataObjAll}
          ];
        }
      });
    },
    getTinh() {
      let obj = {
        act: "QUERY",
        k: "LOCATION_PROVINCE",
        limit: 100

        // "first_name":"h",
        // "second_name":"d",
        // "limit": 121,
        // "page": 3
      };
      this.$http.post(URL_API + "dict", obj).then(res => {
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
        }
      });
    },
    // change tinh thanh pho lay quan huyen
    changeTinh(val) {
      if (typeof val != "undefined") {
        let obj = {
          act: "QUERY",
          k: "LOCATION", // lay huyen
          limit: 100,
          id1: val
          // "first_name":"h",
          // "second_name":"d",
          // "limit": 121,
          // "page": 3
        };
        this.$http.post(URL_API + "dict", obj).then(res => {
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
          }
        });
      } else {
        this.dataCountry = [];
      }
    },
    async getDataFavorite(excel = false) {
      // let result = this.$root.dataUserLogin();
      let userID = this.user.user_id;
      let role = this.user.role_code;
       this.userIdCurrent = userID;
      // await result.then(resp => {
      //   if (resp.status == 200 && resp.body != "") {
      //     this.user = resp.body.body;
      //     userID = resp.body.body.user_id;
      //     this.userIdCurrent = userID;
      //     role = resp.body.body.role_code;
      //   }
      // });
      this.getVaitro(role);
      // console.log( userID );
      let obj = {
        user_id: {
          value: userID
        },
        category: {
          values: [1, 2]
        },
        page: 0,
        // limit: parseInt(this.perPage)
      };

      if (typeof this.time3 == "object") {
      } else {
        this.time3 = [stringImport.getLastWeek(), stringImport.getToday()];
      }

      if(excel != false){
        obj.limit = -1 // dung cho xuat excel. Lay toan bo du lieu.
      }else{
        obj.limit = parseInt(this.perPage)
      }
      const res =  await this.$http.post(URL_API + "call/favorite", obj);
    //  const resp =  await this.$http.post(URL_API + "call/history", obj).then(res => {
        if (res.status == 200 && res.body != "") {
          let data = res.body.second.second;
          let dataNew = [];
          // console.log(res);
          this.totalRow = res.body.second.first;
          if (data.length) {
            let totalPage = Math.ceil(res.body.second.first / this.perPage);
            this.paginations = stringImport.pagination(
              this.curentPage,
              totalPage
            );
            this.totalCurrentPage = totalPage;

            for (let i = 0; i < data.length; i++) {
              if (i >= 100) break;
              let objNew = {
                isActive: true,
                stt: data[i].stt,
                số_điện_thoại: data[i].masked_isdn,
                // chủ_đề: stringImport.textConverter(data[i].hobby_name),
                // Điểm: "+" + data[i].freq,
                // quan_tâm: data[i].rating,
                thời_gian_gọi: data[i].time_from,
                trạng_thái: data[i].category,
                người_liên_hệ: data[i].user_name,
                vai_trò: data[i].role_name,
                note: data[i].note,
                isdn_id: data[i].isdn_id,
                user_id: data[i].user_id,
                hobby_id: data[i].hobby_id,
                status: data[i].status,
                utm: data[i].utm,
                id: data[i].id,
                idHobby: data[i].hobby_id,
                Điểm_quan_tâm: data[i].freq,
                package_data_register_str:data[i].package_data_register_str,

                package_data_user: data[i].package_data_user,
                package_data_users: data[i].package_data_users,
                package_data_registers: data[i].package_data_registers,
                package_data_register: data[i].package_data_register,
                packageAll: data[i].packageAll,

                //exel
                trạng_tháii:
                  data[i].category == 1 ? "Quan tâm" : "Không quan tâm",
                // quan_tâmm: data[i].rating == 1 ? "Cao" : "Thấp",
                gọi_lại: "Gọi lại",
                expired:data[i].expired,
                _rowVariant: data[i].expired==1 ?'expired':''
              };
              dataNew.push(objNew);
            }
          }

          if(excel){
            // this.exelData = dataNew;
          }else{
            this.items = dataNew;
          }
          return dataNew;
        }
      // });
    },
    exportExcel(){
      // setTimeout(()=>{
      //   this.titleExel = 'Tải về';
      // },500)
      // this.getDataFavorite(true)
    },
    async fetchDataHistory() {
      const resd = await this.getDataFavorite(true);
      return resd;
    },
    startDownload() {
    },
    finishDownload() {
    },
    handleFilter(e) {
      this.titleExel = 'Xuất';
      let mangChudeId = null;
      this.curentPage = 1;
      let obj = {
        category: {
          values: [1, 2]
        },
        page: 0,
        limit: this.perPage
      };

      // if (this.valueChude) {
      //   obj.hobby_id = {
      //     values: this.valueChude
      //   };
      // }
      if (this.valueChude) {
        let data = null;
        if(this.valueChude == -1){
          data = this.valueChudeAll;
        }else{
          data = this.valueChude;
        }
        let chudeID = data.map(item => {
          return parseInt(item);
        });
        mangChudeId = chudeID;
      }
      if(mangChudeId===null || mangChudeId===undefined|| mangChudeId.length==0){
        mangChudeId = [-3];
      }

      obj.hobby_id = {
        values: mangChudeId
      };

      if(this.valueUser){
        obj.user_id = {
          value: this.valueUser
        }
      }else{
        obj.user_id = {
          value: this.user.user_id
        }
      }

      if(this.valueMod && !this.valueUser){
        obj.user_id = {
          value: -1
        }
      }

      if (this.time3 != null && typeof this.time3 === "object") {
        if (this.time3[0] != "" || this.time3[1] != "") {
          obj.time_from = {
            from: this.time3[0],
            to: this.time3[1]
          };
        }
      }

      if (this.valuePotential) {
        obj.rating = {
          value: parseInt(this.valuePotential)
        };
      }

      // console.log(obj);
      this.$http.post(URL_API + "call/favorite", obj).then(res => {
        if (res.status == 200 && res.body != "") {
          let data = res.body.second.second;
          let dataNew = [];
          // console.log(res);

          this.totalRow = res.body.second.first;
          if (data.length) {
            let totalPage = Math.ceil(res.body.second.first / this.perPage);
            this.paginations = stringImport.pagination(
              this.curentPage,
              totalPage
            );
            this.totalCurrentPage = totalPage;

            for (let i = 0; i < data.length; i++) {
              if (i >= 100) break;
              let objNew = {
                isActive: true,
                stt: data[i].stt,
                số_điện_thoại: data[i].masked_isdn,
                // chủ_đề: stringImport.textConverter(data[i].hobby_name),
                // Điểm: "+" + data[i].freq,
                // quan_tâm: data[i].rating,
                thời_gian_gọi: data[i].time_from,
                trạng_thái: data[i].category,
                người_liên_hệ: data[i].user_name,
                vai_trò: data[i].role_name,
                note: data[i].note,
                isdn_id: data[i].isdn_id,
                user_id: data[i].user_id,
                hobby_id: data[i].hobby_id,
                utm: data[i].utm,
                status: data[i].status,
                id: data[i].id,
                expired:data[i].expired,
                package_data_register_str:data[i].package_data_register_str,

                package_data_user: data[i].package_data_user,
                package_data_users: data[i].package_data_users,
                package_data_registers: data[i].package_data_registers,
                package_data_register: data[i].package_data_register,
                packageAll: data[i].packageAll,
                //exel
                trạng_tháii:
                  data[i].category == 1 ? "Quan tâm" : "Không quan tâm",
                // quan_tâmm: data[i].rating == 1 ? "Cao" : "Thấp",
                gọi_lại: "Gọi lại",
                _rowVariant: data[i].expired==1 ?'expired':''
              };
              dataNew.push(objNew);
            }
          }
          this.items = dataNew;
          // this.exelData = dataNew;
        }
      });
      if(e){
      e.preventDefault();
      }
    },
    handlePagi(value, perPage) {
      let mangChudeId = null;
      this.curentPage = value;
      this.perPage = perPage;
      let obj = {
        user_id: {
          value: this.user.user_id
        },
        category: {
          values: [1, 2]
        },
        page: value - 1,
        limit: parseInt(this.perPage)
      };

      if (this.valueChude) {
        let data = null;
        if(this.valueChude == -1){
          data = this.valueChudeAll;
        }else{
          data = this.valueChude;
        }
        let chudeID = data.map(item => {
          return parseInt(item);
        });
        mangChudeId = chudeID;
      }

      if(mangChudeId===null || mangChudeId===undefined|| mangChudeId.length==0){
        mangChudeId = [-3];
      }

      obj.hobby_id = {
        values: mangChudeId
      };

      this.$http.post(URL_API + "call/favorite", obj).then(res => {
        if (res.status == 200 && res.body != "") {
          let data = res.body.second.second;
          let dataNew = [];
          console.log(res);
          this.totalRow = res.body.second.first;
          if (data.length) {
            for (let i = 0; i < data.length; i++) {
              if (i >= 100) break;
              let objNew = {
                isActive: true,
                stt: data[i].stt,
                số_điện_thoại: data[i].masked_isdn,
                // chủ_đề: stringImport.textConverter(data[i].hobby_name),
                // Điểm: "+" + data[i].freq,
                quan_tâm: data[i].rating,
                thời_gian_gọi: data[i].time_from,
                trạng_thái: data[i].category,
                người_liên_hệ: data[i].user_name,
                vai_trò: data[i].role_name,
                note: data[i].note,
                isdn_id: data[i].isdn_id,
                user_id: data[i].user_id,
                hobby_id: data[i].hobby_id,
                utm: data[i].utm,
                status: data[i].status,
                id: data[i].id,
                expired:data[i].expired,
                package_data_register_str:data[i].package_data_register_str,

                package_data_user: data[i].package_data_user,
                package_data_users: data[i].package_data_users,
                package_data_registers: data[i].package_data_registers,
                package_data_register: data[i].package_data_register,
                packageAll: data[i].packageAll,
                //exel
                trạng_tháii:
                  data[i].category == 1 ? "Quan tâm" : "Không quan tâm",
                // quan_tâmm: data[i].rating == 1 ? "Cao" : "Thấp",
                gọi_lại: "Gọi lại",
                _rowVariant: data[i].expired==1 ?'expired':''
              };
              dataNew.push(objNew);
            }
          }
          this.items = dataNew;
          // this.exelData = dataNew;
        }
      });
    },
    searchHobby({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        let options = null;
        setTimeout(() => {
          this.$http
            .get("v1/api/account-managers/topic?topic_name=" + searchQuery)
            .then(res => {
              if (res.body != "") {
                let data = res.body.body;
                let dataNew = [];
                let dataObjAll = [];
                if (data.length > 0) {
                  for (let i = 0; i < data.length; i++) {
                    if (i >= 500) break;
                    dataNew.push({
                      id: parseInt(data[i].topic_id),
                      label: (data[i].topic_name)
                    });
                  }
                }
                dataObjAll = dataNew;
                callback(null, dataObjAll);
                // this.dataChude = dataObjAll;
              }
            });
        }, 2000);
      }
    },
    handleDetail(data) {
      console.log(data);
      this.dataPopupDetail = {
        quan_tâm: data.quan_tâm,
        trạng_thái: data.trạng_thái,
        note: data.note,
        isdn_id: data.isdn_id,
        user_id: data.user_id,
        hobby_id: data.hobby_id,
        status: data.status,
        id: data.id,
        masked_isdn: data.số_điện_thoại,
        package_data_register_str: data.package_data_register_str,

        package_data_user: data.package_data_user,
        package_data_users: data.package_data_users,
        package_data_registers: data.package_data_registers,
        package_data_register: data.package_data_register,
        packageAll: data.packageAll,
      };
    },
    handleShowDetail(e) {
      this.handleDetail(e);
      this.$bvModal.show("bv-modal-detail");
    },

    handleUpdate() {
      // let timeCall = customerCall.getTotalCallTime();
      let obj = {};
      obj.isdn_id = this.dataPopupDetail.isdn_id;
      obj.category = this.dataPopupDetail.trạng_thái;
      obj.rating = this.dataPopupDetail.quan_tâm;
      obj.note = this.dataPopupDetail.note;
      obj.user_id = this.dataPopupDetail.user_id;
      obj.hobby_id = this.dataPopupDetail.hobby_id;
      obj.status = this.dataPopupDetail.status;
      obj.id = this.dataPopupDetail.id;

      // console.log( obj );

      this.$http.post(URL_API + "call/status", obj).then(res => {
        // console.log(res);
      });
      // this.$router.go();
      this.getDataFavorite();
    },
    // handle call khach hang
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
    handleNoCall(phone) {
      window.onbeforeunload = null;
      customerCall.finishCall();
      this.callStage = 0;
      this.isCalling = false;
      this.calling = false;
    },
    async handleYesCall(phone) {
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
      console.log( this.dataPopupDetail );
      obj.utm = this.utm ? this.utm : 0;

      obj.ctx = 1;
      customerCall.transferObj(obj); //Truyen obj tu client sang websocket
      // call api ==> ID ( set ID history call)
      await this.$http.post(URL_API + "call/status", obj).then(res => {
        if (res.status == 200 && res.body != "") {
          let data = res.body;
          if (data.first == "SUCCESS" || data.first == "RECORD_EXISTED") {
            idStatus = data.second.id;
          }
        }
      },
      error =>{
          obj = null;
            alert("Lỗi kết nối tới máy chủ! ");
            this.$bvModal.hide('bv-modal-call');
        });

      if(obj==null){
        customerCall.clearStateFromBrowser();
        return ;
      }
      if(!customerCall.getCsVoiceEnable()){
          // alert("Có lỗi xảy ra trong quá trình thực hiện. Quý khách vui lòng refresh lại website (nhấn F5) để khởi tạo lại!");
          this.captionText = "Chưa kết nối đến hệ thống thoại!";
          // this.$bvModal.hide('bv-modal-call');
          customerCall.clearStateFromBrowser();
          return ;
      }
      this.callStage = 2;
      this.isCalling = true;
      this.idcall = idStatus;
      obj.id = idStatus;
      obj.ctx = 1;
      // console.log( obj );
        window.onbeforeunload = function() {
          return "";
        };
        this.labelTitle = "Ghi chú cuộc gọi";
        this.captionText = "Đang khởi tạo kênh kết nối tới khách hàng.";
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

        setTimeout(this.getDataFavorite,300);
    },
    async unregisterCall(isdn_id,user_id){
      let obj = {
            "isdn_id": isdn_id,
            "user_id": user_id,
            "reverse": 1
            };
      await this.$http.post(this.$configUrl.API_LEAD+"call/register",obj);
    },
    handleSaveCall(phone,btn) {
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
          if(this.objRegisterPackage.id){
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

    changeIsCall() {
      this.callStage = 1;
      this.isCalling = false;
    },
    destroyFormCalling() {
      if (this.isCalling == true) {
        let flag = window.confirm("Bạn có muốn kết thúc cuộc gọi này không?");
        if (flag) {
          this.callStage = 0;
          this.stateCall = 0;
          this.isCalling = false;
          window.onbeforeunload = null;
          this.handleSaveCall(phoneCurrent,true);
          // customerCall.finishCall();
        } else {
          this.$bvModal.show("bv-modal-call");
        }
      }
      this.valueMucdo = null;
      this.valueFavorite = null;
      this.text = "";
    },
    setAuthToken(token) {
      customerCall.setAuthToken(token);
    },
    // end call khach hang
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
    goPaginations(value, perPage) {
      let page = parseInt(value);
      if (page > 0 && page <= this.totalCurrentPage) {
        // page = page - 1;
        this.handlePagi(page, perPage);
      }
    },
    textConverter(value) {
      return stringImport.textConverter(value);
    },
    setTitlePage() {
      this.$store.state.stores.titlePage = "Khách hàng yêu thích";
    },
    handleShow() {
      console.log("handleShow");
    },
    checkRuleUser() {
      if (this.user.role_code == "MOD" || this.user.role_code == "ADM") {
        this.$router.push("/");
      }
    },
    handleEndCall(){
      return this.isEndcall = true;
    }
  },
  computed: {
    listPackage(){
      return this.$store.getters['packages/getPackage']
    },
    rows() {
      return this.items.length;
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
    dataMod(){
      let mod = [
        {
          id: "SAL",
          label: "Sale"
        }
      ];
      let role = this.user.role_code;

      if (role == "CON" ) {
        mod.push({
          id: "CON",
          label: "Contract Owner"
        });
      }

      this.valueMode= mod[mod.length-1].id;
      return mod;
    },
    fields(){
      let role = this.user;
      if (role.role_code == "CON" || role.role_code == "SAL") {
        return [
          { key: "stt",label:'#', sortable: true, thClass: "classStt" },
          { key: "số_điện_thoại",label:'Số điện thoại', sortable: false },
          { key: "package_data_register_str", label: "Gói người dùng", sortable: false },
          // { key: "chủ_đề", label:'Chủ đề', sortable: false },
          // { key: "Điểm", label:'Điểm', sortable: true, thClass: "classDQT" },
          // { key: "quan_tâm", label:'Quan tâm', sortable: false },
          { key: "thời_gian_gọi", label:'Thời gian gọi', sortable: false },
          { key: "trạng_thái", label:'Quan tâm', sortable: true },
          { key: "người_liên_hệ", label:'Người liên hệ', sortable: false },
          // { key: "vai_trò", label:'Vai trò', sortable: false, thClass: "classVaitro" },
          { key: "note", label:'Ghi chú', sortable: false, thClass: "" },
          { key: "thao_tác", label:'Thao tác', sortable: false }
        ];
      }else{
        return [
          { key: "stt",label:'#', sortable: true, thClass: "classStt" },
          { key: "số_điện_thoại",label:'Số điện thoại', sortable: false },
          { key: "package_data_register_str", label: "Gói người dùng", sortable: false },
          // { key: "chủ_đề", label:'Chủ đề', sortable: false },
          // { key: "Điểm", label:'Điểm', sortable: true },
          // { key: "quan_tâm", label:'Quan tâm', sortable: false },
          { key: "thời_gian_gọi", label:'Thời gian gọi', sortable: false },
          { key: "trạng_thái", label:'Quan tâm', sortable: true },
          { key: "vai_trò", label:'Vai trò', sortable: false },
          { key: "người_liên_hệ", label:'Người liên hệ', sortable: false }
        ];
      }
    }

  },
  watch: {
    lengthRow(value) {
      this.perPage = this.lengthRow;
    },
    perPage(value) {
      value = parseInt(value);
      // if (value <= this.totalRow)
      {
        this.handlePagi(1, value);
        //pagination
        let totalPage = Math.ceil(this.totalRow / value);
        this.paginations = stringImport.pagination(1, totalPage);
      }
    }
  }
};
</script>


<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>
