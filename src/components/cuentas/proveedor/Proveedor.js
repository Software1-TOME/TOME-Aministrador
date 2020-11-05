import React, { Component, } from "react";
import { Input, Tabs, Button, Modal } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import MetodosAxios from "../../../requirements/MetodosAxios";
import { get_Pendientes, getProveedor } from './funtions';
import Pendientes from "./Pendientes/Pendientes";
import './Proveedor.css'
import Proveedores from "./Proveedores/Proveedores";
import aceptar from '../../../img/aceptar.png'
import rechazar from '../../../img/rechazar.png'
import SelectedContex from '../../../context/SelectedContext'
const { TabPane } = Tabs;
const { Search } = Input;


class Proveedor extends Component {
    static contextType = SelectedContex

    constructor(props, context) {
        super(props);
        this.state = {
            loading_proveedores: false,
            proveedores: [],
            /**VALUES FOR PENDIENTES */
            pendientes: [],
            loading_pendientes: false,
            created: false,
            failed: false,
            sent: false,
            creado: {},
            success: false,
            msg: "",
            is_changed: false,
            contexto: context,
        };
    }

    componentDidMount() {
        //const {show}= this.context
        console.log(this.context)
        this.load_proveedores();
        this.load_Pendientes();
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.is_changed !== prevState.is_changed) {
            if (this.state.is_changed) {
                this.load_Pendientes().then(value => {
                    console.log(value)
                })
                this.load_proveedores()
                this.setState({ is_changed: false })
            }


        }
    }


    async load_Pendientes() {
        this.setState({ loading_pendientes: true })
        let pendientes = []
        let value = await MetodosAxios.obtener_proveedores_pendientes();
        console.log(value.data)
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
        return value.data;
    }

    handleOk = (e) => {
        const { selected, setShow } = this.context
        try {

            let data = {
                tipo: 'Proveedor',
                email: selected.email,
                user_datos: selected.user_datos,
                proveedor: selected.proveedor_id,
                pendiente: selected.pendiente_id,
                profesion: selected.profesion,
                experiencia: selected.ano_experiencia,
            }
            MetodosAxios.register_proveedor(data).then(value => {
                let datos = value.data;
                if (datos.success) {
                    this.setState({ created: true })

                    setShow(false)
                    let creado = {
                        password: datos.password,
                        email: datos.username
                    }
                    this.setState({ creado: creado, is_changed: true })
                } else {
                    this.setState({ failed: true })
                    setShow(false)
                }
            })
        } catch (e) {
            this.setState({ failed: true })
            setShow(false)
        }
    };

    handleCancel = e => {
        console.log(e);
        const { setShow } = this.context
        this.setState({
            created: false,
            failed: false,
            sent: false,
        });
        setShow(false)
    };

    handleSendEmail = (e) => {
        console.log(this.state.creado)
        try {
            MetodosAxios.enviar_email(this.state.creado).then(value => {
                let data = value.data;
                this.setState({ created: false })
                if (data.success) {
                    this.setState({ msg: "El email ha sido enviado!" })
                } else {
                    this.setState({ msg: "No se pudo enviar el correo" })
                }
                this.setState({ sent: true })
            })
        } catch (e) {
            this.setState({ msg: "No se pudo enviar el correo", sent: true })
        }

    }

    getDocuments() {
        const { selected } = this.context
        if (selected.document) {
            let docs = " "
            let documents = selected.document;
            for (let doc of documents) {
                let desc = doc.descripcion
                if (!desc) {
                    docs += desc + "\n"
                }
            }
            if (docs === " ") {
                return "No hay documentos para presentar"
            } else {
                return docs;
            }
        }
    }

    getCuenta(user, variable) {
        if (!user) return ""
        if (!user.cuentas) return ""
        if (user.cuentas.length > 0) return user.cuentas[0][variable]
        else return " "
    }



    async load_proveedores() {
        this.setState({ loading_proveedores: true })
        let proveedores = []
        let value = await MetodosAxios.obtener_proveedores();
        let data = value.data
        let count = 1;
        for (let proveedor of data) {
            let element = await getProveedor(proveedor, count)
            proveedores.push(element)
            count++;
        }
        this.setState({ proveedores: proveedores, loading_proveedores: false })
        console.log(proveedores)
    }


    onSearch = value => {
        console.log(value)
    }

    render() {

        const { selected, show } = this.context

        return (
            < >
                <h1 className="proveedor-title">Proveedor</h1>
                <div>
                    <div className="search-div">
                        <Search
                            placeholder="Buscar"
                            allowClear
                            onSearch={this.onSearch}
                            style={{ width: 200, margin: '0 10px' }}
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
                                    loading={this.state.loading_proveedores} />
                            </TabPane>
                            <TabPane tab="Pendientes" key="2">
                                <Pendientes
                                    pendientes={this.state.pendientes}
                                    loading={this.state.loading_pendientes} />
                            </TabPane>
                        </Tabs>
                    </div>
                    <div>
                        <Modal
                            visible={show}
                            onOk={this.handleOk}
                            width={720}
                            onCancel={this.handleCancel}
                            footer={[
                                <div className="footer">
                                    <Button key="accept" onClick={this.handleOk} className="button-modal" ghost={true}>
                                        <img className="icon" src={aceptar}></img>
                                    </Button>
                                    <Button key="cancel" onClick={this.handleCancel} ghost={true}>
                                        <img className="icon" src={rechazar} />
                                    </Button>
                                </div>

                            ]}
                        >
                            <div className="modal-container">
                                <h3 className="title">Perfil de proveedor pendiente</h3>
                                <div>
                                    <table className="table">
                                        <tbody>
                                            <tr className="row" key="1">
                                                <th className="column-name">Nombre</th>
                                                <th className="column-data">{selected.nombre}</th>
                                            </tr>
                                            <tr className="row" key="2">
                                                <th className="column-name">Teléfono</th>
                                                <th className="column-data">{selected.telefono}</th>
                                            </tr>
                                            <tr className="row" key="3">
                                                <th className="column-name">Correo Electrónico</th>
                                                <th className="column-data">{selected.email}</th>
                                            </tr>
                                            <tr className="row" key="4">
                                                <td className="column-name-3" rowSpan="3">Cuenta Bancaria</td>
                                                <td className="column-data">{this.getCuenta(selected, "tipo")} </td>
                                            </tr>
                                            <tr className="row" key="5">
                                                <td className="column-data-3">{this.getCuenta(selected, "numero")}</td>
                                            </tr>
                                            <tr className="row" key="6">
                                                <td className="column-data">
                                                    {this.getCuenta(selected, "banco")}
                                                </td>
                                            </tr>
                                            <tr className="row" key="7">
                                                <th className="column-name">Licencia</th>
                                                <th className="column-data">{selected.estado}</th>
                                            </tr>
                                            <tr className="row" key="8">
                                                <th className="column-name">Profesión</th>
                                                <th className="column-data">{selected.profesion}</th>
                                            </tr>
                                            <tr className="row" key="9">
                                                <th className="column-name">Documentación</th>
                                                <th className="column-data">No hay documentos por mostrar</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </Modal>
                        <Modal
                            visible={this.state.created}
                            width={520}
                            footer={[
                                <div className="footer">
                                    <Button key="accept" onClick={this.handleSendEmail} className="button-request"
                                        style={{ background: '##052434' }} size="large">
                                        Aceptar
                            </Button>
                                </div>
                            ]}>
                            <div className="msg-container">
                                <div className="success-msg">
                                    <h3 className="msg-text">El usuario se ha creado con éxito</h3>
                                </div>
                                <div className="detail">
                                    <h3 className="msg-detail">Se enviará el correo al proveedor con sus credenciales</h3>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            visible={this.state.failed}
                            width={350}
                            onCancel={this.handleCancel}
                            footer={[
                                <div className="footer">
                                    <Button key="accept" onClick={this.handleCancel} className="button-request">
                                        Aceptar
                            </Button>
                                </div>
                            ]}>
                            <div className="msg-container">
                                <h3 className="msg-text">No se pudo crear el usuario</h3>
                            </div>
                        </Modal>
                        <Modal
                            visible={this.state.sent}
                            width={350}
                            onCancel={this.handleCancel}
                            footer={[
                                <div className="footer">
                                    <Button key="accept" onClick={this.handleCancel} className="button-request">
                                        Aceptar
                            </Button>
                                </div>
                            ]}>
                            <div className="msg-container">
                                <h3 className="msg-text">{this.state.msg}</h3>
                            </div>
                        </Modal>

                    </div>

                </div>
            </>
        );
    }
}

export default Proveedor;