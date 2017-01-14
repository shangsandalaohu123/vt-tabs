<style src="./style.css"></style>
<script>
    import Vue from 'vue'
    import TabItem from './item.vue'
    export default {
        name: 'tabs',
        data() {
            return {
                items: []
            }
        },
        render(h) {
            const headerItems = this.items.map((item, index) => {
                item.index = index
                return (
                    <li on-click={(ev) => this.select(index, ev)}
                        class={{
                            'ui-tabs-item':           true,
                            'is-active':              item.activate,
                            'ui-tabs-item--disabled': item.disabled
                        }}
                        ref="tabs-item"
                        refInFor
                        >{item.$slots.title}
                    </li> 
                )
            })
            return (
                <div class="ui-tabs">
                    <ul class="ui-tabs-header">{headerItems}</ul>
                    <ul class="ui-tabs-panel">
                        {this.$slots.default}
                    </ul>
                </div>
            )
        },

        methods: {
            addItem(item) {
                this.items.push(item)
            },
            select(idx, e) {
                let item = this.items[idx]
                if(item && item.disabled) return
                
                this.setCurrentHeaderItem(idx)
                this.setCurrentContent(idx)
                this.$emit('change', idx)
            },
            setCurrentHeaderItem(idx){
                this.$refs['tabs-item'].forEach((item, index) => {
                    if (index == idx) {
                        item.classList.add('is-active')
                    } else {
                        item.classList.remove('is-active')
                    }
                })
            },
            setCurrentContent(idx){
                this.items.forEach((item, index) => item.activate = idx == index)
            }
        }
    }
</script>