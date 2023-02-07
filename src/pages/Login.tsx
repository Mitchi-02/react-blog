import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Loading } from "../components";
import { useAuth } from "../AuthContext";
import { pages } from '../App';

const Login = () => {
    const { login, signInWithGoogle } = useAuth();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const redirect = useNavigate();
    const [error, setError] = useState<String>("");
    const [loading, setLoading] = useState<Boolean>(false);

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        if(!emailRef.current.trim() || !passwordRef.current.trim()) {
            setError("Please fill the fields");
            return;
        }
        try {
            setLoading(true);
            await login(emailRef.current.trim(), passwordRef.current.trim())
            redirect(pages.Profile.url);
        } catch (error) {
            setError("Invalid credentials");
            setLoading(false);
        }
    }

    const handleGoogleSignIn = async() => {
        try {
            setLoading(true);
            await signInWithGoogle();
            redirect(pages.Profile.url);
        } catch (error) {
            setError("Google Auth failed");
            setLoading(false);
        }
    }

    return (    
        <div className="py-6 px-6">
            {loading && <Loading/>}
            <div className="space-y-6 py-6 px-4 sm:px-6 max-w-[700px] mx-auto border-mainGrey border-2 rounded-xl">
                <h1 className="text-center font-bold sm:text-4xl text-3xl text-mainBlue">Sign In</h1>
                { error && <p className="font-bold text-center p-4 rounded-xl bg-red-100 text-mainRed">{error}</p> }
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">  
                        <div>
                            <label>Email</label>
                            <input type="text" placeholder="Enter your email here" className="mt-1 input"
                            onChange={e => emailRef.current= e.target.value}/>
                        </div>
                        <div className="relative">
                            <label>Password</label>
                            <input type="password" placeholder="Enter your password here" className="mt-1 input"
                            onChange={e => passwordRef.current= e.target.value}/>
                        </div>
                    </div>
                    <button className="button w-full">Sign In</button>
                </form>
                <button onClick={handleGoogleSignIn} className="button w-full">Sign in with google</button>
                <div className="justify-center flex flex-wrap">Forgot your password ? 
                    <Link to={pages.ResestPassword.url} className="font-bold text-mainBlue underline underline-offset-2 ml-2 hover:opacity-80">
                        Reset your password </Link>
                </div>
                <div className="justify-center flex flex-wrap">You don't have an account ? 
                    <Link to={pages.Register.url} className="font-bold text-mainBlue underline underline-offset-2 ml-2 hover:opacity-80">
                        Sign up </Link>
                </div>
            </div>
        </div>
    );
}
 
export default Login;