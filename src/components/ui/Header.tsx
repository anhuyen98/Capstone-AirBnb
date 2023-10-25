// import { styled } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Input, Button, Avatar } from 'components'
import styled from 'styled-components'


export const Header = () => {
  return (
    <Container>
      <div className='header-content'>
        <div className="mb-[20px] flex justify-center items-center gap-[70px]">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
            alt='horse'
            width={100} />
          <div className="search">
            <Input />
            <Button className='btn-text dir dir-ltr'>
              <span>Địa điểm bất kỳ</span>
            </Button>
            <Button className='btn-text dir dir-ltr'>
              <span> Tuần bất kỳ </span>
            </Button>
            <Button className='btn-text dir dir-ltr'>
              <span>Thêm Khách</span>
            </Button>
            <Button className='btn-search'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
            
          </div>
          <div className="nav-right flex gap-[50px]">
            <nav className="nav-text">
              <NavLink to="">Cho thuê chỗ ở qua Airbnb</NavLink>
            </nav>
            <nav className="globe-icon">
              <NavLink to="">
                <i className="fa-solid fa-globe"></i>
              </NavLink>
            </nav>
            <div className="avatar-info">
              {/* <i className="fa-solid fa-address-card"></i> */}
              <Avatar size="large" >
                <i className="fa-solid fa-bars"></i>
                <i className="fa-regular fa-user text-20"></i>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </Container >
  )
}

const Container = styled.header`
  .header-content {
    max-width: var(--max-width);
    margin: auto;
    padding: 20px 40px;
        
  }      
  .search {
    display: flex;
    align-items: center;
    .btn-search {
                height: 46px !important;
                border: none;
                border-radius: 50%;
                background: red;
                color: #fff;
                margin-left: 20px;
                &:hover {
                    color: var(--primary-color) !important;
                }
    }
    input {
                background: transparent;
                color: #111;
                outline: none;
                text-align: center;
    }
    .btn-text.dir {
              background: transparent;
              cursor: pointer;
              padding: 0;
              text-align: inherit;
              border: none;             
              margin-left: 20px;
    }
    span {
              font-size: large;
              font-weight: 500;
    }
  }
  .nav-right {
    font-size: larger;
    font-weight: 500;
  }
        
`
