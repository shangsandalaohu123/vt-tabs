<template>
  <div class="ui-tabs-content" v-show="active">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      title: String,
      closable: Boolean,
      disabled: Boolean
    },

    data() {
      return {
        index: null // set index the `TabNav` component
      }
    },

    computed: {
      isClosable() {
        return this.closable || this.$parent.closable
      },
      active() {
        return this.$parent.currentNav == this.index
      }
    },

    mounted() {
      if(this.$parent.$options.name == 'tabs'){
        this.$parent.addNav(this)
      }
    },

    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
      this.$parent.removeNav(this)
    },

    watch: {
      title() {
        this.$parent.$forceUpdate()
      }
    }
  };
</script>
