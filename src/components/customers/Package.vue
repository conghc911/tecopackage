<template>
  <div>
    <mains>
      <div id="content-box">
        <b-container>
          <div class="top-head-box margin-frm box-branch">
            <form>
              <b-row>
                <b-col offset-md="3" cols="12" md="6" lg="6" class="frm-group-cs">
                  <b-input-group prepend="Mã gói" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id type="text" v-model="filter.package_code" placeholder="Mã gói cước"></b-input>
                  </b-input-group>
                </b-col>
                <b-col offset-md="3" cols="12" md="6" lg="6" class="frm-group-cs">
                    <b-input-group prepend="Trạng thái" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect :options="dataStatus" v-model="filter.status" placeholder="Lựa chọn"/>
                    </b-input-group>
                </b-col>
                 <b-col offset-md="3" cols="12" md="6" lg="6" class="frm-group-cs">
                    <b-input-group prepend="Loại gói" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        :options="dataType"
                        v-model="filter.type"
                        placeholder="Lựa chọn"/>
                    </b-input-group>
                </b-col>
              </b-row>
              <div class="mx-auto text-center custom-btn ">
                <button class="btn btn-filter" type="button" @click="handleFilter($event)">
                  <font-awesome-icon icon="search" /> Lọc
                </button>
                <button class="btn btn-create" type="button" @click="$bvModal.show('bv-modal-add'),resetModal()">
                  <font-awesome-icon icon="user-plus" /> Thêm mới
                </button>
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
                    <strong>{{ getterTotalData }}</strong> bản ghi
                    </p>
                </div>
                </div>
            </div>

            <div class="body-table">
                <b-table
                    id="my-table-branch"
                    hover
                    striped
                    responsive
                    :items="getPackages"
                    :fields="fields"
                >
                    <template v-slot:cell(status)="row">
                        {{ row.item.status == 1 ? "Hoạt động" : "Không hoạt động" }}
                    </template>
                    <template v-slot:cell(action)="row">
                        <div>
                            <span class="aleftCao" title="Sửa"
                                @click="handleUpdate(row.item.id),$bvModal.show('bv-modal-add')">
                                <font-awesome-icon icon="edit" />
                            </span>
                            <span class="aleftThap" title="Xóa" @click="handleDelete(row.item.id)">
                                <font-awesome-icon icon="trash-alt" />
                            </span>
                        </div>
                    </template>
                </b-table>

              <!-- phan trang -->
                <Pagination
                    v-if="getterTotalData"
                    :totalRow="getterTotalData"
                    :perPage="parseInt(perPage)"
                    :actionName="actionNamePagi"
                    :dataQuery="filterQuery"
                    :dataObject="true"
                    @getPageCurrent="pageCurrent = $event" />
            </div>


          </div>
        </b-container>
      </div>
    </mains>
    <!-- popup add branch -->
    <b-modal
        id="bv-modal-add"
        :title="titleModal"
        :noCloseOnEsc="true"
        :noCloseOnBackdrop="true"
        :centered="true"
        @hidden="resetModal">
        <form>
            <b-row>
                <b-col offset-md="2" cols="8"  class="frm-group-cs">
                    <!-- <b-input-group prepend="Tên gói" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input name="package_name" v-validate="'required'" data-vv-as="Tên gói cước" type="text" v-model="objCreate.package_name" placeholder="Tên gói cước"></b-input>
                    </b-input-group>
                    <span id="error">{{ errors.first('package_name') }}</span> -->
                    <b-input-group prepend="Tên gói" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input   type="text" v-model="objCreate.package_name" placeholder="Tên gói cước"></b-input>
                    </b-input-group>
                </b-col>
                <b-col offset-md="2" cols="8" class="frm-group-cs">
                    <b-input-group prepend="Loại gói" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        v-validate="'required'" data-vv-as="Loại gói" name="type"
                        :options="dataType"
                        v-model="filter.type"
                        placeholder="Lựa chọn"/>
                    </b-input-group>
                    <span id="error">{{ errors.first('type') }}</span>
                </b-col>

                <b-col offset-md="2" cols="8"  class="frm-group-cs">
                    <b-input-group prepend="Mã gói" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input v-validate="'required'" data-vv-as="Mã gói cước" name="package_code" type="text" v-model="objCreate.package_code" placeholder="Mã gói cước"></b-input>
                    </b-input-group>
                    <span id="error">{{ errors.first('package_code') }}</span>
                </b-col>
                <b-col offset-md="2" cols="8"  class="frm-group-cs">
                    <b-input-group prepend="Giá gói" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id type="text" v-model="objCreate.price" placeholder="Giá gói cước"></b-input>
                    </b-input-group>
                </b-col>
                <b-col offset-md="2" cols="8"  class="frm-group-cs">
                    <b-input-group prepend="Chu kỳ" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id type="text" v-model="objCreate.cycle" placeholder="Chu kỳ"></b-input>
                    </b-input-group>
                </b-col>
                <b-col offset-md="2" cols="8"  class="frm-group-cs">
                    <b-input-group prepend="Tài nguyên" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id type="text" v-model="objCreate.resources" placeholder="Chu kỳ"></b-input>
                    </b-input-group>
                </b-col>
                <b-col offset-md="2" cols="8"  class="frm-group-cs">
                    <b-input-group prepend="Mã dịch vụ" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input name="service_code" v-validate="'required'" data-vv-as="Mã mã dịch vụ" type="text" v-model="objCreate.service_code" placeholder="Mã dịch vụ"></b-input>
                    </b-input-group>
                    <span id="error">{{ errors.first('service_code') }}</span>
                </b-col>
                <b-col offset-md="2" cols="8"  class="frm-group-cs">
                    <b-input-group prepend="Mô tả" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id type="text" v-model="objCreate.note" placeholder="Mô tả"></b-input>
                    </b-input-group>
                </b-col>
                <!-- <b-col offset-md="2" cols="8" class="frm-group-cs">
                    <b-input-group prepend="Trạng thái" class="mb-2 mr-sm-2 mb-sm-0">
                        <treeselect :options="dataStatus" v-model="objCreate.status" placeholder="Lựa chọn"/>
                    </b-input-group>
                </b-col> -->
            </b-row>

        </form>
        <template v-slot:modal-footer="{ cancel }">
            <b-button variant="success" @click="handleCreate" >
                {{button_name}}
            </b-button>
            <b-button variant="danger" @click="cancel()">
                Hủy
            </b-button>
        </template>
    </b-modal>

    <!-- model thong bao -->
    <alert :message="message_alert"></alert>

  </div>
