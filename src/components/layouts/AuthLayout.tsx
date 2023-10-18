import { Outlet } from 'react-router-dom';
export const AuthLayout = () => {
  return (
    <div className=''>
      <img src="../images/background.jpg" alt="" className='fixed bg-contain top-0'/>
      {/* <div className='bg-black opacity-40 absolute top-0 left-0 bottom-0 right-0'>
      </div> */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-24 mt-32'>
        <Outlet />
      </div>
    </div>
  )
}
