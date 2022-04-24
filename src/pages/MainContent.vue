<template>
  <main class="main-content">
    <Nav />
    <Content />
    <Footer />
  </main>
</template>

<script setup>
import Nav from "./Nav.vue";
import Footer from "./Footer.vue";
import Content from "./Content.vue";
import { reactive, computed } from "vue";

defineProps({
  subjectList: Array,
  title: String,
  classes: String,
  subjectNames: Array,
  buttonType: String,
  name: String,
  addable: {
    type: Boolean,
    default: false,
  },
  removable: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  width: 80%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #ccc;
}
</style>
