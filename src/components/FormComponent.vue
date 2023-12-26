<template>
  <section class="py-5 m-auto w-50 border border-1 border-dark mt-5 rounded-3">
    <div class="container">
      <div class="form-wrapper row justify-content-between align-items-center">
        <div class="col-lg-8">
          <input class="form-control" type="text" placeholder="Question">
        </div>
        <div class="col-lg">
          <div class="image-label">
            <label for="up-img"><i class="fa fa-image"></i></label>
            <input style="display: none;" type="file" id="up-img">
          </div>
        </div>
        <div class="col-lg-3">
          <div class="dropdown w-100">
            <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ selectedValue }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li v-for="option in optionValues" :key="option.value">
                <a class="dropdown-item" @click="updateSelectedValue(option.value)">
                  <i v-if="option.icon" :class="`ms-2 ${option.icon}`"></i>
                      {{ option.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Start row of multi choice and multi Checkboxes -->
      <div class="row align-items-center" v-if="selectedValue === 'Multiple Choice' || selectedValue == 'Checkboxes' || selectedValue == 'Dropdown'">
        <div class="d-flex align-items-center justify-content-between" v-for="(option,i) in  multipleChoiceOption" :key="i" >
          <div>
            <input v-if="selectedInput == 'radio'" :type="selectedInput"  class="form-check-input custom-radio"  disabled>
            <input v-else-if="selectedInput == 'checkbox'" :type="selectedInput"  class="form-check-input custom-radio"  disabled>
          </div>
          <div class="w-100">
            <input type="text" class="answer-title w-100"  :placeholder="option.placeholder">
          </div>
          <div v-if="option.placeholder !== 'others' && selectedValue !== 'Dropdown'" class="image-label ms-3">
            <label for="up-img"><i class="fa fa-image"></i></label>
            <input style="display: none;" type="file" id="up-img">
          </div>
          <div class="ms-3 d-flex">
            <button @click="removeOption(option.id)" class="border-0 bg-transparent fw-bold fs-4 "><i class="fa-solid fa-x text-secondary"></i></button>
          </div>
        </div>
        <div class="col-12 py-3">
          <button class=" border-0 bg-transparent add-field-btn" @click="addOption">Add Option</button>
          <span v-if="addOtherBtn && selectedValue !== 'Dropdown'"> or</span>
          <button v-if="addOtherBtn && selectedValue !== 'Dropdown'"  :class="`border-0 bg-transparent add-field-btn text-primary ${!addOtherBtn? 'd-none':''}`" @click="addOther">Add "Other"</button>
        </div>
      </div>
      <!-- End row of multi choice and multi Checkboxes -->

       <!-- Start row of Short Answer & Paragraph & Date & Time -->
      <div class="row align-items-center" v-if="selectedValue === 'Short Answer' || selectedValue === 'Paragraph' || selectedValue === 'Date' || selectedValue === 'Time'">
        <div>          
          <input :type="selectedInput" :placeholder="getSelectedPlaceholder(selectedValue)" disabled class="form-control">
        </div>
      </div>
      <!-- Start row of Short Answer & Paragraph & Date & Time -->

      <!-- Start row of FileUpload -->
      <div  v-if="selectedValue === 'File Upload'">
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
                    {{numOfFiles}}
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" @click="updateNumOfFilesDropdown('1')" href="#">1</a></li>
                    <li><a class="dropdown-item" @click="updateNumOfFilesDropdown('5')" href="#">5</a></li>
                    <li><a class="dropdown-item" @click="updateNumOfFilesDropdown('10')" href="#">10</a></li>
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
                    {{sizeOfFiles}}
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" @click="updateSizeOfFilesDropdown('1 MB')" >1 MB</a></li>
                    <li><a class="dropdown-item" @click="updateSizeOfFilesDropdown('10 MB')" >5 MB</a></li>
                    <li><a class="dropdown-item" @click="updateSizeOfFilesDropdown('100 MB')" >100 MB</a></li>
                    <li><a class="dropdown-item" @click="updateSizeOfFilesDropdown('1 GB')" >1 GB</a></li>
                    <li><a class="dropdown-item" @click="updateSizeOfFilesDropdown('10 GB')" >10 GB</a></li>
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

      <!-- End row of FileUpload -->

      <hr class="my-5">

      <div class="row">
        <div class="col-lg-12 d-flex justify-content-end">
          <div class="me-3 btn-icon">
            <button class="border-0 bg-transparent"><i class="fa-regular fa-copy"></i></button>
          </div>
          <div class="me-3 btn-icon">
            <button class="border-0 bg-transparent"><i class="fa-regular fa-trash-can "></i></button>
          </div>
          <div class="d-flex align-items-center border-start border-3">
            <label class="form-check-label me-2 ms-3" for="flexSwitchCheckDefault">Required</label>
            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: 'Multiple Choice',
      selectedInput: 'radio',
      multipleChoiceOption : [{ placeholder: `option 1`, image: null }],
      count : 1,

      // checkbox 
      // flag to change others button
      addOtherBtn :true,

      // File data
      fileOptions: [
        { value: 'Document', label: 'Document' },
        { value: 'Presentation', label: 'Presentation' },
        { value: 'Spreadsheet', label: 'Spreadsheet' },
        { value: 'Drawing', label: 'Drawing' },
        { value: 'PDF', label: 'PDF' },
        { value: 'Image', label: 'Image' },
        { value: 'Video', label: 'Video' },
        { value: 'Audio', label: 'Audio' },
      ],
      fileTypes : false,
      numOfFiles: "1",
      sizeOfFiles: "10 Mb",

    };
  },
  // watch the select box changes 
  watch: {
    selectedValue(newVal) {
      const selectedOption = this.optionValues.find(option => option.value === newVal);
      if (selectedOption) {
        this.selectedInput = selectedOption.inputType;
        this.resetOptionIdsAndLabels()
      }
    },
  },
  methods: {

    updateSelectedValue(value) {
      this.selectedValue = value;
    },

    //  Add Option to multiple Choices & CheckBox & Dropdown 
    addOption() {
      this.count++
      this.multipleChoiceOption.push({ id: this.count,  placeholder: `option` + this.count, image: null });
      this.resetOptionIdsAndLabels()
    },

     //  Add other Field to multiple Choices & CheckBox & Dropdown 
    addOther() {
      this.count++
      this.multipleChoiceOption.push({ id: this.count,  placeholder: `others`, image: null });
      this.addOtherBtn = !this.addOtherBtn;
    },

    //  Remove Option From multiple Choices & CheckBox & Dropdown 
    removeOption(id){
      const indexToRemove = this.multipleChoiceOption.findIndex(option => option.id === id);

  if (indexToRemove !== -1) {
    const removedOption = this.multipleChoiceOption[indexToRemove];

    // Remove the option using splice
    this.multipleChoiceOption.splice(indexToRemove, 1);

    // Check if the removed option is the "others" placeholder
    if (removedOption.placeholder === "others") {
      this.addOtherBtn = true;
    }
    }
    this.resetOptionIdsAndLabels();
  },

  // Make The Options Ordered
  resetOptionIdsAndLabels() {

  const otherOption = this.multipleChoiceOption.find(option => option.placeholder === "others");

  if (otherOption) {
    const nonOtherOptions = this.multipleChoiceOption.filter(option => option.placeholder !== "others");
    const updatedOptions = [...nonOtherOptions, otherOption];

    updatedOptions.forEach((option, index) => {
      option.id = index + 1;
      console.log(updatedOptions);

      if (this.selectedValue == "Dropdown") {
          option.placeholder = `Option ${index + 1}`;
          this.addOtherBtn = true
      }else
      option.placeholder = option.placeholder === "others" ? "others" : `Option ${index + 1}`;
    });

    this.multipleChoiceOption = updatedOptions;
  } else {
    this.multipleChoiceOption.forEach((option, index) => {
      option.id = index + 1;
      option.placeholder = `Option ${index + 1}`;
    });
  }
},

// change the placeholder od Fields when change the select box 
    getSelectedPlaceholder(selectedValue){
     const selectedOption = this.optionValues.find(option => option.value === selectedValue);
      console.log(selectedOption);
    return selectedOption ? selectedOption.placeholder : '';
    },

    // update the number of files dropdown 
    chooseFileTypes() {
      this.fileTypes = !this.fileTypes;
    },
    // update the number of files dropdown 
    updateNumOfFilesDropdown(value) {
      this.numOfFiles = value;
    },
    // update the number of files dropdown 
    updateSizeOfFilesDropdown(value) {
      this.sizeOfFiles = value;
    },
  },
  beforeMount(){
   
  },
  mounted(){

  },
  computed: {
    optionValues() {
      return [
        { value: 'Short Answer', label: 'Short Answer', inputType: 'text', placeholder : "Short Answer Text" , icon:'fa-solid fa-align-right' },
        { value: 'Paragraph', label: 'Paragraph', inputType: 'text',placeholder :  "Long Answer Text", icon:'fa-solid fa-mobile' },
        { value: 'Multiple Choice', label: 'Multiple Choice', inputType: 'radio',placeholder : "Option" },
        { value: 'Checkboxes', label: 'Checkboxes', inputType: 'checkbox',placeholder : "Option" },
        { value: 'Dropdown', label: 'Dropdown', inputType: 'text',placeholder : "" },
        { value: 'File Upload', label: 'File Upload', inputType: 'file',placeholder : "" },
        { value: 'Linear Scale', label: 'Linear Scale', inputType: 'text',placeholder : "" },
        { value: 'Multiple Choice Grid', label: 'Multiple Choice Grid', inputType: 'text',placeholder : "" },
        { value: 'Checkbox Grid', label: 'Checkbox Grid', inputType: 'text',placeholder : "" },
        { value: 'Date', label: 'Date', inputType: 'date' },
        { value: 'Time', label: 'Time', inputType: 'time' },
      ];
    },

  },
};
</script>

