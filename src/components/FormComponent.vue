<template>
  <section class="py-3  mt-5 rounded-3 question-comp">
    <div class="container">
      <div class="form-wrapper row justify-content-between align-items-start">
        <div class="col-lg-8">
          <Tiptap :title="'question'"/>
        </div>
        <div class="col-lg">
          <div class="image-label">
            <label for="up-img"><i class="fa fa-image"></i></label>
            <input style="display: none;" type="file" id="up-img">
          </div>
        </div>
        <div class="col-lg-3 h-50px mt-1">
          <div class="dropdown w-100">
            <button class="btn btn-primary dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ getContainerMultipleChoiceOption[componentIndex].selectedValue }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li style="cursor:pointer" v-for="option in optionValues" :key="option.value">
                <a class="dropdown-item d-flex align-items-center" @click="updateSelectedValue(option.value,componentIndex)">
                  <span class="d-block  me-2" v-html="option.icon"></span>
                  <span class="d-block font-size-20">   {{ option.label }}</span> 
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Start row of multi choice and multi Checkboxes -->
      <div class="row align-items-center" v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Multiple Choice' || getContainerMultipleChoiceOption[componentIndex].selectedValue == 'Checkboxes' || getContainerMultipleChoiceOption[componentIndex].selectedValue == 'Dropdown'">
        <div  v-for="(option,i) in  data.data" :key="i" >
          <div class="d-flex align-items-center justify-content-between" v-if="option.placeholder !== 'Row' && option.placeholder !== 'Column'">
          <div>
            <input v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Multiple Choice'" type='radio'  class="form-check-input custom-radio"  disabled>
            <input v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Checkboxes'" type="checkbox"  class="form-check-input custom-radio"  disabled> 
          </div>
          <div class="w-100">
            <input type="text" v-model="option.value" class="answer-title w-100"  :placeholder="(option.placeholder ==='Option') ? option.placeholder  + ' '+ option.label : option.placeholder">
          </div>
          <div v-if="option.placeholder !== 'others' && getContainerMultipleChoiceOption[componentIndex].selectedValue !== 'Dropdown'" class="image-label ms-3">
            <label for="up-img"><i class="fa fa-image"></i></label>
            <input style="display: none;" type="file" id="up-img">
          </div>
          <div class="ms-3 d-flex">
            <button v-if="getContainerMultipleChoiceOption[componentIndex].regularOptions.length !== 1 || option.placeholder === 'others'"  @click="removeOption(option.id,componentIndex)" class="border-0 bg-transparent fw-bold fs-4"><i class="fa-solid fa-x text-secondary"></i></button>
          </div>
        </div>
        </div>
        <div class="col-12 py-3">
          <button class=" border-0 bg-transparent add-field-btn" @click="addOption('Option',componentIndex)">Add Option</button>
          <span v-if="getContainerMultipleChoiceOption[componentIndex].addOtherBtn
          && getContainerMultipleChoiceOption[componentIndex].selectedValue !== 'Dropdown'
          "> or </span>
          <button v-if="getContainerMultipleChoiceOption[componentIndex].addOtherBtn 
          && getContainerMultipleChoiceOption[componentIndex].selectedValue !== 'Dropdown'
          "  :class="`border-0 bg-transparent add-field-btn text-primary ${!getContainerMultipleChoiceOption[componentIndex].addOtherBtn? 'd-none':''}`" @click="addOption('others',componentIndex)">Add "Other"</button>
        </div>
       
      </div> 
      <!-- End row of multi choice and multi Checkboxes -->

      <!--  Start row of Short Answer & Paragraph & Date & Time -->
      <div class="row align-items-center" v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Short Answer' || getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Paragraph' || getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Date' || getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Time'">
        <div>          
          <input :placeholder="getSelectedPlaceholder(getContainerMultipleChoiceOption[componentIndex].selectedValue)" :type="getContainerMultipleChoiceOption[componentIndex].selectedInput" disabled class="form-control">
        </div>
      </div>
      <!-- Start row of Short Answer & Paragraph & Date & Time -->

      <!-- Start FileUpload Row  -->
     <div  v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue === 'File Upload'">
        <div class="row align-items-center">
          <div class="col-lg-6 d-flex align-items-center justify-content-between">
              <p class="pt-3 w-75">Allow only specific file types</p>
              <div class="d-flex me-auto">
              <div class="form-check form-switch">
                <input class="form-check-input custom-switch" @click="chooseFileTypes" type="checkbox" role="switch" id="flexSwitchCheckDefault">
              </div>
             
            </div>
          </div>
        </div>
        <div v-if="fileTypes" class="row align-items-center">
          <div class="col-lg-6 d-flex flex-wrap">
            <div v-for="(option, index) in fileOptions" :key="index" class="form-check col-lg-6">
              <input
                type="checkbox"
                :id="'fileOption' + index"
                class="form-check-input"
                :value="option.value"

              />
              <label :for="'fileOption' + index" class="form-check-label">{{ option.label }}</label>
            </div>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-lg-6 d-flex align-items-center justify-content-between">
              <p class="pt-3 w-75">Maximum number of files</p>
              <div class="d-flex me-auto">
                <div class="dropdown">
                  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{dropdowns.numOfFiles}}
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" @click="handleDropdowns('1','numOfFiles')" href="#">1</a></li>
                    <li><a class="dropdown-item" @click="handleDropdowns('5','numOfFiles')" href="#">5</a></li>
                    <li><a class="dropdown-item" @click="handleDropdowns('10','numOfFiles')" href="#">10</a></li>
                  </ul>
                </div>
             
            </div>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-lg-6 d-flex align-items-center justify-content-between">
              <p class="pt-3 w-75">Maximum number of files</p>
              <div class="d-flex me-auto">
                <div class="dropdown">
                  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{dropdowns.sizeOfFiles}}
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" @click="handleDropdowns('1 MB','sizeOfFiles')" >1 MB</a></li>
                    <li><a class="dropdown-item" @click="handleDropdowns('10 MB','sizeOfFiles')" >5 MB</a></li>
                    <li><a class="dropdown-item" @click="handleDropdowns('100 MB','sizeOfFiles')" >100 MB</a></li>
                    <li><a class="dropdown-item" @click="handleDropdowns('1 GB','sizeOfFiles')" >1 GB</a></li>
                    <li><a class="dropdown-item" @click="handleDropdowns('10 GB','sizeOfFiles')" >10 GB</a></li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-lg-6 font-size-14">This form can accept up to 1 GB of files. <a href="#">Change</a></div>   
          <div class="col-lg-6 text-end"><a class="btn btn-outline-primary " href="#">View Folder</a> </div> 
        </div>
      </div>
      <!-- End FileUpload Row  -->

      <!-- Start linear scale Row-->
      <div class="mt-3"  v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Linear Scale'">
        <div class="row align-items-center justify-content-start">
          <div class="dropdown col-1">
              <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{dropdowns.linearScaleStart}}
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="handleDropdowns('0','linearScaleStart')">0</a></li>
                <li><a class="dropdown-item" @click="handleDropdowns('1','linearScaleStart')">1</a></li>
              </ul>
          </div>
          <div class="col-1 text-center">to</div>
          <div class="dropdown col-1 me-auto">
              <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{dropdowns.linearScaleEnd}}
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="handleDropdowns('2','linearScaleEnd')">2</a></li>
                <li><a class="dropdown-item" @click="handleDropdowns('3','linearScaleEnd')">3</a></li>
                <li><a class="dropdown-item" @click="handleDropdowns('4','linearScaleEnd')">4</a></li>
                <li><a class="dropdown-item" @click="handleDropdowns('5','linearScaleEnd')">5</a></li>
                <li><a class="dropdown-item" @click="handleDropdowns('6','linearScaleEnd')">6</a></li>
                <li><a class="dropdown-item" @click="handleDropdowns('7','linearScaleEnd')">7</a></li>
                <li><a class="dropdown-item" @click="handleDropdowns('8','linearScaleEnd')">8</a></li>
                <li><a class="dropdown-item" @click="handleDropdowns('9','linearScaleEnd')">9</a></li>
                <li><a class="dropdown-item" @click="handleDropdowns('10','linearScaleEnd')">10</a></li>
              </ul>
          </div>
        </div>
        <div class="row align-items-center justify-content-start mt-4">
          <div>
            <label class="me-2">{{dropdowns.linearScaleStart}}</label>
            <input class="border-0 " type="text"  v-model="option.value" placeholder="Label (optional)">
          </div>
        </div>
        <div class="row align-items-center justify-content-start mt-4">
          <div>
            <label class="me-2">{{dropdowns.linearScaleEnd}}</label>
            <input class="border-0 " type="text"  v-model="option.value" placeholder="Label (optional)">
          </div>
        </div>
      </div>
      <!-- End linear scale Row-->

      <!-- Start Multiple Choice Grid Row-->
      <div class="mt-3 row"  v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Multiple Choice Grid' || getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Checkbox Grid'">
        <div class="col-lg-6">
          <h6>Rows</h6>
          <div  v-for="(option,i) in  data.data" :key="i">
            <div v-if="option.placeholder == 'Row'">
              <label  class="me-1" for="">{{ option.label }} . </label>
              <input  class="border-0" type="text"  v-model="option.value" :placeholder="option.placeholder + ' ' + option.label">
              <button 
                v-if="getContainerMultipleChoiceOption[componentIndex].rowOptions.length !== 1"
                @click="removeOption(option.id,componentIndex)" class="border-0 bg-transparent fw-bold fs-6 "><i class="fa-solid fa-x text-secondary"></i></button>
            </div>
            
          </div>
          <div>
            <button   class=" border-0 bg-transparent add-field-btn text-primary mt-2" @click="addOption('Row',componentIndex)">Add Row</button>
          </div>
        </div>
        <div class="col-lg-6">
          <h6>Columns</h6>
          <div  v-for="(option,i) in  data.data" :key="i">
            <div class="d-flex align-items-center" v-if="option.placeholder == 'Column'">
              <input v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Multiple Choice Grid'"  class=" form-check-input custom-radio me-2" type="radio" disabled>
              <input v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Checkbox Grid'"  class=" form-check-input custom-radio me-2" type="checkbox" disabled>
              <input   class="border-0" type="text"  v-model="option.value" :placeholder="option.placeholder + ' ' + option.label">
              <button  
                v-if="getContainerMultipleChoiceOption[componentIndex].columnOptions.length !== 1"
                @click="removeOption(option.id,componentIndex)" class="border-0 bg-transparent fw-bold fs-6 "><i class="fa-solid fa-x text-secondary"></i></button>
            </div>
            
          </div>
          <div>
            <button   class=" border-0 bg-transparent add-field-btn text-primary mt-2" @click="addOption('Column',componentIndex)">Add Column</button>
          </div>
        </div>
      </div>
      <!-- End Multiple Choice Grid Row-->



      <hr class="my-2">

      <div class="row">
        <div class="col-lg-12 d-flex justify-content-end">
          <div class="me-3 btn-icon">
            <button class="border-0 bg-transparent" @click="duplicateComponent(componentIndex)"><i class="fa-regular fa-copy"></i></button>
          </div>
          <div class="me-3 btn-icon">
            <button  :disabled="getContainerMultipleChoiceOption.length === 1"   class="border-0 bg-transparent" @click="removeComponent(componentIndex)"><i class="fa-regular fa-trash-can "></i></button>
          </div>
          <div class="d-flex align-items-center border-start border-3">
            <label class="form-check-label me-2 ms-3" for="flexSwitchCheckDefault">Required</label>

            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="requiredSwitch(componentIndex)" role="switch" id="flexSwitchCheckDefault" :checked ="getContainerMultipleChoiceOption[componentIndex].required">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { formStore } from '@/stores/formStore';
