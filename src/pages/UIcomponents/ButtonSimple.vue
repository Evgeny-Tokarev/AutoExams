<template>
  <button class="simple-button" type="button" @click="clickHandler">
    {{ buttonText }}
  </button>
</template>

<script setup>
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
  font-size: 2rem;
  border: 1px solid green;
  border-radius: 5px;
  min-width: 10px;
  height: 2.7rem;
  text-align: center;
  cursor: pointer;
  &_type_add {
    width: 80%;
    margin: 1rem auto 0 auto;
  }
  &:hover {
    background-color: rgb(163, 202, 173);
  }
  &:active {
    box-shadow: inset 0px 0px 5px #0f0f0f;
    outline: none;
  }
}
</style>
