<template>
  <nav class="navigation">
    <h2>{{ state.studentsName }}</h2>
    <ul class="navigation__bar">
      <li class="navigation__bar-item">
        <Dropdown
          name="Students"
          :subjectList="state.students"
          @buttonCallback="studentListHandler"
          @valueUpdate="changeStudent"
          :addable="true"
          :removable="true"
          @addItem="addStudent"
          @removeItem="removeStudent"
        />
      </li>
      <li class="navigation__bar-item">
        <Dropdown
          :name="!!state.estimatesSubject"
          :title="state.subjects ? null : 'Add subject'"
          :subjectList="state.subjects"
          @buttonCallback="subjectListHandler"
          @valueUpdate="changeSubject"
          :addable="state.estimatesSubject ? true : false"
          :removable="true"
          @addItem="addSubject"
          @removeItem="removeSubject"
        />
      </li>
      <li class="navigation__bar-item" v-if="!!state.estimatesSubject">
        <Dropdown
          name="Estimates"
          :subjectList="state.estimates"
          :title="state.estimatesSubject"
          @valueUpdate="changeEstimate"
          :addable="true"
          :removable="true"
          @addItem="addEstimate"
          @removeItem="removeEstimate"
        />
      </li>
      <li class="navigation__bar-item">
        <Dropdown
          name="Absenteeism"
          :subjectList="state.leaves"
          title="Leaves"
          classes="_doubled"
          :subjectNames="['bad', 'good']"
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
  studentsName: computed(() => {
    return store.getters.getStudent(state.studentID)
      ? store.getters.getStudent(state.studentID).name
      : null;
  }),
  students: computed(() => {
    return store.getters.getStudents();
  }),
  studentID: computed(() => {
    if (!store.getters.getStudentID()) {
      store.dispatch("setDefaults");
    }
    console.log(store.getters.getStudentID());
    return store.getters.getStudentID();
  }),
  estimatesSubject: computed(() => {
    console.log(
      "estimatesSubject " + store.getters.getEstimatesSubject(state.studentID)
    );
    return store.getters.getEstimatesSubject(state.studentID);
  }),
  estimatesSubjectIdx: computed(() => {
    console.log(store.getters.getEstimatesSubjectIdx(state.studentID));
    return store.getters.getEstimatesSubjectIdx(state.studentID);
  }),
  leaves: computed(() => {
    console.log(store.getters.getLeaves(state.studentID));
    return store.getters.getLeaves(state.studentID);
  }),
  subjects: computed(() => {
    console.log(store.getters.getSubjectsNames(state.studentID));
    return store.getters.getSubjectsNames(state.studentID);
  }),
  estimates: computed((...args) => {
    console.log(
      store.getters.getSubjectEstimates(
        state.studentID,
        store.getters.getSubjectsName(
          state.studentID,
          state.estimatesSubjectIdx
        ),
        1
      )
    );
    return store.getters.getSubjectEstimates(
      state.studentID,
      store.getters.getSubjectsName(state.studentID, state.estimatesSubjectIdx),
      1
    );
  }),
});

state.double = "_doubled";
// writeUserData(state.student);
// // getUserData();
function changeStudent(newValue, idx) {
  if (!newValue) {
    newValue = " ";
  }
  store.commit({
    type: "setStudent",
    index: idx,
    value: newValue,
  });
}

function changeEstimate(newValue, idx) {
  if (!newValue) {
    newValue = "0";
  }
  store.commit({
    type: "setEstimate",
    id: state.studentID,
    subject: state.estimatesSubject,
    index: idx,
    value: newValue,
  });
}

function changeEstimatesSubject(subject) {
  store.commit({
    type: "setEstimatesSubject",
    id: state.studentID,
    value: subject,
  });
}

function changeSubject(newValue, idx) {
  if (newValue.length > 10) {
    newValue = newValue.slice(0, 10);
  }
  store.commit({
    type: "setSubject",
    id: state.studentID,
    index: idx,
    value: newValue,
  });
}
function changeCurrentStudent(newValue) {
  if (newValue.length > 10) {
    newValue = newValue.slice(0, 10);
  }
  store.commit({
    type: "setCurrentStudent",
    value: newValue,
  });
}

function removeStudent(title, idx) {
  console.log("remove " + idx);
  store.commit({
    type: "deleteStudent",
    index: idx,
  });
}

function removeSubject(title, idx) {
  console.log("remove " + idx);
  store.commit({
    type: "deleteSubject",
    id: state.studentID,
    index: idx,
  });
}

function removeEstimate(title, idx) {
  console.log("remove " + idx + title);
  store.commit({
    type: "deleteEstimate",
    id: state.studentID,
    name: title,
    index: idx,
  });
}

function changeLeave(newValue, idx) {
  if (!newValue) {
    newValue = "0";
  }
  const leave = idx == 0 ? "bad" : "good";
  store.commit({
    type: "setLeave",
    id: state.studentID,
    leaveType: leave,
    value: newValue,
  });
}
function addSubject() {
  store.commit({
    type: "setNewSubject",
    id: state.studentID,
  });
}

function addStudent() {
  store.commit({
    type: "setNewStudent",
  });
}

function addEstimate(title) {
  store.commit({
    type: "setNewEstimate",
    id: state.studentID,
    name: title,
  });
}
function studentListHandler(event) {
  console.log(event.target.textContent);
  changeCurrentStudent(event.target.textContent);
}
function subjectListHandler(event) {
  const value = event.target.textContent;
  if (!value) {
    value = " ";
  }
  changeEstimatesSubject(event.target.textContent);
}
</script>

<style lang="scss" scoped>
.navigation {
  padding: 1rem;
  font-size: 2rem;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  &__bar {
    display: flex;
    list-style: none;
    padding: 0;
    gap: 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
    &-item {
      flex: 0 1 300px;
      cursor: pointer;
    }
  }
}
</style>
