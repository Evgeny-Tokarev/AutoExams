import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  //   push,
  //   update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAD_BTx-_LCqLtFBXbTmUaWieE030kNW8U",
  authDomain: "student-auto-test.firebaseapp.com",
  databaseURL:
    "https://student-auto-test-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "student-auto-test",
  storageBucket: "student-auto-test.appspot.com",
  messagingSenderId: "282352919234",
  appId: "1:282352919234:web:227da3698bb076a4c2115b",
};

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(app));

function writeUserData(props) {
  console.log(props);
  const db = getDatabase(app);
  set(ref(db, "student/" + props.id), {
    id: props.id,
    name: props.name,
    subjects: props.subjects,
    bad_leaves: props.bad_leaves,
    good_leaves: props.good_leaves,
  });
}

function getUserData(id) {
  get(child(dbRef, `users/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
// function updateUserData() {}
export { getUserData, writeUserData };
