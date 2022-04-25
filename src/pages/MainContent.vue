<template>
  <main class="main-content">
    <h1>Статистика учеников</h1>
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
</script>

<style lang="scss" scoped>
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
  h1 {
    font-size: 3.5rem;
    margin-bottom: 0;
  }
}
</style>
