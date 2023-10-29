import { NavLink, generatePath, useNavigate } from "react-router-dom";
import { Input, Button, Avatar, Popover } from "components";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getUserByIdThunk } from "store/user";
import { getIdUser } from "utils";
import { useEffect } from "react";
import { authActions } from "store/auth";
import { PATH } from "constant";

export const Header = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    const id = getIdUser();
    dispatch(getUserByIdThunk(Number(id)));
  }, [dispatch]);
  return (
    <Container>
      <div className="header-content">
        <div className="mb-[20px] flex justify-center items-center gap-[70px]">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
            alt="horse"
            width={100}
            onClick={() => {
              navigate(PATH.home)
            }}
          />
          <div className="search">
            <Input />
            <Button className="btn-text dir dir-ltr">
              <span>Địa điểm bất kỳ</span>
            </Button>
            <Button className="btn-text dir dir-ltr">
              <span> Tuần bất kỳ </span>
            </Button>
            <Button className="btn-text dir dir-ltr">
              <span>Thêm Khách</span>
            </Button>
            <Button className="btn-search">
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
              <Popover
                content={
                  <div className="flex flex-col items-center justify-between h-38">
                    {
                      user?.avatar && <img src={user?.avatar} alt="" width="100px" className="border border-dashed border-slate-600 rounded-10"/>
                    }
                    <hr className="my-4"/>
                    <Button type="text" htmlType="button" danger onClick={() => {
                      const path = generatePath(PATH.userDetail, {userId: user?.id})
                      navigate(path)
                    }}>Thông tin cá nhân</Button>
                    {
                      user?.role.match('ADMIN') && <Button type="text" htmlType="button" danger onClick={() => {
                        navigate(PATH.manageUser)
                      }}>Quản lý (ADMIN)</Button>
                    }
                    <hr className="my-4"/>
                    <Button type="primary" danger onClick={() => {
                      dispatch(authActions.logOut())
                      navigate(PATH.login)
                    }}>
                    <i className="fa-solid fa-arrow-right-from-bracket ml-10 mr-[5px]"></i><span className="ml-[5px] mr-10">Đăng xuất</span>
                    </Button>
                  </div>
                }
              >
                <Avatar size="large">
                  <i className="fa-solid fa-bars"></i>
                  <i className="fa-regular fa-user text-20"></i>
                </Avatar>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </Container>
  );
};

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
`;
