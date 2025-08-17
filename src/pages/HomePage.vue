<template>
  <div class="home__header--container">
    <NavigationBar />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import NavigationBar from '@/components/NavigationBar.vue';

export default defineComponent({
  name: 'HomeHeader',
  components: {
    NavigationBar
  }
});
</script>

<style>
.home__header--container {
  width: 100vw;
  height: 1000vh;
  background-color: var(--second-color);
}
</style>
