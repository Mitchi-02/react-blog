import { Post } from "../types";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { likePost, unLikePost, deleteAuthPost } from "../helpers/firebaseQuerys";
import PostCommentsSection from "./PostCommentsSection";
import { useNavigate } from "react-router-dom";
import { pages } from "../App";
import Loading from "./Loading";


const DetailledPost = (props: {post:Post}) => {
    const redirect = useNavigate();
    const post = props.post;
    const createdAt = (new Date(post.createdAt)).toDateString();
    const [totalLikes, setTotalLikes] = useState<number>(post.totalLikes);
    const { currentUser } = useAuth();
    const [liked, setLiked] = useState<boolean>(Boolean(post.likes.find(item => item.user_id===currentUser?.uid )));
    const [message, setMessage] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleLike = async()=>{
        if(!currentUser) return;
        try {
            await likePost(post);
            setLiked(true);
            setTotalLikes(state=>state+1)
        } catch (error) {
            setMessage({success:false, content:"Something went wrong"});
        }
        
    }
    const handleUnlike = async()=>{
        if(!currentUser) return;
        try {
            await unLikePost(post);
            setLiked(false);
            setTotalLikes(state=>state-1);
        } catch (error) {
            setMessage({success:false, content:"Something went wrong"});
        }
    }

    const handleDelete = async()=>{
        setLoading(true);
        try {
            await deleteAuthPost(post);
            setLoading(false);
            setMessage({success:true, content:"Post deleted"});
            setTimeout(()=>redirect(pages.MyPosts.url), 3000);
        } catch (error:any) {
            setMessage({success:false, content:"Something went wrong"});
            setLoading(false);
        }
    }

    return (  
        <div className="max-w-3xl mx-auto" onClick={()=>setMessage(null)}>
            {loading && <Loading/>}
            {message?.success && <p className="mb-4 font-bold text-center p-4 rounded-xl bg-green-100 text-mainGreen">{message.content}</p> }
            {message?.success===false && <p className="mb-4 font-bold text-center p-4 rounded-xl bg-red-100 text-mainRed">{message.content}</p>}
            <div className="border-2 border-mainGrey p-4 md:p-8">
                <div className="flex justify-between items-center gap-2 md:gap-4 font-semibold md:text-xl mb-10">
                    <span className="flex gap-2 md:gap-4 items-center"><img referrerPolicy="no-referrer" className="rounded-full w-[30px]" src={post.user.photoURL} alt=""/> {post.user.name}</span>
                    <span className="text-right">{createdAt}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold capitalize mb-3 line-clamp-1">{post.title}</h3>
                <p className="capitalize mb-10 line-clamp-5">{post.description}.</p>
                <div className="flex gap-2 sm:gap-4 items-center">
                    <span className="py-4 px-6 text-white bg-blue-400 rounded-full">{totalLikes}</span>
                    {!liked && <button onClick={handleLike} className="button">like</button>}
                    {liked && <button onClick={handleUnlike} className="button">unlike</button>}
                    {currentUser?.uid===post.user.id && <button onClick={handleDelete} className="button grow">delete post</button>}
                </div>
            </div>
            <PostCommentsSection postId={post.id}/>
        </div>
    );
}
 
export default DetailledPost;