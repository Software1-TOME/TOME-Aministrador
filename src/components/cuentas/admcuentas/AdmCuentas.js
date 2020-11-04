import React, { Component } from "react";
import { Tabs, Switch, Input, Button } from 'antd';
import Administradores from "./tabs/Administradores";
import Proveedores from "./tabs/Proveedores";
import Solicitantes from "./tabs/Solicitantes";
import MetodosAxios from "../../../requirements/MetodosAxios";
import Eliminar from "../../../img/icons/eliminar.png";
import Icon from '@ant-design/icons';
import "./AdmCuentas.css"
const { TabPane } = Tabs;
const { Search } = Input;
class AdmCuentas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRowKeysSolicitante: [],
            selectedRowKeysProveedor: [],
            selectedRowKeysAdministrador: [],
            data_solicitante: [],
            data_proveedor: [],
            loadingTable: false,
            loadingCheck: false,
        };
    }
    componentDidMount() {
        this.llenarTablaSolicitante("");
        this.llenarTablaProveedor("");
    }

    llenarTablaSolicitante = (search) => {
        this.setState({
            loadingTable: true
        })
        MetodosAxios.obtener_solicitantes().then(res => {
            let data_solicitante = [];
            for (let i = 0; i < res.data.length; i++) {


                let solicitante = res.data[i]

                if (search !== "") {
                    search = search.toLowerCase()
                    let nombre = solicitante.user_datos.nombres.toLowerCase() + " " + solicitante.user_datos.apellidos.toLowerCase();
                    let cedula = solicitante.user_datos.cedula.toLowerCase();
                    let correo = solicitante.user_datos.user.email.toLowerCase();
                    if (nombre.search(search) !== -1 || cedula.search(search) !== -1 || correo.search(search) !== -1) {
                        data_solicitante.push({
                            key: solicitante.id,
                            nombres: solicitante.user_datos.nombres + " " + solicitante.user_datos.apellidos,
                            cedula: solicitante.user_datos.cedula,
                            correo: solicitante.user_datos.user.email,
                            check: <Switch
                                key={solicitante.id}
                                loading={this.state.loadingCheck}
                                onChange={(switchValue) => this.onChangeCheckSolicitante(solicitante.id, switchValue)}
                                defaultChecked={solicitante.estado}
                            />,
                        });
                    }
                } else {
                    data_solicitante.push({
                        key: solicitante.id,
                        nombres: solicitante.user_datos.nombres + " " + solicitante.user_datos.apellidos,
                        cedula: solicitante.user_datos.cedula,
                        correo: solicitante.user_datos.user.email,
                        check: <Switch
                            key={solicitante.id}
                            loading={this.state.loadingCheck}
                            onChange={(switchValue) => this.onChangeCheckSolicitante(solicitante.id, switchValue)}
                            defaultChecked={solicitante.estado}
                        />,
                    });
                }


            }
            this.setState({
                data_solicitante: data_solicitante,
                loadingTable: false
            })
        })
    }

    llenarTablaProveedor = (search) => {
        this.setState({
            loadingTable: true
        })
        MetodosAxios.obtener_proveedores().then(res => {
            let data_proveedor = [];
            for (let i = 0; i < res.data.length; i++) {


                let proveedor = res.data[i]

                if (search !== "") {
                    search = search.toLowerCase()
                    let nombre = proveedor.user_datos.nombres.toLowerCase() + " " + proveedor.user_datos.apellidos.toLowerCase();
                    let cedula = proveedor.user_datos.cedula.toLowerCase();
                    let correo = proveedor.user_datos.user.email.toLowerCase();
                    if (nombre.search(search) !== -1 || cedula.search(search) !== -1 || correo.search(search) !== -1) {
                        data_proveedor.push({
                            key: proveedor.id,
                            nombres: proveedor.user_datos.nombres + " " + proveedor.user_datos.apellidos,
                            cedula: proveedor.user_datos.cedula,
                            correo: proveedor.user_datos.user.email,
                            check: <Switch
                                key={proveedor.id}
                                loading={this.state.loadingCheck}
                                onChange={(switchValue) => this.onChangeCheckProveedor(proveedor.id, switchValue)}
                                defaultChecked={proveedor.estado}
                            />,
                        });
                    }
                } else {
                    data_proveedor.push({
                        key: proveedor.id,
                        nombres: proveedor.user_datos.nombres + " " + proveedor.user_datos.apellidos,
                        cedula: proveedor.user_datos.cedula,
                        correo: proveedor.user_datos.user.email,
                        check: <Switch
                            key={proveedor.id}
                            loading={this.state.loadingCheck}
                            onChange={(switchValue) => this.onChangeCheckProveedor(proveedor.id, switchValue)}
                            defaultChecked={proveedor.estado}
                        />,
                    });
                }


            }
            this.setState({
                data_proveedor: data_proveedor,
                loadingTable: false
            })
        })
    }

    onChangeCheckSolicitante = (i, checked) => {
        this.setState({
            loadingCheck: true
        })
        MetodosAxios.cambio_solicitante_estado({ 'estado': checked }, i).then(res => {
            console.log(res)
        })
        this.setState({
            loadingCheck: false
        })

    }

    onChangeCheckProveedor = (i, checked) => {
        this.setState({
            loadingCheck: true
        })
        /*MetodosAxios.cambio_solicitante_estado({ 'estado': checked }, i).then(res => {
            console.log(res)
        })*/
        this.setState({
            loadingCheck: false
        })

    }

    onSelectChangeSolicitante = (selectedRowKeys, selectedRows) => {
        console.log('Rows: ', selectedRows);
        console.log('Keys:', selectedRowKeys);
        this.setState({ selectedRowKeysSolicitante: selectedRowKeys });
    };
    onSelectChangeProveedor = (selectedRowKeys, selectedRows) => {
        console.log('Rows: ', selectedRows);
        console.log('Keys:', selectedRowKeys);
        this.setState({ selectedRowKeysProveedor: selectedRowKeys });
    };
    onSelectChangeAdministrador = (selectedRowKeys, selectedRows) => {
        console.log('Rows: ', selectedRows);
        console.log('Keys:', selectedRowKeys);
        this.setState({ selectedRowKeysAdministrador: selectedRowKeys });
    };


    mostrar = (search) => {
        console.log(search)
        this.llenarTablaSolicitante(search);
        this.llenarTablaProveedor(search);

    }

    async eliminar() {
        console.log("eliminar", this.state.selectedRowKeysSolicitante)
        if (this.state.selectedRowKeysSolicitante.length > 0) {
            for (let i = 0; i < this.state.selectedRowKeysSolicitante.length; i++) {
                let id = this.state.selectedRowKeysSolicitante[i];
                await MetodosAxios.eliminar_solicitante(id).then(res => {
                    console.log(res)
                })
            }
        }
        this.llenarTablaSolicitante("");
    }
    render() {

        return (
            < >
                <h1>Habilitar/inhabilitar cuentas</h1>
                <Search
                    placeholder="Buscar"
                    allowClear
                    onSearch={this.mostrar}
                    style={{ width: 200, margin: '0 10px' }}
                />
                <Button
                    type="text"
                    shape="circle"
                    size="small"
                    icon={<Icon component={() => (<img alt="icono eliminar" src={Eliminar} height="auto" width="12px" />)} />}
                    onClick={() => { this.eliminar() }}
                />

                <div className="card-container">
                    <Tabs type="card" size="large" >
                        <TabPane tab="SOLICITANTES" key="1">
                            <Solicitantes
                                onSelectChange={this.onSelectChangeSolicitante}
                                data_solicitante={this.state.data_solicitante}
                                loadingTable={this.state.loadingTable}
                            />
                        </TabPane>
                        <TabPane tab="PROVEEDORES" key="2">
                            <Proveedores
                                onSelectChange={this.onSelectChangeProveedor}
                                data_proveedor={this.state.data_proveedor}
                                loadingTable={this.state.loadingTable}
                            />
                        </TabPane>
                        <TabPane tab="ADMINISTRADORES" key="3">
                            <Administradores
                                onSelectChange={this.onSelectChangeAdministrador}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </>
        );
    }
}

export default AdmCuentas;