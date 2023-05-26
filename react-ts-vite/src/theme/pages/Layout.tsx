import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from '../../store';

const { Header, Sider, Content } = Layout;

const WebLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, colorBgLayout },
    } = theme.useToken();

    const navItems = useSelector(state => state.commonSlice.navigation.navItems)
    const user = useSelector(state => state.authSlice.auth.user)

    const navigate = useNavigate();
    const [currentNav, setCurrentNav] = useState(null)

    const handleMenuClick = (e: any) => {
        if (e.key !== "/logout") {
            navigate(e.key);
        }
        else {
            localStorage.clear();
            sessionStorage.clear()
            sessionStorage.configurationName = 'config_classic'
            navigate('/login')
        }
    };

    const handleUserMenuSelect = (e: any) => {
        if (e.key !== "/logout") {
            setCurrentNav(e.key)
        }
    }

    const userItems = [
        {
            label: user,
            key: '/home',
            // disabled: true
        },
        {
            type: "divider",
        },
        {
            label: 'Profile',
            key: '/profile',
            icon: <UserOutlined />,
        },
        {
            label: 'Logout',
            key: '/logout',
            danger: true,
            icon: <LogoutOutlined />,
        }
    ]

    const userMenuProps: any = {
        items: userItems,
        selectable: true,
        onSelect: handleUserMenuSelect,
        selectedKeys: [currentNav],
        onClick: handleMenuClick,
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                        color: colorBgContainer,
                    }}
                />
                {/* <div className="logo" /> */}
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={navItems}
                />
            </Sider>
            <Layout>
                <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', padding: 0, background: colorBgLayout }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "15px" }}>
                        <Dropdown menu={userMenuProps} >
                            <Button shape="circle" className="user-button">
                                {user.split("")[0]}
                            </Button>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        padding: 24,
                        minHeight: "100vh",
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default WebLayout;