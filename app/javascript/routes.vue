<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

import EmployeeIndexPage from './Employees/EmployeeIndexPage.vue'
import EmployeeDetailPage from './Employees/EmployeeDetailPage.vue'
import EmployeeNewPage from './Employees/EmployeeNewPage.vue'
import EmployeeEditPage from './Employees/EmployeeEditPage.vue'
import Map from './Gmaps/Map.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: '/home/',
  routes: [
    { 
      path: '/',
      name:'EmployeeIndexPage',
      component: EmployeeIndexPage  },
    { 
      path: '/employees/:id(\\d+)',   // :id は数値のみに制限する
      name: 'EmployeeDetailPage',     // ルートに名前を付けている ref. https://router.vuejs.org/ja/guide/essentials/named-routes.html#%E5%90%8D%E5%89%8D%E4%BB%98%E3%81%8D%E3%83%AB%E3%83%BC%E3%83%88
      component: EmployeeDetailPage  },
    { 
      path: '/employees/new',
      name: 'EmployeeNewPage',
      component: EmployeeNewPage    },
    { 
      path: '/employees/:id(\\d+)/edit',
      name: 'EmployeeEditPage',
      component: EmployeeEditPage   },
    {
      path: '/map',
      name: 'Map',
      component: Map
    }
  ]
})
</script>

<style scoped>
</style>