</template>

<script>
import Mains from "../Main.vue";
import Pagination from '../layouts/Pagination.vue';
import Alert from "../layouts/Alert";
import Treeselect from "@riophae/vue-treeselect";
let dateImport = require("../../_helpers/date");

export default {
    created(){
        this.checkRuleUser();
        //thuc hien lay danh sach package da tao
        this.$store.dispatch("packages/getListPackage",{limit:this.perPage,page:0,data:this.filterQuery});
    },
    mounted() {
        // this.setTitlePage();
    },
    data() {
        return {
            titleModal:'Thêm mới gói cước!',
            button_name:'Thêm mới',
            updateAction:false,
            actionNamePagi:'packages/getListPackage',
            message_alert:'',
            perPage:10,
            totalRow:0,
            rows:0,
            pageCurrent: 1,
            filter:{},
            objCreate:{},
            data:[],
            fields: [
                { key: "stt", sortable: true,label:'Stt', thClass: "classStt" },
                { key: "package_name",label:'Tên gói', sortable: false },
                { key: "type_str",label:'Loại', sortable: false },
                { key: "package_code",label:'Mã gói', sortable: false },
                { key: "note",label:'Mô tả', sortable: false },
                { key: "created_date",label:'Ngày tạo', sortable: false },
                { key: "status",label:'Trạng thái', sortable: false },
                { key: "action",label:'Thao tác', sortable: false ,thClass: "classStt"},
            ],
            dataStatus:[{id:1,label:'Hoạt động'},{id:0,label:'Không hoạt động'}],
            dataType:[{id:0,label:'Gói Cước Data'},{id:1,label:'Gói Cước Thoại'},{id:2,label:'Gói Cước Pundle'}],

        };
    },
    components: {
        Mains,
        Treeselect,
        Alert,
        Pagination
    },
    methods: {
        handleFilter(){
            console.log('filter');
            this.$store.dispatch("packages/getListPackage",{limit:this.perPage,page:0,data:this.filterQuery});
        },
        async handleUpdate(id){
            console.log(id);
            this.updateAction = true;
            this.titleModal = 'Cập nhật gói cước!';
            this.button_name = 'Cập nhật';
            // thuc hien lay du lieu package
            let result = await this.$store.dispatch("packages/getRowPackage",id);
            if(result){
                this.objCreate = result.body.body;
                this.objCreate.id = id;
            }
        },
        async handleCreate(){
            console.log('create');
            let isValidate = await this.$validator.validateAll();
            if(isValidate){
                if(this.objCreate.package_code && this.objCreate.service_code){
                    let result = null;
                    if(!this.updateAction){
                        result = await this.$store.dispatch("packages/addPackage",this.objCreate);
                    }else{
                        let {cycle,id,note,package_code,package_name,price,service_code,status} = this.objCreate;
                        let objUpdate = { cycle,id,note,package_code,package_name,price,service_code,status };
                        result = await this.$store.dispatch("packages/updatePackage",objUpdate);
                    }

                    if(!result){
                        this.message_alert="Thất bại!";
                    }else{
                        this.message_alert="Thành công!";
                    }
                    this.$bvModal.hide("bv-modal-add");
                    this.$bvModal.show("bv-modal-alert");
                    this.$store.dispatch("packages/getListPackage",{limit:this.perPage,page:0,data:this.filterQuery});
                }
            }
        },
        resetModal(){
            this.objCreate = {};
            this.updateAction = false;
            console.log('resetModal');
        },
        checkRuleUser() {
            if (this.user.role_code == "SAL") {
                this.$router.push("/");
            }
        }
    },
    computed: {
         user () {
            let d =  this.$store.state.users.info;
            if(d && d.role_code){
                return d;
            }else{
                return this.$service.getUserLogin();
            }
        },
        filterQuery(){
            return this.filter;
        },
        getPackages(){
            return this.$store.getters['packages/getPackages'];
        },
        getterTotalData(){
            return this.$store.getters['packages/getTotalPackages'];
        }
    },
    watch: {
        perPage(value){
            this.$store.dispatch("packages/getListPackage",{limit:value,page:0,data:this.filterQuery});
        }
    }
};
</script>
<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>
<style scoped>
    button.btn.btn-filter {
        background: #50bbeb;
        color: #fff;
    }
    button.btn.btn-create {
        background: #3fb378;
        color: #fff;
    }
</style>