<style>
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
    border-bottom: 1px solid black;
    transition: 300ms all  ease-in-out;
  }

  .custom-radio{
    width: 25px !important; /* Set the desired width */
    height: 25px !important; /* Set the desired height */
  }
  .add-field-btn:hover{
    text-decoration: underline;
  }

</style>

<!-- <select class="form-select" v-model="selectedValue">
  <option v-for="option in optionValues" :key="option.value" :value="option.value">{{ option.label }}</option>
</select>

computed: {
optionValues() {
return [
{ value: 'Short Answer', label: 'Short Answer', inputType: 'text', placeholder : "Short Answer Text" },
{ value: 'Paragraph', label: 'Paragraph', inputType: 'text',placeholder :  "Long Answer Text" },
{ value: 'Multiple Choice', label: 'Multiple Choice', inputType: 'radio',placeholder : "Option" },
{ value: 'Checkboxes', label: 'Checkboxes', inputType: 'checkbox',placeholder : "Option" },
{ value: 'Dropdown', label: 'Dropdown', inputType: 'text',placeholder : "" },
{ value: 'File Upload', label: 'File Upload', inputType: 'file',placeholder : "" },
{ value: 'Linear Scale', label: 'Linear Scale', inputType: 'text',placeholder : "" },
{ value: 'Multiple Choice Grid', label: 'Multiple Choice Grid', inputType: 'text',placeholder : "" },
{ value: 'Checkbox Grid', label: 'Checkbox Grid', inputType: 'text',placeholder : "" },
{ value: 'Date', label: 'Date', inputType: 'date' },
{ value: 'Time', label: 'Time', inputType: 'time' },
];
} -->