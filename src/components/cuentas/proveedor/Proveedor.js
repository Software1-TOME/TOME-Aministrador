import React, { Component,} from "react";
import { Input, Tabs } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import MetodosAxios from "../../../requirements/MetodosAxios";
import { get_Pendientes, getProveedor } from './funtions';
import Pendientes from "./Pendientes/Pendientes";
import './Proveedor.css'
import Proveedores from "./Proveedores/Proveedores";
const { TabPane } = Tabs;
const { Search } = Input;


class Proveedor extends Component {
    constructor(props) {
        super(props);
        this.state = { // Check here to configure the default column
            loading_pendientes: false,
            loading_proveedores:false,
            proveedores: [],
            pendientes: [],
        };
    }

    componentDidMount() {
        this.load_Pendientes();
        this.load_proveedores();
    }

    async load_Pendientes() {
        this.setState({loading_pendientes: true})
        let pendientes = []
        let value = await MetodosAxios.obtener_proveedores_pendientes();
        let count = 1;
        for (let pendiente of value.data) {
            let _pendiente = await get_Pendientes(pendiente, count)
            pendientes.push(_pendiente);
            count++;
        }

        this.setState({
            pendientes: pendientes,
            loading_pendientes: false,
        })
    }

    async load_proveedores() {
        this.setState({loading_proveedores: true})
        let proveedores = []
        let value = await MetodosAxios.obtener_proveedores();
        let data = value.data
        let count =1;
        for (let proveedor of data) {
            let element = await getProveedor(proveedor, count)
            proveedores.push(element)
            count++;
        }
        this.setState({ proveedores: proveedores, loading_proveedores:false })
        console.log(proveedores)
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
                            style={{ width: 200, margin: '0 10px'}}
                            className="search-p"
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>

                    </div>
                    <div className="card-container">
                        <Tabs type="card" size="large">
                            <TabPane tab="Proveedores" key="1" >
                                <Proveedores 
                                proveedores={this.state.proveedores}
                                loading={this.state.loading_proveedores}/>
                            </TabPane>
                            <TabPane tab="Pendientes" key="2">
                                <Pendientes 
                                pendientes= {this.state.pendientes}
                                loading= {this.state.loading_pendientes}/>
                            </TabPane>
                        </Tabs>
                    </div>

                </div>
            </>
        );
    }
}

export default Proveedor;