<template>
  <div class="popup" @appearPopup="">
    <h3 class="popup__title">
      {{ popupType === "alert" ? "Внимание" : `${subject}` }}
    </h3>
    <p class="popup__text" v-if="popupType === 'alert'">
      Вы собираетесь удалить {{ subject }}
    </p>
    <p class="popup__text" v-else>{{ subject }}</p>
    <div class="popup__buttons">
      <ButtonSimple @buttonCallback="submit($event)" buttonText="Да" />
      <ButtonSimple @buttonCallback="discard($event)" buttonText="Нет" />
    </div>
  </div>
</template>

<script setup>
import ButtonSimple from "./ButtonSimple.vue";
defineProps({
  popupType: String,
  subject: String,
});

const emit = defineEmits(["discard", "submit"]);

function submit(event) {
  emit("submit", event);
}
function discard(event) {
  emit("discard", event);
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  z-index: 100;
  background-color: rgb(239, 239, 239);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  border: 1px solid green;
  border-radius: 5px;
  padding: 2rem;
  width: 75%;
  height: 75vh;
  text-align: center;
  &__title {
    font-size: 3.5rem;
  }
  &__buttons {
    display: flex;
    justify-content: space-around;
  }
}
</style>
