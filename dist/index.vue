<style src="./style.css" scoped></style>
<script>
    import Vue from 'vue'
    import TabItem from './item.vue'
    Vue.component('TabItem', TabItem)
    let len
    export default{
        name: 'tabs',
        props: {
            closable: Boolean
        },
        data(){
            return {
                options: []
            }
        },
        render(h){
            return (
                <div class="ui-tabs">
                    <ul class="ui-tabs-header">{this.$slots.default}</ul>
                    <ul class="ui-tabs-panel">
                        {
                            this.options.map((item, idx) => {
                                return (
                                    <li data-ref="tabs-content" class={{'ui-tabs-panel__content': true, 'is-selected': item.selected}}
                                >{item.$slots.default}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        },
        methods: {
            select(idx) {
                Array.prototype.forEach.call(document.querySelectorAll('[data-ref="tabs-content"]'), (item, index) => {
                    if(index == idx) {
                        item.classList.add('is-selected')
                    } else {
                        item.classList.remove('is-selected')
                    }
                })
                this.$emit('change', idx)
            }
        }
    }
</script>