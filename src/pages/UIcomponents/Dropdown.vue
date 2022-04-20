<template>
    <ul class="subject-list">
        <li v-if="!!title">{{ title }}</li>
        <li v-for="(subject, index) in subjectList" :key="index" @click="clickHandler">
            {{ ' ' + subject }}
        </li>
    </ul>
</template>

<script setup>
import { reactive, computed } from "vue";
    defineProps({
        subjectList: Array,
        title: String
    });
    
const emit = defineEmits('buttonc');

function clickHandler(e) {
  emit('buttonc', e);
}

</script>
<style lang="scss" scoped>
    .subject-list {
        font-size: 2rem;
        margin: 0 auto;
        padding: 0;
        min-width: 100px;
        border: 1px solid green;
        border-radius: 5px;
        background-color: rgb(239, 239, 239);
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        li {
            list-style: none;
            margin-right: auto;
            width: 100%;
            padding: 0 1rem;
            &:hover {
            background-color: rgb(163, 202, 173);
        }
            &:active {
            box-shadow: inset 0px 0px 5px #0f0f0f;
            outline: none ;
        }
        }
    }
</style>