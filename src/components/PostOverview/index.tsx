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
    <div className='border-y-2 sm:border-2 border-mainGrey p-4 md:p-8 max-w-3xl mx-auto sm:rounded-lg'>
      <div className='flex justify-between items-center flex-wrap gap-2 sm:gap-4 font-semibold text-sm sm:text-base md:text-xl mb-10'>
        <span className='flex gap-2 md:gap-4 items-center'>
          <img
            referrerPolicy='no-referrer'
            className='rounded-full w-[30px]'
            src={post.user.photoURL}
            alt=''
          />{' '}
          <span className='truncate'>
            {post.user.name}
          </span>
        </span>
        <span className='text-right ml-auto'>{createdAt}</span>
      </div>
      <h3 className='text-xl sm:text-2xl font-bold capitalize mb-3 truncate'>
        {post.title}
      </h3>
      <p className='capitalize mb-10 line-clamp-5 !text-ellipsis max-sm:text-sm'>
        {post.description}.
      </p>
      <div className='flex gap-4'>
        <span className='max-sm:text-sm py-4 px-6 text-white bg-blue-400 rounded-full'>
          {totalLikes}
        </span>
        {!liked && (
          <button
            onClick={handleLike}
            disabled={loading}
            className='button max-sm:text-sm !py-2 !px-4'
          >
            like
          </button>
        )}
        {liked && (
          <button
            onClick={handleUnlike}
            disabled={loading}
            className='button max-sm:text-sm !py-2 !px-4'
          >
            unlike
          </button>
        )}
        <Link
          to={pages.ShowPost.url + post.id}
          className='button grow max-sm:text-sm !py-2 !px-4'
        >
          Details
        </Link>
      </div>
    </div>
  )
}
