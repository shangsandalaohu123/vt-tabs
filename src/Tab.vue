<style src="./style.css"></style>
<script>
  import TabNav from './TabNav.vue'
  export default {
    name: 'tabs',
    props: {
      closable: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Number],
        default: '0'
      },
    },
    data() {
      return {
        navs: []
      }
    },
    // istanbul next
    computed: {
      currentNav: {
        get(){
          return this.value
        },
        set(v){
          this.$emit('input', v)
        }
      }
    },
    
    render(h) {
      const {
        navs,
        onTabAdd,
        onTabClick,
        onTabRemove
      } = this
      const navProps = {
        ref: 'tabs-nav',
        props: {
          navs,
          onTabAdd,
          onTabClick,
          onTabRemove
        }
      }
      
      return (
        <div class="ui-tabs">
          <div class="ui-tabs-header">
            <TabNav { ...navProps }></TabNav>
          </div>
          <div class="ui-tabs-panel">
            {this.$slots.default}
          </div>
        </div>
      )
    },
    methods: {
      onTabRemove(tab, ev){
        if(tab.disabled) return
        ev.stopPropagation()
        this.$emit('tab-remove', tab.index)
      },
      onTabAdd(){
        this.$emit('tab-add')
      },
      onTabClick(tab, index, ev){
        if(tab.disabled) return
        this.$emit('tab-click', tab.index)
      },
      addNav(nav){
        this.navs.push(nav)
      },
      removeNav(nav){
        const index = this.navs.indexOf(nav)
        index > -1 && this.navs.splice(index, 1)
      }
    },
    components: {
      TabNav
    }
      
  }
</script>