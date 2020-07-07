<template>
  <div id="wrapper">
    <!-- <component v-bind:is = "layout" > -->
      <router-view />
      <!-- <router-view v-bind:layout.sync = "layout" /> -->
    <!-- </component>   -->
  </div>
</template>

<script>


export default {
  name: 'app',
  data () {
    return {
      layout:'div'
    }
  },
  components:{
    // 'app-login':Login,
  },
  methods:{
  },
  mounted(){
  }
}
</script>

<style>
body{
    color: #5d6062;
    line-height: 1.4;
    font-size: 14px;
}
button,.btn{
    font-size: 14px;
}
ul{
  margin:0;
  padding:0;
  list-style-type: none;
}
div#content-box {
    float: left;
    width: 100%;
    padding: 3px 0;
}
.container{width: 100%;max-width: 100%;font-size: 14px;}
div#content-box label, div#content-box input, div#content-box select {
    font-size: 14px;
}
.btn-filter button {
    border: 0;
    padding: 8px 25px 8px 10px;
    background: #50bbeb;
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
    margin-top: 5px;
    /* margin-bottom: 10px; */
    -webkit-transition: 0.3s all;
    -moz-transition: 0.3s all;
    transition: 0.3s all;
}
.btn-filter button:hover, .btn-filter span:hover {
    /* background: #d44f38; */
}
.control-list-box {
    float: left;
    width: 100%;
    margin-top: -15px;
}
.head-list {
    float: left;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head-list p {
    margin: 0;
}
.left-head-list select {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 8px;
    margin: 0 5px;
}
.body-table {
    float: left;
    width: 100%;
    margin-top: 15px;
}
.page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #f15b40;
    border-color: #f15b40;
}
.page-link{
  color: #333;
}
span.handle_right {
    width: 30px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
}
.table.b-table > tbody > tr.b-table-details > td {
    border-top: none !important;
    padding: 0;
}
.table.b-table > tbody > tr.b-table-details > td table {
    margin: 0;
}
th.classStt {
    width: 55px;
}
.classVaitro {
    width: 160px;
}
.classThaotac {
    width: 100px;
}
.tooltip.b-tooltip {
    display: block;
    opacity: 1;
}

