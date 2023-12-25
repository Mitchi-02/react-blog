import { useRef, useState } from 'react'
import { addAuthPost } from '../../helpers/firebaseQuerys'
import Loading from '../../components/Loading'

export default function CreatePost () {
  const titleRef = useRef('')
  const descriptionRef = useRef('')
  const [error, setError] = useState<String>('')
  const [loading, setLoading] = useState<Boolean>(false)
  const [success, setSuccess] = useState<String>('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const title = titleRef.current
    const description = descriptionRef.current
    if (title === '') {
      setError('Title is required')
      return
    }
    if (title.length < 10) {
      setError('Title must be at least 10 characters')
      return
    }
    if (description === '') {
      setError('Description is required')
      return
    }
    if (description.length < 30) {
      setError('Description must be at least 30 characters')
      return
    }
    try {
      setLoading(true)
      await addAuthPost(title, description)
      setSuccess('Post created successfully')
      setLoading(false)
    } catch (error) {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div
      className='p-6'
      onClick={() => {
        setError('')
        setSuccess('')
      }}
    >
      {loading && <Loading />}
      <div className='space-y-8 px-8 py-6 border-2 border-mainGrey max-w-[700px] mx-auto rounded-xl'>
        <h1 className='text-center font-bold sm:text-4xl text-3xl text-mainBlue'>
          Create Post
        </h1>
        {error && (
          <p className='font-bold text-center p-4 rounded-xl bg-red-100 text-mainRed'>
            {error}
          </p>
        )}
        {success && (
          <p className='mb-4 font-bold text-center p-4 rounded-xl bg-green-100 text-mainGreen'>
            {success}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type='text'
              placeholder='Post title....'
              className='mt-1 input'
              onChange={(e) => (titleRef.current = e.target.value)}
            />
          </div>
          <div className='mt-3'>
            <label>Description</label>
            <input
              type='text'
              placeholder='Post description ...'
              className='mt-1 input'
              onChange={(e) => (descriptionRef.current = e.target.value)}
            />
          </div>
          <button className='button w-full mt-8'>Create</button>
        </form>
      </div>
    </div>
  )
}