import Tiptap from './Tiptap.vue';
import { mapActions, mapState } from 'pinia';

export default {

  components:{
    Tiptap,
  },
  computed: {
    ...mapState(formStore, ['getContainerMultipleChoiceOption','compId','count','fileOptions','dropdowns','fileTypes','optionValues']),
  },

  data() {
    return {
     
    };
  },
  props: {
    componentIndex: {
      type: Number,
    },
    data: {
      type: Object,
    },
  },
  // watch the select box changes 
  
    watch: {
   
  },
  methods: {
    ...mapActions(formStore, ['requiredSwitch','removeComponent','updateSelectedValue','addOption','removeOption','resetOptionIdsAndLabels','getSelectedPlaceholder','chooseFileTypes','handleDropdowns','duplicateComponent']),

  },
  

  mounted(){
  // console.log(this.data);
   
  },

  
 
};
</script>

<style>

.question-comp{
  background-color: #fff;
  border: 1px solid #d9d9d9;
}
  .image-label{
    width: fit-content;
    padding: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
  .btn-icon{
    width: fit-content;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
   
  }
  .btn-icon button{
    width: 100%; 
    display: block;
  }
  .btn-icon button i{
    font-size: 25px;
    color: #5f6368;
  }
  .btn-icon:hover{
    background-color: #f0f0f0 !important ;
    }
  .image-label:hover{
    background-color: #f0f0f0;
  }
  .image-label i {
    font-size: 30px;
    color: #5f6368;
    cursor: pointer;
  }
  .form-switch .form-check-input{
    width: 50px !important;
    height: 25px !important;
  }
  .answer-title{
    border: none;
    outline: none;
    margin-left: 10px;
    height: 40px;
    font-size: 20px;
  }
  .answer-title:focus{
    background-color: #f0f0f0;
    border-bottom: 1px solid #7e7e81;
    transition: 200ms all  ease-in-out;
  }

  .custom-radio{
    width: 25px !important; /* Set the desired width */
    height: 25px !important; /* Set the desired height */
  }
  .add-field-btn:hover{
    text-decoration: underline;
  }
  .h-50px{
    height: 50px;
  }

</style>
