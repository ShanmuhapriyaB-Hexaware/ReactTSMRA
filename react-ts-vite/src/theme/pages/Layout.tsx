import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useSelector } from '../../store';

const { Header, Sider, Content } = Layout;

const WebLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, colorBgLayout},
    } = theme.useToken();

    const navItems = useSelector(state => state.commonSlice.navigation.navItems)

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