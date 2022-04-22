<template>
  <button class="simple-button" type="button" @click="clickHandler">
    {{ buttonText
    }}<input v-if="true" type="text" @keyup="emitValue" :value="buttonText" />
  </button>
  {{ buttonText }}
</template>

<script setup>
import { reactive, computed } from "vue";
defineProps({
  buttonText: String,
  dropInput: Boolean,
});

const emit = defineEmits(["buttonCallback", "inputChange"]);
function clickHandler(event) {
  emit("buttonCallback", event);
}

function emitValue(e) {
  let value = e.target.value;
  emit("inputChange", value);
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
  & input {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    font-size: 2rem;
    border: 1px solid green;
    border-radius: 5px;
    text-align: center;
  }
}
</style>
