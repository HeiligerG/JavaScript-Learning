import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import Aufgabe01 from '../pages/01_sng.vue'
import Aufgabe02 from '../pages/02_ws.vue'
import Aufgabe03 from '../pages/03_ir.vue'
import Aufgabe04 from '../pages/04_todo.vue'
import Aufgabe05 from '../pages/05_component.vue'
import Aufgabe06 from '../pages/06_dataflow.vue'
import Aufgabe07 from '../pages/07_slots.vue'
import Aufgabe08 from '../pages/08_routezugriff.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    children: [
      {
        path: 'aufgabe-01',
        name: 'Aufgabe01',
        component: Aufgabe01
      },
      {
        path: 'aufgabe-02',
        name: 'Aufgabe02',
        component: Aufgabe02
      },
      {
        path: 'aufgabe-03',
        name: 'Aufgabe03',
        component: Aufgabe03
      },
      {
        path: 'aufgabe-04',
        name: 'Aufgabe04',
        component: Aufgabe04
      },
      {
        path: 'aufgabe-05',
        name: 'Aufgabe05',
        component: Aufgabe05
      },
      {
        path: 'aufgabe-06',
        name: 'Aufgabe06',
        component: Aufgabe06
      },
      {
        path: 'aufgabe-07',
        name: 'Aufgabe07',
        component: Aufgabe07
      },
      {
        path: 'aufgabe-08',
        name: 'Aufgabe08',
        component: Aufgabe08,
        beforeEnter: (to, from, next) => {
          const currentMinutes = new Date().getMinutes();
          const evenMinutes = currentMinutes % 2 === 0;
          
          if (evenMinutes) { 
            console.log('Zugriff erlaubt');
            next();
          } else {
            console.log('ZUGRIFF VERWEIGERT!');
            next('/');
          }
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router