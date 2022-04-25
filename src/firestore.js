import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

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
  console.log("props " + props);
  const db = getDatabase(app);
  set(ref(db, "/"), {
    students: props,
  });
}

function getUserData() {
  console.log("Geting...");
  return get(child(dbRef, `/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Snapshot " + snapshot.val().students);
        return snapshot.val().students;
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
// function updateUserData() {}
export { getUserData, writeUserData };
