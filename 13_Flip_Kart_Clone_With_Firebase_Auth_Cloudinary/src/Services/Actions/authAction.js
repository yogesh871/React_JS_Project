import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase";

export const signINSuc = (user) => ({ type: "SIGN_IN_SUC", payload: user });
export const signOUTSUC = () => ({ type: "SIGN_OUT_SUC" });
export const signUPSuc = () => ({ type: "SIGN_UP_SUC" });
export const setError = (msg) => ({ type: "ERROR", payload: msg });

export const signINAsync = ({ email, password }) => async (dispatch) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    dispatch(signINSuc(res.user));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const signUpAsync = ({ email, password }) => async (dispatch) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    dispatch(signUPSuc());
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const googleSignInAsync = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider) ;
    dispatch(signINSuc(res.user));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const checkAuthStateAsync = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(signINSuc(user));
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
