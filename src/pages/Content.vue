<template>
  <div class="content">
    <div class="content__controlButtons">
      <ButtonSimple buttonText="Calculate" @buttonCallback="calculateResult" />
      <ButtonSimple buttonText="Save data" @buttonCallback="saveResult" />
      <ButtonSimple buttonText="Load data" @buttonCallback="loadResult" />
    </div>
    <p class="content__utility-text">{{ state.message }}</p>
    <div class="content__results">
      <table class="content__table" v-if="state.isCalculated">
        <th></th>
        <th>Предмет</th>
        <th>Средний бал</th>
        <th>Автомат</th>
        <tr v-for="(result, index) in state.results" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ result.name }}</td>
          <td>{{ result.value }}</td>
          <td>
            {{ result.value - state.absenceCoefficient < 3.5 ? "Нет" : "Да" }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import ButtonSimple from "./UIcomponents/ButtonSimple.vue";
import { writeUserData, getUserData } from "../firestore.js";
import { computed, reactive, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const state = reactive({
  absenceCoefficient: null,
  results: [],
  message: null,
  data: computed(() => {
    return store.getters.getData();
  }),
  studentID: computed(() => {
    if (!store.getters.getStudentID()) {
      store.dispatch("setDefaults");
    }
    return store.getters.getStudentID();
  }),
  student: computed(() => {
    return store.getters.getStudent(state.studentID)
      ? store.getters.getStudent(state.studentID)
      : null;
  }),
  isLoaded: false,
  isCalculated: false,
  result: false,
});
loadResult();
watch(
  () => state.data,
  () => {
    state.isCalculated = false;
  },
  { deep: true }
);
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function saveResult() {
  writeUserData(state.data).then((message) => {
    state.message = message;
  });
  await timer(3000);
  state.message = null;
}

function loadResult() {
  let counter = 0;
  let data = null;
  async function getData() {
    while (!data && counter < 10) {
      counter++;
      state.message = "Загрузка...";
      data = await getUserData();
      console.log(`${counter}th try, data: ${data}`);
      await timer(200);
    }
    if (!!data) {
      store.commit({
        type: "setData",
        students: data,
      });
      state.message = "Данные загружены";
      await timer(3000);
      state.message = null;
    } else {
      state.message = "Данные не пришли";
      await timer(3000);
      state.message = null;
    }
  }
  getData();
}

function calculateResult() {
  state.results = state.student.subjects.map((subject) => {
    return {
      value: (
        subject.estimates.reduce((prev, cur) => Number(prev) + Number(cur)) /
        subject.estimates.length
      ).toFixed(2),
      name: subject.name,
    };
  });

  state.absenceCoefficient =
    state.student.bad_leaves / 2 + state.student.good_leaves / 10;
  state.isCalculated = true;
}
</script>

<style lang="scss" scoped>
.content {
  width: 90%;
  position: relative;
  z-index: 0;
  min-height: 30vh;
  margin-top: 3rem;
  &__controlButtons {
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: center;
  }
  &__utility-text {
    font-size: 1.8rem;
    width: 100%;
    position: absolute;
    text-align: center;
    top: -5rem;
    left: 50%;
    margin: 0;
    transform: translateX(-50%);
  }
  &__results {
    width: 100%;
  }
  &__results-title {
    font-size: 3rem;
  }
  &__table {
    width: 100%;
    margin-top: 3rem;
    border: 1px solid green;
    border-radius: 5px;
    border-collapse: collapse;
    * {
      text-align: center;
      border: 1px solid green;
      background-color: rgb(239, 239, 239);
      border-collapse: collapse;
    }
  }
}
</style>
