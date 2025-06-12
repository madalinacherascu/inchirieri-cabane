import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import SearchResult from '../views/SearchResult.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
  path: '/search',
  name: 'SearchResults', 
  component: SearchResult
}
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
