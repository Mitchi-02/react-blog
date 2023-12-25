import { Post } from '../../types'
import { useState } from 'react'
import { useAuth } from '../../AuthContext'
import {
  likePost,
  unLikePost,
  deleteAuthPost,
} from '../../helpers/firebaseQuerys'
import PostCommentsSection from './PostCommentsSection'
import { useNavigate } from 'react-router-dom'
import { pages } from '../../App'
import Loading from '../Loading'

export default function DetailledPost(props: { post: Post }) {
  const redirect = useNavigate()
  const post = props.post
  const createdAt = new Date(post.createdAt).toDateString()
  const [totalLikes, setTotalLikes] = useState<number>(post.totalLikes)
  const { currentUser } = useAuth()
  const [liked, setLiked] = useState<boolean>(
    Boolean(post.likes.find((item) => item.user_id === currentUser?.uid))
  )
  const [message, setMessage] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)

  const handleLike = async () => {
    if (!currentUser) return
    try {
      setLoading2(true)
      await likePost(post)
      setLiked(true)
      setTotalLikes((state) => state + 1)
      setLoading2(false)
    } catch (error) {
      setLoading2(false)
      setMessage({ success: false, content: 'Something went wrong' })
    }
  }
  const handleUnlike = async () => {
    if (!currentUser) return
    try {
      setLoading2(true)
      await unLikePost(post)
      setLiked(false)
      setTotalLikes((state) => state - 1)
      setLoading2(false)
    } catch (error) {
      setMessage({ success: false, content: 'Something went wrong' })
      setLoading2(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteAuthPost(post)
      setLoading(false)
      setMessage({ success: true, content: 'Post deleted' })
      setTimeout(() => redirect(pages.MyPosts.url), 3000)
    } catch (error: any) {
      setMessage({ success: false, content: 'Something went wrong' })
      setLoading(false)
    }
  }

  return (
    <div className='max-w-3xl mx-auto' onClick={() => setMessage(null)}>
      {loading && <Loading />}
      {message?.success && (
        <p className='mb-4 page-container font-bold text-center p-4 rounded-xl bg-green-100 text-mainGreen'>
          {message.content}
        </p>
      )}
      {message?.success === false && (
        <p className='mb-4 font-bold page-container text-center p-4 rounded-xl bg-red-100 text-mainRed'>
          {message.content}
        </p>
      )}
      <div className='border-b-2 sm:border-2 border-mainGrey p-4 md:p-8 sm:rounded-t-lg'>
        <div className='flex justify-between items-center gap-2 md:gap-4 font-semibold text-sm sm:text-base md:text-xl mb-10'>
          <span className='flex gap-2 md:gap-4 items-center'>
            <img
              referrerPolicy='no-referrer'
              className='rounded-full w-[30px]'
              src={post.user.photoURL}
              alt=''
            />{' '}
            <span className='truncate'>{post.user.name}</span>
          </span>
          <span className='text-right'>{createdAt}</span>
        </div>
        <h3 className='text-xl md:text-2xl font-bold capitalize mb-3 line-clamp-2 !text-ellipsis'>
          {post.title}
        </h3>
        <p className='capitalize mb-10 max-sm:text-sm'>{post.description}.</p>
        <div className='flex gap-2 sm:gap-4'>
          <span className='max-sm:text-sm py-4 px-6 text-white bg-blue-400 rounded-full'>
            {totalLikes}
          </span>
          {!liked && (
            <button
              onClick={handleLike}
              disabled={loading2}
              className='button max-sm:text-sm !py-2 !px-4'
            >
              like
            </button>
          )}
          {liked && (
            <button
              onClick={handleUnlike}
              disabled={loading2}
              className='button max-sm:text-sm !py-2 !px-4'
            >
              unlike
            </button>
          )}
          {currentUser?.uid === post.user.id && (
            <button
              onClick={handleDelete}
              className='button grow max-sm:text-sm !py-2 !px-4'
            >
              delete post
            </button>
          )}
        </div>
      </div>
      <PostCommentsSection postId={post.id} />
    </div>
  )
}
