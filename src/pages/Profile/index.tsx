import { useState } from 'react'
import Loading from '../../components/Loading'
import ProfileDetailsCard from '../../components/ProfilePage/ProfileDetailsCard'
import EditProfileForm from '../../components/ProfilePage/EditProfileForm'
import ChangePasswordForm from '../../components/ProfilePage/ChangePasswordForm'
import EditEmailForm from '../../components/ProfilePage/EditEmailForm'

export default function Profile() {
  const [error, setError] = useState<String>('')
  const [success, setSuccess] = useState<String>('')
  const [loading, setLoading] = useState<Boolean>(false)

  const setErrorAndScroll = (value: string) => {
    setError(value)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  const setSuccessAndScroll = (value: string) => {
    setSuccess(value)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <div
      className='py-6 px-6'
      onClick={() => {
        setError('')
        setSuccess('')
      }}
    >
      {error && (
        <p className='mb-4 font-bold text-center p-4 rounded-xl bg-red-100 text-mainRed'>
          {error}
        </p>
      )}
      {success && (
        <p className='mb-4 font-bold text-center p-4 rounded-xl bg-green-100 text-mainGreen'>
          {success}
        </p>
      )}
      {loading && <Loading />}
      <div className='grid md:grid-cols-2 gap-8 items-start'>
        <ProfileDetailsCard />
        <EditProfileForm
          setLoading={setLoading}
          setError={setErrorAndScroll}
          setSuccess={setSuccessAndScroll}
        />
        <ChangePasswordForm
          setLoading={setLoading}
          setError={setErrorAndScroll}
          setSuccess={setSuccessAndScroll}
        />
        <EditEmailForm
          setLoading={setLoading}
          setError={setErrorAndScroll}
          setSuccess={setSuccessAndScroll}
        />
      </div>
    </div>
  )
}
