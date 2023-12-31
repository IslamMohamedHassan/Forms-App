import { defineStore } from 'pinia'


export const formStore = defineStore('formStore', {
  state: () => ({
    // select box  initial data
      selectedValue: 'Multiple Choice',
      selectedInput: 'radio',
    // component data
      containerMultipleChoiceOption: [[
        { data : [{ id:1 , placeholder: `Option`, image: null ,label:1 },{id:2, placeholder: `Row`, image: null },{id:3, placeholder: `Column`, image: null },]},
      // flag to display other button
      {addOtherBtn : true} ]] ,
      // end component data
      // id counter
      count : 1,

      // these to filter all option and i use it to  hide the remove btn if i have 1 option 
      regularOptions : [""],
      rowOptions : [""],
      columnOptions : [""],
      
     
      

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
      // dropdowns data
      dropdowns :{
        numOfFiles: "1",
        sizeOfFiles: "10 Mb",
        linearScaleStart : "1",
        linearScaleEnd : "5",
      },

      // switch flag file upload
      fileTypes : false,

      // component id 
      compId : "",
     
     
  }),
  getters: {

    //  computed to get the CompId from component
    getCompId(){
      return this.compId
    },

    optionValues() {
      return [
        { value: 'Short Answer', label: 'Short Answer', inputType: 'text', placeholder : "Short Answer Text" , icon:'<svg   xmlns="http://www.w3.org/2000/svg"  width="24" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#1E3050" d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 288zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160z"/></svg>' },
        { value: 'Paragraph', label: 'Paragraph', inputType: 'text',placeholder :  "Long Answer Text", icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#1E3050" d="M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z"/></svg>' },
        { value: 'Multiple Choice', label: 'Multiple Choice', inputType: 'radio',placeholder : "Option",icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#1E3050" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>' },
        { value: 'Checkboxes', label: 'Checkboxes', inputType: 'checkbox',placeholder : "Option",icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#1E3050" d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>' },
        { value: 'Dropdown', label: 'Dropdown', inputType: 'text',placeholder : "",icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#1E3050" d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM135 241c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l87 87 87-87c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 345c-9.4 9.4-24.6 9.4-33.9 0L135 241z"/></svg>' },
        { value: 'File Upload', label: 'File Upload', inputType: 'file',placeholder : "",icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#1E3050" d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>' },
        { value: 'Linear Scale', label: 'Linear Scale', inputType: 'text',placeholder : "",icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#1E3050" d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>' },
        { value: 'Multiple Choice Grid', label: 'Multiple Choice Grid', inputType: 'text',placeholder : "",icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#1E3050" d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40H40c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40V328zm32-192v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V136c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40H200c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V328zm32-192v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V136c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40H360c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V328z"/></svg>' },
        { value: 'Checkbox Grid', label: 'Checkbox Grid', inputType: 'text',placeholder : "",icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#1E3050" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 64v64H64V96h88zm56 0h88v64H208V96zm240 0v64H360V96h88zM64 224h88v64H64V224zm232 0v64H208V224h88zm64 0h88v64H360V224zM152 352v64H64V352h88zm56 0h88v64H208V352zm240 0v64H360V352h88z"/></svg>' },
        { value: 'Date', label: 'Date', inputType: 'date',icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/></svg>' },
        { value: 'Time', label: 'Time', inputType: 'time',icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>' },
      ];
    },
  },
  actions: {
   
  // function to pass the comp id from th component to store 

    intiCompId(param){
      this.compId = param
    },

  // fun to duplicate comp 
    duplicateComponent(componentIndex) {

      if (componentIndex >= 0 && componentIndex < this.containerMultipleChoiceOption.length) {
        const duplicatedArray = [...this.containerMultipleChoiceOption[componentIndex]];
        this.containerMultipleChoiceOption.splice(componentIndex + 1, 0, duplicatedArray);
        
      }
    },

      //  Add Option to multiple Choices & CheckBox & Dropdown 
      addOption(optionName,componentId) {
        this.count++
          this.containerMultipleChoiceOption[componentId][0].data.push({ id: this.count,  placeholder: optionName, image: null });
          if (optionName === "others") {
            this.containerMultipleChoiceOption[componentId].addOtherBtn = !this.containerMultipleChoiceOption[componentId].addOtherBtn
            console.log(this.containerMultipleChoiceOption[componentId].addOtherBtn);
            console.log('from add option', this.containerMultipleChoiceOption[componentId]);
            console.log("aaaa");
          }
          this.resetOptionIdsAndLabels(componentId)
      },

      // fun to change select box values
      updateSelectedValue(value,componentId) {
        if (componentId == this.getCompId) {
          this.selectedValue = value;
        }
      },
  
      //  Remove Option From multiple Choices & CheckBox & Dropdown 
      removeOption(id,componentId){

        const indexToRemove = this.containerMultipleChoiceOption[componentId][0].data.findIndex(option => option.id === id);
        
        console.log(indexToRemove);
    if (indexToRemove !== -1) {
      const removedOption = this.containerMultipleChoiceOption[componentId][0].data[indexToRemove];
      console.log(removedOption);

      // Remove the option using splice
      this.containerMultipleChoiceOption[componentId][0].data.splice(indexToRemove, 1);
  
      // Check if the removed option is the "others" placeholder
      if (removedOption.placeholder === "others") {
        this.containerMultipleChoiceOption[componentId].addOtherBtn = true;
      }
      }
      this.resetOptionIdsAndLabels(componentId);
    },
  
    // Make The Options Ordered
    resetOptionIdsAndLabels(componentId) {
  
  const otherOption = this.containerMultipleChoiceOption[componentId][0].data.find(option => option.placeholder === "others");
  const regularOptions = this.containerMultipleChoiceOption[componentId][0].data.filter(option => option.placeholder === "Option");
  const rowOptions = this.containerMultipleChoiceOption[componentId][0].data.filter(option => option.placeholder === "Row");
  const columnOptions = this.containerMultipleChoiceOption[componentId][0].data.filter(option => option.placeholder === "Column");
  
  if (otherOption) {
    const nonOtherOptions = this.containerMultipleChoiceOption[componentId][0].data.filter(option => option.placeholder !== "others");
    const updatedOptions = [...nonOtherOptions, otherOption];
    let optionCounter = 0;
    let rowCounter = 0;
    let columnsCounter = 0;
    updatedOptions.forEach((option, index) => {
              if (option.placeholder === 'Option') {
                  option.label = ++optionCounter;
                  option.id = index + 1;
              } 
              else if (option.placeholder === 'Row') {
                  option.id = index + 1;
                  option.label = ++rowCounter;
                  option.placeholder = 'Row';
              }
              else if (option.placeholder === 'Column') {
                  option.id = index + 1;
                  option.label = ++columnsCounter;
                  option.placeholder = 'Column';
              }
          });
  
          otherOption.id = updatedOptions.length + 1;
          otherOption.placeholder = 'others';
  
          if (this.selectedValue === "Dropdown") {
              const otherIndex = updatedOptions.findIndex(option => option.placeholder === "others");
              if (otherIndex !== -1) {
                  updatedOptions[otherIndex].placeholder = "Option";
                  this.containerMultipleChoiceOption[componentId].addOtherBtn = true;
              }
          }
    this.containerMultipleChoiceOption[componentId][0].data = updatedOptions;
  }else {
          let optionCounter = 0;
          let rowCounter = 0;
          let columnsCounter = 0;
  
          this.containerMultipleChoiceOption[componentId][0].data.forEach((option, index) => {
              if (option.placeholder === 'Option') {
                  option.id = index + 1;
                  option.label = ++optionCounter;
                  option.placeholder = 'Option';
              }
              if (option.placeholder === 'Row') {
                  option.id = index + 1;
                  option.label = ++rowCounter;
                  option.placeholder = 'Row';
              }
              if (option.placeholder === 'Column') {
                  option.id = index + 1;
                  option.label = ++columnsCounter;
                  option.placeholder = 'Column';
              }
          });
      }
  
      this.rowOptions = rowOptions;
      this.regularOptions = regularOptions;
      this.columnOptions = columnOptions;
  
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
      // handle all dropdown
      handleDropdowns(value,dropdownName){
        this.dropdowns[dropdownName] = value;
      },
  },
})