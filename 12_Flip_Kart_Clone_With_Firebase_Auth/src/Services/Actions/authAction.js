// src/services/Actions/authAction.js
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";

const signUpSuc = () => ({ type: "SIGN_UP_SUC" });
const signINSuc = (user) => ({ type: "SIGN_IN_SUC", payload: user });
const signOUTSUC = () => ({ type: "SIGN_OUT_SUC" });
const errorMsg = (err) => ({ type: "ERROR", payload: err });

export const checkAuthStateAsync = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) dispatch(signINSuc(user));
    else dispatch(signOUTSUC());
  });
};

export const signUpAsync = (data) => async (dispatch) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
    dispatch(signUpSuc());
  } catch (error) {
    dispatch(errorMsg(error.message));
  }
};

export const signINAsync = (data) => async (dispatch) => {
  try {
    const res = await signInWithEmailAndPassword(auth, data.email, data.password);
    dispatch(signINSuc(res.user));
  } catch (error) {
    dispatch(errorMsg(error.message));
  }
};

export const googleSignInAsync = () => async (dispatch) => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    dispatch(signINSuc(res.user));
  } catch (error) {
    dispatch(errorMsg(error.message));
  }
};

export const signOutAsync = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(signOUTSUC());
  } catch (error) {
    dispatch(errorMsg(error.message));
  }
};
