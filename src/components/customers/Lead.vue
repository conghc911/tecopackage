<template>
  <div>
    <mains>
      <div id="content-box">
        <b-container>

        <div class="top-head-box margin-frm mx-auto" style="width:600px">
            <b-row v-if="isNotice">
                <b-col cols="12">
                    <b-alert class="text-center" show variant="success">{{message}}</b-alert>
                </b-col>
            </b-row>

            <form @submit.prevent="handleSubmit(handleCreate)" id="lead-form">
                <b-row>
                    <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                        <b-input-group prepend="Tổng lead hiện tại" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-input disabled v-model="totalLead"></b-input>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                        <b-input-group prepend="Tài khoản" class="mb-2 mr-sm-2 mb-sm-0">
                            <treeselect
                                v-validate="'required'" data-vv-as="Tài khoản"
                                name="username"
                                v-model="objCreate.user_id"
                                :multiple="false"
                                :options="dataUser"
                                placeholder="Lựa chọn"
                                noOptionsText="Chưa có dữ liệu"
                                noResultsText="Không có dữ liệu"/>
                        </b-input-group>
                        <span class="error">{{ errors.first('username') }}</span>
                    </b-col>
                    <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                        <b-input-group prepend="Số lead chia" class="mb-2 mr-sm-2 mb-sm-0">
                            <input v-model="objCreate.parcel" class="form-control" type="number"
                                v-validate="'required|numeric|max_value:'+totalLead" data-vv-as="Số lead chia"
                                name="parcel" />
                        </b-input-group>
                        <span class="error">{{ errors.first('parcel') }}</span>
                    </b-col>
                </b-row>
                <div class="mx-auto btn-filter text-center">
                    <button type="button" class="moveItem" @click="handleCreate()">
                        <font-awesome-icon icon="user-plus" />
                        <span>Thêm mới</span>
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
                <div class="right-head-list">
                    <p>
                    Hiển thị bản ghi
                    <strong>1 - {{perPage}}</strong> trên tổng số
                    <strong>{{ totalDataLead }}</strong> bản ghi
                    </p>
                </div>
                </div>
            </div>
        <div class="body-table">
            <b-table
                id="my-table-lead"
                hover
                striped
                responsive
                :items="dataLead"
                :fields="fields"
            >
                <template v-slot:cell(status)="row">
                    {{ row.item.status == 1 ? "Hoạt động" : "Không hoạt động" }}
                </template>
                <template v-slot:cell(action)="row">
                    <div>
                        <span class="aleftThap" title="Xóa" @click="handleDelete(row.item)">
                            <font-awesome-icon icon="trash-alt" />
                        </span>
                    </div>
                </template>
            </b-table>

            <!-- phan trang -->
            <Pagination
                v-if="totalDataLead"
                :totalRow="totalDataLead"
                :perPage="parseInt(perPage)"
                :actionName="actionNamePagi"
                :dataQuery="filterQuery"
                :dataObject="true"
                @getPageCurrent="pageCurrent = $event" />
        </div>
        </b-container>
    </div>

    </mains>
  </div>
</template>

<script>
import Mains from "../Main.vue";
import Treeselect from "@riophae/vue-treeselect";
import DatePicker from "vue2-datepicker";
import Pagination from "../layouts/Pagination";
import {mapGetters, mapActions} from 'vuex';

export default {
    created(){
        this.$store.dispatch("lead/getTotalLead");
        this.$store.dispatch("lead/getListUser");
        this.$store.dispatch("lead/getLead",{limit:this.perPage,page:0});
    },
    mounted() {
        this.checkRuleUser();
    },
    data() {
        return {
            message:null,
            isNotice:false,
            actionNamePagi:'lead/getLead',
            total:0,
            objCreate:{},
            // dataUser:[{id:1,label:'admin'}],
            items:[
                {stt:1,user_name:'admin',num_lead:10},
                {stt:2,user_name:'admin2',num_lead:11},
                {stt:3,user_name:'admin3',num_lead:12},
            ],
            fields: [
                { key: "stt", sortable: true,label:'Stt', thClass: "classStt" },
                { key: "username",label:'Tài khoản', sortable: false },
                { key: "num",label:'Số lượng lead', sortable: false },
                { key: "action",label:'Thao tác', sortable: false,thClass: "classStt" },
            ],
            perPage:10,
            totalRow:10,
            pageCurrent:1
        }
    },
    components: {
        Treeselect,
        DatePicker,
        Mains,
        Pagination
    },
    methods: {
        checkRuleUser(){

        },
        async handleCreate(){
            let isValidate = await this.$validator.validateAll();
            if(isValidate){

                let obj = this.objCreate;
                obj.parcel = parseInt(obj.parcel);
                let result = await this.$store.dispatch("lead/createLead",obj);
                console.log(result);
                this.message = "Thêm thành công";

                this.objCreate = {};
                this.$validator.reset();
                this.isNotice = true;
                setTimeout(()=>{
                    this.isNotice = false;
                    this.message = null;

                },1500);

                this.$store.dispatch("lead/getTotalLead");
                this.$store.dispatch("lead/getListUser");
                this.$store.dispatch("lead/getLead",{limit:this.perPage,page:0});
            }
        },
        async handleDelete(obj){
            if(confirm('Bạn có chắc muốn xóa không?')){
                // console.log(obj);
                let res = await this.$store.dispatch("lead/delLead",obj);
                this.$store.dispatch("lead/getTotalLead");
                window.alert("Xóa thành công");
                this.$store.dispatch("lead/getLead",{limit:this.perPage,page:0});
                this.$store.dispatch("lead/getListUser");
            }
        }
    },
    computed: {
        totalLead(){
            return this.$store.getters['lead/getTotalLead'];
        },
        dataUser(){
            return this.$store.getters['lead/getDataUser'];
        },
        dataLead(){
            return this.$store.getters['lead/getDataLead'];
        },
        totalDataLead(){
            return this.$store.getters['lead/getTotalDataLead'];
        },
        filterQuery(){
            return {
                limit:this.perPage,
                page:this.pageCurrent-1
            }
        }
    },
    asyncComputed: {
        // dataUser() {
        //    return this.getListUserLogin();
        // }
    },
    watch: {
        perPage(value){
            this.$store.dispatch("lead/getLead",{limit:parseInt(value),page:0});
        }
    }
}
</script>


<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>
