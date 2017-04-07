<script>
  const noop = () => {}
  export default {  
    props: {
      navs: {
        type: Array,
        default: []
      },
      onTabRemove: {
        type: Function,
        default: noop
      },
      onTabClick: {
        type: Function,
        default: noop
      },
      onTabAdd: {
        type: Function,
        default: noop
      }
    },
    render(h){ 
      const {
        onTabClick,
        onTabRemove,
        onTabAdd
      } = this
      
      const tabs = this.navs.map((nav, index) => {
        nav.index = String(index)
        
        const closeBtn = nav.isClosable 
          ? <span onClick={ev => onTabRemove(nav, ev)}  class="ui-tabs-item--closable">x</span>
          : null
        
        const titleContent = nav.$slots.title || nav.title
        
        return  (
          <div 
            onClick={ev => onTabClick(nav, ev)} 
            ref="tabs"
            refInfor
            class={{
              'ui-tabs-item':true,
              'is-active':nav.active,
              'is-disabled': nav.disabled
            }}>
              { titleContent }
              { closeBtn }
          </div>
        )
      })
      return (
        <div class="ui-tabs-nav">
          { tabs }
        </div>
      )
    }
  }
</script>