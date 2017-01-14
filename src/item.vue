<style src="./style.css"></style>
<template>
    <li class="ui-tabs-content" data-ref="tabs-content" v-show="activate">
        <div class="ui-tabs-title__hidden"><slot name="title"></slot></div>
        <slot></slot>
    </li>
</template>
<script>
    export default{
        props: {
            disabled: Boolean,
            active:   Boolean
        },
        data(){
            return {
                activate: this.active
            }
        },
        mounted(){
            if(this.$parent.$options.name == 'tabs'){
                this.$parent.addItem(this)
            }
        }
    }
</script>