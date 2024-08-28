import { auth } from "../firebase/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  UserCredential 
} from "firebase/auth";


export const signUp = (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = (): Promise<void> => {
  return signOut(auth);
};

export const resetPassword = (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};
