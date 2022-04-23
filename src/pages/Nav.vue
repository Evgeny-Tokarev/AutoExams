<template>
  <nav class="navigation">
    <ul class="navigation__bar">
      <li class="navigation__bar-item">
        <Dropdown
          :subjectList="state.subjects"
          @buttonCallback="subjectListHandler"
          buttonType="simple"
          :addable="true"
          @addItem="addSubject"
        />
      </li>
      <li class="navigation__bar-item">
        <Dropdown
          :subjectList="state.estimates"
          :title="state.estimatesSubject"
          @valueUpdate="changeEstimate"
          :addable="true"
        />
      </li>
      <li class="navigation__bar-item">
        <Dropdown
          :subjectList="state.leaves"
          title="Leaves"
          classes="_doubled"
          :names="['bad', 'good']"
          @valueUpdate="changeLeave"
        />
      </li>
    </ul>
  </nav>
</template>

<script setup>
import ButtonSimple from "./UIcomponents/ButtonSimple.vue";
import Dropdown from "./UIcomponents/Dropdown.vue";
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { writeUserData } from "../firestore.js";

const store = useStore();
const state = reactive({
  studentID: 1,
  estimatesSubject: "",
  subjects: computed(() => store.getters.getSubjectsNames(1)),
  estimates: computed(() =>
    store.getters.getSubjectEstimates(1, state.estimatesSubject)
  ),
});
state.estimatesSubject = state.subjects[0];
state.leaves = computed(() => store.getters.getLeaves(1));
state.double = "_doubled";
state.student = computed(() => store.getters.getStudent(1));
console.log("student: " + state.student.id);
// writeUserData(state.student);
// // getUserData();

function changeEstimate(newValue, idx) {
  if (!newValue) {
    newValue = "0";
  }
  store.commit({
    type: "setEstimate",
    id: 1,
    subject: state.estimatesSubject,
    index: idx,
    value: newValue,
  });
}

function changeLeave(newValue, idx) {
  if (!newValue) {
    newValue = "0";
  }
  const leave = idx == 0 ? "bad" : "good";
  store.commit({
    type: "setLeave",
    id: 1,
    leaveType: leave,
    value: newValue,
  });
}
function addSubject() {
  store.commit({
    type: "setNewSubject",
    id: 1,
  });
}

function subjectListHandler(event) {
  state.estimatesSubject = event.target.textContent;
  state.estimates = computed(() =>
    store.getters.getSubjectEstimates(state.studentID, state.estimatesSubject)
  );
}
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
    &-item {
      flex: 0 1 300px;
      cursor: pointer;
      margin-right: 1rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
