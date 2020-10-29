import React, { Component } from "react";
import { Tabs } from 'antd';
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
                <h1>Pagina de Administración de Cuentas</h1>
                <div className="card-container">
                    <Tabs type="card" size="large">
                        <TabPane tab="Tab Title 1" key="1">
                            <p>Content of Tab Pane 1</p>
                            <p>Content of Tab Pane 1</p>
                            <p>Content of Tab Pane 1</p>
                        </TabPane>
                        <TabPane tab="Tab Title 2" key="2">
                            <p>Content of Tab Pane 2</p>
                            <p>Content of Tab Pane 2</p>
                            <p>Content of Tab Pane 2</p>
                        </TabPane>
                        <TabPane tab="Tab Title 3" key="3">
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                        </TabPane>
                    </Tabs>
                </div>
            </>
        );
    }
}

export default AdmCuentas;