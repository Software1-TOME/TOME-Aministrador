import React, { Component } from "react";
import { Layout, Menu, Avatar, Row, Col,Image  } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, MailOutlined } from '@ant-design/icons';
import tomeLogoB from "../img/tome-logo-blanco.png";
import "./LayoutPage.css";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class LayoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <Layout>
                <Sider
                    width="300"
                    className="menuLateral"
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >

                    <Row className="logo" justify="center" align="middle">
                        <Col>
                            <Avatar size={75} icon={<UserOutlined />} />
                            <p className="textoLogo">axell@piogram.com</p>
                            <p className="textoLogo">Lorem Ipsum</p>
                        </Col>
                    </Row>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
                        <SubMenu key="sub1" title="CUENTAS">
                            <Menu.Item key="1">Habilitar/inhabilitar cuentas</Menu.Item>
                            <Menu.Item key="2">Proveedor</Menu.Item>
                            <Menu.Item key="3">Solicitante</Menu.Item>
                            <Menu.Item key="4">Administrador</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title="SERVICIOS">
                            <Menu.Item key="5">Categorías</Menu.Item>
                            <Menu.Item key="6">Sub-categorías</Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub3" title="PAGOS">
                            <Menu.Item key="7">Categorías</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title="PUBLICIDAD">
                            <Menu.Item key="7">Categorías</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub5" title="PROMOCIÓN">
                            <Menu.Item key="7">Categorías</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub6" title="POLÍTICAS">
                            <Menu.Item key="7">Categorías</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub7" title="SUGERENCIAS">
                            <Menu.Item key="7">Categorías</Menu.Item>
                        </SubMenu>
                    </Menu>

                </Sider>

                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                       <Row justify="space-between" align="middle" style={{height:"100%", width:"100%",paddingLeft:"3%",paddingRight:"3%"}}>
                           <Col>
                                <img height="80px" width="auto" src={tomeLogoB} />
                           </Col>
                           <Col>
                                Cerrar Sesión
                           </Col>
                       </Row>
                    </Header>  
                    <Content >
                        <div className="site-layout-background" style={{ padding: 24, minHeight: "100%" }}>
                            content
                        </div>
                    </Content>
                   
                </Layout>

            </Layout>
        );
    }
}

export default LayoutPage;