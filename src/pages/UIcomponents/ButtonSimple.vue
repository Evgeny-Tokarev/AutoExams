<template>
  <button class="simple-button" type="button" @click="clickHandler">
    {{ buttonText }}
  </button>
</template>

<script setup>
import { reactive, computed } from "vue";
defineProps({
  buttonText: String,
});

const emit = defineEmits(["buttonCallback"]);

function clickHandler(event) {
  emit("buttonCallback", event);
}
</script>

<style lang="scss" scoped>
.simple-button {
  position: relative;
  font-size: 2rem;
  border: 1px solid green;
  border-radius: 5px;
  min-width: 100px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: rgb(163, 202, 173);
  }
  &:active {
    box-shadow: inset 0px 0px 5px #0f0f0f;
    outline: none;
  }
}
</style>
