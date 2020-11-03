import React, { Component } from "react";
import { Tabs } from 'antd';
import Administradores from "./tabs/Administradores";
import Proveedores from "./tabs/Proveedores";
import Solicitantes from "./tabs/Solicitantes";
import "./AdmCuentas.css"
const { TabPane } = Tabs;
class AdmCuentas extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {

        return (
            < >
                <h1>Habilitar/inhabilitar cuentas</h1>
                <div className="card-container">
                    <Tabs type="card" size="large">
                        <TabPane tab="SOLICITANTES" key="1">
                            <Solicitantes />
                        </TabPane>
                        <TabPane tab="PROVEEDORES" key="2">
                            <Proveedores />
                        </TabPane>
                        <TabPane tab="ADMINISTRADORES" key="3">
                            <Administradores />
                        </TabPane>
                    </Tabs>
                </div>
            </>
        );
    }
}

export default AdmCuentas;