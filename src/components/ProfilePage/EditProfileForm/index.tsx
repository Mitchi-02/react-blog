import { useRef, useState } from 'react'
import { useAuth } from '../../../AuthContext'

type Props = {
  setLoading: (value: boolean) => void
  setError: (value: string) => void
  setSuccess: (value: string) => void
}

export default function EditProfileForm(props: Props) {
  const fileInputRef = useRef<any>()
  const { currentUser, updateUserProfile } = useAuth()
  const nameRef = useRef(currentUser?.displayName as string)

  const [image, setImage] = useState<any>(null)
  const setLoading = props.setLoading
  const setError = props.setError
  const setSuccess = props.setSuccess

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const name = nameRef.current.trim()
    if (name.length < 8 || name.length > 30) {
      setError('Full name must be at least 8 and at max 30')
      return
    }
    try {
      setLoading(true)
      if (!image) await updateUserProfile(name)
      else await updateUserProfile(name, image)
      setLoading(false)
      setSuccess('Profile updated successfully')
    } catch (error) {
      setError('Could not update profile')
      setLoading(false)
    }
  }
  return (
    <div className='border-mainGrey border-y-2 sm:border-2 sm:rounded-xl'>
      <div className='px-8 py-6'>
        <h1 className='text-mainBlue text-xl font-bold'>Edit Profile</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-4 justify-between px-8 py-6 border-mainGrey border-y-2'>
          <div>
            <h2 className='font-semibold text-lg'>Profile Picture</h2>
            <button
              type='button'
              className='button max-sm:text-xs max-sm:py-3 max-sm:px-4'
              onClick={() => fileInputRef.current.click()}
            >
              upload picture
            </button>
            <input
              multiple={false}
              accept='image/*'
              type='file'
              tabIndex={-1}
              className='hidden'
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files) setImage(e.target.files[0])
              }}
            />
          </div>
          <img
            referrerPolicy='no-referrer'
            className='aspect-square h-[84px] rounded-full'
            src={
              image
                ? URL.createObjectURL(image)
                : (currentUser?.photoURL as string)
            }
            alt=''
          />
        </div>
        <div className='px-8 py-6'>
          <label>Full name</label>
          <input
            type='text'
            placeholder='Enter your password here'
            className='mt-1 input'
            defaultValue={currentUser?.displayName as string}
            onChange={(e) => (nameRef.current = e.target.value)}
          />
          <button className='button w-full mt-6'>Submit</button>
        </div>
      </form>
    </div>
  )
}
