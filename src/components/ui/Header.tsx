import { styled } from 'styled-components'
import { NavLink } from 'react-router-dom'


export const Header = () => {
  return (
    <div>
      <div className="flex items-center gap-[60px]">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
          alt='horse'
          width={100}  
        />
        <nav>
          <NavLink to="">LỊCH CHIẾU</NavLink>
          <NavLink to="">PHIM</NavLink>
          <NavLink to="">RẠP</NavLink>
          <NavLink to="">TIN TỨC</NavLink>
        </nav>
      </div>
    </div>
  )
}

