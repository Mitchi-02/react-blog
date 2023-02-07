import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import Navbar from "./Navbar";

const Header = () => {
    const { currentUser } = useAuth();
    return (  
        <header className="flex justify-between py-5 px-8 border-b text-mainBlack">
            <Navbar/>
            {currentUser && 
                <div className="flex items-center gap-4">
                    { currentUser.displayName }
                    <img referrerPolicy="no-referrer" className="w-[30px] aspect-square rounded-full" src={currentUser.photoURL || ""} alt=""/>
                </div>
            }
        </header>
    );
}
 
export default Header;