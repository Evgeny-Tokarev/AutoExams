<template>
  <div class="dropdown">
    <div class="dropdown__header">
      <h3 class="dropdown__name">{{ name }}</h3>
      <ButtonSimple
        @buttonCallback="dropHandler($event)"
        :buttonText="state.isDropped ? 'Close' : 'Open'"
      />
    </div>
    <Transition name="slide-fade">
      <ul class="dropdown__subject-list" v-if="state.isDropped">
        <li v-if="!!title" class="dropdown__title">{{ title }}</li>
        <li
          v-for="(text, index) in subjectList"
          :key="index"
          :class="
            classes
              ? 'dropdown__item dropdown__item' + classes
              : 'dropdown__item'
          "
        >
          <span v-if="!!classes">{{ subjectNames[index] }} </span>
          <ButtonSimple
            v-if="buttonType == 'simple'"
            :buttonText="text"
            @buttonCallback="clickHandler($event)"
          />
          <ButtonInput
            v-else
            :buttonText="text"
            @buttonCallback="clickHandler($event, index)"
            @inputChange="updateHandler($event, index)"
          />
          <ButtonSimple
            v-if="removable === true"
            buttonText="X"
            @buttonCallback="removeHandler(title, index)"
          />
        </li>
        <ButtonSimple
          v-if="addable === true"
          buttonText="Add"
          class="simple-button_type_add"
          @buttonCallback="addItem(title)"
        />
      </ul>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import ButtonSimple from "./ButtonSimple.vue";
import ButtonInput from "./ButtonInput.vue";

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

const state = reactive({
  isDropped: false,
});
const emit = defineEmits(
  "buttonCallback",
  "valueUpdate",
  "addItem",
  "removeItem"
);

function dropHandler() {
  console.log("droping");
  state.isDropped = !state.isDropped;
}

function clickHandler(event, idx) {
  emit("buttonCallback", event, idx);
}

function removeHandler(title, idx) {
  console.log("removing");
  emit("removeItem", title, idx);
}

function updateHandler(...props) {
  const [value, idx] = props;
  emit("valueUpdate", value, idx);
}
function addItem(title) {
  console.log("addItem  " + title);
  emit("addItem", title);
}
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.dropdown {
  &__header {
    border: 1px solid green;
    border-radius: 5px;
    background-color: rgb(239, 239, 239);
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding: 0.5rem;
  }
  &__name {
    margin: 0;
    padding: 0;
    font-size: 2rem;
  }
  &__subject-list {
    font-size: 2rem;
    margin: 0 auto;
    padding: 0 0 1rem 0;
    min-width: 100px;
    border: 1px solid green;
    border-radius: 5px;
    background-color: rgb(239, 239, 239);
    display: flex;
    flex-direction: column;
    align-content: flex-start;
  }
  &__title {
    list-style: none;
    align-self: center;
    font-size: 2.5rem;
  }
  &__item {
    list-style: none;
    margin-right: auto;
    margin-top: 1rem;
    width: 100%;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
  }
  &__item_doubled {
    display: flex;
    justify-content: space-between;
  }
}
</style>
