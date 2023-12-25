import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Loading from '../../components/Loading'
import { useAuth } from '../../AuthContext'
import { pages } from '../../App'

const schema = yup.object().shape({
  name: yup.string().min(8).max(30).required('Your full name is required'),
  email: yup
    .string()
    .email('The email is not valid')
    .required('Your email is required'),
  password: yup.string().min(8).max(20).required('A password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "The passwords don't match"),
})

export default function Register () {
  const { signUp } = useAuth()
  const redirect = useNavigate()
  const [error, setError] = useState<String>('')
  const [loading, setLoading] = useState<Boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data: any) => {
    try {
      setLoading(true)
      await signUp(data.email.trim(), data.password.trim(), data.name.trim())
      redirect(pages.Profile.url)
    } catch (error: any) {
      setError('Something went wrong')
      setLoading(false)
    }
  }
  return (
    <div className='py-6 sm:page-container'>
      {loading && <Loading />}
      <div className='space-y-6 py-6 px-4 sm:px-6 max-w-[700px] mx-auto border-mainGrey sm:border-2 sm:rounded-xl'>
        <h1 className='text-center font-bold sm:text-4xl text-3xl text-mainBlue'>
          Sign Up
        </h1>
        {error && (
          <p className='font-bold text-center p-4 rounded-xl bg-red-100 text-mainRed'>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-3'>
            <div>
              <label className={errors?.name && 'text-mainRed'}>
                Full name
              </label>
              <input
                type='text'
                placeholder='Enter your first name here'
                className={`mt-1 input ${errors?.name && 'error'}`}
                {...register('name')}
              />
              <p className='text-mainRed'>{errors?.name?.message as string}</p>
            </div>
            <div>
              <label className={errors?.email && 'text-mainRed'}>Email</label>
              <input
                type='text'
                placeholder='Enter your email here'
                className={`mt-1 input ${errors?.email && 'error'}`}
                {...register('email')}
              />
              <p className='text-mainRed'>{errors?.email?.message as string}</p>
            </div>
            <div className='relative'>
              <label className={errors?.password && 'text-mainRed'}>
                Password
              </label>
              <input
                type='password'
                placeholder='Enter your password here'
                className={`mt-1 input ${errors?.password && 'error'}`}
                {...register('password')}
              />
              <p className='text-mainRed'>
                {errors?.password?.message as string}
              </p>
            </div>
            <div className='relative'>
              <label className={errors?.confirmPassword && 'text-mainRed'}>
                Confirm password
              </label>
              <input
                type='password'
                placeholder='Confirm your password here'
                className={`mt-1 input ${errors?.confirmPassword && 'error'}`}
                {...register('confirmPassword')}
              />
              <p className='text-mainRed'>
                {errors?.confirmPassword?.message as string}
              </p>
            </div>
          </div>
          <button className='button w-full max-sm:text-sm'>Create an account</button>
        </form>
        <div className='text-center'>
          Already have an account ?
          <Link
            to={pages.Login.url}
            className='font-bold text-mainBlue underline underline-offset-2 ml-2 hover:opacity-80'
          >
            Sign in{' '}
          </Link>
        </div>
      </div>
    </div>
  )
}
