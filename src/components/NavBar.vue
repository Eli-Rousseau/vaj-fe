<template>
  <div ref="navbar" class="NavBar__screen--container">
    <div class="NavBar__bar--container">
      <Home class="NavBar__bar--icon"/>
      <Menu class="NavBar__bar--icon" @click="handleClickOnNavMenuIcon"/>
      <div class="NavBar__bar--icon_count">
        <p>{{ numberOfUserLikes }}</p>
        <Heart class="NavBar__bar--icon"/>
      </div>
      <div class="NavBar__bar--icon_count">
        <p>{{ numberOfUserArticlesInShoppingCart }}</p>
        <ShoppingCart class="NavBar__bar--icon"/>
      </div>
    </div>
    <Transition name="NavBar__menu">
      <div class="NavBar__menu--container" v-show="showNavMenu"></div>
    </Transition>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Cross, Heart, Home, Menu, SearchLoop, ShoppingCart } from '@/icons/index';
import { useNavbarScroll } from '@/composables/navbar-scroll';

export default defineComponent({
  name: "NavBar",
  components: {
    Cross,
    Heart,
    Home,
    Menu,
    SearchLoop,
    ShoppingCart
  },
  setup() {
    const numberOfUserLikes = ref(89);
    const numberOfUserArticlesInShoppingCart = ref(15);

    const showNavMenu = ref(false);
    const handleClickOnNavMenuIcon = function () {
      showNavMenu.value = !showNavMenu.value;

      const body = document.body;

      if (showNavMenu.value) {
        body.style.overflow = "hidden";
        body.style.webkitOverflowScrolling = "touch";
      } else {
        body.style.overflow = "";
        body.style.webkitOverflowScrolling = "";
      }
    };

    const { navbar } = useNavbarScroll();

    return {
      numberOfUserLikes,
      numberOfUserArticlesInShoppingCart,
      showNavMenu,
      handleClickOnNavMenuIcon,
      navbar
    }
  }
});
</script>

<style>
.NavBar__screen--container {
  position: absolute;
}
.NavBar__bar--container {
  width: 100lvw;
  height: 12lvh;
  background-color: var(--fourth-color);
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  z-index: 10;
}
.NavBar__bar--container > .NavBar__bar--icon:hover,
.NavBar__bar--container > .NavBar__bar--icon:focus,
.NavBar__bar--container > .NavBar__bar--icon_count:hover,
.NavBar__bar--container > .NavBar__bar--icon_count:focus {
  transform: scale(1.1);
  cursor: pointer;
}
.NavBar__bar--icon {
  color: var(--first-color);
  height: 2.2rem;
  width: 2.2rem;
  transition: transform 0.2s ease;
}
.NavBar__bar--icon_count {
  position: relative;
  transition: transform 0.2s ease;
}
.NavBar__bar--icon_count > p {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  border-radius: 50%;
  margin: 0px;
  font-weight: 700;
  font-size: 0.9rem;
  z-index: 10;
}

.NavBar__menu--container {
  width: 100lvw;
  height: 88lvh;
  background-color: var(--fourth-color);
  filter: brightness(75%);
  opacity: 40%;
  z-index: 10;
}
.NavBar__menu-enter-active,
.NavBar__menu-leave-active {
  transition: max-height 0.4s ease;
}
.NavBar__menu-enter-from,
.NavBar__menu-leave-to {
  max-height: 0;
}
.NavBar__menu-enter-to,
.NavBar__menu-leave-from {
  max-height: 88vh;
}
</style>