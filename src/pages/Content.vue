<template>
  <ButtonSimple buttonText="Calculate" @buttonCallback="computeResult" />
  <ButtonSimple buttonText="Save data" @buttonCallback="saveResult" />
</template>

<script setup>
import ButtonSimple from "./UIcomponents/ButtonSimple.vue";
import { writeUserData, getUserData } from "../firestore.js";
import { computed, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();
const state = reactive({
  data: computed(() => {
    console.log("Saving...");
    return store.getters.getData();
  }),
});

function saveResult() {
  writeUserData(state.data);
}

function computeResult() {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  let counter = 0;
  let data = null;
  async function getData() {
    while (!data && counter < 10) {
      counter++;
      data = await getUserData();
      console.log(`${counter}th try, data: ${data}`);
      await timer(200);
    }
    if (!!data) {
      console.log("before commit " + data);
      store.commit({
        type: "setData",
        students: data,
      });
    } else {
      console.log("Can't get data from server");
    }
  }
  getData();
}
</script>

<style lang="scss" scoped></style>
