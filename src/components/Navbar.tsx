import { NavLink, useNavigate } from "react-router-dom";
import { pages } from "../App";
import { useState } from "react";
import Loading from "./Loading";
import icons from "../assets/icons.svg";
import { useAuth } from "../AuthContext";

const Navbar = () => {
    const { isAuth, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const redirect = useNavigate();
    const [loading, setLoading] = useState<Boolean>(false);

    const signUserOut = async () => {
        setLoading(true);
        await logout();
        redirect(pages.Login.url);
        setLoading(false);
    }

    return (  
        <nav>
            {loading && <Loading/>}
            <button className="md:hidden my-auto" onClick={()=>setOpen(state=>!state)}>
                <svg className="aspect-square w-[25px]">
                    <use xlinkHref={icons+"#menu"}></use>
                </svg>
            </button>
            <div onClick={()=>setOpen(state=>!state)} className={`md:hidden fixed z-10 top-0 left-0 cursor-pointer h-screen w-screen ${open ? "translate-x-0" : "-translate-x-full"}`}>

            </div>
            <ul className={`flex h-full md:items-center flex-col md:flex-row gap-8 md:gap-4 md:translate-x-0 transition-transform md:transition-none duration-500 
            ease-in-out bg-white py-8 pl-10 pr-20 md:p-0 z-20 fixed top-0 left-0 md:static shadow-[0_0_10px_5px_rgba(0,0,0,.1)] md:shadow-none
            font-bold md:font-normal text-xl md:text-base ${open ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute right-5 md:hidden" onClick={()=>setOpen(state=>!state)}>
                    <svg className="aspect-square w-[20px]">
                        <use xlinkHref={icons+"#close"}></use>
                    </svg>
                </button>
                <li onClick={()=>setOpen(state=>!state)}><NavLink className={({isActive})=> isActive ? "text-mainBlue font-semibold" : ""} to={pages.Home.url}>{pages.Home.name}</NavLink></li>
                {isAuth && <li onClick={()=>setOpen(state=>!state)}><NavLink className={({isActive})=> isActive ? "text-mainBlue font-semibold" : ""} to={pages.CreatePost.url}>{pages.CreatePost.name}</NavLink></li>}
                {isAuth && <li onClick={()=>setOpen(state=>!state)}><NavLink className={({isActive})=> isActive ? "text-mainBlue font-semibold" : ""} to={pages.Profile.url}>{pages.Profile.name}</NavLink></li>}
                {isAuth && <li onClick={()=>setOpen(state=>!state)}><NavLink className={({isActive})=> isActive ? "text-mainBlue font-semibold" : ""} to={pages.MyPosts.url}>{pages.MyPosts.name}</NavLink></li>}
                {!isAuth && <li onClick={()=>setOpen(state=>!state)}><NavLink className={({isActive})=> isActive ? "text-mainBlue font-semibold" : ""} to={pages.Login.url}>{pages.Login.name}</NavLink></li>}
                {!isAuth && <li onClick={()=>setOpen(state=>!state)}><NavLink className={({isActive})=> isActive ? "text-mainBlue font-semibold" : ""} to={pages.Register.url}>{pages.Register.name}</NavLink></li>}
                {isAuth && <li onClick={()=>setOpen(state=>!state)}><button onClick={ signUserOut }>Logout</button></li>}
            </ul>
        </nav>
    );
}
 
export default Navbar;