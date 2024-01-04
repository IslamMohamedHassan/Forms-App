<template>
    <div>
        <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
            <button type="button" class="btn btn-secondary" @click="addComponent" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Add Question">
                <span v-html="plusIcon"></span>
            </button>
            <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Import Question">
                <span v-html="importQuestionsIcon"></span>
            </button>
            <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Add title And Description">
                <span v-html="titleIcon"></span>
            </button>
            <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Add Image">
                <span v-html="imageIcon"></span>
            </button>
            <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Add Video">
                <span v-html="videoIcon"></span>
            </button>
            <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Add Section">
                <span v-html="rectangleIcon"></span>
            </button>
        </div>
    </div>
</template>

<script>
import { svgIcons } from './icons/SvgIcons';
// import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";
import { formStore } from '@/stores/formStore';
import { mapActions } from 'pinia';


export default {
    data() {
        return {
            plusIcon : svgIcons.plus,
            importQuestionsIcon : svgIcons.importQuestions,
            titleIcon : svgIcons.title,
            imageIcon: svgIcons.image,
            videoIcon: svgIcons.video,
            rectangleIcon: svgIcons.rectangle,

        }
    },
    methods:{
        ...mapActions(formStore,['addComponent'])
    },
//     mounted() {
//     new Tooltip(document.body, {
//       selector: "[data-bs-toggle='tooltip']",
//     })
//   }
   
}
</script>

<style>

</style>