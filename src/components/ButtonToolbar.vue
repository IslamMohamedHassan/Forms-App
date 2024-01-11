<template>
    <div>
        <div class="btn-comp bg-white rounded-2 shadow-sm " :class="{ 'btn-group-vertical': isVertical, 'btn-group': !isVertical }" role="group" aria-label="Button group">
            <button type="button" class="btn btn-light" @click="addComponent" v-tippy="{ content: 'Add Question', placement: 'right'  }" >
                <span v-html="plusIcon"></span>
            </button>
            <button  type="button" class="btn btn-light" @click="openModal('question','any data')"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" v-tippy="{ content: 'Import Question', placement: 'right' }">
                <span v-html="importQuestionsIcon"></span>
            </button>
            <button type="button" class="btn btn-light" v-tippy="{ content: 'Add title And Description', placement: 'right' }">
                <span v-html="titleIcon"></span>
            </button>
            <button type="button" class="btn btn-light" @click="openModal('image','any data')" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  v-tippy="{ content: 'Add Image', placement: 'right' }" >
                <span v-html="imageIcon"></span>
            </button>
            <button type="button" class="btn btn-light" @click="openModal('video','any data')" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  v-tippy="{ content: 'Add Video', placement: 'right' }" >
                <span v-html="videoIcon"></span>
            </button>
            <button type="button" class="btn  btn-light" v-tippy="{ content: 'Add Section', placement: 'right' }" >
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

            // icons
            plusIcon : svgIcons.plus,
            importQuestionsIcon : svgIcons.importQuestions,
            titleIcon : svgIcons.title,
            imageIcon: svgIcons.image,
            videoIcon: svgIcons.video,
            rectangleIcon: svgIcons.rectangle,
            isVertical: true,

        }
    },
    components:{
    }
    ,
    methods:{
        ...mapActions(formStore,['addComponent','openModal']),

    // update Button Group (responsive)
    updateButtonGroupType() {
      this.isVertical = window.innerWidth >= 600;
    },
       
    },
    mounted() {
    this.updateButtonGroupType(); // Initial check
    window.addEventListener('resize', this.updateButtonGroupType);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateButtonGroupType);
  },
   
}
</script>

<style>

@media (max-width : 600px) {

  div.btn-comp.btn-group{
    position: fixed;
    bottom: 0px !important;
    right: 0px !important;
    left: 0px !important;
    width:100%;
  }
}

</style>