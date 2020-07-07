<template>
  <div>
    <mains>
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
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        :options="dataMod"
                        v-model="objFilter.role_code"
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
                        :options="getterUserSend"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        v-model="objFilter.u_sender"
                        @input="changeUserReviced($event)"
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
                          :lang="lang"
                          range
                          value-type="format"
                          format="YYYY-MM-DD"
                          range-separator =" đến "
                          :shortcuts="shortcuts"
                          v-model="objFilter.time3"
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
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        :options="getterUserReviced"
                        v-model="objFilter.u_reciver"
                      />
                    </b-input-group>
                    
                  </b-col>
                </b-col>
              </b-row>
              <div class="mx-auto btn-filter" style="width:400px">
                <button type="submit" @click="handleFilter($event)">
                  <font-awesome-icon icon="search" /> Lọc
                </button>
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
                :fields="fields"
              >
                <template v-slot:cell(thaotac)="thaotac">
                  <div>
                    <span class="aleftCao" title="Sửa" @click="$bvModal.show('bv-modal-edit'), getUpdate(thaotac.item.contract_id)">
                      <font-awesome-icon icon="edit" />
                    </span>
                    <span class="aleftThap" title="Xóa" @click="handleDelete(thaotac.item.contract_id)">
                      <font-awesome-icon icon="trash-alt" />
                    </span>
                  </div>
                </template>

              </b-table>
              
            </div>
            <!-- phan trang -->
            <Pagination
                    v-if="getterTotalData"
                    :totalRow="getterTotalData"
                    :perPage="parseInt(perPage)"
                    :actionName="actionNamePagi"
                    :dataQuery="filter"
                    :dataObject="true"
                    @getPageCurrent="pageCurrent = $event" />
          </div>
        </b-container>
      </div>
      <!-- show popup -->
      <b-modal id="bv-modal-edit" modal-class="medium"  title="Sửa tài nguyên" hide-footer :noCloseOnEsc="true" :noCloseOnBackdrop="true" :centered="true" >
        <div class="d-block text-center">
            <!-- <span class="title_success">{{messageAction}}</span> -->
            <div class="content-popups">
              <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                  <b-input-group prepend-html="Người chuyển" class="mb-2 mr-sm-2 mb-sm-0">
                      <input type="text" :value="objUpdate.seller_name" disabled="" class="form-control">
                  </b-input-group>
              </b-col>
              <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                  <b-input-group prepend-html="Người nhận" class="mb-2 mr-sm-2 mb-sm-0">
                      <input type="text" :value="objUpdate.buyer_name" disabled="" class="form-control">
                  </b-input-group>
              </b-col>
              <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                  <b-input-group prepend-html="Lượng tài nguyên chuyển" class="mb-2 mr-sm-2 mb-sm-0">
                      <input type="text" :value="objUpdate.voice_resources"  disabled="" class="form-control">
                  </b-input-group>
              </b-col>
              <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                  <b-input-group prepend-html="Ngày giao dịch" class="mb-2 mr-sm-2 mb-sm-0">
                      <input type="text" :value="objUpdate.contract_date_sign" disabled="" class="form-control">
                  </b-input-group>
              </b-col>
              <b-col id="datetrans" cols="12" md="12" lg="12" class="frm-group-cs">
                  <b-input-group prepend-html="Ngày hết hạn" class="mb-2 mr-sm-2 mb-sm-0">
                      <!-- <input type="text" v-model="objUpdate.expired_contract_date"  class="form-control"> -->
                      <date-picker
                          :lang="lang"
                          v-model="objUpdate.expired_contract_date" 
                          value-type="format"
                          format="YYYY-MM-DD"
                          :shortcuts="shortcuts"></date-picker>
                  </b-input-group>
              </b-col>
              <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                  <b-input-group prepend-html="Trạng thái" class="mb-2 mr-sm-2 mb-sm-0">
                      <input type="text" :value="objUpdate.status" disabled="" class="form-control">
                  </b-input-group>
              </b-col>

            </div>
            <div class="popup-footer">
              <b-col cols="12">
                <b-button
                  class="mt-3"
                  variant="primary"
                  v-on:click="handleUpdate($event)"
                >Cập nhật</b-button>
                <b-button
                  variant="danger"
                  class="mt-3"
                  @click="$bvModal.hide('bv-modal-edit'),handleClose()"
                >Đóng</b-button>
              </b-col>
            </div>
        </div>
      </b-modal>
      <!-- end show popup -->
    </mains>
  </div>
</template>

<script>
// const today = new Date();
// today.setHours(0, 0, 0, 0);

import Mains from "../Main.vue";
import Breakcrumb from "../layouts/Breakcrumb.vue";
import Treeselect from "@riophae/vue-treeselect";
import DatePicker from "vue2-datepicker";
import Pagination from '../layouts/Pagination.vue';

// import { mapGetters, mapActions} from 'vuex';

let stringImport = require("../../_helpers/string");
let dateImport = require("../../_helpers/date");

