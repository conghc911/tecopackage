<template>
  <div>
    <mains>
      <breakcrumb-app>Báo cáo khách hàng</breakcrumb-app>
      <div id="content-box">
        <b-container>
          <div class="top-head-box margin-frm box-report">
            <form>
              <b-row>
                <b-col cols="12" md="6" lg="6" offset-md="3" v-if="user.role_code != 'SAL'" >
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs" >
                    <b-input-group prepend="Vai trò" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        :multiple="false"
                        :options="dataMod"
                        :selected="true"
                        v-model="valueMode"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        @input="handleChangeVaitro($event)"
                      />
                    </b-input-group>
                  </b-col>
                </b-col>

                <b-col cols="12" md="6" lg="6" offset-md="3" v-if="user.role_code != 'SAL'">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Tài khoản" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        :multiple="false"
                        :selected="true"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        :options="dataUser"
                        v-model="valueUser"
                         @input="handleFilter()"
                      />
                    </b-input-group>
                  </b-col>
                </b-col>
                <b-col cols="12" md="6" lg="6" offset-md="3" >
                  <b-row>
                    <b-col cols="12" md="12" lg="12">
                      <b-col cols="12" md="12" lg="12" class="frm-group-cs prepend-report">
                        <b-input-group prepend="Thời gian" class="mb-2 mr-sm-2 mb-sm-0">
                          <div class="custom-prepend">
                            <date-picker
                              v-model="toDate"
                              :lang="lang"
                              range
                              value-type="format"
                              format="YYYY-MM-DD"
                              range-separator =" đến "
                              :shortcuts="shortcuts"
                               @input="handleFilter()"
                            ></date-picker>
                          </div>
                        </b-input-group>
                      </b-col>
                    </b-col>
                  </b-row>
                </b-col>
                <!--  <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs custom-multi">
                    <b-input-group prepend="Chủ đề quan tâm" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        :multiple="true"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        :options="dataChude"
                      />
                    </b-input-group>

                    <b-input-group prepend="Chủ đề quan tâm" class="mb-2 mr-sm-2 mb-sm-0" v-if="user.role_code == 'ADM'">
                      <treeselect
                        v-model="valueChude"
                        :multiple="true"
                        :always-open="false"
                        :async="true"
                        :load-options="searchHobby"
                        placeholder="Chọn chủ đề"
                        placeholdersearch="Tìm kiếm..."
                        loadingText="Đang tải dữ liệu"
                        noResultsText="Không có dữ liệu"
                        retryText="Thử lại"
                        retryTitle="Thử lại"
                        searchPromptText="Nhập từ khóa tìm kiếm"
                      />
                    </b-input-group> 
                  </b-col>
                </b-col> -->
              </b-row>

              <div class="mx-auto btn-filter" style="width:400px">
                <button type="button" @click="handleFilter">
                  <font-awesome-icon icon="search" /> Lọc
                </button>
                <!-- download file exel -->
                <export-excel
                  class="btn-exel"
                  :fields="fieldsData"
                  worksheet="Báo cáo khách hàng"
                  name="Bao_cao_khach_hang.xls"
                   :fetch="fetchDataHistory"
                  :before-generate="startDownload"
                  :before-finish="finishDownload"
                >
                  <span class="addnew">
                    <font-awesome-icon icon="download" /> Tải về
                  </span>
                </export-excel>
              </div>
            </form>
          </div>
          
          <!-- danh sach khach hang -->
          <div class="control-list-box">
            <div class="head-list"></div>

            <div class="body-table">
              <b-table id="my-table-report" hover responsive :items="items" :fields="fields">
                
                  <!-- <template v-slot:cell(số_liệu)="data">
                     {{ paddingTextStart(data.item.số_liệu,10,"-") }}
                  </template>

                  <template v-slot:cell(tỷ_lệ)="data">
                    {{  paddingTextStart(data.item.tỷ_lệ,10,"-") }}
                  </template> -->
              </b-table>
            </div>
          </div>
        </b-container>
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
let stringImport = require("../../_helpers/string");
let { URL } = require("../../config");
let URL_API = URL.API_LEAD;