.table th, .table td {
    padding: 0.62rem;
    /* padding: 0.75rem; */
    vertical-align: top;
    border-top: 1px solid #dee2e6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
span.aleftCao {
    background: #1ebc97;
    padding: 1px 10px;
    color: #fff;
    display: inline-block;
    border-radius: 3px;
    cursor: pointer;
}
span.aleftThap {
    background: #eb5055;
    padding: 1px 10px;
    color: #fff;
    display: inline-block;
    border-radius: 3px;
    cursor: pointer;
}

span.aleftTb {
    background: #5780a3;
    padding: 1px 10px;
    color: #fff;
    display: inline-block;
    border-radius: 3px;
}
span.aleftFree {
    background: #1ebc97;
    color: #fff;
    border-radius: 3px;
    padding: 2px 5px;
    font-weight: 500;
    cursor: pointer;
}

.mx-datepicker.mx-datepicker-range, .mx-panel-date,.mx-calendar-header,.mx-calendar-content {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.mx-datepicker-range {
    width: 100%;
}
.addnew {
    background: #50bbeb;
    border: 0;
    padding: 8px 25px 8px 10px;
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 20px;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    transition: 0.5s all;
    cursor: pointer;
    margin: 0 5px;
}
button.resetItem {
    background: #dc0000;
}
.frm-group-cs {
    margin-bottom: 15px;
}
.margin-frm {
    margin: 10px 0;
    /* margin: 50px 0; */
}
.frm-group-cs input {
    /*height: 40px;*/
}
.frm-group-cs .input-group-text {
    width: 180px;
    font-size: 14px;
}
form#resource .frm-group-cs .input-group-text {
    width: 155px;
}
.frm-group-cs .vue-treeselect{
    position: relative;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;
}
.frm-group-cs .vue-treeselect__control{
    border-radius:0 5px 5px 0;
}
button.moveItem span {
    padding-left: 10px;
}
button.resetItem span {
    padding-left: 10px;
}
.custom-prepend {
    position: relative;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;
}
.custom-prepend .mx-datepicker {
    width: 100%;
}
.custom-prepend .mx-datepicker input {
    border: 1px solid #dfdfdf;
    box-shadow: none;
    border-radius: 0 5px 5px 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.box-report .input-group-text {
    width: 150px;
}
.custom-prepend-report .input-group-text {
    width: 70px;
}
.custom-multi .input-group-text {
    height: 40px;
}
.custom-multi.frm-group-cs input {
    height: 32px;
}
div#bv-modal-create___BV_modal_outer_,div#bv-modal-edit___BV_modal_outer_, div#bv-modal-call___BV_modal_outer_, div#bv-modal-undo-resource___BV_modal_outer_{
    z-index: 9999999 !important    ;
}
div#bv-modal-detail___BV_modal_outer_, div#bv-modal-edit___BV_modal_outer_,div#bv-modal-call___BV_modal_outer_, div#bv-modal-undo-resource___BV_modal_outer_ {
    z-index: 9999999 !important;
}
div#bv-modal-call___BV_modal_outer_ .modal-dialog {
    /* max-width: 450px; */
    max-width: 1350px;
}
.modal-dialog {
    max-width: 800px;
}
.modal-header h3 {
    font-size: 15px;
    font-weight: normal;
    margin: 0;
    padding: 0;
}
.modal-header button {
    font-size: 20px;
    padding: 12px 15px !important;
}
.popup-footer {
    text-align: right;
}
.frm-group-cs input {
    /*height: 40px;*/
    font-size: 14px;
}
.frm-group-cs input.mx-input {
    height: 35px;
}
.popup-footer .btn-primary {
    background: #2196F3;
    border-color: #2196F3;
}
.handleNotice{
    text-align: center
}
.handleNoticeItem {
    width: 500px;
    float: none;
    display: inline-block;
}

span.aleftcall {
    background: #41bc9a;
    color: #fff;
    padding: 2px 5px;
    border-radius: 3px;
    cursor: pointer;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    transition: 0.5s all;
    position: relative;
}
span.aleftcall:hover {
    background: #188668;
    color: #fff;
}

th.classThoiluong {
    width: 100px;
}
th.classphone {
    width: 110px;
}
th.classNglh {
    width: 125px;
}

/* .body-table.activemod table#my-table-customer table tr td:nth-child(8) {
    display: none;
} */



div#bv-modal-detail___BV_modal_outer_ .modal-dialog, div#bv-modal-undo-resource___BV_modal_outer_ .modal-dialog {
    max-width: 550px;
}
span.nguoilienhe svg {
    color: #28a745;
    cursor: pointer;
}
span.nguoilienhe:hover{
    cursor: pointer;
     color: #28a745;
}


