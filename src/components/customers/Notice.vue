<template>
  <div>
    <mains>
      <div id="content-box">
        <b-container>
          <div class="top-head-box margin-frm box-branch">
            <form>
              <b-row>
                <b-col offset-md="3" cols="12" md="6" lg="6" class="frm-group-cs">
                  <b-input-group prepend="Thông báo" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id type="text" v-model="filter.notify" placeholder="Nội dung"></b-input>
                  </b-input-group>
                </b-col>
                <b-col offset-md="3" cols="12" md="6" lg="6" class="frm-group-cs">
                  <b-input-group prepend="Trạng thái" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect :multiple="false" :options="dataTypeNotice" v-model="filter.seen" placeholder="Lựa chọn"/>
                    </b-input-group>
                </b-col>
              </b-row>
              <div class="mx-auto btn-filter" style="width:400px">
                <button class="moveItem" type="button" @click="handleFilter($event)">
                  <font-awesome-icon icon="search" /> Lọc
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
                    <strong>{{ totalRow }}</strong> bản ghi
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
                :items="noticeList"
                :per-page="perPage"
                :current-page="currentPage"
                :fields="fields"
              >
                

              </b-table>

              <!-- <div id="nodata-search" v-if="this.totalRow == 0">Không có dữ liệu</div>
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
                </b-pagination> -->
            </div>

          </div>
        </b-container>
      </div>
    </mains>
  </div>
</template>

<script>
import Mains from "../Main.vue";
import Treeselect from "@riophae/vue-treeselect";
let dateImport = require("../../_helpers/date");

export default {
  created(){
    // this.checkRuleUser();
    this.$store.dispatch("notice/getNoticeList",{limit:this.perPage, page:0,filters:this.filterObj});
    console.log('test');
  },
  mounted() {
    // this.$root.checkUserLogin();
    this.setTitlePage();
    // this.getBranch();
  },
  data() {
    return {
      
      //
      
      perPage:10,
      totalRow:0,
      rows:0,
      currentPage: 1,
      fields: [
        { key: "stt", sortable: true,label:'Stt', thClass: "classStt" },
        { key: "type",label:'Loại thông báo', sortable: false },
        { key: "notify",label:'Nội dung thông báo', sortable: false },
        { key: "createdDate",label:'Ngày tạo', sortable: false },
        { key: "seen",label:'Trạng thái', sortable: false },
      ],
      filter:{},
      dataTypeNotice: [
        { id: "1", label: "Đã đọc" },
        { id: "2", label: "Chưa đọc" },
      ],

    };
  },
  components: {
    Mains,
    Treeselect
  },
  methods: {
    setTitlePage() {
      this.$store.state.stores.titlePage = "Thông báo";
    },
    handleFilter(e){
      e.preventDefault();
    }
    // checkRuleUser() {
    //   if(this.user.role_code != "ADM"){
    //        this.$router.push("/");
    //   }
    // },
  },
  computed: {
    credential () {
        return this.$store.state.authentication.user;
    },
    items(){
        return [
        {stt:1,type:'Khẩn cấp',notify:'Nội dung thông báo khẩn cấp',createDate:'22/12/2012'},
        {stt:2,type:'Bình thường',notify:'Nội dung thông báo bình thường',createDate:'22/12/2012'}
        ]
    },
    user () {
        let d =  this.$store.state.users.info;
        if(d && d.role_code){
          return d;
        }else{
          return this.$service.getUserLogin();
        }
    },
    noticeList(){
      return this.$store.state.notice.noticeList;
    },
    filterObj(){
      return {
        notify:this.filter.notify,
        seen:this.filter.seen
      }
    }
  },
  watch: {
    
  }
};
</script>
<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>
