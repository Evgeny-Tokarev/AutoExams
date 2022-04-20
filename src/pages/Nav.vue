<template>  
  <nav class="navigation">
      <ul class="navigation__bar">
          <li class="navigation__bar-item"><ButtonSimple buttonText="First button" @buttonc="utilityCallback" /></li>
          <li class="navigation__bar-item"><Dropdown :subjectList="subjects" @buttonc="utilityCallback" /></li>
          <li class="navigation__bar-item"><Dropdown :subjectList="['5', '5', '4']" title="Math" @buttonc="utilityCallback" /></li>
          <li class="navigation__bar-item"><Dropdown :subjectList="['Excused leave', 'Pass for no good reason']" @buttonc="utilityCallback" /></li>
      </ul>
  </nav>
</template>

<script setup>
import ButtonSimple from "./UIcomponents/ButtonSimple.vue";
import Dropdown from "./UIcomponents/Dropdown.vue";
import { computed } from "vue";
import { useStore } from 'vuex';

const store = useStore();
const subjects = computed(() => store.getters.getSubjectsNames(1));
// console.log(subjects)
// const subjectNames = subjects

function utilityCallback(event) {
    console.log("Callback triggered" + event.target);
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
        &__bar-item {
            flex: 1 1 auto;
            cursor: pointer;
        }
    }
}
</style>