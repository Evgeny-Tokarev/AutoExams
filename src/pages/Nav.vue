<template>
  <nav class="navigation">
    <ul class="navigation__bar">
      <li class="navigation__bar-item">
        <Dropdown
          :subjectList="state.subjects"
          @buttonCallback="subjectListHandler"
          @valueUpdate="changeSubject"
          :addable="true"
          @addItem="addSubject"
          @removeItem="removeSubject"
        />
      </li>
      <li class="navigation__bar-item">
        <Dropdown
          v-if="!!state.estimatesSubject"
          :subjectList="state.estimates"
          :title="state.estimatesSubject"
          @valueUpdate="changeEstimate"
          :addable="true"
          @addItem="addEstimate"
          @removeItem="removeEstimate"
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
  estimatesSubject: computed(() => {
    console.log(store.getters.getEstimatesSubject(state.studentID));
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

changeEsimatesSubject("Math");
state.double = "_doubled";
// writeUserData(state.student);
// // getUserData();

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

function changeEsimatesSubject(subject) {
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

function removeSubject(idx) {
  console.log("remove " + idx);
  store.commit({
    type: "deleteSubject",
    id: state.studentID,
    index: idx,
  });
}

function removeEstimate(title, idx) {
  console.log("remove " + idx);
  store.commit({
    type: "deleteEstimate",
    id: state.studentID,
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
function addEstimate(title) {
  store.commit({
    type: "setNewEstimate",
    id: state.studentID,
    name: title,
  });
}

function subjectListHandler(event) {
  console.log(event.target.textContent.length);
  const value = event.target.textContent;
  if (!value) {
    value = " ";
  }
  changeEsimatesSubject(event.target.textContent);
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
