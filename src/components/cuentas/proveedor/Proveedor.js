import React, { Component } from "react";
import { Table, Button, Input, Tabs } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import MetodosAxios from "../../../requirements/MetodosAxios";
import Pendientes from "./Pendientes/Pendientes";
import './Proveedor.css'
import Proveedores from "./Proveedores/Proveedores";
const { TabPane } = Tabs;
const { Search } = Input;
const columns = [
    { title: 'Nombre', dataIndex: 'nombre', },
    { title: 'Profesión', dataIndex: 'profesion', },
    { title: 'Correo Electrónico', dataIndex: 'email', },
    { title: 'Licencia', dataIndex: 'estado', },
    { title: 'Fecha de registro', dataIndex: 'fecha_creacion', },];



class Proveedor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            proveedores: [],
            pendientes: [],
        };
    }

    componentDidMount() {
    }


    onSearch = value => {
        console.log(value)
    }

    render() {

        return (
            < >
                <h1 className="proveedor-title">Proveedor</h1>
                <div>
                    <div  className="search-div">
                        <Search
                            placeholder="Buscar"
                            allowClear
                            onSearch={this.onSearch}
                            style={{ width: 200, margin: '0 10px', border:'1px solid black'}}
                            className="search-p"
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>

                    </div>
                    <div className="card-container">
                        <Tabs type="card" size="large">
                            <TabPane tab="Proveedores" key="1" >
                                <Proveedores />
                            </TabPane>
                            <TabPane tab="Pendientes" key="2">
                                <Pendientes />
                            </TabPane>
                        </Tabs>
                    </div>

                </div>
            </>
        );
    }
}

export default Proveedor;