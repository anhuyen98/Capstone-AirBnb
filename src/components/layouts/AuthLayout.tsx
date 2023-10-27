import { useAuth } from 'hooks';
import { Navigate, Outlet } from 'react-router-dom';
export const AuthLayout = () => {
  const { token } = useAuth()
  if (token) {
    return <Navigate to='/home'/>
  }
  return (
    <div className=''>
      <img src="../images/background.jpg" alt="" className='fixed bg-contain top-0'/>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-24 mt-32'>
        <Outlet />
      </div>
    </div>
  )
}
