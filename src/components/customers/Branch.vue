<template>
  <div>
    <mains>
      <div id="content-box">
        <b-container>
          <div class="top-head-box margin-frm box-branch">
            <form>
              <b-row>
                <b-col offset-md="3" cols="12" md="6" lg="6" class="frm-group-cs">
                  <b-input-group prepend="Hotline" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id type="number" v-model="hotline" placeholder="Hotline"></b-input>
                    <!-- <span class="span-error" v-if="checkHotline">Định dạng chưa đúng</span> -->
                  </b-input-group>
                </b-col>
                <b-col offset-md="3" cols="12" md="6" lg="6" class="frm-group-cs">
                  <b-input-group prepend="Máy nhánh" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id type="text" v-model="branch" placeholder="Máy nhánh"></b-input>
                  </b-input-group>
                </b-col>
                <b-col offset-md="3" cols="12" md="6" lg="6" class="frm-group-cs">
                  <b-input-group prepend="Trạng thái" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect :multiple="false" :options="dataStatus" v-model="valueStatus" placeholder="Lựa chọn" @input="handleFilter()"/>
                    </b-input-group>
                </b-col>
              </b-row>
              <div class="mx-auto btn-filter" style="width:400px">
                <button class="moveItem" type="button" @click="handleFilter()">
                  <font-awesome-icon icon="search" /> Lọc
                </button>
                <span class="addnew addUser" @click="handleAdd()">
                  <font-awesome-icon icon="user-plus" /> Thêm mới
                </span>
              </div>
            </form>
            <!-- danh sach may nhanh -->
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
            </div>
            
            <div class="body-table">
              <b-table
                id="my-table-branch"
                hover
                responsive
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
                :fields="fields"
              >
                <template v-slot:cell(hotline)="sodienthoai">
                  <span class="aleftPhone">{{ sodienthoai.value }}</span>
                </template>

                <template v-slot:cell(trạng_thái)="trangthai">
                  <span class="aleftFree" v-if="trangthai.value == 1">Free</span>
                  <span class="aleftThap" v-if="trangthai.value == 2">Busy</span>
                  <span class="aleftThap" v-if="trangthai.value == 3">Suspending</span>
                </template>

                <template v-slot:cell(thao_tác)="thaotac">
                  <span
                    class="aleftCao"
                    title="Sửa"
                    @click="handleEdit(thaotac.item)"
                  >
                    <font-awesome-icon icon="edit" />
                  </span>
                  <span
                    class="aleftThap"
                    title="Xóa"
                    @click="handleDel(thaotac.item)"
                  >
                    <font-awesome-icon icon="trash-alt" />
                  </span>
                </template>

              </b-table>
              <div id="nodata-search" v-if="this.totalRow == 0">Không có dữ liệu</div>
              <b-pagination
                v-if="totalRow > 0"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table-branch"
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
      </div>
        <!-- popup add branch -->
        <b-modal id="bv-modal-create-branch" hide-footer :noCloseOnEsc="true" :noCloseOnBackdrop="true" :centered="true" >
          <template v-slot:modal-title>
            <h3>Thêm mới máy nhánh</h3>
          </template>
          <div class="d-block text-center">
            <form v-on:submit.prevent="submit">
              <b-row>
                <b-col cols="12" lg="12">
                  <b-col class="frm-group-cs" :class="{'error-group': isError.hotline}">
                    <b-input-group prepend="Hotline" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input placeholder="Hotline" type="number" v-model="hotline"></b-input>
                    </b-input-group>
                  </b-col>
                </b-col>
                <b-col cols="12" lg="12">
                  <b-col class="frm-group-cs" :class="{'error-group': isError.branch}">
                    <b-input-group prepend="Máy nhánh" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input placeholder="Máy nhánh" v-model="branch"></b-input>
                    </b-input-group>
                  </b-col>
                </b-col>

                <b-col cols="12" lg="12">
                  <b-col class="frm-group-cs" :class="{'error-group': isError.branch}">
                    <b-input-group prepend="Secret Key" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input placeholder="Secret Key" v-model="secret_key"></b-input>
                    </b-input-group>
                  </b-col>
                </b-col>

              </b-row>
              <div class="popup-footer">
                <b-col cols="12">
                  <b-button type="button" class="mt-3"
                    variant="primary"
                    v-on:click="submit_Create()"
                  >Thêm mới</b-button>
                  <b-button
                    type="button"
                    variant="danger"
                    class="mt-3"
                    @click="$bvModal.hide('bv-modal-create-branch'),resetFrm()"
                  >Đóng</b-button>
                </b-col>
              </div>
            </form>
          </div>
        </b-modal>
        <!-- popup edit -->
        <b-modal id="bv-modal-edit-branch" hide-footer :noCloseOnEsc="true" :noCloseOnBackdrop="true" :centered="true" >
          <template v-slot:modal-title>
            <h3>Cập nhật máy nhánh</h3>
          </template>
          <div class="d-block text-center">
            <form v-on:submit.prevent="submit">
              <b-row>
                <b-col cols="12" lg="12">
                  <b-col class="frm-group-cs" :class="{'error-group': isError.hotline}">
                    <b-input-group prepend="Hotline" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input type="number" placeholder="Hotline" v-model="hotline"></b-input>
                    </b-input-group>
                  </b-col>
                </b-col>
                <b-col cols="12" lg="12">
                  <b-col class="frm-group-cs" :class="{'error-group': isError.branch}">
                    <b-input-group prepend="Máy nhánh" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input placeholder="Máy nhánh" v-model="branch"></b-input>
                    </b-input-group>
                  </b-col>
                </b-col>
                <b-col cols="12" lg="12">
                  <b-col class="frm-group-cs" :class="{'error-group': isError.branch}">
                    <b-input-group prepend="Secret Key" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input placeholder="Secret Key" v-model="secret_key"></b-input>
                    </b-input-group>
                  </b-col>
                </b-col>

              </b-row>
              <div class="popup-footer">
                <b-col cols="12">
                  <b-button type="button" class="mt-3"
                    variant="primary"
                    v-on:click="submit_Update($event)"
                  >Cập nhật</b-button>
                  <b-button
                    type="button"
                    variant="danger"
                    class="mt-3"
                    @click="$bvModal.hide('bv-modal-edit-branch'),resetFrm()"
                  >Đóng</b-button>
                </b-col>
              </div>
            </form>
          </div>
        </b-modal>
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
                    @click="$bvModal.hide('bv-modal-success'),resetFrm()"
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
import Treeselect from "@riophae/vue-treeselect";
let dateImport = require("../../_helpers/date");

