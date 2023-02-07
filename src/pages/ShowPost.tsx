import { useParams } from "react-router-dom";
import { DetailledPost, Loading } from "../components";
import { Post } from "../types";
import { useEffect, useState } from "react";
import { fetchPostById } from "../helpers/firebaseQuerys";


const ShowPost = () => {
    const { id } = useParams() as { id: string };
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Post|null>(null);
    
    useEffect(() => {
        const getPost = async()=>{
            const res = await fetchPostById(id);
            setPost(res);
            setLoading(false);
        }
        getPost();
    }, []);
    
    return (  
        <div className="py-6 sm:px-6">
            { loading ? <Loading/> : 
                !post ? <p className="mb-4 font-bold text-center p-4 rounded-xl bg-red-100 text-mainRed">No post found</p> :
                <DetailledPost post={post} />
            }
        </div>
    );
}
 
export default ShowPost;