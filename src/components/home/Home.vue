<template>
  <div>
    <main-app>
      <div id="homepage" class="mx-auto" style="max-width:600px; margin-top:40px">
        <button @click="changeText">change text demo</button>
        <hr>
        <button @click="toggle(show)">toggle slide</button>
        <hr>
        <b-form-textarea
                  id="textarea-state"
                  v-model="text"
                  placeholder="Ghi chú..."
                  rows="5"
                  max-rows="5"
                  :state="text.length <= 10"
                  @input="minLength($event)"
                ></b-form-textarea>
        {{text.slice(0,10)}}
        <hr>
        <section>
        <p>date not after today</p>
        <date-picker v-model="value2" ></date-picker>
      </section>
        <hr>
        <treeselect
          :multiple="true"
          :options="dataChude"
          v-model="valueChude"
          placeholder="Chon chu de"
        />
        <hr>
        <treeselect
            :load-options="loadOptions"
            :options="options"
            :auto-load-root-options="false"
            :multiple="true"
            placeholder="Open the menu..."
            />
        <transition name="toggleSlide">
          

          <div v-show="show">
            <ul>
              <li>helooo</li>
            </ul>
            
          </div>
        </transition>
        {{dataUserLogin}}
      </div>
      <h3 @click='getdata()'>get api local</h3>
    </main-app>
  </div>
</template>

<script>
import Main from "../Main.vue";
import Treeselect from "@riophae/vue-treeselect";
import DatePicker from "vue2-datepicker";
import { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect'

const sleep = d => new Promise(r => setTimeout(r, d))
let called = false
const today = new Date();
today.setHours(0, 0, 0, 0);

export default {
  mounted(){

  },
  data() {
    return {
      // dataUserLogin:null,
      value2: new Date(),
      text:"",
      show:false,
      value:null,
      options:null,
      valueChude:[-1],
      dataChude:[
        {
          id:-1,
          label:"Tất cả",
          children:[
            { id:1, label:'chude 1' },
            { id:2, label:'chude 2' },
            { id:3, label:'chude 3' },
          ]
        }
      ]
    };
  },
  filters: {
    
  },
  created(){
    // this.$store.dispatch('getDataUser',{self:this});
  },
  methods: {
    changeText(){
      let stt = this.$store.state.textDemo + 1;
      this.$store.dispatch('setTextDemo',stt);
    },
    getdata(){
      this.$http.get('http://192.168.1.217:8888/smart/frontend/home/getdata').then(res=>{
        console.log(res);
      });
    },
    // getDataUser(){
    //   this.dataUserLogin = this.$store.state.dataUser
    // },
    notAfterToday(date) {
      console.log( date );
    },
    minLength(e){
      
    },
    toggle(value){
      return this.show = !value
    },
    async loadOptions({ action/*, callback*/ }) {
      if (action === LOAD_ROOT_OPTIONS) {
        await sleep(2000)

        await this.$http.get("v1/api/account-managers/topic").then(res => {
        if (res.status == 200 && res.body != "") {
          let data = res.body.body;
          let dataNew = [];
          let dataObjAll = [];
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              // if (i >= 500) break;
              dataNew.push({
                id: parseInt(data[i].topic_id),
                label:  data[i].topic_name
              });
            }
          }
          dataObjAll = dataNew;
          this.options = dataObjAll;
        }
      }); 
          
      }
    },
  },
  components: {
    "main-app": Main,
    Treeselect,
    DatePicker
  },
  computed: {
    filterProductMatch() {
      return this.listUser.filter(item => {
        return item.email.indexOf(this.filterProduct) != -1;
      });
    },
    credential () {
        return this.$store.state.authentication.user;
    },
    dataUserLogin () {
        return this.$store.state.users.info;
    }
  },
  watch:{
    
  },
  
  // beforeCreate() {
  //   console.log("beforeCreate");
  // },
  // created() {
  //   console.log("created");
  // },
  // Mounting() {
  //   console.log("mounting");
  // },
  // beforeMount() {
  //   console.log("beforeMount");
  // },
  // mounted() {
  //   console.log("mounted");
  // },
  // Updating() {
  //   console.log("Updating");
  // },
  // beforeUpdate() {
  //   console.log("beforeUpdate");
  // },
  // updated() {
  //   console.log("updated");
  // }
};
</script>

<style scoped>
 /* enter */
 .toggleSlide-enter{
   opacity: 0;
 }
 .toggleSlide-enter-active{
   transition: 1s;
 }
 /* leave */
 .toggleSlide-leave{
   opacity: 1;
 }
 .toggleSlide-leave-active{
    transition: 1s;
    opacity: 0;
 }
</style>
<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>