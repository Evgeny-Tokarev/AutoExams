<template>
     <MainContent />
     <div>{{ $store.state.count }}</div>
</template>


<script setup>
  import { computed } from "vue";
  import MainContent from "./MainContent.vue";
  import { useStore } from "vuex";
  const store = useStore();
  const count = computed(() => store.state.students[0].name);
</script>
