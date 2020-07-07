<template>
	<div>
		<Main>
			<b-container>
				<form>
					<b-row>
		                <b-col cols="12" md="6" lg="4">
		                  <b-form-group>
		                    <label for="">Tên đăng nhập</label>
		                    <treeselect
		                      v-model="obj.user_id"
		                      :multiple="false"
		                      :options="dataUserId"
		                      placeholder="Lựa chọn"
		                      noOptionsText="Chưa có dữ liệu"
		                      noResultsText="Không có dữ liệu"
		                      @input="changeUserId($event)"
		                    />
		                  </b-form-group>
		                </b-col>
		                <b-col cols="12" md="6" lg="4">
		                  <b-form-group>
		                    <label for="">Danh sách chủ đề</label>
		                    <treeselect
		                      v-model="obj.topic_id"
		                      :multiple="false"
		                      :options="dataTopic"
		                      placeholder="Lựa chọn"
		                      noOptionsText="Chưa có dữ liệu"
		                      noResultsText="Không có dữ liệu"
		                    />
		                  </b-form-group>
		                </b-col>
		            </b-row>

		            <div class="mx-auto btn-filter" style="width:400px">
		                <button type="submit" @click="handleFilter($event)">
		                  <font-awesome-icon icon="search" /> Lọc
		                </button>

		              </div>
				</form>
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
								<strong>{{ getterTotalData }}</strong> bản ghi
							</p>
						</div>
					</div>
					<div class="body-table">
						<b-table id="my-table-blacklist" hover responsive :items="items" :fields="fields">
							<template v-slot:cell(thaotac)="thaotac">
								<div>
									<span class="aleftThap" title="Xóa" @click="handleDelete(thaotac.item.id)">
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
		</Main>
	</div>
</template>
<script>

	import Treeselect from "@riophae/vue-treeselect";

	import Main from "../Main.vue";
	import Pagination from '../layouts/Pagination.vue';

	export default {
		created(){
		    this.$store.state.stores.titlePage = "Danh sách hạn chế";
		    this.$store.dispatch("blacklist/getBlacklist",{limit:this.perPage,page:0,data:this.filter});
		    this.$store.dispatch("blacklist/getUserId");
		    this.$store.dispatch("dictionary/getTopic");
		},
		mounted(){

		},
		data(){
			return {
				obj:{},
				actionNamePagi:'blacklist/getBlacklist',
				// items:[],
				fields: [
			        { key: "stt",label:'#', sortable: true, thClass: "classStt" },
			        { key: "phone_number",label:'Số điện thoại', sortable: false },
			        // { key: "topic_name", label:'Chủ đề', sortable: false },
			        { key: "username", label:'Tài khoản', sortable: false },
			        { key: "thaotac", label:'Thao tác', sortable: false ,thClass: "classVaitro" }
			      ],
			    pageCurrent:1,
				perPage:10,
				totalRow:0
			}
		},
		components:{
			Main,
			Treeselect,
			Pagination
		},
		computed:{
			items(){
				return this.$store.getters["blacklist/getterBlacklist"];
				// return [];
			},
		    getterTotalData(){
		      return this.$store.getters['blacklist/getterTotalData'];
		    },
			dataUserId(){
				return this.$store.getters["blacklist/getterUserId"];
			},
			dataTopic(){
				return this.$store.getters["blacklist/getterTopic"];
			},
			filter(){
				return {
					user_id:this.obj.user_id ? this.obj.user_id : "",
					topic_id:this.obj.topic_id ? this.obj.topic_id : "",
				}
			}
		},
		methods:{
			handleFilter(e){
				e.preventDefault();
				this.$store.dispatch("blacklist/getBlacklist",{limit:this.perPage,page:0,data:this.filter});
			},
			changeUserId(id){
				// console.log(id);
				this.$store.dispatch("blacklist/getTopicUserId",id);
			},
			async handleDelete(id){
				console.log(id);
				let isDel = confirm("Bạn có muốn xóa bản ghi này không?");
				if(isDel){
					let msg = await this.$store.dispatch("blacklist/delBlacklist",id);
					alert('Bãn đã xóa thành công');
					this.$store.dispatch("blacklist/getBlacklist",{limit:this.perPage,page:this.pageCurrent - 1,data:this.filter});
				}
			}
		}
	}
</script>


<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>