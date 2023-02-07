import { useEffect, useState } from "react";
import { Post } from "../types";
import { PostOverview, Loading } from "../components";
import { fetchPostsPaginate, filters } from "../helpers/firebaseQuerys";


const Home = () => {
    const [posts, setPosts] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loading2, setLoading2] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [filter, setFilter] = useState<string>(filters[0].value);

    const fetchMorePosts = async() => {
        if(posts.length==0) return;
        const lastPostCreatedAt = posts[posts.length-1][filter];
        try { 
            setLoading2(true);
            const morePosts = await fetchPostsPaginate(5,filter, lastPostCreatedAt);
            setPosts([...posts, ...morePosts]);
            setLoading2(false);
        } catch (error) {
            setError("Something went wrong");
            setLoading2(false);
        }
    }

    const changeFilter = (e:any) => {
        if(e.target.value!=filter) setFilter(e.target.value);
    }

    useEffect(()=> {
        const initialFetch = async() => {
            try { 
                setLoading(true);
                const firstPosts = await fetchPostsPaginate(10, filter);
                setPosts(firstPosts);
                setLoading(false);
            } catch (error) {
                setError("Something went wrong");
                setLoading(false);
            }
        }
        initialFetch();
    }, [filter]);

    return ( 
        <div className="py-6 sm:px-6">
            {loading && <Loading />}
            <div className="flex gap-8 items-center mb-10 justify-center">
                <span className="text-2xl">Order By</span>
                {filters.map((filt)=>(
                    <button key={filt.value} disabled={loading} onClick={changeFilter} value={filt.value} 
                    className={`font-bold py-4 px-6 rounded-3xl 
                    ${filter==filt.value ? "bg-mainBlue text-white cursor-auto" : "cursor-pointer"}`}>{filt.text}</button>
                ))}
    
            </div>
            {   error ? <p className="mb-4 font-bold text-center p-4 rounded-xl bg-red-100 text-mainRed">{error}</p>
                :
                <>
                    <ul className="flex flex-col gap-8">
                        {posts.map((post:Post)=>(
                            <li key={post.id}><PostOverview post={post} /></li>
                        ))}
                        {!loading &&
                            <button disabled={loading} className="button" onClick={fetchMorePosts}>
                                {loading2 ? "Loading..." : "Show more Posts"}
                            </button>
                        } 
                    </ul>
                    
                </>
            }
        </div>
    );
}
 
export default Home;