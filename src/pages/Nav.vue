<template>
  <nav class="navigation">
      <ul class="navigation__bar">
          <li class="navigation__bar-item">First</li>
          <li class="navigation__bar-item">Second</li>
          <li class="navigation__bar-item">Third</li>
          <li class="navigation__bar-item">Fourth</li>
          <li class="navigation__bar-item">Fifth</li>
      </ul>
  </nav>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.navigation {
  justify-content: center;
  font-size: 2rem;
  display: flex;
  width: 100%;
    &__bar {
        display: flex;
        list-style: none;
        padding: 0;
        width: 80%;
        justify-content: space-around;
        &__bar-item {
            flex: 1 1 auto;

        }
    }
}
</style>