export default {
  created(){
    // this.$root.checkUserLogin();
  },
  mounted() {
    this.getChude();
    this.getVaitro();
    this.setTitlePage();
    this.getData();
    if(this.dataMod.length > 0){
      this.valueMode= this.dataMod[ this.dataMod.length-1].id;
      this.handleChangeVaitro(this.valueMode);
    }
    
  },
  data() {
    return {
      titleExcel:'Xuất',
      exelData: [],
      fieldsData: {
        Stt: "stt",
        "Thống kê": "thống_kê",
        "Số liệu": "số_liệu",
        "Tỷ lệ": "tỷ_lệ",
        "Mô tả tỉ lệ": "mô_tả_tỷ_lệ",
        "Tài khoản": "taikhoan",
        "Vai trò": "vaitro",
        "Ngày xuất": "ngay",
      },
      // user: {},
      fromDate: "",
      toDate: "",
      valueChude: [-1],
      valueUser:null,
      valueChudeAll: null,
      // dataMod: [],
      valueMode:null,
      dataUser: [],
      dataChude: [],
      dataReport: [],
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
        },
        format: 'yyyy-MM-dd'
      },
      shortcuts: [
        {
          text: "Hôm nay",
          onClick: () => {
            this.toDate = [new Date(), new Date()];
          }
        }
      ],

      fields: [
        { key: "stt", label:'#', sortable: true, thClass: "classStt" },
        { key: "thống_kê", label:'Thống kê', sortable: false },
        { key: "số_liệu", label:'Số liệu', sortable: false },
        { key: "tỷ_lệ", label:'Tỷ lệ', sortable: false },
        { key: "mô_tả_tỷ_lệ", label:'Mô tả tỷ lệ', sortable: false }
      ],
      items: [
        {
          isActive: true,
          stt: 1,
          thống_kê: "Tổng số cuộc gọi",
          số_liệu: "0",
          tỷ_lệ: "100%",
          mô_tả_tỷ_lệ: "100%"
        },
        {
          isActive: true,
          stt: 2,
          thống_kê: "Tổng số cuộc gọi nghe máy",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(2)/(1)"
        },
        {
          isActive: true,
          stt: 3,
          thống_kê: "Tổng số cuộc gọi bận",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(3)/(1)"
        },
        {
          isActive: true,
          stt: 4,
          thống_kê: "Tổng số cuộc gọi khách hàng không nghe máy",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(4)/(1)"
        },
        {
          isActive: true,
          stt: 5,
          thống_kê: "Tổng số cuộc gọi không thực hiện được",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(5)/(1)"
        },
        {
          isActive: true,
          stt: 6,
          thống_kê: "Tổng số cuộc gọi hủy thực hiện",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(6)/(1)"
        },
        {
          isActive: true,
          stt: 7,
          thống_kê: "Tổng số cuộc nói chuyện lớn hơn 1 phút",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(7)/(2)"
        },
        {
          isActive: true,
          stt: 8,
          thống_kê: "Tổng số cuộc nói chuyện lớn hơn 2 phút",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(8)/(2)"
        },
        {
          isActive: true,
          stt: 9,
          thống_kê: "Tổng số cuộc nói chuyện lớn hơn 3 phút",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(9)/(2)"
        },
        {
          isActive: true,
          stt: 10,
          thống_kê: "Tổng số tài nguyên tiêu thụ",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "phút"
        }
      ],
      itemsDefault: [
        {
          isActive: true,
          stt: 1,
          thống_kê: "Tổng số cuộc gọi",
          số_liệu: "0",
          tỷ_lệ: "100%",
          mô_tả_tỷ_lệ: "100%"
        },
        {
          isActive: true,
          stt: 2,
          thống_kê: "Tổng số cuộc gọi nghe máy",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(2)/(1)",
          _rowVariant: 'statuscall'
        },
        {
          isActive: true,
          stt: 3,
          thống_kê: "Tổng số cuộc gọi bận",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(3)/(1)",
          _rowVariant: 'statuscall'
        },
        {
          isActive: true,
          stt: 4,
          thống_kê: "Tổng số cuộc gọi khách hàng không nghe máy",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(4)/(1)",
          _rowVariant: 'statuscall'
        },
        {
          isActive: true,
          stt: 5,
          thống_kê: "Tổng số cuộc gọi không thực hiện được",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(5)/(1)",
          _rowVariant: 'statuscall'
        },
        {
          isActive: true,
          stt: 6,
          thống_kê: "Tổng số cuộc gọi hủy thực hiện",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(6)/(1)",
          _rowVariant: 'statuscall'
        },
        {
          isActive: true,
          stt: 7,
          thống_kê: "Tổng số cuộc nói chuyện lớn hơn 1 phút",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(7)/(2)"
        },
        {
          isActive: true,
          stt: 8,
          thống_kê: "Tổng số cuộc nói chuyện lớn hơn 2 phút",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(8)/(2)"
        },
        {
          isActive: true,
          stt: 9,
          thống_kê: "Tổng số cuộc nói chuyện lớn hơn 3 phút",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "(9)/(2)"
        },
        {
          isActive: true,
          stt: 10,
          thống_kê: "Tổng số tài nguyên tiêu thụ",
          số_liệu: "0",
          tỷ_lệ: "",
          mô_tả_tỷ_lệ: "phút",
          _rowVariant: 'statuscall'
        }
      ],
      variant: "light",
      lengthRow: 10
    };
  },
  components: {
    Treeselect,
    DatePicker,
    Mains,
    "breakcrumb-app": Breakcrumb
  },
  methods: {
    paddingTextStart(t,n,c){
      var r = n-t.length;
      for(var i=0;i<r;i++){
        t = c+t;
      }
      return t;
    },
    formatPadding(d){
      return d;
      // console.log("formatPadding");
      // for (var i = d.length - 1; i >= 0; i--) {
      //   var pos = 0;
      //   for (const p in d[i]){
      //     pos++;
      //     if(pos === 4 ){
      //       d[i][p]=this.paddingTextStart(d[i][p]+'',10," ");
      //     }else if(pos === 5 ){
      //       d[i][p]=this.paddingTextStart(d[i][p]+'',10," ");
      //     }else if(pos === 6 ){
      //       d[i][p]=this.paddingTextStart(d[i][p]+'',10," ");
      //     }
      //   }
      // }
      //  return d; 
    },
    formatDate (d) {
      // you could also provide your own month names array
      const months = this.$refs.datePicker.translation.months
      return `${d.getDate().toString().padStart(2, 0)} ${months[d.getMonth()]} ${d.getFullYear()}`
    },
    getVaitro() {
      // let dataMods = [];
      // this.$http.get("v1/api/account-managers/role").then(res => {
      //   if (res.status == 200) {
      //     let data = res.body.body;
      //     if (data.length > 0) {
      //       for (let key in data) {
      //         dataMods.push({
      //           id: data[key].role_code,
      //           label: data[key].role_name
      //         });
      //       }
      //     }
      //   }
      //   this.dataMod = dataMods;
      // });
    },
    setTitlePage() {
      this.$store.state.stores.titlePage = "Báo cáo khách hàng";
    },
    handleChangeVaitro(e) {
      if (typeof e != null) {
        if (e == "MOD" || e == "CON" || e == "SAL") {
          this.valueUser = null;
          let dataNew = [];
          this.dataUser = [];
          this.$http
            .get("v1/api/account-managers/suggest-name/?roleCodeSelected=" + e)
            .then(res => {
              let data = res.body.body;
              for (let i in data) {
                  // dataNew.push({ id: data[key].trim(), label: data[key] });
                  dataNew.push({
                    id: parseInt(data[i].user_id),
                    label: data[i].username
                  });
                }

                if(this.user.role_code== e && dataNew.length==0){
                    dataNew.push({
                      id: parseInt(this.user.user_id),
                      label: this.user.username
                    });
                }
                if(dataNew.length>0){
                  this.valueUser = dataNew[0].id;
                }
                this.dataUser = dataNew;
                this.handleFilter();
            });

        }
      }else{
        this.valueUser = null;
      }
      if (typeof e == "undefined") {
        // this.dataUser = this.getListUserLogin();
        this.dataUser = [];
        this.valueUser = null;
      }
    },
    getListUserLogin() {
      this.$http.get("v1/api/account-managers/suggest-name").then(res => {
        if (res.status == 200) {
          let dataNew = [];
          let data = res.body.body;
          if (data.length > 0) {
            for (let i in data) {
              // console.log(data[i]);
              dataNew.push({
                id: parseInt(data[i].user_id),
                label: data[i].username
              });
            }
          }
          // console.log( dataNew );
          this.dataUser = dataNew;
        }
      });
    },
    async getChude() {
      await this.$http.get("v1/api/account-managers/topic").then(res => {
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
                label: (data[i].topic_code)
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
                        label: ( data[i].topic_code )
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
    exportExcel(){
      // setTimeout(()=>{
      //   this.titleExcel = 'Tải về';
      // },500);

      let obj = {};
      if(this.valueUser){
        obj.user_id = {
          value: this.valueUser
        }
      }
      if(this.toDate != ""){
        obj.time_from = {
          from: this.toDate[0],
          to: this.toDate[1],
        }
      }


      return this.getData(obj,true)
    },
    async fetchDataHistory() {
      const resd = await this.exportExcel();
      return resd;
    },
    startDownload() {
    },
    finishDownload() {
    },
    handleFilter(e){

      // this.titleExcel = 'Xuất';
      let obj = {};
      if(this.valueUser){
        obj.user_id = {
          value: this.valueUser
        }
      }
      if(this.toDate != ""){
        obj.time_from = {
          from: this.toDate[0],
          to: this.toDate[1],
        }
      }
      this.getData(obj,false);
      if(e){
        e.preventDefault();
      }
    },
    async getData(dataObj = null,excel = false) {

      let taikhoan = this.user.username;
      let vaitro = stringImport.textRuleConverter( this.user.role_code );
      let ngay = stringImport.timeConverter( Date.now() );
      

      if (typeof this.toDate == "object") {
      } else {
        this.toDate = [stringImport.getLastWeek(), stringImport.getToday()];
      }

      let obj = {};
      let data = [];
      let data1 = [];
      let statusCount = [];
      let userID = 0;
      // let res = await this.$service.dataUserLogin();
      let URL = "";
        
          // if (res.body != "") {
          // this.user = res.body;
          userID = this.user.user_id;
          obj.user_id = {
            value: this.user.user_id
          };
          if( dataObj != null ){
            if(!dataObj.user_id){
                dataObj.user_id = {
                value: this.user.user_id
              }
            }
            // console.log(dataObj);
           let res  =  await this.$http.post(URL_API + "call/stats", dataObj)
          // }else{
          //   res  =  await this.$http.post(URL_API + "call/stats", obj)
          // }
            
            for (let key in res.body.second) {
              data1.push(res.body.second[key]);
            }
            
            if (data1.length > 0) {
              for (let i in data1[0].status_counter) {
                // console.log( typeof i );
                if ((i = '0')) {
                  statusCount.noCall = data1[0].status_counter[i]
                    ? data1[0].status_counter[i]
                    : 0;
                }
                if ((i = '6')) {
                  statusCount.errCall = data1[0].status_counter[i]
                    ? data1[0].status_counter[i]
                    : 0;
                }

                if ((i = '7')) {
                  statusCount.cancelCall = data1[0].status_counter[i]
                    ? data1[0].status_counter[i]
                    : 0;
                }

                if ((i = 5)) {
                  statusCount.busy = data1[0].status_counter[i]
                    ? data1[0].status_counter[i]
                    : 0;
                }
                if ((i = 3)) {
                  statusCount.answer = data1[0].status_counter[i]
                    ? data1[0].status_counter[i]
                    : 0;
                }
                if ((i = 4)) {
                  statusCount.endcall = data1[0].status_counter[i]
                    ? data1[0].status_counter[i]
                    : 0;
                }


              }
              // console.log(statusCount);
              // console.log( data1[0].called );
              let nghemay = data1[0].called != 0 ? (( statusCount.answer/data1[0].called )*100).toFixed(2) : '0';
              let mayban = data1[0].called != 0 ? ((statusCount.busy/data1[0].called)*100).toFixed(2) : '0';
              let khongnghe =  data1[0].called != 0 ? ((statusCount.endcall/data1[0].called)*100).toFixed(2) : '0';

              
              if(nghemay > 0){
                nghemay = (nghemay+'').slice(0,6);
              }
              if(mayban > 0){
                mayban = (mayban+'').slice(0,6);
              }
              if(khongnghe > 0){
                khongnghe = (khongnghe+'').slice(0,6);
              }
              let khongthuchien = data1[0].called != 0 ? (( (statusCount.noCall+statusCount.errCall)/data1[0].called)*100).toFixed(2) : '0';
              let huythuchien =data1[0].called != 0 ?(100 - (parseFloat(nghemay)+parseFloat(mayban)+parseFloat(khongnghe) + parseFloat(khongthuchien))).toFixed(2):'0';
              // let khongthuchien = 100 - (nghemay+mayban+khongnghe);

              let lonhon1 = data1[0].one_minute + data1[0].other_minute + data1[0].three_minute + data1[0].two_minute;
              let lonhon2 = data1[0].other_minute + data1[0].three_minute + data1[0].two_minute;
              let lonhon3 = data1[0].other_minute + data1[0].three_minute;

              //
              data.push(
                {
                  isActive: true,
                  stt: 1,
                  thống_kê: "Tổng số cuộc gọi",
                  số_liệu: data1[0].called,
                  tỷ_lệ: "100%",
                  mô_tả_tỷ_lệ: "100%",
                },
                {
                  isActive: true,
                  stt: 2,
                  thống_kê: "Tổng số cuộc gọi nghe máy",
                  số_liệu: statusCount.answer,
                  tỷ_lệ: nghemay +'%',
                  mô_tả_tỷ_lệ: "(2)/(1)",
                  _rowVariant: 'statuscall'
                },
                {
                  isActive: true,
                  stt: 3,
                  thống_kê: "Tổng số cuộc gọi bận",
                  số_liệu: statusCount.busy,
                  tỷ_lệ:  mayban + '%',
                  mô_tả_tỷ_lệ: "(3)/(1)",
                  _rowVariant: 'statuscall'
                },
                {
                  isActive: true,
                  stt: 4,
                  thống_kê: "Tổng số cuộc gọi khách hàng không nghe máy",
                  số_liệu: statusCount.endcall,
                  tỷ_lệ:  khongnghe + '%',
                  mô_tả_tỷ_lệ: "(4)/(1)",
                  _rowVariant: 'statuscall'
                },
                {
                  isActive: true,
                  stt: 5,
                  thống_kê: "Tổng số cuộc gọi không thực hiện được",
                  số_liệu: statusCount.noCall+statusCount.errCall,
                  tỷ_lệ: khongthuchien+'%',
                  mô_tả_tỷ_lệ: "(5)/(1)",
                  _rowVariant: 'statuscall'
                },
                {
                  isActive: true,
                  stt: 6,
                  thống_kê: "Tổng số cuộc gọi hủy thực hiện",
                  số_liệu: statusCount.cancelCall,
                  tỷ_lệ: huythuchien+'%',
                  mô_tả_tỷ_lệ: "(6)/(1)",
                  _rowVariant: 'statuscall'
                },
                {
                  isActive: true,
                  stt: 7,
                  thống_kê: "Tổng số cuộc nói chuyện lớn hơn 1 phút",
                  số_liệu: lonhon1,
                  tỷ_lệ: (statusCount.answer != 0 ? ((lonhon1/statusCount.answer)*100).toFixed(2) : '0').slice(0,6)+ '%',
                  mô_tả_tỷ_lệ: "(7)/(2)",
                },
                {
                  isActive: true,
                  stt: 8,
                  thống_kê: "Tổng số cuộc nói chuyện lớn hơn 2 phút",
                  số_liệu: lonhon2,
                  tỷ_lệ: (statusCount.answer != 0 ? ((lonhon2/statusCount.answer)*100).toFixed(2) : '0').slice(0,6)+ '%',
                  mô_tả_tỷ_lệ: "(8)/(2)",
                },
                {
                  isActive: true,
                  stt: 9,
                  thống_kê: "Tổng số cuộc nói chuyện lớn hơn 3 phút",
                  số_liệu: lonhon3,
                  tỷ_lệ: (statusCount.answer != 0 ? ((lonhon3/statusCount.answer)*100).toFixed(2) : '0').slice(0,6)+ '%',
                  mô_tả_tỷ_lệ: "(9)/(2)",
                },
                {
                  isActive: true,
                  stt: 10,
                  thống_kê: "Tổng số tài nguyên tiêu thụ",
                  số_liệu: data1[0].used_resource,
                  tỷ_lệ: "",
                  mô_tả_tỷ_lệ: "phút",
                  _rowVariant: 'statuscall'
                },
                {
                   taikhoan,vaitro,ngay
                }
              );

              // if(excel){
              //   this.titleExcel = 'Tải về';
              //   this.exelData = data;
              //   console.log( this.exelData ); 
              // }else{
              //   this.items = data;
              //   this.titleExcel = 'Xuất';
              //   this.exelData = [] 
              // }
              // console.log( data1[0].called );
              if(data1[0].called == 0){
                data = this.itemsDefault;
              }
              if(excel){
                return data;
              }else{
                  this.items = data;
              }
            }else{
              // data = this.items
              this.titleExcel = 'Xuất';
              this.items = this.itemsDefault;
              return [];
            }
        }
    },
    
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
      if (role == "MOD" || role == "ADM") {
        mod.push({
          id: "MOD",
          label: "Moderator"
        });
      }
      // if (role == "ADM") {
      //   mod.push({
      //     id: "ADM",
      //     label: "Admin"
      //   });
      // }

      return mod;
    }
  },
  watch: {}
};
</script>


<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>