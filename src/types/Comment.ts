type Comment = {
    id: string;
    postId: string;
    createdAt: number;
    content: string;
    user: { name: string, id:string, photoURL:string };
}

export default Comment;