span.errors {
    float: left;
    padding-left: 15px;
    margin-bottom: 20px;
    font-size: 13px;
    color: #d20707;
    display: none;
}
.error-groups .errors {
    display: block;
}
.success-groups input {
    border-color: #28a745;
}
.btn-call {
    text-align: right;
    border-top: 1px solid #e9e9e9;
    margin-top: 20px;
    padding: 0;
    float: left;
    width: 100% !important;
    padding-right: 30px;
}
.btn-call button {
    display: inline-block;
    float: none;
    /* width: 101px; */
    padding: 4px 15px;
}
.handleyes {
    background: #0d96a7;
    border-color: #0d96a7;
}
.handleno {
    background: #dc0000;
    border-color: #dc0000;
}
.handleyes:hover {
    /* background: #108b9f !important;
    border-color: #108b9f !important; */
}
.handleno:hover {
    background: #dc0000;
    border-color: #dc0000;
}
div#bv-modal-call___BV_modal_body_ {
    padding: 15px 0;
}
div#bv-modal-call___BV_modal_body_ h3 {
    font-size: 24px;
    margin: 20px 0;
    color: #f15a3f;
    margin-top: 10px;
    margin-bottom: 30px;
}
div#bv-modal-call___BV_modal_body_ span {
    font-weight: bold;
    font-size: 22px;
}
.icon-user-show span svg {
    font-size: 30px;
    color: #fff;
}
.icon-user-show span {
    height: 70px;
    width: 70px;
    background: #45484a;
    display: inline-block;
    line-height: 70px;
    border-radius: 50%;
}
.icon-user-show {
    margin: 20px 0;
    margin-top: 10px;
}
span.showPhoneNumber {
    border: 1px solid #f15a3f;
    padding: 5px 20px;
    border-radius: 3px;
    font-weight: 600!important;
    display: inline-block;
}
.content-info-call .frm-group-cs .input-group-text {
    width: 135px;
}
.content-info-call {
    margin: 30px 0;
    padding: 0 5px;
    margin-bottom: 0;
}
.content-info-call .frm-group-cs textarea ,.content-info-call .vue-treeselect__single-value{
    font-size: 14px;
}
.icon-lock-show {
    margin-top: 15px;
}
div#bv-modal-undo-resource___BV_modal_body_ {
    padding: 0;
    padding-top: 30px;
    padding-bottom: 20px;
}
.undo-resource {
    padding-bottom: 10px;
}
div#bv-modal-undo-resource .btn-call {
    padding-right: 0px;
}
.undo-resource p b {
    color: #f15a3f;
}
.undo-resource span {
    color: #848484;
    font-size: 16px;
}
.undo-resource span b {
    color: #f15a3f;
    font-size: 17px;
}
span.aleftPhone {
    background: #3ea6b3;
    color: #fff;
    border-radius: 3px;
    padding: 2px 5px;
    font-weight: 500;
    cursor: pointer;
}
/* phan trang pagination */
div#pagination ul li:last-child a {
    border-radius: 0 3px 3px 0;
}
div#pagination ul li:first-child a {
    border-left: 1px solid #ccc;
}
div#pagination ul li a {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #6c757d;
    background-color: #fff;
    border: 1px solid #dee2e6;
    cursor: pointer;
}
div#pagination ul li a.disble {
    color: #d6d6d6;
    cursor: not-allowed;
    background: #fff !important;
    border: 1px solid #ccc !important;
    border-left: 0 !important;
}
div#pagination ul li:first-child a {
    border-radius: 3px 0 0 3px;
}
div#pagination ul li {
    float: left;
    min-width: 4.2em;
    font-size: 14px;
    text-align: center;
    font-weight: 450;
}
div#pagination ul li.number-text,ul#pagination li .number-text{
    min-width: 2.8em;
}

