 <template>
    <div id="pagination" >
        <ul>
            <li><a @click="goPage(pageFirst,perPage,dataQuery)">Trang đầu</a></li>
            <li><a @click="goPage(pagePrev,perPage,dataQuery)">Trước</a></li>
            <li 
                v-for="(item,index) in pagination" 
                :key="index"
                
                ><a @click="goPage(item,perPage,dataQuery)"
                	:class="{'active':isActive(item)}">{{item}}</a></li>
            <li><a @click="goPage(pageNext,perPage,dataQuery)">Sau</a></li>
            <li><a @click="goPage(pageLast,perPage,dataQuery)">Trang cuối</a></li>
        </ul>
    </div>    
</template>

<script>
    // import { string_helper } from '../../_helpers/string.js';
    let string_helper = require("../../_helpers/string");
    // import { mapGetters,mapActions } from 'vuex';
    export default {
        created(){
        	// console.log(this.dataQuery);
        },
        props:['totalRow','perPage','dataQuery','actionName','dataObject'],
        data(){
            return {
                pageCurrent:1,
                pageFirst:1,
                pagePrev:0,
                pageNext:0,
                pageLast:0,
            }
        },

        computed:{
            pagination(){
                let totalPage = Math.ceil(this.totalRow / this.perPage);
                let page = string_helper.pagination(this.pageCurrent,totalPage);
                return page;
            }
        },
        methods:{
            
            // ...mapActions({'getLeadList':'lead/getLeadList'}),
            goPage(page,perPage,dataQuery){
                if(page > 0 && page != this.pageCurrent ){

                    let totalPage = this.pagination.length;
                    this.pageCurrent = page;
                    this.pageLast = totalPage;
                    this.pageNext = (this.pageCurrent+1) > totalPage ? totalPage : this.pageCurrent+1 ;
                    this.pagePrev = (this.pageCurrent-1) > 0 ? this.pageCurrent-1 : 1 ;

                    // action den vuex lay du lieu
                    // this.getLeadList({limit:perPage,page:page});
                    let obj = null;
                    // if(this.dataObject){
                        // console.log( dataQuery );
                        obj = {limit:perPage,page:page-1,data:dataQuery};
                    // }
                    // else{
                        // obj = {limit:perPage,page:page-1,...dataQuery};
                    // }
                    // console.log( obj );
                    this.$store.dispatch(this.actionName,obj);
                    // gui page current ra component cha cua no.
                    this.$emit('getPageCurrent',page);
                }
            },
            isActive(currentPage){
                if(this.pageCurrent == currentPage){
                    return true;
                }else{
                    return false;
                }
            }
        },
        watch:{
            perPage(value){
                this.pageCurrent = 1;
                this.pageNext = 0;
                this.pageLast = 0;
                this.pagePrev = 0;
            },
            totalRow(value){
                this.pageCurrent = 1;
                this.pageNext = 0;
                this.pageLast = 0;
                this.pagePrev = 0;
            }
        }
    }
</script>

<style scoped>

</style>