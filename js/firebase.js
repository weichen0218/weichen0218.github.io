import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app-check.js";
import { getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQKcoOp6NPKQdqZGL0Uucq3Hm9yXELaj0",
  authDomain: "aromatherapy-course.firebaseapp.com",
  projectId: "aromatherapy-course",
  storageBucket: "aromatherapy-course.appspot.com",
  messagingSenderId: "248808106053",
  appId: "1:248808106053:web:d926d57ef8533a02a95b2c",
  measurementId: "G-0VMCQFMP40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LeX9tcnAAAAALS5yiuk241TwTBe94XT0EkYMHVZ")
})
export { getDatabase, ref, set }