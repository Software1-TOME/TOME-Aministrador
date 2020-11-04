import React, { Component } from "react";
import { Table, Switch, Modal, Button } from 'antd';
import MetodosAxios from "../../../../requirements/MetodosAxios"
import { get_Pendientes } from '../funtions';
import aceptar from '../../../../img/aceptar.png'
import rechazar from '../../../../img/rechazar.png'
import style from './pendientes.css'




const columns = [
    { title: '', dataIndex: 'count', className: 'columns-pendientes-1' },
    { title: 'Nombre', dataIndex: 'nombre', className: 'columns-pendientes' },
    { title: 'Profesión', dataIndex: 'profesion', className: 'columns-pendientes' },
    { title: 'Correo Electrónico', dataIndex: 'email', className: 'columns-pendientes' },
    { title: 'Fecha de registro', dataIndex: 'fecha_creacion', className: 'columns-pendientes' },];

class Pendientes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            pendientes: [],
            selected: {},
            created: false,
            failed: false,
            show: false,
            sent: false,
            creado: {},
            success: false,
        };
    }

    componentDidMount() {
        //this.load_proveedores();
        this.load_Pendientes();
    }



    async load_Pendientes() {
        let pendientes = []
        let value = await MetodosAxios.obtener_proveedores_pendientes();
        let count = 1;
        for (let pendiente of value.data) {
            let _pendiente = await get_Pendientes(pendiente, count)
            pendientes.push(_pendiente);
            count++;
        }

        this.setState({
            pendientes
        })
    }

    showInfoPendiente(user) {
        this.setState({ selected: user })
        this.setState({ show: true })
    };

    handleOk = (e) => {

        let data = {
            tipo: 'Proveedor',
            email: this.state.selected.email,
            user_datos: this.state.selected.user_datos,
            proveedor: this.state.selected.proveedor_id,
            pendiente: this.state.selected.pendiente_id,
            profesion: this.state.selected.profesion,
            experiencia: this.state.selected.ano_experiencia,
        }
        MetodosAxios.register_proveedor(data).then( value=>{
            let datos= value.data;
            if(datos.success){
                this.setState({created: true, show: false})
                let creado={
                    password: datos.password,
                    email: datos.username
                }
                this.setState({creado})
            }else{
                this.setState({failed: true, show: false})
            }
        })
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            show: false,
            created: false,
            failed: false,
            sent: false,
        });
    };

    handleSendEmail(){

    }

    getDocuments() {
        if (this.state.selected.document) {
            let docs = " "
            let documents = this.state.selected.document;
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

    render() {
        return (
            <div className="container-pendientes">

                <Table onRow={(pendiente) => {
                    return {
                        onClick: event => {
                            this.showInfoPendiente(pendiente)
                        }
                    }
                }}

                    columns={columns} dataSource={this.state.pendientes} >

                </Table>
                { this.state.show &&
                    <Modal
                        visible={this.state.show}
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
                                    <tr className="row">
                                        <th className="column-name">Nombre</th>
                                        <th className="column-data">{this.state.selected.nombre}</th>
                                    </tr>
                                    <tr className="row">
                                        <th className="column-name">Teléfono</th>
                                        <th className="column-data">{this.state.selected.telefono}</th>
                                    </tr>
                                    <tr className="row">
                                        <th className="column-name">Correo Electrónico</th>
                                        <th className="column-data">{this.state.selected.email}</th>
                                    </tr>
                                    <tr className="row">
                                        <td className="column-name-3" rowSpan="3">Cuenta Bancaria</td>
                                        <td className="column-data">{this.state.selected.cuentas[0].tipo}</td>
                                    </tr>
                                    <tr className="row">
                                        <td className="column-data-3">{this.state.selected.cuentas[0].numero}</td>
                                    </tr>
                                    <tr className="row">
                                        <td className="column-data">
                                            {this.state.selected.cuentas[0].banco}
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th className="column-name">Licencia</th>
                                        <th className="column-data">{this.state.selected.estado}</th>
                                    </tr>
                                    <tr className="row">
                                        <th className="column-name">Profesión</th>
                                        <th className="column-data">{this.state.selected.profesion}</th>
                                    </tr>
                                    <tr className="row">
                                        <th className="column-name">Documentación</th>
                                        <th className="column-data">No hay documentos por mostrar</th>
                                    </tr>
                                </table>
                            </div>
                        </div>

                    </Modal>
                }
                <Modal
                    visible={this.state.created}
                    width={520}
                    footer={[
                        <div className="footer">
                            <Button key="accept" onClick={this.handleCancel} className="button-request" 
                            style={{background: '##052434'}} size="large">
                                Aceptar
                            </Button>
                        </div>
                    ]}>
                    <div className="msg-container">
                        <div className="success-msg">
                            <h3 className="msg-text">El usuario se ha creado con exito</h3>
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
                        <h3 className="msg-text">Se ha enviado el email al proveedor</h3>
                    </div>
                </Modal>
            </div>
        )
    }

}

export default Pendientes;