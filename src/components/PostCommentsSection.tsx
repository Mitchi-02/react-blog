import { useEffect, useRef, useState } from "react";
import { addComment, fetchPostComments, deleteAuthComment } from "../helpers/firebaseQuerys";
import { Comment as CommentType, Comment as TypeComment } from "../types";
import Comment from "./Comment";
import Loading from "./Loading";
import { useAuth } from "../AuthContext";

const PostCommentsSection = (props: {postId:string}) => {
    const { currentUser } = useAuth();
    const postId = props.postId;
    const commentRef = useRef("");
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const [comments, setComments] = useState<TypeComment[]>([]);

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        if(!currentUser) return;
        const comment = commentRef.current;
        if(!comment) return;
        setLoading2(true);
        const newComment = await addComment(postId, comment) as TypeComment;
        setComments([newComment, ...comments]);
        setLoading2(false);
    }

    const fetchMoreComments = async() => {
        try { 
            setLoading(true);
            const moreComments = await fetchPostComments(postId, 5, comments[comments.length-1].createdAt);
            setComments([...comments, ...moreComments]);
            setLoading(false);
        } catch (error) {}
    }

    const handleDelete = async(comment:CommentType)=>{
        setLoading2(true);
        try {
            await deleteAuthComment(comment);
            setComments(comments=>comments.filter(item=>item.id!=comment.id));
            setLoading2(false);
        } catch (error:any) { setLoading2(false); }
    }
    
    useEffect(()=> {
        const initialFetch = async()=>{
            try { 
                const firstComments = await fetchPostComments(postId,5);
                setComments(firstComments);
                setLoading(false);
            } catch (error) { }
        }
        initialFetch();
    }, []);

    return (  
        <div className="border-2 border-t-0 border-mainGrey p-4 md:p-8">
            {loading2 && <Loading/>}
            <form className="flex gap-4 mb-6" onSubmit={handleSubmit}>
                <input type="text" className="input" placeholder="Comment..." 
                onChange={(e)=>commentRef.current=e.target.value}/>
                <button disabled={loading2||loading} className="button">Submit</button>
            </form>
            <ul className="flex flex-col gap-8">
                {comments.map((comment)=>(
                    <Comment key={comment.id} comment={comment} handleDelete={()=>handleDelete(comment)}/>
                ))}
                {!loading&&comments.length==0 ?
                    <p className="mb-4 font-bold text-center p-4 rounded-xl bg-blue-100 text-mainBlue">No comments</p>
                    : <button disabled={loading} className="button" onClick={fetchMoreComments}>
                        {loading ? "Loading comments" : "Show more Comments"}
                    </button>
                }
            </ul>
        </div>
    );
}
 
export default PostCommentsSection;