div#pagination ul {
    float: left;
    width: 100%;

}
div#pagination {
    float: left;
    width: 100%;
    margin-top: 0.0em;
}
div#pagination ul li a.active {
    background: #f15b40;
    color: #fff;
    border-color: #f15b40;
}
.title_menu span {
    font-weight: bold;
    font-size: 15px !important;
}
.title_menu {
    padding-left: 10px;
}
.form-group {
    margin-bottom: 0.5rem;
}
label {
    margin-bottom: 0.8rem;
}
.table thead th {
    color: #343230;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
table td {
    text-transform: capitalize;
}
#bv-modal-call .btn-call {
    border: 0;
    text-align: center;
    margin-top: 10px;
    padding: 0;
    float: left;
    width: 100%!important;
    padding-right: 0;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
}
#bv-modal-call .btn-call button {
    margin: 0 15px;
    border: 0;
    border-radius: 3px;
    color: #fff;
    width: 100px;
}
div#bv-modal-call textarea {
    resize: none;
}
.mx-auto.btn-filter {
    text-align: center;
}
div#pagination ul li input {
    padding: 7px;
    border: 1px solid #ccc;
    width: 45px;
    text-align: center;
    color: #000;
    border-radius: 3px;
    margin-left: 10px;
}
div#pagination ul li.gopagi input {
    background: #fff;
    border-radius: 3px;
    -webkit-transition:0.5s all;
    -moz-transition:0.5s all;
    transition:0.5s all;
    width:50px;
}
div#pagination ul li.gopagi:hover input {
    background: #e7e7e7;
}
#bv-modal-call .btn-call button.disble {
    background: #d8d8d8;
    color: #333;
    border: #d8d8d8;
    cursor: not-allowed;
}
#bv-modal-call .btn-call button.disble:hover {
    background: #d8d8d8 !important;
    color: #333 !important;
    border: #d8d8d8 !important;
}
#bv-modal-call .mx-auto.btn-call.end-call button {
    width: auto !important;
}
span.aleftTrungbinh {
    background: #4d4f4e;
    padding: 1px 10px;
    color: #fff;
    display: inline-block;
    border-radius: 3px;
    cursor: pointer;
}
.logo-sidebar p {
    color: #b9b9b9;
    font-size: 14px;
    margin-bottom: 0;
}
div.btn-exel {
    display: inline-block;
}
/* main css */
div#home {
    float: left;
    width: 100%;
}
div.left-page {
    float: left;
    width: 250px;
    background: #343230;
    height: 100%;
    position: fixed;
    min-height: 100vh;
    top: 0;
    left: 0;
    z-index: 999;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    transition: 0.5s all;
}
div.right-page {
    float: left;
    width: -webkit-calc(100% - 250px);
    width: -moz-calc(100% - 250px);
    width: calc(100% - 250px);
    background: #fff;
    height: 100%;
    position: relative;
    min-height: 100vh;
    margin-left: 250px;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    transition: 0.5s all;
}
div#header {
    float: left;
    width: -webkit-calc(100% - 250px);
    width: -moz-calc(100% - 250px);
    width: calc(100% - 250px);
    background: #fafafa;
    position: fixed;
    top: 0;
    left: 250px;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    transition: 0.5s all;
    z-index: 999;
}
div#main-content {
    float: left;
    width: 100%;
    min-height: 300px;
    position: relative;
}
div#footer {
    float: left;
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
}
/* css #sidebar */
div#sidebar {
    float: left;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    height: 100vh;
}


/* css #main */
div#main-content {
    float: left;
    width: 100%;
    margin-top: 61px;
    margin-bottom: 100px;
}





/* css toggle sidebar */
div#home.sidebar-minisize .left-page {
    width: 50px !important;
    overflow: visible;
}
div#home.sidebar-minisize div#sidebar {
    width: 250px;
    overflow: visible;
}
div#home.sidebar-minisize .block-nav-sidebar h3 {
    display: none;
}

div#home.sidebar-minisize .right-page {
    margin-left: 50px !important;
    width: -webkit-calc(100% - 50px);
    width: -moz-calc(100% - 50px);
    width: calc(100% - 50px);
    /* transition: 0.5s all; */
    position: relative;
    z-index: 999;
}
div#home.sidebar-minisize div#header {
    left: 50px;
    width: -webkit-calc(100% - 50px);
    width: -moz-calc(100% - 50px);
    width: calc(100% - 50px);
}






/* css scrollbar */
/* width */
div#sidebar::-webkit-scrollbar {
  width: 8px;
}

/* Track */
div#sidebar::-webkit-scrollbar-track {
  box-shadow: none;
  border-radius: 5px;
}

/* Handle */
div#sidebar::-webkit-scrollbar-thumb {
    background: #383c40;
    border-radius: 5px;
}

/* Handle on hover */
div#sidebar::-webkit-scrollbar-thumb:hover {
    background: #383c40;
}

