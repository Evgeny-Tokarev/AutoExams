<template>
  <nav class="navigation">
    <h2>{{ state.studentsName || "Ученик" }}</h2>
    <ul class="navigation__bar">
      <li class="navigation__bar-item">
        <Dropdown
          name="Ученики"
          :subjectList="state.students"
          @buttonCallback="studentListHandler"
          @valueUpdate="changeStudent"
          :addable="true"
          :removable="true"
          @addItem="addStudent"
          @removeItem="removeStudent"
        />
      </li>
      <Transition name="bounce">
        <li class="navigation__bar-item">
          <Dropdown
            name="Предметы"
            :title="state.subjects ? null : 'Add subject'"
            :subjectList="state.subjects"
            @buttonCallback="subjectListHandler"
            @valueUpdate="changeSubject"
            :addable="true"
            :removable="true"
            @addItem="addSubject"
            @removeItem="removeSubject"
          />
        </li>
      </Transition>
      <Transition name="bounce">
        <li class="navigation__bar-item">
          <Dropdown
            name="Оценки"
            :subjectList="state.estimates"
            :title="state.estimatesSubject"
            @valueUpdate="changeEstimate"
            :addable="true"
            :removable="true"
            @addItem="addEstimate"
            @removeItem="removeEstimate"
          />
        </li>
      </Transition>
      <li class="navigation__bar-item">
        <Dropdown
          name="Пропуски"
          :subjectList="state.leaves"
          title="Все пропуски"
          classes="_doubled"
          :subjectNames="['Неуважительно', 'Уважительно']"
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
    return store.getters.getStudentID();
  }),
  estimatesSubject: computed(() => {
    console.log(store.getters.getEstimatesSubject(state.studentID));
    return store.getters.getEstimatesSubject(state.studentID);
  }),
  estimatesSubjectIdx: computed(() => {
    return store.getters.getEstimatesSubjectIdx(state.studentID);
  }),
  leaves: computed(() => {
    return store.getters.getLeaves(state.studentID);
  }),
  subjects: computed(() => {
    return store.getters.getSubjectsNames(state.studentID);
  }),
  estimates: computed(() => {
    return store.getters.getSubjectEstimates(
      state.studentID,
      store.getters.getSubjectsName(state.studentID, state.estimatesSubjectIdx)
    );
  }),
  double: "_doubled",
});

store.dispatch("setDefaults");

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
  let number = Number(newValue) || 0;
  if (number > 0 && number < 6) {
    store.commit({
      type: "setEstimate",
      id: state.studentID,
      subject: state.estimatesSubject,
      index: idx,
      value: number.toString(),
    });
  }
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
  store.commit({
    type: "deleteStudent",
    index: idx,
  });
}

function removeSubject(title, idx) {
  store.commit({
    type: "deleteSubject",
    id: state.studentID,
    index: idx,
  });
}

function removeEstimate(title, idx) {
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
  let number = Number(newValue) || 0;
  if (number > 0 && number < 101) {
    const leave = idx == 0 ? "bad" : "good";
    store.commit({
      type: "setLeave",
      id: state.studentID,
      leaveType: leave,
      value: number,
    });
  }
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
  height: 50vh;
  h2 {
    font-size: 3rem;
  }
  &__bar {
    display: flex;
    list-style: none;
    padding: 0;
    gap: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
    &-item {
      flex: 0 0 22%;
    }
  }
}
@media screen and (max-width: 992px) {
  .navigation__bar-item {
    flex: 0 0 48%;
  }
}
</style>
