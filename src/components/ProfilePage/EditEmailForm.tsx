import { useRef } from "react";
import { useAuth } from "../../AuthContext";

const EditEmailForm = (props:any) => {
    const { currentUser , updateUserEmail } = useAuth();
    const emailRef = useRef(currentUser?.email as string);
    const setLoading = props.setLoading;
    const setError = props.setError;
    const setSuccess = props.setSuccess;

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        const email = emailRef.current.trim();
        if(!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            setError("The email is not valid");
            return;
        }
        try {
            setLoading(true);
            await updateUserEmail(email);
            setLoading(false);
            setSuccess("Email updated successfully");
        }catch (error) {
            console.log(error);
            setError("Could not update email");
            setLoading(false);
        }
    }

    return (  
        <div className="border-mainGrey border-2 rounded-xl">
            <div className="px-8 py-6">
                <h1 className="text-mainBlue text-xl font-bold">Edit Email</h1>
            </div>
            <form onSubmit={handleSubmit} className="px-8 py-6 border-t-2 border-mainGrey">
                    <label>Full name</label>
                    <input type="text" placeholder="Enter your password here" className="mt-1 input" defaultValue={ currentUser?.email as string }
                    onChange={e => emailRef.current= e.target.value}/>
                    <button className="button w-full mt-6">Submit</button>
            </form>
        </div>
    );
}
 
export default EditEmailForm;