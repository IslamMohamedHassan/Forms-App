<script>
import { mapState } from 'pinia';
import FormComponent from '../components/FormComponent.vue'
import { formStore } from '@/stores/formStore';




export default{
  components:{
    FormComponent,
  },computed:{
    ...mapState(formStore,['containerMultipleChoiceOption']),
  },

}
</script>

<template>
   <div>
    <div v-for="(data,i) in containerMultipleChoiceOption" :key="i">
      <!-- Use the FormComponent template with the data from containerMultipleChoiceOption -->
      <FormComponent :componentIndex="i" />
    </div>
  </div>
</template>
