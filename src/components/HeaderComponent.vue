<template>
    <header class="form-title-header pb-4 shadow-sm">
        <div class="border-1 border-bottom py-1">
            <Tiptap :title="'title'"/>
        </div>
        <div class="border-1 border-bottom py-1">
            <Tiptap :title="'description'"/>
        </div>
    </header>
</template>

<script>
import Tiptap from './Tiptap.vue';

export default {

    components:{
        Tiptap,
    },
}
</script>

<style>
    .form-title-header{
        border: 1px solid #d9d9d9;
        border-top: 10px solid #673ab7 ;
        border-radius: 10px;
        background-color: #fff;

    }
</style>