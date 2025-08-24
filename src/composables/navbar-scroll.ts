import { ref, onMounted, onUnmounted } from "vue";

export function useNavbarScroll() {
  const navbar = ref<HTMLElement | null>(null);

  let navbarTop = 0;
  let transition = true;
  let position: "absolute" | "fixed" = "absolute";
  let showShadow = true;
  let lastScrollPosition = 0;
  let throttling = false;

  const onScroll = () => {
    if (!navbar.value) return;

    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollPosition <= 0) {
      lastScrollPosition = 0;
      navbarTop = 0;

      transition = position !== "absolute";
      position = "absolute";
      showShadow = true;
    } else {
      if (currentScrollPosition > lastScrollPosition) {
        // scrolling down
        transition = position !== "absolute";
        position = "absolute";
        const { top, height } = navbar.value.getBoundingClientRect();
        navbarTop = currentScrollPosition + Math.max(top, -height);
        showShadow = -top > height ? false : true;
      } else {
        // scrolling up
        const { top, height } = navbar.value.getBoundingClientRect();
        showShadow = -top > height ? false : true;
        if (top >= 0) {
          navbarTop = 0;
          transition = position !== "fixed";
          position = "fixed";
          showShadow = true;
        }
      }
      lastScrollPosition = currentScrollPosition;
    }

    navbar.value.style.position = position;
    navbar.value.style.top = `${navbarTop}px`;
    navbar.value.style.transition = transition ? "none" : "100ms linear";
    navbar.value.style.boxShadow = showShadow
      ? "0 2px 6px rgba(0,0,0,0.1)"
      : "none";
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

  return {
    navbar,
  };
}