export default {
  created(){
    this.getResource({limit:this.perPage,page:0,data:this.filter});
  },
  mounted() {
    this.setTitlePage();
  },
  data() {
    return {
      value1: new Date(),
      // 
      roleSend:null,
      actionNamePagi:'resource/getResource',
      objFilter:{},
      objUpdate:{},
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
        { key: "seller_name", label:'Người chuyển', sortable: false },
        { key: "buyer_name", label:'Người nhận', sortable: false },
        { key: "voice_resources", label:'Lượng tài nguyên/phút', sortable: false },
        { key: "contract_date_sign",label:'Ngày giao dịch', sortable: true },
        { key: "expired_contract_date", label:'Ngày hết hạn', sortable: false },
        { key: "status", label:'Trạng thái', sortable: false, thClass: "classVaitro" },
        { key: "thaotac", label:'Thao tác', sortable: false, thClass: "classVaitro" }
      ],
      // items: [
      //   {
      //     stt:1,
      //     seller_name:'conghc',
      //     buyer_name:'admin',
      //     voice_resources:10,
      //     ngaygiaodich:'22/12/2012',
      //     expired_contract_date:'22/12/2020',
      //     status:'admin',
      //   }
      // ],
      // dataMod:[{id:1,label:'Admin'}],
      dataMod: [
        { id: "ADM", label: "Admin" },
        { id: "MOD", label: "Moderator" },
        { id: "CON", label: "Contract owner" },
        { id: "SAL", label: "Sale" }
      ],
      totalRow: 0,
      lengthRow: 10,
      perPage: 10,
      pageCurrent: 1,
      variant: "light"
    };
  },
  components: {
    Treeselect,
    DatePicker,
    Mains,
    Pagination,
    "breakcrumb-app": Breakcrumb
  },
  methods: {
    // ...mapActions({
    //   getResource:'resource/getResource',
    //   // getUserSend:'resource/getUserSend',
    // }),
    getResource(params){
      this.$store.dispatch('resource/getResource',params);
    },
    changeUserSend(value){
      this.roleSend = value;
      let result = this.$store.dispatch('resource/getUserSend',value);
      // console.log(result);
    },
    changeUserReviced(value){
      let obj = {
        userid:parseInt(value),
        roleSend:this.roleSend
      }
      let result = this.$store.dispatch('resource/getUserReviced',obj);
    },
    handleFilter(e){
      e.preventDefault();
      this.getResource({limit:this.perPage,page:0,data:this.filter});
    },
    async getUpdate(id){
      let res = await this.$store.dispatch('resource/getTransId',id);
      this.objUpdate = res;
      // console.log(res);
    },
    async handleUpdate(){
      let obj = this.objUpdate;
      // console.log(obj);
      let res = await this.$store.dispatch("resource/updateResource",obj);
      if(res && res == 1){
        alert("Cập nhật thành công");
      }else{
        alert('Cập nhật thất bại.');
      }
      this.handleClose();
      this.$bvModal.hide('bv-modal-edit');

    },
    async handleDelete(id){
      // console.log(id);
      let check = confirm('Bạn có muốn xóa bản ghi này không?');
      if(check){
        let res =await this.$store.dispatch("resource/deleteResource",id);
        alert(res);
      }
      this.handleClose();
    },
    handleClose(){
      // this.getResource({limit:this.perPage,page:0,data:this.filter});
      this.$store.dispatch("resource/getResource",{limit:this.perPage,page:this.pageCurrent-1,data:this.filter});
    },
    setTitlePage() {
      this.$store.state.stores.titlePage = "Danh sách tài nguyên";
    },
  },
  computed: {
    // ...mapGetters({
    //   items:'resource/resourceList',
    //   getterTotalData:'resource/getterTotalData',
    //   getterUserSend:'resource/getterUserSend',
    //   getterUserReviced:'resource/getterUserReviced',
    // }),
    items(){
      return this.$store.getters['resource/resourceList'];
    },
    getterTotalData(){
      return this.$store.getters['resource/getterTotalData'];
    },
    getterUserSend(){
      return this.$store.getters['resource/getterUserSend'];
    },
    getterUserReviced(){
      return this.$store.getters['resource/getterUserReviced'];
    },
    credential () {
        return this.$store.state.authentication.user;
    },
    filter(){
      return {
        role_code : this.objFilter.role_code ? this.objFilter.role_code : null,
        u_sender : this.objFilter.u_sender ? this.objFilter.u_sender : null,
        u_reciver : this.objFilter.u_reciver ? this.objFilter.u_reciver : null,
        day_contract_from : this.objFilter.time3 ? this.objFilter.time3[0] : null,
        day_contract_to : this.objFilter.time3 ? this.objFilter.time3[1] : null,
      }
    },
    user () {
        let d =  this.$store.state.users.info;
        if(d && d.role_code){
          return d;
        }else{
          return this.$service.getUserLogin();
        }
    },
  },
  watch: {
    lengthRow(value) {
      this.perPage = this.lengthRow;
    }
  }
};
</script>


<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>
<style>
  div.medium .modal-dialog {
      max-width: 500px;
  }
  div#datetrans .mx-datepicker {
      flex-grow: 1;
  }
  div#datetrans .mx-datepicker input {
    border-radius: 0 3px 3px 0;
  }
  .medium h5 {
      font-size: 14px;
  }

</style>