import {  getAuth,signOut } from "firebase/auth";
import firebase_app from "../config";


const auth = getAuth(firebase_app);

const clear = () => {
   
  };

export default async function signOutFunction() {
    try {
        const result = await signOut(auth).then(clear);
        return { result, error: null };
    } catch (error) {
        return { result: null, error };
    }
}