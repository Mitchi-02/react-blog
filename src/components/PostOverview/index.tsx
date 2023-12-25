import { Post } from '../../types'
import { useState } from 'react'
import { useAuth } from '../../AuthContext'
import { likePost, unLikePost } from '../../helpers/firebaseQuerys'
import { Link } from 'react-router-dom'
import { pages } from '../../App'

export default function PostOverview(props: { post: Post }) {
  const post = props.post
  const createdAt = new Date(post.createdAt).toDateString()
  const [totalLikes, setTotalLikes] = useState<number>(post.totalLikes)
  const { currentUser } = useAuth()
  const [liked, setLiked] = useState<boolean>(
    Boolean(post.likes.find((item) => item.user_id === currentUser?.uid))
  )
  const [loading, setLoading] = useState(false)

  const handleLike = async () => {
    setLiked(true)
    if (!currentUser) return
    try {
      setLoading(true)
      await likePost(post)
      setTotalLikes((state) => state + 1)
      setLoading(false)
    } catch (error) {
      setLiked(false)
      setLoading(false)
    }
  }
  const handleUnlike = async () => {
    setLiked(false)
    if (!currentUser) return
    try {
      setLoading(true)
      await unLikePost(post)
      setTotalLikes((state) => state - 1)
      setLoading(false)
    } catch (error) {
      setLiked(true)
      setLoading(false)
    }
  }

  return (
    <div className='border-2 border-mainGrey p-4 md:p-8 max-w-3xl mx-auto'>
      <div className='flex justify-between items-center gap-2 md:gap-4 font-semibold text-xl mb-10'>
        <span className='flex gap-2 md:gap-4 items-center'>
          <img
            referrerPolicy='no-referrer'
            className='rounded-full w-[30px]'
            src={post.user.photoURL}
            alt=''
          />{' '}
          {post.user.name}
        </span>
        <span className='text-right'>{createdAt}</span>
      </div>
      <h3 className='text-2xl font-bold capitalize mb-3 line-clamp-1'>
        {post.title}
      </h3>
      <p className='capitalize mb-10 line-clamp-5'>{post.description}.</p>
      <div className='flex gap-4'>
        <span className='py-4 px-6 text-white bg-blue-400 rounded-full'>
          {totalLikes}
        </span>
        {!liked && (
          <button onClick={handleLike} disabled={loading} className='button'>
            like
          </button>
        )}
        {liked && (
          <button onClick={handleUnlike} disabled={loading} className='button'>
            unlike
          </button>
        )}
        <Link to={pages.ShowPost.url + post.id} className='button grow'>
          Details
        </Link>
      </div>
    </div>
  )
}
