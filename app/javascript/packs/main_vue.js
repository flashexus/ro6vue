import Vue from 'vue'
import Vuetify from "vuetify";           // 追加
import "vuetify/dist/vuetify.min.css";   // 追加
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import App from '../App.vue'
import router from '../routes.vue'

Vue.use(Vuetify);                       // 追加
const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },theme: {
    // dark: false,
    // themes: {
    //   light: {
    //     primary: "#4caf50",
    //     secondary: "#8bc34a",
    //     accent: "#cddc39",
    //     error: "#ffeb3b",
    //     warning: "#ffc107",
    //     info: "#ff5722",
    //     success: "#795548",
    //   },
    //   dark: {
    //     primary: "#4caf50",
    //     secondary: "#8bc34a",
    //     accent: "#cddc39",
    //     error: "#ffeb3b",
    //     warning: "#ffc107",
    //     info: "#ff5722",
    //     success: "#795548",
    //   },
    // },
  },
}); 

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    vuetify, // 追加
    el: '#app',
    router,
    render: h => h(App)
  }) 
  console.log(app)

})