/* ==========================css sidebar */
/* css #sidebar */
div#sidebar {
    float: left;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    height: 100vh;
}
.logo-sidebar {
    float: left;
    width: 100%;
    text-align: center;
    padding: 15px 15px;
}
.logo-sidebar h3 {
    color: #b3b3b3;
    font-size: 15px;
    margin-top: 10px;
    white-space: nowrap;
}
.logo-sidebar h3 strong {
    color: #e3e3e3;
}
.img-logo-sibar img {
    border-radius: 50%;
    border: 4px solid #f15b40;
    background-clip: padding-box;
}
.nav-sidebar {
    float: left;
    width: 100%;
    padding-bottom: 50px;
}
.block-nav-sidebar {
    float: left;
    width: 100%;
}
.block-nav-sidebar ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-bottom: 5px;
    float: left;
    width: 100%;
    line-height: 1rem;
}
.block-nav-sidebar h3 {
    text-transform: uppercase;
    color: #b3b3b3;
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    padding: 10px 15px;
    float: left;
    width: 100%;
    /* background: #10151a; */
    white-space: nowrap;
}
.block-nav-sidebar ul li a {
    float: left;
    width: 100%;
    padding: 10px 15px;
    color: #b3b3b3;
    font-size: 14px;
    white-space: nowrap;
    padding-left: 10px;
}
.logo-sidebar h3:hover {
    color: #fff;
    cursor: pointer;
}
.block-nav-sidebar ul li {
    float: left;
    width: 100%;
}
.button-toggle-bottom {
    background: #1b1a19;
    float: left;
    width: 250px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    padding: 12.5px;
    text-align: right;
    color: #fff;
    cursor: pointer;
    padding-right: 20px;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    transition: 0.5s all;
}
/* .block-nav-sidebar ul li.active {
    background: #273f57;
} */
.block-nav-sidebar ul li.active a {
    background: #f15b40;
    color: #fff;
}
div#home.sidebar-minisize .block-nav-sidebar ul {
    width: 50px;
}
div#home.sidebar-minisize .block-nav-sidebar ul li.active {
    background:transparent;
}
div#home.sidebar-minisize .block-nav-sidebar ul li:hover a {
    background: #10151a;
    width: 250px;
    border-left: 4px solid #fff;
}
div#home.sidebar-minisize .block-nav-sidebar ul li:hover a span{
    display: block;
}
div#home.sidebar-minisize .block-nav-sidebar ul li:hover a span {
    float: left;
    padding-left: 30px;
}
div#home.sidebar-minisize .block-nav-sidebar ul li:hover a svg {
    float: left;
}
.button-toggle-bottom:hover {
    background: #343230;
}
/* css sidebar toggle */
div#home.sidebar-minisize .button-toggle-bottom {
    width: 50px;
}
div#home.sidebar-minisize .block-nav-sidebar h3 {
    display: none;
}
/* div#home.sidebar-minisize .logo-sidebar {
    display: none;
} */
div#home.sidebar-minisize .block-nav-sidebar ul li a span {
    display: none;
}
.block-nav-sidebar ul li a:hover {
    color: #fff;
    text-decoration: none;
}
.block-nav-sidebar ul li a svg {
    width: 26px !important;
    text-align: left !important;
}
.btn-submit .btn-block {
    display: inline-block;
    padding: 5px 30px 8px 30px;
    background: #1b808a;
    border-color: #1b808a;
    width: auto;
}
.btn-submit {
    text-align: center;
}
span.chitiet {
    background: #50bbeb;
    padding: 2px 5px;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
}
span.chitiet:hover {
    background: #14619f;
    -webkit-transition: 1s all;
    -moz-transition: 1s all;
    transition: 1s all;
}
span.span-error {
    float: left;
    width: 100%;
    color: #dc0a0a;
    font-size: 13px;
    padding-top: 10px;
    text-align: right;
}
.thongtintab {
    float: left;
    width: 100%;
    border: 1px solid #e1e1e1;
    padding: 30px 50px;
    border-radius: 0 0 4px 4px;
}
ul.tab-thongtin {
    float: left;
    width: 100%;
    display: flex;
    justify-content: flex-start;
}
ul.tab-thongtin li a {
    background: #fff;
    padding: 10px 25px;
    float: left;
    margin-right: 5px;
    color: #656565;
    text-decoration: none;
    border-radius: 4px 4px 0 0;
    font-size: 14px;
    border: 1px solid #e1e1e1;
    border-bottom: 0;
    width: 150px;
    text-align: center;
}
ul.tab-thongtin li.active a {
    background: #f7f7f7;
}
.no-data {
    float: left;
    width: 100%;
    text-align: center;
}
div#bv-modal-call___BV_modal_outer_.hiddenPopup {
    display: none;
}
button.btn.handleno.closes.btn-secondary {
    width: 85px;
    padding: 7px 20px;
}
form#resource.btn-isCancel .errors {
    display: none;
}
div#pagination ul li.nopage {
    display: none;
}
div#home.sidebar-minisize .logo-sidebar {
    /* display: none; */
    width: 50px;
    padding: 8px;
}
div#home.sidebar-minisize .logo-sidebar img {
    border-radius: 50%;
    border: 0;
    max-width: 100%;
    height: auto;
}
div#home.sidebar-minisize h3,div#home.sidebar-minisize p{
    display: none;
}
.control-toggle-sidebar span svg {
    color: #f15b40;
}
.error-group input {
    border-color: #f00;
}
div#bv-modal-create-branch .modal-dialog, div#bv-modal-edit-branch .modal-dialog, div#bv-modal-success .modal-dialog, div#__BVID__794___BV_modal_outer_ .modal-dialog {
    max-width: 500px;
}
#bv-modal-create .inactive{
    color: #cdcdcd;
}
span.addnew.addUser {
    /* background: #1da0b1; */
}
.btn-danger,.btn-danger:hover {
    /* color: #fff;
    background-color: #b3b3b3;
    border-color: #b3b3b3; */
}
.form-control:disabled, .form-control[readonly] {
    background-color: #f7f7f7;
    opacity: 1;
}
.input-group-text {
    background-color: #f7f7f7;
}
div#pagination ul li a:hover {
    z-index: 2;
    color: #0056b3;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
}
div#pagination ul li.noHover a:hover {
    background: none;
    color: #6c757d;
    cursor: default;
}
::placeholder,:-ms-input-placeholder, ::-ms-input-placeholder {
    color: #c4c4c4;
}
form#resource .frm-group-cs .input-group-text span {
    color: #f00;
    padding-left: 5px;
}
.input-group-prepend span {
    padding-left: 5px;
    color: #f00;
}
.vue-treeselect__placeholder {
    color: #787878 !important;
}
#my-table-report .table-statuscall, #my-table-report .table-statuscall > th, .table-statuscall > td {
    background-color: #f5f5f5;
}
#my-table-report .table-duration, #my-table-report .table-duration > th, .table-duration > td {
    background-color: #f5f5f5;
}
.btn-filter button:hover {
    background: #36ace1;
}
.btn-filter button.resetItem:hover {
    background: #eb5055;
}
.btn-filter button.moveItem:hover {
    background: #50a7eb;
}
span.addnew:hover {
    background: #36ace1;
}
.top-head-box label {
    width: 100%;
    float: left;
}

