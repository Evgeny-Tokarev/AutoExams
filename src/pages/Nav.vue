<template>
  <nav class="navigation">
    <ul class="navigation__bar">
      <!-- <li class="navigation__bar-item"><ButtonSimple buttonText="First button" @buttonCallback="utilityCallback" /></li> -->
      <li class="navigation__bar-item">
        <Dropdown
          :subjectList="state.subjects"
          @buttonCallback="subjectListHandler"
        />
      </li>
      <li class="navigation__bar-item">
        <Dropdown
          :subjectList="state.estimates"
          :title="state.estimatesSubject"
          @valueUpdate="changeEstimate"
        />
      </li>
      <li class="navigation__bar-item">
        <Dropdown
          :subjectList="state.leaves"
          title="Leaves"
          classes="_doubled"
          :names="['bad', 'good']"
          @buttonCallback="listCallback"
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

function changeEstimate(newValue, idx) {
  console.log("trigger in nav.vue");
  store.commit({
    type: "setEstimate",
    id: 1,
    subject: state.estimatesSubject,
    index: idx,
    value: newValue,
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
