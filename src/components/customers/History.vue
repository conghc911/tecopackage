<template>
  <div>
    <mains>
      <breakcrumb-app>Lịch sử cuộc gọi</breakcrumb-app>
      <div id="content-box">
        <b-container>
          <div class="top-head-box">
            <form>
              <b-row>
                <b-col cols="12" md="6" lg="4" v-if="user.role_code != 'SAL'">
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
                      @input="handleFilter()"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6" lg="4">
                  <b-form-group>
                    <label for="city-list">Trạng thái cuộc gọi</label>
                    <treeselect
                      v-model="valueCall"
                      :multiple="false"
                      :options="dataCall"
                      placeholder="Lựa chọn"
                      noOptionsText="Chưa có dữ liệu"
                      noResultsText="Không có dữ liệu"
                      @input="handleFilter()"
                    />
                  </b-form-group>
                </b-col>

                <!-- <b-col cols="12" md="6" lg="4">
                  <b-form-group>
                    <label for="city-list">Mức độ quan tâm</label>
                    <treeselect
                      v-model="valuePotential"
                      :multiple="false"
                      :options="dataPotential"
                    />
                  </b-form-group>
                </b-col>-->

                <b-col cols="12" md="6" lg="4" class='full-input'>
                  <b-form-group>
                    <label for="city-list">Khoảng thời gian gọi điện</label>
                    <date-picker
                      v-model="time3"
                      :lang="lang"
                      range
                      value-type="format"
                      format="YYYY-MM-DD"
                      range-separator=" đến "
                      :shortcuts="shortcuts"
                      @input="handleFilter()"
                    ></date-picker>
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="6" lg="4">
                  <b-form-group>
                    <label for="city-list">Thời lượng gọi lớn hơn hoặc bằng</label>
                    <b-input
                      type="number"
                      maxlength="12"
                      id="inline-form-input-username"
                      v-model="duration"
                      placeholder="Phút"
                      onkeypress=""
                    ></b-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6" lg="4">
                  <!-- <b-form-group class="box-vaitro" v-if="user.role_code == 'ADM'">
                    <label for="city-list">Chủ đề quan tâm</label>
                    <treeselect
                      v-model="valueChude"
                      :multiple="true"
                      :always-open="false"

                      placeholder="Lựa chọn"
                      noOptionsText="Chưa có dữ liệu"
                      noResultsText="Không có dữ liệu"
                      loadingText="Đang tải dữ liệu"
                      searchPromptText="Nhập từ khóa tìm kiếm"

                      :async="true"
                      :load-options="searchHobby"
                    />
                  </b-form-group>-->

                  <!-- <b-form-group class="box-vaitro">
                    <label for="city-list">Chủ đề quan tâm <span class="cusNotice">(Tối đa 5 chủ đề)</span></label>
                    <treeselect
                      v-model="valueChude"
                      :options="dataChude"
                      :multiple="true"
                      :always-open="false"
                      :limit="2"
                      v-on:input="limiter"
                      :disable-branch-nodes="true"
                      placeholder="Chọn chủ đề"
                      @input="handleFilter()"
                    />
                  </b-form-group> -->
                </b-col>
              </b-row>
              <div class="mx-auto btn-filter" style="width:250px">
                <button type="button" @click="handleFilter()">
                  <font-awesome-icon icon="search" /> Lọc
                </button>
                <!-- download file exel -->
                <!-- :data="exelData" -->

                <export-excel
                  class="btn-exel"
                  :fields="fieldsData"
                  worksheet="Lịch sử cuộc gọi"
                  name="lich_su_cuoc_goi.xls"
                  :fetch="fetchDataHistory"
                  :before-generate="startDownload"
                  :before-finish="finishDownload"
                >
                  <span class="addnew">
                    <!-- <span class="addnew" @click="exportExcel"> -->
                    <font-awesome-icon icon="download" />
                    Tải về
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
                  <strong>{{totalRow}}</strong> bản ghi
                </p>
              </div>
            </div>

            <div class="body-table" v-bind:class="{ 'activeSale' : myrule == 4 }">
              <b-table
                id="my-table-customer"
                hover
                responsive
                :items="items"
                :fields="fields"
                @row-clicked="handleShowDetail($event)"
              >
                <template v-slot:cell(số_điện_thoại)="khachhang">
                  <span class="aleftPhone">{{khachhang.value}}</span>
                </template>
                <template v-slot:cell(vai_trò)="vaitro">
                  <span>{{ textConverter(vaitro.value) }}</span>
                </template>

                <template v-slot:cell(trạng_thái_cuộc_gọi)="trangthai" v-if="user.role_code=='ADM' ">
                  <span v-if="trangthai.value == 0 " class="aleftThap">Chưa thực hiện</span>
                  <span v-if="trangthai.value == 1 " class="aleftCao">Đang đổ chuông</span>
                  <span v-if="trangthai.value == 2 " class="aleftCao">Đang hội thoại</span>
                  <span v-if="trangthai.value == 3 " class="aleftCao">Đã nghe máy</span>
                  <span v-if="trangthai.value == 4 " >Không nghe máy</span>
                  <span v-if="trangthai.value == 5 " class="aleftCao">Máy bận</span>
                  <span v-if="trangthai.value == 6 " class="aleftThap">Không thực hiện được</span>
                  <span v-if="trangthai.value == 7 " >Hủy thực hiện</span>
 		  <span v-if="trangthai.value == 8 " >Không liên lạc được</span>
                </template>

                <template v-slot:cell(trạng_thái_cuộc_gọi)="trangthai" v-else>
                  <!-- <span v-if="trangthai.value == 0 " class="aleftThap">Chưa thực hiện</span>
                  <span v-if="trangthai.value == 1 " class="aleftThap">Đang đổ chuông</span>
                  <span v-if="trangthai.value == 2 " class="aleftThap">Đang hội thoại</span> -->
                  <span v-if="trangthai.value == 3 " class="aleftCao">Đã nghe máy</span>
                  <span v-if="trangthai.value == 4 ">Không nghe máy</span>
                  <span v-if="trangthai.value == 5 " class="aleftCao">Máy bận</span>
                  <span v-if="trangthai.value == 6 || trangthai.value == 2 || trangthai.value == 1 || trangthai.value == 0 " class="aleftThap">Không thực hiện được</span>
                  <span v-if="trangthai.value == 7 ">Hủy thực hiện</span>
   		  <span v-if="trangthai.value == 8 ">Không liên lạc được</span>
                </template>

                <template v-slot:cell(thao_tác)="thaotac">
                  <div @click="$bvModal.show('bv-modal-detail')">
                    <span class="chitiet" title="Chi tiết" @click="handleDetail(thaotac.item)">
                      Chi tiết
                      <font-awesome-icon icon="info-circle" />
                    </span>
                  </div>
                </template>

                <template v-slot:cell(bắt_đầu_cuộc_gọi)="batdau">
                  <span v-bind:title="batdau.value">{{batdau.value}}</span>
                </template>

                <template v-slot:cell(mã)="ma">
                  <span v-bind:title="ma.value">{{(ma.value.length > 10) ? ma.value.slice(0,8)+'...' : ma.value }}</span>
                </template>

              </b-table>
              <!-- pagination -->
              <div class="no-data" v-if="items.length == 0" id="nodata-search" style>
                <p>Không có dữ liệu.</p>
              </div>
              <!-- v-if="totalRow > 0" -->
              <div id="pagination" v-if="totalRow > 0">
                <ul>
                  <li v-if="curentPage == 1" class="noHover">
                    <a>« Trang đầu</a>
                  </li>
                  <li v-if="curentPage > 1" class="withHover">
                    <a @click="handlePagi(1,perPage)">« Trang đầu</a>
                  </li>
                  <li v-if="curentPage == 1" class="noHover">
                    <a>‹ Trước</a>
                  </li>
                  <li v-if="curentPage > 1" class="withHover">
                    <a @click="handlePagi(curentPage - 1,perPage)">‹ Trước</a>
                  </li>
                  <li v-for="(item) in paginations" v-bind:key="item" class="number-text">
                    <a
                      @click="handlePagi(item,perPage)"
                      v-bind:class="{'active': isActive(item), 'disble': isDisble(item),'withHover': !isActive(item) }"
                    >{{ item }}</a>
                  </li>
                  <li v-if="items.length >= perPage && totalCurrentPage  - 1 > curentPage " class="noHover number-text">
                    <a>...</a>
                  </li>
                  <li v-if="curentPage == totalCurrentPage || items.length == 0 "  class="noHover">
                    <a>Sau ›</a>
                  </li>
                  <li v-if="totalCurrentPage > curentPage  && items.length != 0" class="withHover">
                    <a @click="handlePagi(curentPage + 1,perPage)">Sau ›</a>
                  </li>
                  <li v-if="curentPage == totalCurrentPage || items.length == 0 " class="noHover">
                    <a>Trang cuối »</a>
                  </li>
                  <li v-if="totalCurrentPage > curentPage && items.length != 0" class="withHover">
                    <a @click="handlePagi(totalCurrentPage,perPage)">Trang cuối »</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </b-container>
        <b-modal id="bv-modal-detail" hide-footer>
          <template v-slot:modal-title>
            <h3>
              Chi tiết lịch sử cuộc gọi
              <strong>#{{ (dataPopupDetail.isdn_id.length > 10) ? dataPopupDetail.isdn_id.slice(0,8)+'...' : dataPopupDetail.isdn_id }} - {{ dataPopupDetail.masked_isdn}}</strong>
            </h3>
          </template>
          <div class="d-block text-center">
            <b-row>
              <b-col cols="12">
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
            <b-button class block @click="$bvModal.hide('bv-modal-detail'), handleUpdate()">Lưu</b-button>
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
export default {
  mounted() {
    // this.$root.checkUserLogin();

    this.getChude();
    this.loadColumnUser();
    // this.getVaitro();
    this.setTitlePage();
    this.getDataHistory();
    // this.handleFilter();
  },
  created() {
  },
  data() {
    return {
      dataPopupDetail: {},
      //define exel export
      titleExel: "Xuất",
      exelData: [],
      fieldsData: {
        Stt: "stt",
        // "Chủ đề": "chủ_đề",
        "Mã" : "isdn_id_code",
        "Số điện thoại": "số_điện_thoại",
        "Thời điểm": "bắt_đầu_cuộc_gọi",
        "Trạng thái": "trạng_thái_cuộc_gọii",
        "Thời lượng": "thời_lượng_cuộc_gọi",
        "Người gọi": "người_liên_hệ",
        "Vai trò": "vai_trò",
        "Ghi chú": "ghi_chú"
      },
      //end define exel export
      duration: "",
      totalRow: 0,
      curentPage: 1,
      // user: {},
      valueChude: [],
      valueChudeAll: null,
      valuePotential: null,
      valueMod: null,
      valueUser: null,
      valueCall: null,
      totalCurrentPage: 0,
      valuePage: null,
      actionFilter: false,
      dataChude: [],
      paginations: [],
      dataPotential: [
        { id: "1", label: "Cao" },
        { id: "2", label: "Trung bình" },
        { id: "3", label: "Thấp" }
      ],
      dataFavortite: [
        { id: "0", label: "Không" },
        { id: "1", label: "Yêu thích" },
        { id: "2", label: "Yêu thích và gọi lại" }
      ],
      // dataMod: [],
      dataUser: [],
      // dataCall: [
      //   { id: "0", label: "Chưa thực hiện" },
      //   { id: "1", label: "Đang đổ chuông" },
      //   { id: "2", label: "Đang hội thoại" },
      //   { id: "3", label: "Đã nghe máy" },
      //   { id: "4", label: "Không nghe máy" },
      //   { id: "5", label: "Máy bận" },
      //   { id: "6", label: "Không thực hiện được" },
      //   { id: "7", label: "Hủy thực hiện" }
      // ],
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

      fields: [
        { key: "stt", label: "#", sortable: true, thClass: "classStt" },
        {
          key: "số_điện_thoại",
          label: "Số điện thoại",
          sortable: false,
          thClass: "classphone"
        },
        // { key: "chủ_đề", label: "Chủ đề", sortable: false },
        {
          key: "bắt_đầu_cuộc_gọi",
          label: "Thời điểm",
          sortable: false,
          thClass: "classDQT"
        },
        { key: "trạng_thái_cuộc_gọi", label: "Trạng thái", sortable: true },
        {
          key: "thời_lượng_cuộc_gọi",
          label: "Thời lượng",
          sortable: true,
          thClass: "classThoiluong"
        },
        {
          key: "người_liên_hệ",
          label: "Người gọi",
          sortable: false,
          thClass: "classNglh"
        },
        { key: "mã", label: "Mã", sortable: false },
        { key: "thao_tác", label: "Thao tác", sortable: false }
      ],
      items: [],
      lengthRow: 10,
      perPage: 10,
      currentPage: 1,
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
      limiter(e) {
        if(e.length > 5) {
        // console.log(' you can only select two', e)
          e.pop();
        // this.textNotice = "Bạn chỉ chọn được tối đa 5 chủ đề.";
        }
      },
     isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
            return false;

        return true;
     },
    async fetchDataHistory() {
      const resd = await this.getDataHistory(true);
      return resd;
    },
    startDownload() {
    },
    finishDownload() {
    },
    loadColumnUser() {
      let role = this.$service.getUserLogin();
      // console.log(role);
      if (role.role == "SAL") {
        this.fields = [
          { key: "stt", sortable: true, thClass: "classStt" },
          { key: "số_điện_thoại", sortable: false, thClass: "classphone" },
          // { key: "chủ_đề", sortable: false },
          {
            key: "bắt_đầu_cuộc_gọi",
            label: "Thời điểm",
            sortable: false,
            thClass: "classDQT"
          },
          { key: "trạng_thái_cuộc_gọi", label: "Trạng thái", sortable: false },
          {
            key: "thời_lượng_cuộc_gọi",
            label: "Thời lượng",
            sortable: true,
            thClass: "classThoiluong"
          },
          { key: "mã", sortable: true },
          { key: "thao_tác", sortable: false }
        ];
      }else if (role.role == "ADM"){
         this.fields.pop();
      }
    },
    getVaitro(role) {
      return this.dataMod;
      // this.dataMod = [
      //   {
      //     id: "SAL",
      //     label: "Sale"
      //   }
      // ];

      // if (role == "CON" || role == "MOD" || role == "ADM") {
      //   this.dataMod.push({
      //     id: "CON",
      //     label: "Contract Owner"
      //   });
      // }
    },
    getUserRol(e) {
      console.log(e);
      if (e != undefined) {
        this.$http
          .get("v1/api/account-managers/suggest-name/?roleCodeSelected=" + e)
          .then(res => {
            if (res.status == 200) {
              this.valueUser = null;
              let dataNew = [];
              let data = res.body.body;
              if (data.length > 0) {
                for (let i in data) {
                  // dataNew.push({ id: data[i].trim(), label: data[i] });
                  dataNew.push({
                    id: parseInt(data[i].user_id),
                    label: data[i].username
                  });
                }
              } else {
                dataNew = [
                  { id: this.user.user_id, label: this.user.username }
                ];

              }
              this.dataUser = dataNew;
              if(this.dataUser.length>0){
                this.valueUser = this.dataUser[0].id;
              }else{
                this.valueUser = null;
              }
              // this.handleFilter();
            }
          });
      } else {
        this.valueUser = null;
        this.dataUser = [];
        // this.handleFilter();
        // this.getListUserLogin();
      }
    },
    getListUserLogin() {
      this.$http.get("v1/api/account-managers/suggest-name").then(res => {
        if (res.status == 200 && res.body.body.length != 0) {
          let dataNew = [];
          let data = res.body.body;
          if (data.length > 0) {
            for (let i in data) {
              dataNew.push({ id: data[i].username, label: data[i].username });
            }
          }
          this.dataUser = dataNew;
        } else {
          this.dataUser = [];
        }
      });
    },
    getChude() {
      this.$http.get("v1/api/account-managers/topic").then(res => {
        if (res.status == 200 && res.body != "") {
          let data = res.body.body;
          let dataNew = [];
          let dataObjAll = [];
          let mangChudeId = [];
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              // if (i >= 100) break;
              dataNew.push({
                id: parseInt(data[i].topic_id),
                label: data[i].topic_name
              });
              mangChudeId.push(parseInt(data[i].topic_id));
            }
          }
          this.valueChudeAll = mangChudeId;
          dataObjAll = dataNew;
          this.dataChude = [{ id: -1, label: "Tất cả", children: dataObjAll }];
        }
      });
    },
    async getDataHistory(excel = false) {

      // let dataUser = this.$service.dataUserLogin();
      let user_id = this.user.user_id;
      let user_role = this.user.role_code;
      // await dataUser.then(res => {
      //   this.user = res.body;
      //   user_id = res.body.user_id;
      //   user_role = res.body.role_code;
      // });
      // this.getVaitro(user_role);
      let obj = {
        page: 0
      };
      if (excel != false) {
        obj.limit = -1; // dung cho xuat excel. Lay toan bo du lieu.
      } else {
        obj.limit = parseInt(this.perPage);
      }
      // console.log("getDataHistory"+user_role);
      if (user_id != null && user_role != "ADM") {
        obj.user_id = {
          value: user_id
        };
      }

      if (typeof this.time3 == "object") {
      } else {
        this.time3 = [stringImport.getLastWeek(), stringImport.getToday()];
      }
      // console.log( obj );
      const res = await this.$http.post(URL_API + "call/history", obj);
      //console.log(JSON.stringify(res));
      // this.$http.post(URL_API + "call/history", obj).then(res => {
      if (res.status == 200 && res.body != "") {
        let data = res.body.second.second;
        let dataNew = [];
        // console.log(res);
        this.totalRow = res.body.second.first;
        if (data.length > 0) {
          let totalPage = Math.ceil(this.totalRow / this.perPage);
          this.paginations = stringImport.pagination(
            this.curentPage,
            totalPage
          );
          this.totalCurrentPage = totalPage;

          for (let i = 0; i < data.length; i++) {
            //if (i >= 100) break;
            let objNew = {
              isActive: true,
              stt: data[i].stt,
              // chủ_đề: stringImport.textConverter(data[i].hobby_name),
              số_điện_thoại: data[i].masked_isdn,
              bắt_đầu_cuộc_gọi: data[i].time_from,
              trạng_thái_cuộc_gọi: data[i].status,
              thời_lượng_cuộc_gọi: stringImport.numberConverter(
                data[i].duration
              ),
              người_liên_hệ: data[i].user_name,
              vai_trò: data[i].role_name,
              mã: "#" + data[i].isdn_id,
              // mã: "#" + data[i].isdn_id.slice(0,8),
              // mã: "#" + data[i].orderid,
              //exel
              trạng_thái_cuộc_gọii: stringImport.stateConverterNotAdm(data[i].status),
              ghi_chú: data[i].note,
              //
              trạng_thái: data[i].category,
              quan_tâm: data[i].rating,
              note: data[i].note,
              isdn_id: data[i].isdn_id,
              hobby_id: data[i].hobby_id,
              id: data[i].id,
              status: data[i].status,
              user_id: data[i].user_id,
              isdn_id_code:data[i].isdn_id,
              _rowVariant: data[i].expired==1 ?'expired':''
            };

            dataNew.push(objNew);
          }
        }
        if (!excel) {
          this.items = dataNew;
        } else {
          // this.exelData = dataNew;
        }
        return dataNew;
      } else {
        return [];
      }
      // });
      return resp;
    },

    handlePagi(value, perPage) {
      let mangChudeId = null;
      // if (value == "..." || value == "....") return false;
      this.curentPage = value;
      this.perPage = perPage;
      let obj = {
        page: value - 1,
        limit: perPage
      };

      if (this.valueUser) {
        obj.user_id = {
          value: this.valueUser
          // value: this.user.user_id
        };
      } else {
        if (this.user.role_code != "ADM") {
          obj.user_id = {
            value: this.user.user_id
          };
        }
      }

      if (this.actionFilter == true) {
        // obj.user_id = {
        //   value: this.user.user_id
        // };

        if (this.valueChude) {
          let data = null;
          if (this.valueChude == -1) {
            data = this.valueChudeAll;
          } else {
            data = this.valueChude;
          }
          let chudeID = data.map(item => {
            return parseInt(item);
          });
          mangChudeId = chudeID;
        }
        obj.hobby_id = {
          values: mangChudeId
        };

        if (this.valueCall) {
           const vcallStatus = parseInt(this.valueCall);
            if(vcallStatus==6){
              obj.status = {
                values: [0,1,2,6]
              };
            }else{
              obj.status = {
                value: vcallStatus
              };
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

        if (this.duration) {
          obj.duration = {
            from: parseInt(this.duration - 1) * 60 + 1
          };
        }
      }

      this.$http.post(URL_API + "call/history", obj).then(res => {
        if (res.status == 200 && res.body != "") {
          let data = res.body.second.second;
          let dataNew = [];
          console.log(res);
          // phantrang
          this.totalRow = res.body.second.first;
          let totalPage = Math.ceil((res.body.second.first - 1) / this.perPage);
          this.totalCurrentPage = totalPage;
          this.paginations = stringImport.pagination(value, totalPage);
          //

          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              //if (i >= 100) break;
              let objNew = {
                isActive: true,
                stt: data[i].stt,
                // chủ_đề: stringImport.textConverter(data[i].hobby_name),
                số_điện_thoại: data[i].masked_isdn,
                bắt_đầu_cuộc_gọi: data[i].time_from,
                trạng_thái_cuộc_gọi: data[i].status,
                thời_lượng_cuộc_gọi: stringImport.numberConverter(
                  data[i].duration
                ),
                người_liên_hệ: data[i].user_name,
                vai_trò: data[i].role_name,
                mã: "#" + data[i].isdn_id,
                // mã: "#" + data[i].isdn_id.slice(0,8),
                //exel
                trạng_thái_cuộc_gọii:
                  data[i].status == 6 ? "Thành công" : "Thất bại",

                //
                trạng_thái: data[i].category,
                quan_tâm: data[i].rating,
                note: data[i].note,
                isdn_id: data[i].isdn_id,
                hobby_id: data[i].hobby_id,
                id: data[i].id,
                status: data[i].status,
                user_id: data[i].user_id,
                _rowVariant: data[i].expired==1 ?'expired':''
              };
              dataNew.push(objNew);
              // this.exelData = dataNew;
            }
          }
          this.items = dataNew;
        }
      });
    },
    handleFilter(excel = false) {
      this.titleExel = "Xuất";
      this.actionFilter = true;
      let mangChudeId = null;
      this.curentPage = 1;
      let obj = {
        page: 0
      };
      if (excel) {
        obj.limit = -1;
      } else {
        obj.limit = this.perPage;
      }
      if (this.valueUser) {
        obj.user_id = {
          value: this.valueUser
          // value: this.user.user_id
        };
      } else {
        if (this.user.role_code != "ADM") {
          obj.user_id = {
            value: this.user.user_id
          };
        }
      }

      // if (this.valueChude) {
      //   obj.hobby_id = {
      //     values: this.valueChude
      //   };
      // }

      if (this.valueChude) {
        let data = null;
        if (this.valueChude == -1) {
          data = this.valueChudeAll;
        } else {
          data = this.valueChude;
        }
        if(data==null){
          data = [];
        }
        let chudeID = data.map(item => {
          return parseInt(item);
        });
        mangChudeId = chudeID;
      }
      obj.hobby_id = {
        values: mangChudeId
      };

      if (this.valueCall) {
        const vcallStatus = parseInt(this.valueCall);
        if(vcallStatus==6){
          obj.status = {
            values: [0,1,2,6]
          };
        }else{
          obj.status = {
            value: vcallStatus
          };
        }

      }else{

      }

      if (this.time3 != null && typeof this.time3 === "object") {
        if (this.time3[0] != "" || this.time3[1] != "") {
          obj.time_from = {
            from: this.time3[0],
            to: this.time3[1]
          };
        }
      }

      if (this.duration) {
        obj.duration = {
          from: parseInt(this.duration - 1) * 60 + 1
        };
      }

      // console.log( obj );
      this.$http.post(URL_API + "call/history", obj).then(res => {
        if (res.status == 200 && res.body != "") {
          let data = res.body.second.second;
          let dataNew = [];
          // console.log(data);
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
                // chủ_đề: stringImport.textConverter(data[i].hobby_name),
                số_điện_thoại: data[i].masked_isdn,
                bắt_đầu_cuộc_gọi: data[i].time_from,
                trạng_thái_cuộc_gọi: data[i].status,
                thời_lượng_cuộc_gọi: stringImport.numberConverter(
                  data[i].duration
                ),
                người_liên_hệ: data[i].user_name,
                vai_trò: data[i].role_name,
                mã: "#" + data[i].isdn_id,
                //exel
                trạng_thái_cuộc_gọii: stringImport.stateConverterNotAdm(
                  data[i].status
                ),
                ghi_chú: data[i].note,
                //
                trạng_thái: data[i].category,
                quan_tâm: data[i].rating,
                note: data[i].note,
                isdn_id: data[i].isdn_id,
                hobby_id: data[i].hobby_id,
                id: data[i].id,
                status: data[i].status,
                user_id: data[i].user_id,
                _rowVariant: data[i].expired==1 ?'expired':''
              };
              dataNew.push(objNew);
            }
          } else {
            this.paginations = [];
            this.totalRow = 0;
          }

          if (!excel) {
            this.items = dataNew;
          } else {
            this.exelData = dataNew;
          }
        }
      });
    },
    exportExcel() {
      // setTimeout(()=>{
      //   this.titleExel = 'Tải về';
      // },500)
      if (this.user.role_code != "MOD") {
        this.getDataHistory(true);
      } else {
        this.handleFilter(true);
      }
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
                      label: data[i].topic_name
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
      // console.log(data);
      this.dataPopupDetail = {
        quan_tâm: data.quan_tâm,
        trạng_thái: data.trạng_thái,
        note: data.note,
        isdn_id: data.isdn_id,
        user_id: data.user_id,
        hobby_id: data.hobby_id,
        status: data.status,
        id: data.id,
        masked_isdn:data.số_điện_thoại
      };
      // console.log( this.dataPopupDetail );
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
        console.log(res);
      });
      this.getDataHistory();
      // this.$router.go();
    },
    handleShowDetail(e) {
      let role = this.user.role_code;
      if(role=='ADM'){
        return;
      }

      this.handleDetail(e);
      this.$bvModal.show("bv-modal-detail");
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
      this.$store.state.stores.titlePage = "Lịch sử cuộc gọi";
    }
  },
  computed: {
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
        // return this.$store.getters["users/getInfo"];
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

      if (role == "CON" || role == "MOD" || role == "ADM") {
        mod.push({
          id: "CON",
          label: "Contract Owner"
        });
      }
      // if(mod && (this.valueMod===undefined || this.valueMod===null)){
      //   this.valueMod = mod[mod.length-1].id;
      //   this.getUserRol(this.valueMod);
      // }
      return mod;
    },
    dataCall(){
        let u = this.user;
        if(u.role_code=="ADM"){
          return  [
              { id: "0", label: "Chưa thực hiện" },
              { id: "1", label: "Đang đổ chuông" },
              { id: "2", label: "Đang hội thoại" },
              { id: "3", label: "Đã nghe máy" },
              { id: "4", label: "Không nghe máy" },
              { id: "5", label: "Máy bận" },
              { id: "6", label: "Không thực hiện được" },
              { id: "7", label: "Hủy thực hiện" }
            ];
        }else{
          return  [
              // { id: "0", label: "Chưa thực hiện" },
              // { id: "1", label: "Đang đổ chuông" },
              // { id: "2", label: "Đang hội thoại" },
              { id: "3", label: "Đã nghe máy" },
              { id: "4", label: "Không nghe máy" },
              { id: "5", label: "Máy bận" },
              { id: "6", label: "Không thực hiện được" },
              { id: "7", label: "Hủy thực hiện" }
            ];
        }

    }
  },
  watch: {
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
