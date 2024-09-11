import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FileExcelOutlined,
  LogoutOutlined,
  HomeOutlined,
  HistoryOutlined,
  CodeSandboxOutlined,
  ScheduleOutlined
} from "@ant-design/icons";
import { Admin,Standart } from "../Routes/const";
import { Layout, Menu, Button, theme, AutoComplete, Input, Flex, Modal } from "antd";
import Logo from "../assets/Image/logo.png";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import { store, useAppSelector } from "../Store/store";
import { logoutSuccess } from "../Store/useReducer";

const { Header, Sider, Content, Footer } = Layout;


interface RouteToKeyMap {
  [key: string]: string;
}


//brute force system for cyber security
export const AppLayout: React.FC = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleLogut= () =>{
    store.dispatch(logoutSuccess())
    navigate("/")
  }
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedMenuKey, setSelectedMenuKey] = useState("");

  const renderTitle = (title: string) => <span>{title}</span>;
  const location = useLocation();

  const user = useAppSelector((state) => JSON.parse(state.user.user));

  const [Role, setRole] = useState(user.data.role.name);

  const [roleList, setRoleList] = useState({
    Admin: false,
    Standart: false,
  });

  const [loading, setloading] = useState(true);
  useEffect(() => {
    setRoleList((prevRole) => ({
      ...prevRole,
      [Role]: true,
    }));

    console.log([Role]);
    console.log(roleList);
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);

  const menuList = roleList.Admin
    ? Admin
    : roleList.Standart
    ? Standart
    : Standart;


  return (
    <Layout>
      <Sider
        trigger={true}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            width: "100%",
            padding: 10,
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              borderRadius: "10px",
              width: collapsed ? "65px" : "150px",
              transition: "width 0.3s",
            }}
          />
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          {menuList.map((item)=> (<>

          <Menu.Item key={item.path} icon={item.icon}>
          <NavLink to={item.path}>{item.title}</NavLink>
          </Menu.Item>

          </>))}
    </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={{ marginLeft: collapsed ? 75 : 200, transition: "margin  0.3s" }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex
            align="center"
            justify="space-between"
            style={{ paddingRight: 10 }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Button
          style={{color:"red" , backgroundColor:"white", }}
          onClick={showModal}
        ><LogoutOutlined /></Button>
          </Flex>
        </Header>
        <Modal title="Do You Want to Exit ?" okText="Exit" okType="danger" open={isModalOpen} onOk={handleLogut} onCancel={handleCancel}>

      </Modal>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "90vh",
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Hello Ada ©2024
        </Footer>
      </Layout>
    </Layout>
  );
};
