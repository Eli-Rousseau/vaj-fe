<template>
  <form autocomplete="off" class="SearchBox--form__container" @submit.prevent="handleSearchQuerySubmit">
    <input type="text" id="search-box" class="SearchBox--form__input" placeholder="Search products..." v-model="searchQuery"/>
    <button type="submit" class="SearchBox--form__button">
      <SearchLoop />
    </button>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import SearchLoop from '@/icons/SearchLoop.vue';

export default defineComponent({
    components: {
        SearchLoop
    },
    setup() {
        const searchQuery = ref("");

        const handleSearchQuerySubmit = function () {
            console.log(searchQuery.value);
            searchQuery.value = "";
        }

        return {
            searchQuery,
            handleSearchQuerySubmit
        }
    }
});
</script>

<style>
.SearchBox--form__container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: var(--light-color);
}

.SearchBox--form__input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.5rem;
}
.SearchBox--form__input::placeholder {
  color: color-mix(in srgb, var(--dark-color) 40%, transparent);;
}

.SearchBox--form__button {
  border: none;
  background: none;
  padding: 0;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 0.7rem;
  transition: transform 0.2s ease;
}
.SearchBox--form__button:hover {
    cursor: pointer;
    transform: scale(1.1);
}
.SearchBox--form__button svg {
    height: 50%;
    color: var(--fourth-color);
}
</style>