div#nodata-search {
  text-align: center;
  min-height: 20em;
}
div#pagination li.withHover a{
  font-weight: 510;
  color: #718eb7;
}
div#pagination li.number-text a.withHover {
  color: #718eb7;
  font-weight: 510;
}
.group-ip div.icon-u {
    background: #f15a40;
    color: #fff;
    width: 45px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    /*border-radius: 3px 0 0 3px;*/
    border: 1px solid #ced4da;
    border-right: 0;
}
/*tbody tr.table-connected {
    background-color: #f5deb3;
}

tbody tr.table-connected:hover {
    background-color: #f7ce84;
}

tbody tr.table-expired {
    background-color: #f5bdbd;
}

tbody tr.table-expired:hover {
    background-color: #ef7676;
}*/

b.connected {
    position: absolute;
    top: -8px;
    right: -10px;
    color: #ed6c6c;
}
span.aleftcall.connected-phone {
    background: #ed6c6c;
}
span.aleftcall.connected-phone:hover {
    background: #d44444;
}
#my-table-potential span.aleftcall.connected-phone {
    background: #eb5055;
}
#my-table-potential b.connected {
    color: #eb5055;
}
.modal-content, .form-control{
    font-size:14px;
}
span.aleftThap:hover {
    background: #cc3737;
}
div#bv-modal-del-potential .modal-dialog {
    max-width: 550px;
}
div#bv-modal-del-potential___BV_modal_body_ {
    padding-left: 0;
    padding-right: 0;
}
div#bv-modal-del-potential___BV_modal_body_ .btn-call {
    padding-right: 0;
}
#bv-modal-call .mx-auto.btn-call.end-call button.mt-3.handleno.disable {
    background: #f99696;
    cursor: not-allowed;
}
.thongtin-tk-right.isCanle span {
    display: none;
}
span.title_success {
    font-size: 17px;
    padding: 0 30px;
}
span.title_success span {
    font-weight: bold;
}
p.notechitiet {
    font-size: 16px;
    padding: 20px 0;
}
div#bv-modal-rehistory .modal-dialog.modal-md {
    max-width: 550px;
}
div#bv-modal-rehistory .modal-dialog.modal-md .modal-body {
    padding: 15px 0;
}
div#bv-modal-rehistory .d-block.text-center {
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 20px;
}
h3.title-logs {
    float: left;
    width: 100%;
    border: 1px solid #e4e4e4;
    font-size: 14px;
    padding: 10px;
    margin-bottom: 0;
}
.left-logs ul li a {
    text-decoration: none;
    color: #333;
    font-size: 12px;
    padding: 5px 10px;
    float: left;
    width: 100%;
}
.left-logs ul li {
    float: left;
    width: 100%;
    border-bottom: 1px solid #efefef;
}
.left-logs ul {
    float: left;
    width: 100%;
    border: 1px solid #efefef;
    border-top: 0;
    height: 65vh;
    overflow-y: scroll;
}
.left-logs ul li a:hover {
    background: #f2f2f2;
}
.content-logs-item {
    float: left;
    width: 100%;
    border: 1px solid #f2f2f2;
    border-top: 0;
    padding: 5px 10px;
    font-size: 12px;
    height: 65vh;
    overflow-y: scroll;
    background: #353535;
    color: #fff;
}
.left-logs ul li a.active {
    background: #f2f2f2;
}
.content-testopt {
    text-align: center;
    border: 1px dashed #d4d4d4;
    width: 500px;
    padding: 30px 0;
    margin: 0 auto;
    margin-top: 30px;
}
div#content-testopt {
    text-align: center;
    float: left;
    width: 100%;
}
.item-test h3 {
    margin: 0;
    font-size: 20px;
    margin-bottom: 15px;
}
.item-test button {
    border: 0;
    background: #FF5722;
    padding: 4px 20px 6px 20px;
    color: #fff;
    display: inline-block;
    border-radius: 4px;
}
.result-t {
    float: left;
    width: 100%;
    margin-bottom: 20px;
}
.result-t span.alert-check {
    /* background: #f00; */
    padding: 1px 6px 3px 6px;
    border-radius: 3px;
    font-size: 12px;
    color: #333;
    /* color: #fff; */
}

