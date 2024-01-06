<template>
    <div>
        <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
            <button type="button" class="btn btn-secondary" @click="addComponent" v-tippy="{ content: 'Add Question', placement: 'right'  }" >
                <span v-html="plusIcon"></span>
            </button>
            <button type="button" class="btn btn-secondary"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" v-tippy="{ content: 'Import Question', placement: 'right' }">
                <span v-html="importQuestionsIcon"></span>
            </button>
            <button type="button" class="btn btn-secondary" v-tippy="{ content: 'Add title And Description', placement: 'right' }">
                <span v-html="titleIcon"></span>
            </button>
            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  v-tippy="{ content: 'Add Image', placement: 'right' }" >
                <span v-html="imageIcon"></span>
            </button>
            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  v-tippy="{ content: 'Add Video', placement: 'right' }" >
                <span v-html="videoIcon"></span>
            </button>
            <button type="button" class="btn btn-secondary " v-tippy="{ content: 'Add Section', placement: 'right' }" >
                <span v-html="rectangleIcon"></span>
            </button>
        </div>
    </div>
</template>

<script>
import { svgIcons } from './icons/SvgIcons';
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