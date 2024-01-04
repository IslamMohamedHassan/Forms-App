


<template>
  
  <div>
    <div class="fixed-button-toolbar">
      <ButtonToolbar class="position-sticky"/>
    </div>
    <div class="scrollable-container">
      <Sortable
        :key="sortableKey"
        :list="getContainerMultipleChoiceOption"
        :options="sortableOptions"
        tag="div"
        item-key="id"
        @update="onSortUpdate"
      >
        <template #item="{ element, index }">
          <div :data-id="element.id"> 
            <FormComponent :componentIndex="index" :data="element" />
          </div>
        </template>
      </Sortable>
    </div>
 </div>
      
  
 </template>
 
   <script>
 import { mapActions, mapState } from 'pinia';
 import FormComponent from '../components/FormComponent.vue';
 import { formStore } from '@/stores/formStore';
 import { Sortable } from 'sortablejs-vue3';
import ButtonToolbar from '@/components/ButtonToolbar.vue';
 
 
 export default {
  components: {
     FormComponent,
     Sortable,
     ButtonToolbar
  },
  data() {
    return {
      sortableKey: 1,
      sortableOptions: {
        
      },
    };
 },
  computed: {
     ...mapState(formStore, ['getContainerMultipleChoiceOption','containerMultipleChoiceOption']),
  
  },
  methods: {
     ...mapActions(formStore, ['duplicateComponent', 'removeComponent','updateContainerMultipleChoiceOrder']),
     onSortUpdate(evt) {
     const newIndex = evt.newIndex;
     const oldIndex = evt.oldIndex;
 
    
     this.updateContainerMultipleChoiceOrder(newIndex,oldIndex);
     this.sortableKey += 1;
  },
 
 },
  mounted() {
     console.log(this.containerMultipleChoiceOption);
  },
 }
 </script>

<style scoped>
.fixed-button-toolbar {
 position: fixed;
 top: 35%;  
 right: 18%;
 z-index: 1000;
}

.scrollable-container {
 overflow-x: hidden;
}
</style>