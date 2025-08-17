<template>
  <div ref="navbar" class="navbar--container">
    <svg width="24" height="24" viewBox="0 0 18 28" fill="none"
     xmlns="http://www.w3.org/2000/svg" class="navbar--dropdown">
      <rect y="5" width="18" height="2" fill="var(--first-color)"/>
      <rect y="10" width="18" height="2" fill="var(--first-color)"/>
      <rect y="15" width="18" height="2" fill="var(--first-color)"/>
      <rect y="20" width="18" height="2" fill="var(--first-color)"/>
    </svg>
    <form class="navbar--searchbox" @submit.prevent="handleSearchBoxSubmit">
        <label for="search"></label>
        <input type="text" id="search" autocomplete="off" class="navbar--searchbox_input" v-model="searchBoxQuery"/>
        <button type="submit" class="navbar--searchbox_icon">
            <svg width="34" height="34" viewBox="0 0 25 25" fill="none" 
             xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                    fill="var(--fourth-color)"
                />
            </svg>
        </button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: "NavigationBar",
  setup() {
    const navbar = ref(null);

    let navbarTop = 0;
    let transition = true;
    let position = "absolute";
    let lastScrollPosition = 0;
    let throttling = false;

    const onScroll = () => {
      const el = navbar.value;
      if (!el) return;

      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollPosition <= 0) {
        lastScrollPosition = 0;
        navbarTop = 0;

        transition = position !== "absolute";
        position = "absolute";
      } else {
        if (currentScrollPosition > lastScrollPosition) {
          // scrolling down
          transition = position !== "absolute";
          const { top, height } = el.getBoundingClientRect();
          navbarTop = currentScrollPosition + Math.max(top, -height);
        } else {
          // scrolling up
          const { top } = el.getBoundingClientRect();
          if (top >= 0) {
            navbarTop = 0;
            transition = position !== "fixed";
            position = "fixed";
          }
        }
        lastScrollPosition = currentScrollPosition;
      }

      el.style.position = position;
      el.style.top = `${navbarTop}px`;
      el.style.transition = transition ? "none" : "100ms linear";
    };

    const onScrollThrottled = () => {
      if (!throttling) {
        throttling = true;
        requestAnimationFrame(() => {
          onScroll();
          throttling = false;
        });
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", onScrollThrottled);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", onScrollThrottled);
    });

    const searchBoxQuery = ref("");

    const handleSearchBoxSubmit = function () {
      console.log(searchBoxQuery.value);
      searchBoxQuery.value = "";
    }

    return { navbar, searchBoxQuery, handleSearchBoxSubmit };
  }
});
</script>

<style>
.navbar--container {
  width: 100vw;
  height: 12vh;
  background-color: var(--fourth-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.navbar--dropdown {
  cursor: pointer;
  transform: scale(2.2);
  transition: transform 0.2s ease;
}
.navbar--dropdown:hover {
  transform: scale(2.3);
}

.navbar--searchbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 45%;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.navbar--searchbox_input {
  flex: 1;
  padding: 5px 10px;
  width: auto;
  border: none;
  outline: none;
  font-size: 1rem;
}
.navbar--searchbox_input::placeholder {
  color: #aaa;
}
.navbar--searchbox_icon {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 3rem;
  height: 3rem;
  background: #fff;
  border: none;
  cursor: pointer;
}
.navbar--searchbox_icon:hover {
  transform: scale(1.05);
}
</style>
