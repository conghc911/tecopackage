<template>
  <div>
    <main-app>
        <div class="errors-404">
            <h3>Lỗi 404. Trang tìm kiếm không tồn tại.</h3>
            <p>
                <router-link tag='a' to="/customers">Quay lại trang chủ</router-link>
            </p>
        </div>
    </main-app>
  </div>
</template>

<script>
import Main from "../Main.vue";
export default {
  mounted(){
    //this.$root.checkUserLogin();
  },
  data() {
    return {
      //   
    }
  },
  filters: {
  },
  methods: {

  },
  components: {
    "main-app": Main
  },
  computed: {
  }
};
</script>

<style scoped>
.errors-404 a {
    color: #095bb3;
    font-size: 14px;
    text-decoration: underline;
}
.errors-404 h3 {
    font-size: 20px;
}
.errors-404 {
    margin: 50px;
    text-align: center;
}
</style>