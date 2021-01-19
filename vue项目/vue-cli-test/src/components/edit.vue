<template>
  <div>
    <editor ref="editor"
            v-model="msg"
            :disabled="disabled"
            @onClick="onClick">
    </editor>
  </div>
</template>

<script>
  import editor from './TinymceEditor'

  export default {
    components: {
      editor
    },
    data() {
      return {
        msg: '',
        disabled: false
      }
    }
  }
</script>