export default {
  created(){
    this.checkRuleUser();
  },
  mounted() {
    // this.$root.checkUserLogin();
    this.setTitlePage();
    this.getBranch();
  },
  data() {
    return {
      isError:{hotline:false,branch:false},
      notiteMsg:"",
      //
      hotline: null,
      branch: null,
      call_resources_id:null,
      status:null,
      perPage:10,
      totalRow:0,
      rows:0,
      currentPage: 1,
      fields: [
        { key: "stt", sortable: true, thClass: "classStt" },
        { key: "hotline", sortable: false },
        { key: "máy_nhánh", sortable: false },
        { key: "ngày_tạo", sortable: false },
        { key: "trạng_thái", sortable: false },
        { key: "người_dùng", sortable: false },
        { key: "thao_tác", sortable: false , thClass: "classThaotac" }
      ],
      items: [],
      valueStatus:null,
      dataStatus: [
        { id: "1", label: "Free" },
        { id: "2", label: "Busy" },
        { id: "3", label: "Suspending" },
      ],

    };
  },
  components: {
    Mains,
    Treeselect
  },
  methods: {
    setTitlePage() {
      this.$store.state.stores.titlePage = "Quản lý máy nhánh";
    },
    checkRuleUser() {
      if(this.user.role_code != "ADM"){
           this.$router.push("/");
      }
    },
    getBranch(){
        this.$http.get("v1/api/hotlines").then(res => {
           if(res.status == 200){
               let data = res.body.body;
               let dataNew = [];
               if(data.length > 0){
                   this.rows = data.length;
                   this.totalRow = data.length;
                   for(let index in data){
                       let dataBranch = {
                            isActive: true,
                            stt:parseInt( index )+1,
                            hotline: data[index].hotline,
                            máy_nhánh: data[index].branch,
                            ngày_tạo: data[index].created_date,
                            status: data[index].status,
                            trạng_thái: data[index].status,
                            call_resources_id : data[index].call_resources_id,
                            người_dùng: data[index].username_using,
                            // let created = dateImport.timeConverter(data[index].created_date);
                       }
                       dataNew.push(dataBranch);
                    }
               }
               this.items = dataNew;
           } 
        });
    },
    handleFilter(){
      let branch =  this.branch ? this.branch : '' ;
      let hotline = this.hotline ? this.hotline : '' ;
      let status = this.valueStatus ? this.valueStatus : '';
      this.$http.get('v1/api/hotlines/search?branch='+branch+'&hotline='+hotline+'&status='+status).then(res => {
        if(res.status == 200){
            let data = res.body.body;
            let dataNew = [];
            if(data.length > 0){
                this.rows = data.length;
                this.totalRow = data.length;
                for(let index in data){
                    let dataBranch = {
                        isActive: true,
                        stt:parseInt( index )+1,
                        hotline: data[index].hotline,
                        máy_nhánh: data[index].branch,
                        ngày_tạo: data[index].created_date,
                        status: data[index].status,
                        trạng_thái: data[index].status,
                        call_resources_id : data[index].call_resources_id,
                        người_dùng:data[index].username_using
                        // let created = dateImport.timeConverter(data[index].created_date);
                    }
                    dataNew.push(dataBranch);
                }
            }else{
              this.totalRow = 0;
            }
            this.items = dataNew;
           } 
      });
    },
    handleAdd(){
      this.resetFrm()
      this.$bvModal.show('bv-modal-create-branch');
    },
    submit_Create(){
      if(!this.hotline || this.hotline == ""){
        this.isError.hotline = true
      }
      if(!this.branch || this.branch == ""){
        this.isError.branch = true
      }

      if(!this.isError.hotline && !this.isError.branch){
        let obj = {
        "branch": this.branch,
        "hotline": this.hotline,
        "secret_key":this.secret_key
        }
        this.$http.post("v1/api/hotlines",obj).then(res => {
          this.notiteMsg = "Thêm mới máy nhánh thành công!";
          this.getBranch();
          this.$bvModal.hide('bv-modal-create-branch');
          this.$bvModal.show('bv-modal-success');

        },err =>{

        });
      }
      

    },
    handleEdit(value){
        this.$bvModal.show('bv-modal-edit-branch');
        this.hotline = value.hotline;
        this.branch = value.máy_nhánh;
        this.call_resources_id = value.call_resources_id;
        this.status = value.status;
        this.secret_key = value.secret_key
        // console.log( value );
        // let obj = {
        // "branch": this.branch ? this.branch : "",
        // "call_resources_id": value.call_resources_id,
        // "hotline": this.hotline ? this.hotline : "",
        // "status": value.status
        // }

    },
    submit_Update(){
      if(!this.hotline || this.hotline == ""){
        this.isError.hotline = true
      }
      if(!this.branch || this.branch == ""){
        this.isError.branch = true
      }

      if(!this.isError.hotline && !this.isError.branch){
        
        let obj = {
        "branch": this.branch,
        "call_resources_id": this.call_resources_id,
        "hotline": this.hotline,
        "status": this.status,
        'secret_key':this.secret_key
        }
        this.$http.post("v1/api/hotlines",obj).then(res => {
          this.notiteMsg = "Sửa máy nhánh thành công!";
          this.getBranch();
          this.$bvModal.hide('bv-modal-edit-branch');
          this.$bvModal.show('bv-modal-success');

        },err =>{

        });
      }
    },
    handleDel(data){
      this.$bvModal.msgBoxConfirm('Bạn có muốn xóa máy nhánh này không?',{
          title: 'Xác nhận',
          size: 'sm',
          okVariant: 'danger',
          okTitle: 'Xóa',
          cancelTitle: 'Hủy',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
      })
      .then(value => {
        if(value == true){
          let id = data.call_resources_id;
          this.$http.delete("v1/api/hotlines?call_resources_id="+id).then(res => {
            this.notiteMsg = "Xóa máy nhánh thành công!";
            this.getBranch();
            this.$bvModal.show('bv-modal-success');
          },err => {

          });
        }
      })
      .catch(err => {
        // An error occurred
      })
    },
    checkHotline(){
      if(this.hotline.length != 10){
        return true
      }
    },
    resetFrm(){
      this.branch = null;
      this.hotline = null;
      this.isError = {hotline:false,branch:false}
    },
    trueFrm(){
      this.isError = {hotline:true,branch:true}
    }
  },
  computed: {
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
  watch: {
    hotline(value){
      value = parseInt(value);
      if(value < 0){
        alert('Hotline là số nguyên dương.');
        this.hotline = '';
      }else{
        this.isError.hotline = false;
      }
    },
    branch(value){
      if(value && value.length > 0){
        this.isError.branch = false;
      }
    }
  }
};
</script>
<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>
