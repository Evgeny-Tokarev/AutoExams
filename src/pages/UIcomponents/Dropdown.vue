<template>
  <ul class="subject-list">
    <li v-if="!!title" class="subject-list__title">{{ title }}</li>
    <li
      v-for="(text, index) in subjectList"
      :key="index"
      :class="
        classes
          ? 'subject-list__item subject-list__item' + classes
          : 'subject-list__item'
      "
    >
      <span v-if="!!classes">{{ names[index] }} </span>
      <ButtonSimple
        v-if="buttonType == 'simple'"
        :buttonText="text"
        @buttonCallback="clickHandler($event)"
      />
      <ButtonInput
        v-else
        :dropInput="dropIndex == index"
        :buttonText="text"
        @input-change="updateHandler($event, index)"
      />
    </li>
    <ButtonSimple
      v-if="addable === true"
      buttonText="Add"
      class="subject-list__item subject-list__item_type_add"
      @buttonCallback="addItem($event)"
    />
  </ul>
</template>

<script setup>
import { reactive, computed } from "vue";
import ButtonSimple from "./ButtonSimple.vue";
import ButtonInput from "./ButtonInput.vue";

defineProps({
  subjectList: Array,
  title: String,
  classes: String,
  names: Array,
  dropIndex: Number,
  buttonType: String,
  addable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits("buttonCallback", "valueUpdate", "addItem");

function clickHandler(e) {
  emit("buttonCallback", e);
}
function updateHandler(...props) {
  const [value, idx] = props;
  emit("valueUpdate", value, idx);
}
function addItem(...props) {
  emit("addItem", props);
}
</script>
<style lang="scss" scoped>
.subject-list {
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
  }
  &__item_doubled {
    display: flex;
    justify-content: space-between;
  }
  &__item_type_add {
    width: 80%;
    margin: 1rem auto 0 auto;
  }
}
</style>
