import step1 from './components/step1.vue'
import step2 from './components/step2.vue'
import step3 from './components/step3.vue'

export default[
  {path: '/', component: step1, name: 'home'},
  {path: '/step2', component: step2, name: 'step2'},
  {path: '/step3', component: step3, name: 'step3'}
]
