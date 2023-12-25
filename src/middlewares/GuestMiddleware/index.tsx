import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import { pages } from '../../App'

export default function GuestMiddleware() {
  const { isAuth } = useAuth()
  return !isAuth ? <Outlet /> : <Navigate to={pages.Profile.url} />
}
