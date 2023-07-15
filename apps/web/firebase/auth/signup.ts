import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase_app from "../config";

const auth = getAuth(firebase_app);


export default async function signUp(email: string, password: string) {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return { result, error: null };
    } catch (error) {
        return { result: null, error };
    }
}