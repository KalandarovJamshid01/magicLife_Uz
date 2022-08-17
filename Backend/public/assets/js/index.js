import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbi_HOG3zfMBHU0Jk3huT4aIafliN69Fs",
  authDomain: "magiclife-b626c.firebaseapp.com",
  projectId: "magiclife-b626c",
  storageBucket: "magiclife-b626c.appspot.com",
  messagingSenderId: "218854478267",
  appId: "1:218854478267:web:b66ac65c192fe4e7baf49e",
  measurementId: "G-0Q62FTKV51",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = "en";

window.recaptchaVerifier = new RecaptchaVerifier(
  "send",
  {
    size: "invisible",
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    },
  },
  auth
);

document.querySelector("#send").addEventListener("click", () => {
  const phoneNumber = document.querySelector("#phoneNumber").value;
  const appVerifier = window.recaptchaVerifier;
  console.log(phoneNumber);
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      console.log("kod kettu");
      // ...
    })
    .catch((error) => {
      console.log(error);
    });
});

document.querySelector("#verifying").addEventListener("click", () => {
  const code = document.querySelector("#verify").value;
  window.confirmationResult
    .confirm(code)
    .then((result) => {
      // User signed in successfully.
      alert("Siz tizimga kirdingiz");
      // ...
    })
    .catch((error) => {
      // User couldn't sign in (bad verification code?)
      alert("xato parol kiritdingiz");
      // ...
    });
});
