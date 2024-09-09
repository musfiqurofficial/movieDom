import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";
import { _firebase_auth_provier_type } from "../type";
import { app } from "./firebase.config";

// auth provider
const google_provider = new GoogleAuthProvider();
const facebook_provider = new FacebookAuthProvider();

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export class Firebase {
  // create user with email password;
  signup_user({ email = "", password = "" }) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // login a user
  singin_user({ email = "", password = "" }) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // signout a user
  singout_user() {
    return signOut(auth);
  }

  // user state change follower
  user_state_checker(callBack) {
    return onAuthStateChanged(auth, callBack);
  }

  //   singin with redirect.
  singin_with(type) {
    switch (type) {
      case _firebase_auth_provier_type.google:
        return signInWithRedirect(auth, google_provider);

      case _firebase_auth_provier_type.facebook:
        return signInWithRedirect(auth, facebook_provider);

      default:
        console.warn("signin_with need a type");
        break;
    }
  }

  //   send link to email
  verify_email(user) {
    return sendEmailVerification(user);
  }

  // reset password
  reset_password(email){
    return sendPasswordResetEmail(auth,email)
  }
}

const Auth = new Firebase();

export default Auth;
