<template>
    <div class="footer">
        <!-- <h2>Powered by <strong>AdFilex</strong> </h2> -->
        <h2>Powered by <img src="../../assets/images/logo_ospg.png" alt=""></h2>
    </div>
</template>

<script>
    export default {
        computed: {
            user () {
                return this.$store.state.authentication.user;
            },
            info () {
                return this.$store.state.users.info;
            }
        },
    }
</script>

<style scoped>
.footer {
    color: #23282c;
    background: #fbfbfb;
    border-top: 1px solid #c8ced3;
    float: left;
    width: 100%;
    text-align: right;
}
.footer h2 img {
    height: 20px;
    padding-left: 3px;
}
.footer h2 {
    font-size: 14px;
    font-weight: normal;
    margin: 0;
    padding: 13px 15px;
    display: flex;
    justify-content: flex-end;
}
</style>