import { useAuth } from '../../../AuthContext'

export default function ProfileDetailsCard() {
  const { currentUser } = useAuth()
  return (
    <div className='border-mainGrey border-2 rounded-xl'>
      <div className='px-8 py-6'>
        <h1 className='text-mainBlue text-xl font-bold'>Profile Details</h1>
      </div>
      <div className='px-8 py-6 border-mainGrey border-y-2'>
        <img
          referrerPolicy='no-referrer'
          className='aspect-square rounded-full w-28 mx-auto'
          src={currentUser?.photoURL as string}
          alt=''
        />
      </div>
      <div className='space-y-3 px-8 py-6'>
        <div>
          <label>Full name</label>
          <p className='input mt-1 bg-gray-200'>{currentUser?.displayName}</p>
        </div>
        <div>
          <label>Email</label>
          <p className='input mt-1 bg-gray-200'>{currentUser?.email}</p>
        </div>
      </div>
    </div>
  )
}
