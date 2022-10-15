<template>
  <div class="home">
    <Presentation/>
    <Capabilities/>
    <UnitList />
  </div>
</template>

<script>

import Presentation from '@/components/Home/Presentation.vue'
import Capabilities from '@/components/Home/Capabilities.vue'
import UnitList from '@/components/Home/UnitList.vue'


export default {
  name: 'HomeView',
  components: {
    Presentation,
    Capabilities,
    UnitList
  }
}
</script>

<style>
.home-section {
    padding-top: 100px;
    padding-bottom: 100px;
}
</style>
