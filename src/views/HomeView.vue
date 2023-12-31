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
      <FormComponent :componentIndex="i" :data="data" />
    </div>
  </div>
</template>
