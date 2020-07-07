<template>
    <div>
        <!-- popup add branch -->
        <b-modal
            id="bv-modal-alert"
            title="Thông báo!"
            :noCloseOnEsc="true"
            :noCloseOnBackdrop="true"
            :centered="true">
            <span id='error_alert'>{{message}}</span>
            <template v-slot:modal-footer="{ cancel }">
                <b-button variant="danger" @click="cancel()">
                    Đóng
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    export default {
        props:['message']
    }
</script>

<style  scoped>

</style>