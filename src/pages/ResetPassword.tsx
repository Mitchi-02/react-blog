import { useRef, useState } from "react";
import { Loading } from "../components";
import { useAuth } from "../AuthContext";


const ResetPassword = () => {
    const { resetPassword } = useAuth();
    const emailRef = useRef("");
    const [error, setError] = useState<String>("");
    const [success, setSuccess] = useState<String>("");
    const [loading, setLoading] = useState<Boolean>(false);

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        if(!emailRef.current.trim()) {
            setError("Please enter your email");
            return;
        }
        try {
            setLoading(true);
            await resetPassword(emailRef.current);
            setSuccess("Email sent");
            setLoading(false);
        } catch (error) {
            setError("No email found");
            setLoading(false);
        }
    }

    return (    
        <div className="py-6 px-6">
            {loading && <Loading/>}
            <div className="space-y-6 py-6 px-4 sm:px-6 max-w-[700px] mx-auto border-mainGrey border-2 rounded-xl">
                <h1 className="text-center font-bold sm:text-4xl text-3xl text-mainBlue">Reset Password</h1>
                <p className="font-bold text-center">Enter your email. A reset password mail will be sent.</p>
                { error && <p className="font-bold text-center p-4 rounded-xl bg-red-100 text-mainRed">{error}</p> }
                { success && <p className="mb-4 font-bold text-center p-4 rounded-xl bg-green-100 text-mainGreen">{success}</p> }
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="text" placeholder="Enter your email here" className="mt-1 input"
                    onChange={e => emailRef.current= e.target.value} onFocus={()=>{setError(""); setSuccess("")}}/>
                    <button className="button w-full mt-4">Send reset email</button>
                </form>
            </div>
        </div>
    );
}
 
export default ResetPassword;