import { useAuth } from '../../AuthContext'
import Navbar from './Navbar'

export default function Header () {
  const { currentUser } = useAuth()
  return (
    <header className='py-5 border-b text-mainBlack'>
      <div className='page-container flex justify-between'>
        <Navbar />
        {currentUser && (
          <div className='flex items-center gap-4'>
            {currentUser.displayName}
            <img
              referrerPolicy='no-referrer'
              className='w-[30px] aspect-square rounded-full'
              src={currentUser.photoURL || ''}
              alt=''
            />
          </div>
        )}
      </div>
    </header>
  )
}
