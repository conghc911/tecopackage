<template>
    <div id="breakcrumb">
        <ul>
            <li><a href="">Home</a></li>
            <li><a>/</a></li>
            <li class="active"><a href=""><slot /></a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
/* css Breakcrumb */
div#breakcrumb {
    float: left;
    width: 100%;
    border-bottom: 1px solid #e1e1e1;
    line-height: 42px;
    padding-left: 10px;
    display: none;
}
div#breakcrumb ul li a {
    padding: 10px 5px;
    color: #4267b2;
    font-size: 14px;
}
div#breakcrumb ul li.active a {
    color: #333;
}
div#breakcrumb ul li {
    float: left;
}
div#breakcrumb ul {
    float: left;
    width: 100%;
}

</style>