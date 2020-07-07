<template>
	<div>
		<Main>
			test	
		</Main>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from "vuex";

	import Main from "../Main";
	import Pagination from "../layouts/Pagination";
	export default {
		created(){
			this.$store.dispatch("resource/getResource",{limit:this.perPage,page:0, data:this.filter})
		},
		data(){
			return {
				perPage:10,
			}
		},
		component:{
			Main,
			Pagination
		},
		computed:{
			filter(){
				return {}
			}
		},
		methods:{
			// ...mapActions({
			// 	'getResource':"resource/getResource"
			// }),
		}

	}
</script >
<style>
	
</style>