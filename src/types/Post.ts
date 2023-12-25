type Post = {
  id: string
  createdAt: number
  title: string
  description: string
  user: { name: string; id: string; photoURL: string }
  likes: { user_id: string; user_name: string }[]
  totalLikes: number
}

export default Post
