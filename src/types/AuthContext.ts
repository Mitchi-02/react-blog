import { User, UserCredential } from "firebase/auth";

type AuthContext = {
    currentUser: User | null;
    isAuth: boolean;
    signInWithGoogle: () => Promise<UserCredential>;
    login: (email:string, password:string) => Promise<UserCredential>;
    signUp: (email:string, password:string, name:string) => Promise<void>;
    logout: () => Promise<void>,
    resetPassword: (email:string) => Promise<void>,
    updateUserEmail: (email:string) => Promise<void>,
    updateUserPassword: (password:string) => Promise<void>,
    updateUserProfile: (name?:string, photo?:string) => Promise<void>

}

export default AuthContext;