/*css popup*/
div#popup-cs {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;      }
div#popup-cs.open {
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
}
.fade {
  transition: opacity 0.15s linear;
}
.modal-dialog-centered {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  min-height: calc(100% - 1rem);
}
.modal-dialogs {
  position: relative;
  width: auto;
  margin: 0.5rem auto;
  pointer-events: none;
  max-width: 500px;
  z-index: 1050;
}
.modal-backdrops {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
}
.content-popup {
  background: #fff;
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
  font-size: 14px;
}
.title-popup {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}
.title-popup h3 {
  margin: 0;
  font-size: 18px;
}
.title-popup button {
  font-size: 20px;
  padding: 12px 15px !important;
  padding: 0;
  background-color: transparent;
  border: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.title-popup .close {
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem auto;
}
.popup-footers {
  float: left;
  width: 100%;
  text-align: right;
  padding: 10px;
}
.caption-content-popup {
  float: left;
  width: 100%;
  text-align: center;
  padding: 15px;
  font-size: 14px;
}

/* width */
.left-logs ul::-webkit-scrollbar, .content-logs-item::-webkit-scrollbar  {
  width: 8px;
}

/* Track */
.left-logs ul::-webkit-scrollbar-track, .content-logs-item::-webkit-scrollbar-track  {
  box-shadow: none;
  border-radius: 2px;
}

/* Handle */
.left-logs ul::-webkit-scrollbar-thumb, .content-logs-item::-webkit-scrollbar-thumb  {
    background: #e6e6e6;
    border-radius: 2px;
}

/* Handle on hover */
.left-logs ul::-webkit-scrollbar-thumb:hover, .content-logs-item::-webkit-scrollbar-thumb:hover  {
    background: #e6e6e6;
}
div#content-testopt .container {
    display: flex;
    flex-direction: column;
}
.item-test input {
    border: 0;
    background: #FF5722;
    padding: 4px 20px 6px 20px;
    color: #fff;
    display: inline-block;
    border-radius: 4px;
    margin-top: 15px;
}
.adisabled {
  pointer-events: none;
  cursor: default;
  opacity: 0.6;
}
span.cusNotice {
    font-size: 12px;
    color: #ababab;
    font-style: italic;
    font-weight: 300;
}
.endcall img {
    height: 40px;
    border-radius: 100%;
    transform: rotate(-240deg);
    cursor: pointer;
}
.endcall {
    position: absolute;
    right: 25%;
    top: 5%;
}
span#error {
    text-align: right;
    display: inherit;
    font-size: 12px;
    color: #d4680c;
}
/*  */
.line-top-info {
    float: left;
    width: 100%;
    display: flex;
    font-size: 13px;
    padding: 20px;
}
.line-left-info-top {
    flex-grow: 2;
    display: flex;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    flex-basis: 66%;
}
.item-line-info {
    flex-grow: 1;
    border: 1px solid #ccc;
    border-top: 0;
    border-left: 0;
    flex-basis: 50%;
}
div#bv-modal-call___BV_modal_body_ h3.title-line-info {
    font-size: 15px;
    color: #000;
    margin-bottom: 10px;
    padding: 0px 10px;
}
.content-line-info {
    border-top: 1px solid #ccc;
    padding: 10px;
    float: left;
    width: 100%;
    overflow-y: scroll;
    height: 400px;
}
.content-line-info p {
    margin-bottom: 5px;
}
.desc-package-item {
    flex-grow: 1;
}
.desc-package-item h4 {
    font-size: 15px;
    color: #000;
}
.button-dk {
    flex-basis: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.button-dk button {
    border: 0;
    padding: 3px 12px 5px 12px;
    background: #f1593f;
    color: #fff;
    font-size: 13px;
    display: inline-block;
}
.list-package-item {
    float: left;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
}
.line-right-info-top {
    flex-grow: 1;
    flex-basis: 33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-left: 0;
}
.line-bottom-info {
    float: left;
    width: 100%;
    padding: 20px;
    font-size: 13px;
}

div#bv-modal-call___BV_modal_body_ h3.title-package {
    font-size: 15px;
    color: #000;
    margin-bottom: 10px;
    padding: 0px 10px;
}
.desc-packa {
    float: left;
    width: 100%;
    border-top: 1px solid #ccc;
    padding: 10px;
}
.item-bottom-info {
    border-left: 1px solid #ccc;
    float: left;
    width: 33.333%;
    /* margin-bottom: 10px; */
    border-bottom: 1px solid #ccc;
}
.box-bottom-info {
    float: left;
    width: 100%;
    border: 1px solid #ccc;
    /* display: flex; */
    border-left: 0;
    border-bottom: 0;
}
.desc-package-item p {
    margin-bottom: 5px;
}
strong.color-phone {
    color: #f1583f;
}
form#lead-form span.error {
    color: #d4680c;
    font-size: 12px;
    float: right;
}
form#form-user span.error {
    font-size: 12px;
    text-align: left;
    display: inherit;
    padding-top: 1px;
    color: #d4680c;
}
.custom-prependd .mx-datepicker {
    flex-grow: 1;
}
button.used_package {
    background: #0e96a7;
}
.desc-package-item p font {
    color: #f1583f;
}
.table thead th.widht3 {
    width: 130px;
}
.button-dk.active button {
    background: #0e96a7;
}
button.huydk{
    display: inline-block;
    float: none;
    padding: 4px 15px;
    color: #fff;
    border: 0;
    border-radius: 3px;
}
</style>
<style>
@import './assets/css/mobile.css';
</style>