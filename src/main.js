import { createApp } from "vue";
import App from "./pages/App.vue";
import { createStore } from "vuex";
import "./main.scss";

const app = createApp(App);
const store = createStore({
  state: {
    count: 4,
    students: [
      {
        id: 1,
        name: "Vasya",
        subjects: [
          { name: "Math", estimates: [5, 5, 4] },
          { name: "Physics", estimates: [3, 5, 4] },
          { name: "English", estimates: [5, 5, 4, 3, 4] },
          { name: "Chemistry", estimates: [5, 4, 4] },
        ],
        bad_leaves: 2,
        good_leaves: 4,
      },
      { id: 2, name: "Petya" },
    ],
  },
  getters: {
    getSubjectsNames: (state) => (id) => {
      const arr = [];
      state.students
        .find((student) => student.id === id)
        .subjects.forEach((element) => {
          arr.push(element.name);
        });
      return arr;
    },
    getSubjectEstimates: (state) => (id, subject) => {
      return state.students
        .find((student) => student.id === id)
        .subjects.find((currentSubject) => currentSubject.name === subject)
        .estimates;
    },
    getEstimatesSubject: (state) => (id, subject) => {
      return (
        state.students
          .find((student) => student.id === id)
          .subjects.find((currentSubject) => currentSubject.name === subject)
          .name || null
      );
    },
    getLeaves: (state) => (id) => {
      return [
        state.students.find((student) => student.id === id).bad_leaves,
        state.students.find((student) => student.id === id).good_leaves,
      ];
    },
  },
  mutations: {
    setEstimate: (state, payload) => {
      console.log("trigger");
      state.students
        .find((student) => student.id === payload.id)
        .subjects.find(
          (currentSubject) => currentSubject.name === payload.subject
        ).estimates[payload.index] = payload.value;
    },
  },
});
app.use(store);
app.mount("#app");
