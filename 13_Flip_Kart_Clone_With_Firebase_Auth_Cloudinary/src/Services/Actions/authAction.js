import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth, db } from "../../Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const signINSuc = (user) => ({ type: "SIGN_IN_SUC", payload: user });
export const signOUTSUC = () => ({ type: "SIGN_OUT_SUC" });
export const signUPSuc = () => ({ type: "SIGN_UP_SUC" });
export const setError = (msg) => ({ type: "ERROR", payload: msg });

export const signINAsync = ({ email, password }) => async (dispatch) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, "users", res.user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      dispatch(signINSuc(userSnap.data()));
    } else {
      const user = {
        id: res.user.uid,
        email: res.user.email,
        displayName: "User",
        role: "user",
        photoURL:
          res.user.photoURL ||
          "https://media.istockphoto.com/id/1300845620/vector/user-icon.jpg",
      };
      await setDoc(userRef, user);
      dispatch(signINSuc(user));
    }
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const signUpAsync = ({ email, password, fullName }) => async (dispatch) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);

    if (response.user) {
      const user = {
        email: response.user.email,
        id: response.user.uid,
        role: "user",
        displayName: fullName || "User",
        photoURL:
          response.user.photoURL ||
          "https://media.istockphoto.com/id/1300845620/vector/user-icon.jpg",
      };

      await setDoc(doc(db, "users", user.id), user);

      await signOut(auth);

      dispatch(signUPSuc());
    }
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const googleSignInAsync = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    const googleUser = res.user;

    const userRef = doc(db, "users", googleUser.uid);
    const userSnap = await getDoc(userRef);

    let user;

    if (userSnap.exists()) {
      user = userSnap.data();
    } else {
      user = {
        id: googleUser.uid,
        email: googleUser.email,
        role: "user",
        displayName: googleUser.displayName || "Google User",
        photoURL:
          googleUser.photoURL ||
          "https://media.istockphoto.com/id/1300845620/vector/user-icon.jpg",
      };
      await setDoc(userRef, user);
    }

    dispatch(signINSuc(user));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const checkAuthStateAsync = () => (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        dispatch(signINSuc(userSnap.data()));
      } else {
        dispatch(signOUTSUC());
      }
    } else {
      dispatch(signOUTSUC());
    }
  });
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(signOUTSUC());
  } catch (err) {
    console.error("Logout error:", err);
  }
};
