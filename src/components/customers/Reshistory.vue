<template>
  <div>
    <mains>
      <breakcrumb-app>Lịch sử chuyển tài nguyên</breakcrumb-app>
      <div id="content-box">
        <b-container>
          <div class="top-head-box margin-frm">
            <form>
              <b-row>
                <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Vai trò người chuyển" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        :multiple="false"
                        v-model="valueMod"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        :options="dataMod"
                        @input="changeUserSend($event)"
                      />
                    </b-input-group>
                  </b-col>
                </b-col>
                <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Người chuyển" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        :multiple="false"
                        v-model="valueUserSend"
                        :options="dataUserSend"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        @input="changUserRevice($event)"
                      />
                    </b-input-group>
                  </b-col>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Ngày giao dịch tài nguyên" class="mb-2 mr-sm-2 mb-sm-0">
                      <div class="custom-prepend">
                        <date-picker
                          v-model="time3"
                          :lang="lang"
                          range
                          value-type="format"
                          format="YYYY-MM-DD"
                          range-separator =" đến "
                          :shortcuts="shortcuts"
                           @input="handleFilter()"
                        ></date-picker>
                        <!-- @input="handleFilter()" -->
                      </div>
                    </b-input-group>
                  </b-col>
                </b-col>

                <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Người nhận" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        :multiple="false"
                        v-model="valueUser"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        :options="dataUser"
                        @input="handleFilter()"
                      />
                    </b-input-group>
                    
                  </b-col>
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
                  worksheet="Lịch sử chuyển tài nguyên"
                  name="lich_su_chuyen_tai_nguyen.xls"
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
            <div class="head-list">
              <div class="left-head-list">
                <span>Hiển thị</span>
                <select v-model="lengthRow" value="10">
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
                  <strong>1 - {{ lengthRow }}</strong> trên tổng số
                  <strong>{{totalRow}}</strong> bản ghi
                </p>
              </div>
            </div>

            <div class="body-table">
              <b-table
                id="my-table-customer"
                hover
                responsive
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
                :fields="fields"
                @row-hovered="hoverRow($event)"
              >
                <template v-slot:cell(vai_trò)="vaitro">
                  <span>{{ textRuleConverter(vaitro.value)}}</span>
                </template>

                <template v-slot:cell(thaotac)="thaotac">
                  <div @click="$bvModal.show('bv-modal-rehistory')">
                    <span class="chitiet" title="Chi tiết" @click="handleDetail(thaotac.item)">
                      Chi tiết
                      <font-awesome-icon icon="info-circle" />
                    </span>
                  </div>
                </template>


              </b-table>
              <b-pagination
                id="pagination"
                v-if="totalRow > 0 && rows > 0"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table-customer"
              >
                <template v-slot:first-text><span class="withHover">« Trang đầu</span></template>
                <template v-slot:prev-text><span class="withHover">‹ Trước</span></template>
                <template v-slot:next-text><span class="withHover">Sau ›</span></template>
                <template v-slot:last-text><span class="withHover">Trang cuối »</span></template>
                <template v-slot:ellipsis-text>
                   <span class="number-text">...</span>
                </template>
                <template v-slot:page="{ page, active }" class="withHover">
                  <a v-if="active"><span class="number-text withHover">{{ page }}</span></a>
                  <a v-else><span class="number-text noHover">{{ page }}</span></a>
                </template>

              </b-pagination>
            </div>
          </div>
        </b-container>

        <!--  -->
        <b-modal id="bv-modal-rehistory" hide-footer class="">
          <template v-slot:modal-title>
            <h3>Chi tiết giao dịch</h3>
          </template>
          <div class="d-block text-center">
            <p class="notechitiet">{{ dataPopupDetail }}</p>
          </div>
         
          <div class="btn-submit">
            <b-button
              class="handleno closes"
              title="Đóng"
              @click="$bvModal.hide('bv-modal-rehistory')"
            >Đóng</b-button>
          </div>
        </b-modal>
        <!--  -->
      </div>
    </mains>
  </div>
