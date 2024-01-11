<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div>
    <!-- Tiptap EditorContent component -->

    <editor-content v-model="content" :editor="editor" @focus="handleFocus" @input="handleInput" />
    
    <!--  custom  buttons -->
    <div class="editor-buttons" :style="`opacity: ${showButtons? '1':'0'}; transition: ${showButtons? 'all 1s ease-in-out':''}; height: ${showButtons? '':'0'};`"> 
        <button @mousedown.prevent class="btn btn-light me-1" @click="toggleBold" v-html="svgContent.boldIcon"></button>
        <button @mousedown.prevent class="btn btn-light me-1" @click="toggleItalic" v-html="svgContent.italicIcon"></button>
        <button @mousedown.prevent class="btn btn-light me-1" @click="toggleUnderline" v-html="svgContent.underlineIcon"></button>
        <button @mousedown.prevent class="btn btn-light me-1" @click="insertLink" v-html="svgContent.insertLinkIcon"></button>
        <button @mousedown.prevent class="btn btn-light me-1" @click="removeFormat" v-html="svgContent.removeFormatIcon"></button>
      </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { formStore } from '@/stores/formStore';
import { mapState ,mapActions } from 'pinia';



export default {
  components: {
    EditorContent,
  },
  props:{
    title :{type : String},
    id:{type: Number},
    questionContent:{type:String}
  },
  data() {
    return {
      counter:1,
      editor: null,
      compId : '',
      content: '',
      showButtons: false,
      svgContent:{
          boldIcon :'<svg fill="#333" xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z"/></svg>',
          italicIcon :'<svg fill="#333" xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"/></svg>',
          underlineIcon :'<svg fill="#333" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M16 64c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H128V224c0 53 43 96 96 96s96-43 96-96V96H304c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H384V224c0 88.4-71.6 160-160 160s-160-71.6-160-160V96H48C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"/></svg>',
          insertLinkIcon :'<svg fill="#333" xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>',
          removeFormatIcon :'<svg fill="#333" xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L355.7 253.5 400.2 96H503L497 120.2c-4.3 17.1 6.1 34.5 23.3 38.8s34.5-6.1 38.8-23.3l11-44.1C577.6 61.3 554.7 32 523.5 32H376.1h-.3H204.5c-22 0-41.2 15-46.6 36.4l-6.3 25.2L38.8 5.1zm168 131.7c.1-.3 .2-.7 .3-1L217 96H333.7L301.3 210.8l-94.5-74.1zM327.3 353.9L272.9 311 243.3 416H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H309.8l17.6-62.1z"/></svg>',

      }

    };
  },
  computed:{
    ...mapState(formStore,["containerMultipleChoiceOption"])
  },
  methods: {
    ...mapActions(formStore,['updateContent']),

    handleInput(content){
      // console.log(content.target.innerHTML);
      // console.log(this.compId);
      // console.log(this.$props.id );
      const compId = this.compId
      this.updateContent(content,compId)
      // console.log(this.containerMultipleChoiceOption);
    },
    // handleInput(content) {
    //   console.log(content.target.innerHTML);
    //   // ... rest of your handleInput logic ...
    // },
   
  // handle hidden and show editor 
    handleFocus() {
      this.showButtons = true;
    },
    // handle hidden and show editor 
    handleBlur() {
    this.showButtons = false;
    },

    // editor(bold button)
    toggleBold() {
        // Clear existing formatting to prevent conflicts
      this.editor.chain().focus().unsetAllMarks().clearNodes().run();
      this.editor.commands.focus();

  
  // Toggle bold formatting
    this.editor.chain().focus().toggleBold().run();
    },
    // editor(Italic button)
    toggleItalic() {
      this.editor.chain().focus().toggleItalic().run();
    },

    // editor(underline button)
    toggleUnderline() {
        if (this.editor.isActive('underline')) {
        this.editor.chain().focus().unsetMark('underline').run();
      } else {
        this.editor.chain().focus().setMark('underline').run();
      }
    },
    // editor(insert link button)
    // insertLink() {
    //   const link = prompt('Enter a link:');
    //   if (link !== null) {
    //     this.editor.chain().focus().extendMarkRange('link').setLink({ href: link }).run();
    //   }
    // },
    removeFormat() {
      this.editor.chain().focus().unsetAllMarks().clearNodes().run();
    },
  },
  mounted() {

    this.compId = this.$props.id 
    if (this.$props.title === "description") {
    this.content = '<p>Form Description</p>';
  } else if (this.$props.title === "title") {
    this.content = '<p>Untitled form</p>';
  }
   else if (this.$props.title === "question") {
      this.content = this.containerMultipleChoiceOption[this.$props.id].questionValue;
    }
    
  
    
    this.editor = new Editor({
      content: this.content,
      extensions: [
        StarterKit,
        Underline
      ],
      autofocus: true,
      editorProps: {

    attributes: {
      class: this.$props.title,
    },
  },
    });
    

    // handle hidden and show editor 
    this.editor.on('focus', () => {
    this.handleFocus();
    });

    // handle hidden and show editor 
    this.editor.on('blur', () => {
    this.handleBlur();
    });

  },
  
  beforeUnmount() {
    this.editor.destroy();
  },


 
};
</script>
<style>
.editor-buttons-fade-enter-active {
  transition: opacity 2s; /* Adjust the duration as needed */
}
.editor-buttons-fade-enter, .editor-buttons-fade-leave-to {
  opacity: 0;
}



.description
{
  font-size: 16px;
    height: 40px;
    line-height: 40px;
    color: rgb(110, 113, 119);
    outline: none;
    padding: 0px 10px ;
    overflow: hidden; /* Hide content that overflows */
}
.title{
  font-size: 36px;
    height: 60px;
    line-height: 60px;
    outline: none;
    padding: 0px 10px ;
    overflow: hidden; /* Hide content that overflows */
}
.question{
    font-size: 25px;
    min-height: 50px;
    border-bottom: 1px solid black;
    line-height: 50px;
    outline: none;
    padding: 0px 10px ;
    overflow-y: visible; /* Hide content that overflows */
}
.question p {
  margin-bottom:0px !important ;
}

.question:focus{
    transition: 500ms all ease-in-out;
    background-color: #f0f0f0;
}
.active {
  /* Add your active styles here, for example: */
  background-color: #007bff !important;
  color: #fff;
}


</style>