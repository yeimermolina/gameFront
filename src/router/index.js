import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import NewGame from '@/components/NewGame'
import Rounds from '@/components/Rounds'
import Statistics from '@/components/Statistics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/new-game',
      name: 'NewGame',
      component: NewGame
    },
    {
      path: '/round-time',
      name: 'Rounds',
      component: Rounds
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
    }
  ]
})
