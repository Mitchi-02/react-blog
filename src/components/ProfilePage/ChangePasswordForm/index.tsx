import { useRef } from 'react'
import { useAuth } from '../../../AuthContext'

type Props = {
    setLoading: (value: boolean) => void
    setError: (value: string) => void
    setSuccess: (value: string) => void
}

export default function ChangePasswordForm(props: Props) {
  const { updateUserPassword } = useAuth()
  const setLoading = props.setLoading
  const setError = props.setError
  const setSuccess = props.setSuccess
  const passwordRef = useRef('')
  const confirmPasswordRef = useRef('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const password = passwordRef.current.trim()
    const confirmPassword = confirmPasswordRef.current.trim()
    if (password.length < 8 || password.length > 20) {
      setError('Password must be at least 8 and at max 20')
      return
    }
    if (password != confirmPassword) {
      setError("Passwords don't match")
      return
    }
    try {
      setLoading(true)
      await updateUserPassword(password)
      setLoading(false)
      setSuccess('Passowrd updated successfully')
    } catch (error) {
      setError('Could not update password')
      setLoading(false)
    }
  }

  return (
    <div className='border-mainGrey border-2 rounded-xl'>
      <div className='px-8 py-6'>
        <h1 className='text-mainBlue text-xl font-bold'>Change Password</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className='px-8 py-6 border-mainGrey border-t-2'
      >
        <div>
          <label>New password</label>
          <input
            type='password'
            className='mt-1 input'
            onChange={(e) => (passwordRef.current = e.target.value)}
          />
        </div>
        <div className='mt-3'>
          <label>Confirm new password</label>
          <input
            type='password'
            className='mt-1 input'
            onChange={(e) => (confirmPasswordRef.current = e.target.value)}
          />
        </div>
        <button className='button w-full mt-6'>Submit</button>
      </form>
    </div>
  )
}
