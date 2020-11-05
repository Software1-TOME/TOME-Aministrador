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
            pendientes: this.props.pendientes,
            selected: {},
            created: false,
            failed: false,
            show: false,
            sent: false,
            creado: {},
            success: false,
            msg: "",
        };
    }

    componentDidMount() {
        console.log("Cargando pendientes")
        if (!this.props.loading) {
            console.log(this.state.pendientes)
        }
    }

    showInfoPendiente(user) {
        this.setState({ selected: user })
        this.setState({ show: true })
        console.log(this.state.selected)
    };

    handleOk = (e) => {
        try {
            let data = {
                tipo: 'Proveedor',
                email: this.state.selected.email,
                user_datos: this.state.selected.user_datos,
                proveedor: this.state.selected.proveedor_id,
                pendiente: this.state.selected.pendiente_id,
                profesion: this.state.selected.profesion,
                experiencia: this.state.selected.ano_experiencia,
            }
            MetodosAxios.register_proveedor(data).then(value => {
                let datos = value.data;
                if (datos.success) {
                    this.setState({ created: true, show: false })
                    let creado = {
                        password: datos.password,
                        email: datos.username
                    }
                    this.setState({ creado })
                } else {
                    this.setState({ failed: true, show: false })
                }
            })
        } catch (e) {
            this.setState({ failed: true, show: false })
        }
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

    getCuenta(user, variable) {
        if (!user) return ""
        if (!user.cuentas) return ""
        if (user.cuentas.length > 0) return user.cuentas[0][variable]
        else return " "
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
                    loading={this.props.loading}
                    columns={columns} dataSource={this.state.pendientes} >

                </Table>

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
                                <tbody>
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
                                        <td className="column-data">{this.getCuenta(this.state.selected, "tipo")} </td>
                                    </tr>
                                    <tr className="row">
                                        <td className="column-data-3">{this.getCuenta(this.state.selected, "numero")}</td>
                                    </tr>
                                    <tr className="row">
                                        <td className="column-data">
                                            {this.getCuenta(this.state.selected, "banco")}
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
        )
    }

}

export default Pendientes;