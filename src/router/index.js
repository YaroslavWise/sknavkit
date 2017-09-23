import Vue from 'vue'
import Router from 'vue-router'

import RoomPicker from '@/components/RoomPicker'
import Navigation from '@/components/Navigation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'picker',
      component: RoomPicker
    },
    {
      path: '/nav/:roomCode',
      name: 'navigation',
      component: Navigation
    }
  ]
})
