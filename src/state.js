import { createStore } from "vuex";

const store = createStore({
  state: {
    students: [
      //   {
      //     id: 1,
      //     name: "Vasya",
      //     subjects: [
      //       { name: "Math", estimates: ["5", "5", "4"] },
      //       { name: "Physics", estimates: ["3", "5", "4"] },
      //       { name: "English", estimates: ["5", "5", "4", "3", "4"] },
      //       { name: "Chemistry", estimates: ["5", "4", "4"] },
      //     ],
      //     bad_leaves: "2",
      //     good_leaves: "8",
      //   },
      //   { id: 2, name: "Petya" },
    ],
  },
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
      console.log("getSubjectsName  " + id + idx);
      if (idx > -1) {
        return state.students
          .find((student) => student.id === id)
          .subjects.find((currentSubject, index) => index === idx).name;
      } else return null;
    },
    getEstimatesSubject: (state) => (id) => {
      const student = state.students.find((student) => student.id === id);
      if (student) {
        if (
          student.subjects
            ? student.subjects.find(
                (currentSubject) => currentSubject.isEstimatesSubject === true
              )
            : false
        ) {
          return student.subjects.find(
            (currentSubject) => currentSubject.isEstimatesSubject === true
          ).name;
        } else {
          if (student.subjects ? student.subjects.length : false) {
            student.subjects[0].isEstimatesSubject = true;
            return student.subjects[0];
          } else {
            return null;
          }
        }
      } else {
        return null;
      }
    },

    getEstimatesSubjectIdx: (state) => (id) => {
      console.log("getEstimatesSubjectIdx " + id);
      return state.students
        .find((student) => student.id === id)
        .subjects.findIndex(
          (currentSubject) => currentSubject.isEstimatesSubject === true
        );
    },
    getSubjectsNames: (state) => (id) => {
      console.log("getSubjectsNames " + id);
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
    getSubjectEstimates: (state) => (id, subject, source) => {
      console.log(state, subject, source);
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
      console.log("setData  " + payload.students);
      state.students = payload.students;
    },
    setStudent: (state, payload) => {
      console.log("setStudent  " + payload.index);
      state.students.find((student, index) => index === payload.index).name =
        payload.value;
    },
    setNewStudent: (state, payload) => {
      console.log("setNewStudent  " + payload);
      const nextID = state.students.length + 1;
      state.students.push({
        id: nextID,
        name: `Student${nextID}`,
        subjects: [],
        bad_leaves: "0",
        good_leaves: "0",
      });
    },
    setCurrentStudent: (state, payload) => {
      console.log("setCurrentStudent  " + payload.value);
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
      console.log("setEsimatesSubject  " + payload.value);
      state.students
        .find((student) => student.id === payload.id)
        .subjects.forEach((currentSubject) => {
          currentSubject.isEstimatesSubject =
            currentSubject.name === payload.value ? true : false;
        });
    },
    setEstimate: (state, payload) => {
      console.log(payload);
      state.students
        .find((student) => student.id === payload.id)
        .subjects.find(
          (currentSubject) => currentSubject.name === payload.subject
        ).estimates[payload.index] = payload.value;
    },
    setNewEstimate: (state, payload) => {
      console.log(state);
      state.students
        .find((student) => student.id === payload.id)
        .subjects.find((currentSubject) => currentSubject.name === payload.name)
        .estimates.push("0");
    },
    setSubject: (state, payload) => {
      console.log(payload);
      console.log(
        state.students
          .find((student) => student.id === payload.id)
          .subjects.find((currentSubject, idx) => idx === payload.index).name
      );
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
      console.log(payload);
      const leave = payload.leaveType === "bad" ? "bad_leaves" : "good_leaves";
      state.students.find((student) => student.id === payload.id)[leave] =
        payload.value;
    },
    setNewSubject: (state, payload) => {
      const student = state.students.find(
        (student) => student.id === payload.id
      );
      let counter = 0;
      if (student.subjects) {
        student.subjects.forEach((subject) => {
          if (subject.name.slice(0, 7) === `Subject`) {
            counter++;
          }
        });
      } else {
        student.subjects = [];
      }

      if (counter === 0) {
        counter = "";
      }
      student.subjects.push({ name: `Subject${counter + 1}`, estimates: [] });
    },
    deleteStudent: (state, payload) => {
      console.log(payload.index);

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
      console.log(payload.index);
      const student = state.students.find(
        (student) => student.id === payload.id
      );
      const estimatesSubjectIdx = student.subjects.findIndex(
        (currentSubject) => currentSubject.isEstimatesSubject === true
      );

      if (estimatesSubjectIdx === payload.index) {
        const nextIdx =
          student.subjects.length - 1 === payload.index ? 0 : payload.index + 1;
        console.log("next " + nextIdx);
        student.subjects.forEach((currentSubject, index) => {
          currentSubject.isEstimatesSubject = index === nextIdx ? true : false;
        });
      }
      student.subjects.splice(payload.index, 1);
    },
    deleteEstimate: (state, payload) => {
      console.log(payload.index, payload.name);
      const student = state.students.find(
        (student) => student.id === payload.id
      );
      student.subjects
        .find((subject) => subject.name === payload.name)
        .estimates.splice(payload.index, 1);
    },
  },
  actions: {
    setDefaults({ commit, state }) {
      console.log("setting defaults");
      if (state.students) {
        if (state.students.length) {
          commit({
            type: "setStudentID",
            idx: 0,
          });
        } else {
          commit({
            type: "setStudentID",
            idx: 0,
          });
        }
      }
    },
  },
});

export default store;
