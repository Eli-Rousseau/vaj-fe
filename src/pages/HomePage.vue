<template>
  <NavBar/>
  <div class="HomePage__header--container"></div>
  <div class="HomePage__body--container"></div>
</template>

<script>
import { defineComponent } from 'vue';

import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    NavBar
  },
});
</script>

<style>
.HomePage__header--container {
  width: 100lvw;
  height: 100lvh;
  background-color: var(--second-color);
}
.HomePage__body--container {
  width: 100lvw;
  height: 1000lvh;
  background-color: var(--third-color);
}
</style>
