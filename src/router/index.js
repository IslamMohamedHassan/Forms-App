import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import PopupModalVue from '@/components/PopupModal.vue'
import ModalData from '@/components/ModalData.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children:[{
        path:'popup',
        name:"popup",
        component: ModalData
      }]
    },
    {
      path: '/',
      name: 'homeAlt',
      component: HomeView,
      children:[{
        path:'popup',
        name:"popup",
        component: ModalData
      }]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
