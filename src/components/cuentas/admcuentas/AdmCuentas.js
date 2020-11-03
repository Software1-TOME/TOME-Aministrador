import React, { Component } from "react";
import { Tabs, Switch, Input } from 'antd';
import Administradores from "./tabs/Administradores";
import Proveedores from "./tabs/Proveedores";
import Solicitantes from "./tabs/Solicitantes";
import MetodosAxios from "../../../requirements/MetodosAxios";
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
            loadingTable: false,
            loadingCheck: false,
        };
    }
    componentDidMount() {
        this.llenarTablaSolicitante("");
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
                    let nombre = solicitante.user_datos.nombres + " " + solicitante.user_datos.apellidos.toLowerCase();
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
                                onChange={(switchValue) => this.onChangeCheck(solicitante.id, switchValue)}
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
                            onChange={(switchValue) => this.onChangeCheck(solicitante.id, switchValue)}
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

    onChangeCheck = (i, checked) => {
        console.log(i, checked);
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
        //console.log(this.state.selectedRowKeysSolicitante, "chao1")
        //console.log(this.state.selectedRowKeysProveedor, "chao2")
        //console.log(this.state.selectedRowKeysAdministrador, "chao3")
        this.llenarTablaSolicitante(search);

    }

    render() {

        return (
            < >
                <h1>Habilitar/inhabilitar cuentas</h1>
                <Search
                    placeholder="input search text"
                    allowClear
                    onSearch={this.mostrar}
                    style={{ width: 200, margin: '0 10px' }}
                />
                <div className="card-container">
                    <Tabs type="card" size="large">
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