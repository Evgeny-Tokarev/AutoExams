<template>
  <button class="simple-button" type="button" @click="handler">
    {{ buttonText
    }}<input
      v-show="state.isInput"
      type="text"
      @keyup="emitValue"
      @blur="blurHandler"
      :value="buttonText"
      ref="input"
    />
  </button>
</template>

<script setup>
import { reactive, ref, nextTick } from "vue";

defineProps({
  buttonText: String,
});
const input = ref(null);
const state = reactive({
  isInput: false,
});
const emit = defineEmits(["buttonCallback", "inputChange"]);

async function dblClickHandler(event) {
  state.isInput = true;
  await nextTick();
  input.value.focus();
}

function clickHandler(event) {
  emit("buttonCallback", event);
}

let counter = 0;
let timer;
function handler(event) {
  counter++;
  if (counter === 1) {
    timer = setTimeout(function () {
      counter = 0;
      clickHandler(event);
    }, 500);
  } else {
    clearTimeout(timer);
    console.log("timeout clear" + timer);
    dblClickHandler(event);
    counter = 0;
  }
}

function blurHandler() {
  state.isInput = false;
}

function emitValue(e) {
  if (e.key === "Enter") {
    blurHandler();
  }
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
  min-width: 20px;
  height: 2.7rem;
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
    padding: 0;
    margin: 0;
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
