<template>
  <main class="main-content">
    <Nav />
    <Footer />
  </main>
</template>

<script>

import Nav from "./Nav.vue";
import Footer from "./Footer.vue";
import { reactive, computed } from "vue";
export default {
    components: {
      Nav,
      Footer
  },
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
    });
    function increment() {
      state.count++;
    }

    return {
      state,
      increment,
    };
  },
};
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  background-color: #ccc;
}
</style>