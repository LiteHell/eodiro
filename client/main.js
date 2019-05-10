import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'

Vue.use(VueI18n)

let userLang = navigator.language || navigator.userLanguage
userLang = userLang.slice(0, 2)

// for debuggin
userLang = 'zh'

const i18n = new VueI18n({
  locale: userLang,
  fallbackLocale: 'en'
})

router.beforeEach((to, from, next) => {
  if (!to.meta || !to.meta.title) {
    console.warn('Router doesn\'t have a title')
  } else {
    let title = to.meta.title[userLang]
    if (!title) {
      title = to.meta.title['en']
    }
    document.title = title
  }
  
  next()
})

new Vue({
  i18n,
  el: "#app",
  router: router,
  template: '<App />',
  components: { App }
})