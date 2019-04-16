<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import step1 from './components/step1.vue'
import step2 from './components/step2.vue'
import step3 from './components/step3.vue'

export default{
  components: {
    'step1': step1,
    'step2': step2,
    'step3': step3
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  body {
  }
</style>
