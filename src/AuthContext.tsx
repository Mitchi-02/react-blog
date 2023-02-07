import { useContext, useState, useEffect, createContext } from "react";
import { auth, googleProvider, storage } from "./firebase";
import { User, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, 
    updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Loading } from "./components";
import { AuthContext as TypeAuthContext } from './types';

const AuthContext = createContext(null) as any;

export function useAuth() {
  return useContext<TypeAuthContext>(AuthContext);
}

export function AuthProvider(props:any) {
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const [loading, setLoading] = useState(true);

    const updateUserProfile = async(name:string="", photo:any=null):Promise<void> => {
        if(photo){
            const fileRef = ref(storage, auth.currentUser?.uid);
            await uploadBytes(fileRef, photo);  
            const photoURL = await getDownloadURL(fileRef);
            await updateProfile(auth.currentUser as User, { displayName:name, photoURL });
        } else {
            await updateProfile(auth.currentUser as User, { displayName:name });
        }
        setCurrentUser({...auth.currentUser} as User);
    }

    const signUp = async(email:string, password:string, name:string):Promise<void> => {
        await createUserWithEmailAndPassword(auth, email, password);
        const fileRef = ref(storage, "default");
        const photoURL = await getDownloadURL(fileRef);
        await updateProfile(auth.currentUser as User, { displayName:name, photoURL });
        setCurrentUser({...auth.currentUser} as User);
    }

    const login = (email:string, password:string) => signInWithEmailAndPassword(auth, email, password);
    
    const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

    const logout = () => signOut(auth);

    const resetPassword = (email:string) => sendPasswordResetEmail(auth, email);

    const updateUserEmail = (email:string) => updateEmail(auth.currentUser as User, email);

    const updateUserPassword = (password:string) => updatePassword(auth.currentUser as User, password);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

  const value = {
    currentUser,
    isAuth: Boolean(currentUser),
    signInWithGoogle,
    login,
    signUp,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    updateUserProfile
  }
  
  
  return (
    <AuthContext.Provider value={value}>
        {loading ? <Loading /> : props.children}
    </AuthContext.Provider>
  )
}