/**
 * Add this mixin from every page component.
 */

export default {
  transition: 'fade',
  data () {
    return {
      lastScrollPosition: 0
    }
  },
  activated () {
    // Check banner mode
    if (this.$store.state.banner.isForcedMini) {
      this.$store.commit('banner/setMcBannerMiniFlag', true)
    } else {
      this.$store.commit('banner/setMcBannerMiniFlag', false)
    }

    setTimeout(() => {
      // restore scroll position
      window.scrollTo(0, this.lastScrollPosition)

      // dispatch event
      document.dispatchEvent(new CustomEvent('scrollrestored'))
    }, 0)
  },
  deactivated () {
    // store scroll position
    if (!this.$options.meta) {
      this.$options.meta = {}
    }
    this.lastScrollPosition = window.scrollY
  }
}