import { addDoc, collection, doc, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from "firebase/firestore";
/*import { auth, db } from "../firebase";
import { PostData } from "../types/Post";
import { useEffect, useRef, useState } from "react";


const useFirebase = () => {
    const filtersRef = useRef(["createdAt", "totalLikes"]);
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [filter, setFilter] = useState<string>(filtersRef.current[0]);
    const fetchPostsPaginate = async(limitConstraint:number=0, orderByConstraint:string="", startsAfterConstraint:any=null):Promise<void> => {
        setLoading(true);
        const constraints = [];
        if(orderByConstraint) constraints.push(orderBy(orderByConstraint, "desc"));
        if(limitConstraint) constraints.push(limit(limitConstraint));
        if(startsAfterConstraint) constraints.push(startAfter(startsAfterConstraint));
        try { 
            const response = await getDocs(query(collection(db, "posts"), ...constraints));
            const postsData = response.docs.map((doc) => ({...doc.data(), id: doc.id})) as PostData[];
            setData([...data, ...postsData]);
        } catch (error) {
            setError("Something went wrong");
        }
        setLoading(false);
    }


    return { data, loading, error, fetchPostsPaginate }
}


export default useFirebase;*/