</template>

<script>
import Mains from "../Main.vue";
import Breakcrumb from "../layouts/Breakcrumb.vue";
import Treeselect from "@riophae/vue-treeselect";
import DatePicker from "vue2-datepicker";

let stringImport = require("../../_helpers/string");
let dateImport = require("../../_helpers/date");

export default {
  created(){
    this.checkRuleUser();
  },
  mounted() {
    // this.$root.checkUserLogin();
    this.loadVaitroCustom();
    this.getUserSend();
    this.setTitlePage();
  },
  data() {
    return {
      dataPopupDetail:'',
      valueRoleSearch: null,
      //define exel export
      titleExcel:'Xuất',
      exelData: [],
      fieldsData: {
        Stt: "stt",
        "Người chuyển": "người_chuyển",
        "Người nhận": "người_nhận",
        "Lượng tài nguyên": "lượng_tài_nguyên",
        "Ngày giao dịch": "ngày_giao_dịch",
        "Ngày hết hạn": "ngày_hết_hạn",
        "Vai trò": "vai_trò",
        "Ghi chú": "ghi_chú",
      },
      //end define exel export
      // user: {},
      valueMod: null,
      valueUser: null,
      valueUserSend: null,
      // dataMod: [
      //   { id: "ADM", label: "Admin" },
      //   { id: "MOD", label: "Moderator" },
      //   { id: "CON", label: "Contract owner" },
      //   { id: "SAL", label: "Sale" }
      // ],
      dataUser: [],
      dataUserSend: [],
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
        { key: "stt", label:'#', sortable: true, thClass: "classStt" },
        { key: "người_chuyển", label:'Người chuyển', sortable: false },
        { key: "người_nhận", label:'Người nhận', sortable: false },
        { key: "lượng_tài_nguyên", label:'Lượng tài nguyên/phút', sortable: false },
        { key: "ngày_giao_dịch",label:'Ngày giao dịch', sortable: true },
        { key: "ngày_hết_hạn", label:'Ngày hết hạn', sortable: false },
        { key: "vai_trò", label:'Vai trò', sortable: false, thClass: "classVaitro" },
        { key: "thaotac", label:'Thao tác', sortable: false, thClass: "classVaitro" }
      ],
      items: [],
      totalRow: 0,
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
    changeUserSend(e) {
      if (typeof e != "undefined") {
        this.valueRoleSearch = e;
        this.$http
          .get("v1/api/transfer-resources/getUsen?rol_ui_send=" + e)
          .then(res => {
            if (res.status == 200) {
              let data = res.body.body;
              let dataNew = [];
              if (data.length) {
                for (let key in data) {
                  dataNew.push({
                    id: data[key].user_id,
                    label: data[key].username
                  });
                }
              }
              this.dataUserSend = dataNew;
              this.handleFilter();
            }
          });
      }
    },
    changUserRevice(e) {
      if (typeof e != "undefined") {
        let userID = parseInt(e);

        this.$http
          .get(
            "v1/api/transfer-resources/getUrec?ui_s=" +
              userID +
              "&rol_ui_send=" +
              this.valueRoleSearch
          )
          .then(res => {
            if (res.status == 200) {
              let data = res.body.body;
              // console.log( data );
              let dataNew = [];
              if (data.length) {
                for (let key in data) {
                  dataNew.push({
                    id: data[key].user_id,
                    label: data[key].username
                  });
                }
              }
              this.dataUser = dataNew;
              this.handleFilter();
            }
          });
      }
      // console.log( e );
    },
    async loadVaitroCustom() {
      // let dataUser = this.$service.dataUserLogin();
      // let result = null;
      // let obj = {};
      // await dataUser.then(res => {
      //   result = res.body;
      // });

      // if (result.role_code == "SAL") {
      //   this.dataMod = [
      //     { id: "ADM", label: "Admin" },
      //     { id: "CON", label: "Contract owner" },
      //     { id: "SAL", label: "Sale" }
      //   ];
      // }

      // if (result.role_code == "MOD") {
      //   this.dataMod = [
      //     { id: "ADM", label: "Admin" },
      //     { id: "MOD", label: "Moderator" },
      //     { id: "CON", label: "Contract owner" }
      //   ];
      // }
      return this.dataMod;
    },
    async getUserSend() {
      // let dataUser = this.$service.dataUserLogin();
      // let user_id = null;
      let obj = {};
      // await dataUser.then(res => {
      //   user_id = res.body.user_id;
      // });

      let user_id = this.user.user_id;
      
      obj.u_sender = null;
      obj.u_reciver = null;
      // obj.role_code = this.user.role_code == "ADM" ? null : this.valueMod;

      if(this.valueMod){
        obj.role_code = this.valueMod
      }else{
        if(this.user.role_code == "ADM"){
          // obj.role_code = null
          obj.role_code = null;
          this.valueMod = null;
        }else{
          // obj.role_code = this.user.role_code
          if(this.user.role_code == "SAL"){
            obj.role_code = "CON";
            this.valueMod = 'CON';
          }else if(this.user.role_code == "CON"){
            obj.role_code = "MOD";
            this.valueMod = "MOD";
          }else if(this.user.role_code == "MOD"){
            obj.role_code = "ADM";
            this.valueMod = "ADM";
          }
        }
        
      }

      obj.day_trading_from = null;
      obj.day_trading_to = null;
      
      if (typeof this.time3 == "object") {
      } else {
        // this.time3 = [stringImport.getLastWeek(), stringImport.getToday()];
      }
      

      this.$http.post("v1/api/transfer-resources/search", obj).then(res => {
        // console.log( res );
        if (res.status == 200) {
          let data = res.body.body;
          let dataNew = [];
          if (data.length) {
            this.totalRow = data.length;
            for (let key in data) {
              // let dateStart = dateImport.timeConverter(data[key].created_date);
              // let dateEnd = dateImport.timeConverter( data[key].expired_resource_date_new );
              let obj = {
                isActive: true,
                stt: parseInt(key) + 1,
                vai_trò: data[key].role_sender,
                người_chuyển: data[key].username_sender,
                người_nhận: data[key].username_receiver,
                lượng_tài_nguyên: data[key].voice_resources_transfer,
                ngày_giao_dịch: data[key].created_date,
                ngày_hết_hạn: data[key].expired_resource_date_new,
                note: data[key].note,
              };
              dataNew.push(obj);
            }
          }
          this.items = dataNew;
          // this.exelData = dataNew;
        }
      },err=>{

      });
    },
    exportExcel(){
      // setTimeout(()=>{
      //   this.titleExcel = 'Tải về';
      // },500)
      if(this.user.role_code != 'MOD'){
        this.getDataExport(true)
      }else{
        this.getDataExport(true)
      }
    },
    async fetchDataHistory() {
      const resd = await this.getDataExport(true);
      return resd;
    },
    startDownload() {
    },
    finishDownload() {
    },
    async getDataExport(excel){
      const res = await this.$http.get("v1/api/transfer-resources");

        if (res.status == 200) {
          let data = res.body.body;
          let dataNew = [];
          if (data.length) {
            for (let key in data) {
              let obj = {
                isActive: true,
                stt: parseInt(key) + 1,
                vai_trò: data[key].role_sender,
                người_chuyển: data[key].username_sender,
                người_nhận: data[key].username_receiver,
                lượng_tài_nguyên: data[key].voice_resources_transfer ,
                ngày_giao_dịch: data[key].created_date,
                ngày_hết_hạn: data[key].expired_resource_date_new,
                ghi_chú:data[key].note
              };
              dataNew.push(obj);
            }
          }
          if(excel){
          }
          return dataNew;
        }else{
          return [];
        }
    },
    handleFilter(e) {
      this.titleExcel = 'Xuất';
      console.log(this.user)
      let obj = {};
      obj.u_sender = this.valueUserSend ? this.valueUserSend :null;
      obj.u_reciver = this.valueUser?this.valueUser:null;
      // obj.role_code = this.valueMod && this.valueMod == 'ADM' ? null : this.user.role_code;
      // obj.role_code = this.user.role_code == "ADM" ? null : this.user.role_code;
      if(this.valueMod){
        obj.role_code = this.valueMod
      }else{
        if(this.user.role_code == "ADM"){
          obj.role_code = null  
        }else{
          obj.role_code = this.user.role_code
        }
        
      }

      if(this.time3 && this.time3[0] != ""){
        obj.day_trading_from = this.time3[0];
        obj.day_trading_to = this.time3[1];
      }else{
        obj.day_trading_from = null;
        obj.day_trading_to = null;
      }

      // console.log(obj);
      this.$http.post("v1/api/transfer-resources/search", obj).then(res => {
        if (res.status == 200) {
          let data = res.body.body;
          let dataNew = [];
          if (data.length) {
            this.totalRow = data.length;
            for (let key in data) {
              // let dateStart = dateImport.timeConverter(data[key].created_date);
              // let dateEnd = dateImport.timeConverter(
              //   data[key].expired_resource_date_new
              // );
              let obj = {
                isActive: true,
                stt: parseInt(key) + 1,
                vai_trò: data[key].role_sender,
                người_chuyển: data[key].username_sender,
                người_nhận: data[key].username_receiver,
                lượng_tài_nguyên: data[key].voice_resources_transfer ,
                ngày_giao_dịch: data[key].created_date,
                ngày_hết_hạn: data[key].expired_resource_date_new
              };
              dataNew.push(obj);
            }
          }
          this.items = dataNew;
          // this.exelData = dataNew;
          // console.log( data );
        }
      });
      if(e){
        e.preventDefault();
      }
    },
    hoverRow(e) {
      // console.log( e );
    },
    textRuleConverter(role) {
      return stringImport.textRuleConverter(role);
    },
    setTitlePage() {
      this.$store.state.stores.titlePage = "Lịch sử chuyển tài nguyên";
    },
    checkRuleUser() {
      if (this.user.role_code == "SAL") {
        //this.$router.push("/");
      }
    },
    handleDetail(data) {
      this.dataPopupDetail = data.note ? data.note : 'Chưa có nội dung giao dịch.';
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
      
      if (this.user.role_code == "SAL") {
        return [
          { id: "ADM", label: "Admin" },
          { id: "CON", label: "Contract owner" },
          { id: "SAL", label: "Sale" }
        ];
      }else   if (this.user.role_code == "MOD") {
        return [
          { id: "ADM", label: "Admin" },
          { id: "MOD", label: "Moderator" },
          { id: "CON", label: "Contract owner" }
        ];
      }else{
        return [
          { id: "ADM", label: "Admin" },
          { id: "MOD", label: "Moderator" },
          { id: "CON", label: "Contract owner" },
          { id: "SAL", label: "Sale" }
        ];
      }
    }
  },
  watch: {
    lengthRow(value) {
      this.perPage = this.lengthRow;
    },
    valueMod(value) {
      if (typeof value == "undefined") {
        this.dataUserSend = [];
        this.dataUser = [];
        this.valueUserSend = null;
        this.valueUser = null;
      } else {
        this.valueUser = null;
        this.valueUserSend = null;
        this.dataUser = [];
      }
    },
    valueUserSend(value) {
      if (typeof value == "undefined") {
        this.dataUser = [];
        this.valueUser = null;
      }
    }
  }
};
</script>


<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>