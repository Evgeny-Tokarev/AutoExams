import { createStore } from "vuex";

const store = createStore({
  state: {},
  getters: {
    getData: (state) => () => {
      return state.students;
    },
    getStudentID: (state) => () => {
      return state.students.find((student) => student.current === true)
        ? state.students.find((student) => student.current === true).id
        : null;
    },
    getStudents: (state) => () => {
      const arr = [];
      state.students.forEach((student) => {
        arr.push(student.name);
      });
      return arr;
    },
    getSubjectsName: (state) => (id, idx) => {
      const student = state.students.find((student) => student.id === id);
      if (idx > -1) {
        return student
          ? state.students
              .find((student) => student.id === id)
              .subjects.find((currentSubject, index) => index === idx).name
          : null;
      } else return null;
    },
    getEstimatesSubject: (state) => (id) => {
      const student = state.students.find((student) => student.id === id);
      if (student && student.subjects) {
        if (student.subjects.length) {
          return student.subjects.find(
            (currentSubject) => currentSubject.isEstimatesSubject === true
          ).name;
        } else return null;
      } else return null;
    },

    getEstimatesSubjectIdx: (state) => (id) => {
      const student = state.students.find((student) => student.id === id);
      return student
        ? state.students
            .find((student) => student.id === id)
            .subjects.findIndex(
              (currentSubject) => currentSubject.isEstimatesSubject === true
            )
        : null;
    },
    getSubjectsNames: (state) => (id) => {
      const student = state.students.find((student) => student.id === id);
      const arr = [];
      if (student) {
        if (student.subjects) {
          student.subjects.forEach((element) => {
            arr.push(element.name);
          });
        }
      }
      return arr;
    },
    getSubjectEstimates: (state) => (id, subject) => {
      if (subject) {
        return state.students
          .find((student) => student.id === id)
          .subjects.find((currentSubject) => currentSubject.name === subject)
          .estimates;
      } else return [];
    },
    getLeaves: (state) => (id) => {
      if (state.students.length) {
        return [
          state.students.find((student) => student.id === id).bad_leaves,
          state.students.find((student) => student.id === id).good_leaves,
        ];
      } else return [];
    },
    getStudent: (state) => (id) => {
      if (state.students) {
        return state.students.find((student) => student.id === id) || null;
      } else return null;
    },
  },
  mutations: {
    setData: (state, payload) => {
      state.students = payload.students;
    },
    setStudent: (state, payload) => {
      state.students.find((student, index) => index === payload.index).name =
        payload.value;
    },
    setNewStudent: (state) => {
      const nextID = state.students.length + 1;
      state.students.push({
        id: nextID,
        name: `Student${nextID}`,
        subjects: [],
        bad_leaves: "0",
        good_leaves: "0",
      });
      state.students.forEach((student) => {
        student.current = student.id === nextID ? true : false;
      });
    },
    setCurrentStudent: (state, payload) => {
      state.students.forEach((student) => {
        student.current = student.name === payload.value ? true : false;
      });
    },
    setStudentID: (state, payload) => {
      state.students.forEach((student, index) => {
        student.current = index === payload.idx ? true : false;
      });
    },
    setEstimatesSubject: (state, payload) => {
      state.students
        .find((student) => student.id === payload.id)
        .subjects.forEach((currentSubject) => {
          currentSubject.isEstimatesSubject =
            currentSubject.name === payload.value ? true : false;
        });
    },
    setEstimate: (state, payload) => {
      state.students
        .find((student) => student.id === payload.id)
        .subjects.find(
          (currentSubject) => currentSubject.name === payload.subject
        ).estimates[payload.index] = payload.value.toString();
    },
    setNewEstimate: (state, payload) => {
      if (state.students.find((student) => student.id === payload.id)) {
        if (
          state.students.find((student) => student.id === payload.id).subjects
            .length
        ) {
          state.students
            .find((student) => student.id === payload.id)
            .subjects.find(
              (currentSubject) => currentSubject.name === payload.name
            )
            .estimates.push("0");
        }
      }
    },
    setSubject: (state, payload) => {
      state.students
        .find((student) => student.id === payload.id)
        .subjects.find((currentSubject, idx) => idx === payload.index).name =
        payload.value;
      console.log(
        state.students
          .find((student) => student.id === payload.id)
          .subjects.find((currentSubject, idx) => idx === payload.index).name
      );
    },
    setLeave: (state, payload) => {
      const leave = payload.leaveType === "bad" ? "bad_leaves" : "good_leaves";
      state.students.find((student) => student.id === payload.id)[leave] =
        payload.value.toString();
    },
    setNewSubject: (state, payload) => {
      const student = state.students.find(
        (student) => student.id === payload.id
      );
      let counter = 0;
      if (student && student.subjects) {
        student.subjects.forEach((subject) => {
          if (subject.name.slice(0, 7) === `Subject`) {
            counter++;
          }
        });
        if (counter === 0) {
          counter = "";
        }
        student.subjects.push({
          name: `Subject${counter + 1}`,
          estimates: [],
        });
        student.subjects.forEach((currentSubject) => {
          currentSubject.isEstimatesSubject =
            currentSubject.name === `Subject${counter + 1}` ? true : false;
        });
      }
    },
    deleteStudent: (state, payload) => {
      const currentID = state.students.find(
        (student) => student.current === true
      ).id;

      if (currentID === payload.index + 1) {
        const nextIdx =
          state.students.length - 1 === payload.index ? 0 : payload.index + 1;
        console.log("next " + nextIdx);
        state.students.forEach((student, index) => {
          student.current = index === nextIdx ? true : false;
        });
      }
      state.students.splice(payload.index, 1);
    },
    deleteSubject: (state, payload) => {
      const student = state.students.find(
        (student) => student.id === payload.id
      );
      const estimatesSubjectIdx = student.subjects.findIndex(
        (currentSubject) => currentSubject.isEstimatesSubject === true
      );
      if (estimatesSubjectIdx === payload.index) {
        const nextIdx =
          student.subjects.length - 1 === payload.index ? 0 : payload.index + 1;
        student.subjects.forEach((currentSubject, index) => {
          currentSubject.isEstimatesSubject = index === nextIdx ? true : false;
        });
      }
      student.subjects.splice(payload.index, 1);
    },
    deleteEstimate: (state, payload) => {
      const student = state.students.find(
        (student) => student.id === payload.id
      );
      student.subjects
        .find((subject) => subject.name === payload.name)
        .estimates.splice(payload.index, 1);
    },
  },
  actions: {
    setDefaults({ commit }) {
      commit({
        type: "setData",
        students: [],
      });
    },
  },
});

export default store;
