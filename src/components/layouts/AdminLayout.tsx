import { NavLink, Outlet, generatePath, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  TeamOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AuditOutlined,
  DatabaseOutlined,
  IdcardOutlined,
  HomeOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Menu, theme, Layout } from "antd";
import { Button } from "components";
import { PATH } from "constant";
import { useAppDispatch } from "store";
import { authActions } from "store/auth";
import { getIdUser } from "utils";

const { Header, Sider, Content } = Layout;

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width="250px"
          theme="light"
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <TeamOutlined />,
                label: (
                  <NavLink to={PATH.manageUser}>Quản Lý Người Dùng</NavLink>
                ),
              },
              {
                key: "2",
                icon: <EnvironmentOutlined />,
                label: (
                  <NavLink to={PATH.manageLocation}>
                    Quản Lý Thông Tin Vị Trí
                  </NavLink>
                ),
              },
              {
                key: "3",
                icon: <HomeOutlined />,
                label: (
                  <NavLink to={PATH.manageRoom}>
                    Quản Lý Thông Tin Phòng
                  </NavLink>
                ),
              },
              {
                key: "4",
                icon: <AuditOutlined />,
                label: (
                  <NavLink to={PATH.manageBooking}>Quản Lý Đặt Phòng</NavLink>
                ),
              },
              {
                key: "5",
                icon: <DatabaseOutlined />,
                label: "Trang chủ",
                onClick: () => {
                  navigate('/');
                },
              },
              {
                key: "6",
                icon: <IdcardOutlined />,
                label: "Cá nhân",
                onClick: () => {
                  const id = getIdUser()
                  const path = generatePath(PATH.userDetail, {userId: id})
                  navigate(path);
                },
              },
              {
                key: "7",
                icon: <LoginOutlined />,
                label: "Đăng xuất",
                onClick: () => {
                  dispatch(authActions.logOut());
                  navigate(PATH.login);
                },
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, color: "#eee", background: "#001529" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: "#eee",
              }}
            />
            Quản Trị Viên
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
