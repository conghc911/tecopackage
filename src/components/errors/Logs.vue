<template>
  <div>
    <main-app>
      <div id="box-logs">
        <b-container>
            <b-row>
                <b-col cols="12" md="6" lg="3">
                    <div class="left-logs">
                        <h3 class="title-logs">Danh sách logs</h3>
                        <ul>
                            <li v-for="(item,index) in dataLogs" v-bind:key="index">
                                <a href="javascript:;" 
                                @click="showLogs(item)"
                                :class="{'active':item == titleLog ? true : ''}"
                                >{{ item }}</a>
                            </li>
                            
                        </ul>
                    </div>
                </b-col>
                 <b-col cols="12" md="6" lg="9">
                    <div class="right-logs">
                        <h3 class="title-logs">Chi tiết <strong>{{titleLog}}</strong></h3>
                        <div class="content-logs-item">
                            {{bodyText}}
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
      </div>
    </main-app>
  </div>
</template>

<script>
import Main from "../Main.vue";
import Treeselect from "@riophae/vue-treeselect";
import DatePicker from "vue2-datepicker";


export default {
  mounted(){
    this.setTitlePage();
    this.getDataLlogs();
    this.checkRuleUser();
  },
  data() {
    return {
        dataLogs:null,
        bodyText:'Vui lòng chọn logs để hiển thị.',
        titleLog:'',
    };
  },
  filters: {
    
  },
  created(){
  },
  methods: {
    getDataLlogs(){
        this.$http.post("v1/api/files/list").then(res => {
            if(res.status == 200){
                if(res.body.length > 0){
                    this.dataLogs = res.body;
                }
            }
        });
    },
    showLogs(fileName){
        if(fileName){
            this.$http.get("v1/api/files/content/?file_name="+fileName).then(res => {
              if(res.status == 200){
                  this.bodyText = res.bodyText;
                  this.titleLog = fileName;
              }  
            });
        }
    },
    setTitlePage() {
      this.$store.state.stores.titlePage = "Xem danh sách logs";
    },
    checkRuleUser() {
        // console.log( this.user );
        if(this.user.role_code != "ADM"){
           this.$router.push("/");
        }
    },
  },
  components: {
    "main-app": Main,
    Treeselect,
    DatePicker
  },
  computed: {
    user (){
        let d =  this.$store.state.users.info;
        if(d && d.role_code){
            return d;
        }else{
            return this.$service.getUserLogin();
        }
    }
  },
  watch:{
    
  }
};
</script>

<style scoped>
</style>
<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>