import { Footer, Header } from 'components'
import {Outlet} from 'react-router-dom'
export const MainLayouts = () => {
  return (
    <div>
      <h1>MainLayouts</h1>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
