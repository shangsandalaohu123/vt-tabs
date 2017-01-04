<style src="./style.css"></style>
<template>
    <li class="ui-tabs-item"
        :class="{
            'ui-tabs-item--active': selected,
            'ui-tabs-item--disabled': disabled
            }"
        @click="trigger">
        <slot name="title"></slot>
        <div class="ui-tabs-content__hidden">
            <slot></slot>
        </div>
    </li>
</template>
<script>
    let cache
    export default{
        props: {
            disabled: Boolean,
            active: Boolean
        },
        data(){
            return {
                selected: this.active
            }
        },
        // use data and monitor it with watch, so first time change not trigger
        watch: {
            active(v){
                this.selected = v
            },
            selected(v){
                if(v){
                    this.dispatch(this.index)
                }
            }
        },
        mounted(){
            if(this.$parent.$options.name == 'tabs'){
                this.index = this.$parent.options.length
                this.$parent.options.push(this)
                // avoid find children more times
                if(!cache) {
                    cache = this.$parent.$children
                }
            }
        },
        methods: {
            dispatch(index){
                if('function' == typeof this.$parent.select) {
                    this.$parent.select(index)
                }
            },
            change(v){
                this.selected = v
            },
            trigger(){
                if(this.disabled){
                    return false
                }
                cache.forEach((item, idx) => {
                    if('function' == typeof item.change){
                        item.change(item == this)
                    }
                })
            }
        },
        beforeDestroy() {
            this.$parent.options.splice(this.index, 1)
        }
    }
</script>