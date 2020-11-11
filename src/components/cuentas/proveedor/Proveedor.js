import React, { Component, } from "react";
import { Input, Tabs, Button, Modal } from 'antd';
import MetodosAxios from "../../../requirements/MetodosAxios";
import { get_Pendientes, getProveedor } from './functions';
import Pendientes from "./Proveedores/Pendientes";
import { EditOutlined } from '@ant-design/icons';
import './Proveedor.css'
import Proveedores from "./Proveedores/Proveedores";
import aceptar from '../../../img/aceptar.png'
import rechazar from '../../../img/rechazar.png'
import SelectedContex from '../../../context/SelectedContext'
import TableEditPendiente from "./Tables/TableEditPendiente";
import TablePendiente from './Tables/TablePendiente';
const { TabPane } = Tabs;
const { Search } = Input;


class Proveedor extends Component {
    static contextType = SelectedContex

    constructor(props, context) {
        super(props);
        this.state = {
            previous: {},
            /**VALUES FOR PROVEEDORES */
            loading_proveedores: false,
            all_proveedores: [],
            proveedores: [],
            /**VALUES FOR PENDIENTES */
            all_pendientes: [],
            pendientes: [],
            loading_pendientes: false,
            created: false,
            failed: false,
            sent: false,
            creado: {},
            success: false,
            msg: "",
            error_msg: "",
            is_changed: false,
            contexto: context,
            confirmEdit: false,
            updated: false, 
        };
    }

    componentDidMount() {
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
        let count = 1;
        for (let pendiente of value.data) {
            let _pendiente = await get_Pendientes(pendiente, count)
            pendientes.push(_pendiente);
            count++;
        }
        this.setState({
            pendientes: pendientes,
            all_pendientes: pendientes,
            loading_pendientes: false,
        })
        return value.data;
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
        this.setState({
            proveedores: proveedores,
            all_proveedores: proveedores,
            loading_proveedores: false
        })


    }

    getAllchangedValued(proveedor) {
        const { nombres, apellidos, telefono,
            cedula, numero_cuenta, banco,
            tipo_cuenta, email, profesion } = this.context

        let data = {
            proveedor_id: proveedor.proveedor_id,
            pendiente_id: proveedor.pendiente_id,
            user_datos: proveedor.user_datos,
            email: email === "" ? proveedor.email : email,
            banco: banco === "" ? proveedor.banco : banco,
            tipo_cuenta: tipo_cuenta === "" ? proveedor.tipo_cuenta : tipo_cuenta,
            numero_cuenta: numero_cuenta === "" ? proveedor.numero_cuenta : numero_cuenta,
            profesion: profesion === "" ? proveedor.profesion : profesion,
            ano_experiencia: proveedor.ano_experiencia,
            nombres: nombres === "" ? proveedor.nombres : nombres,
            apellidos: apellidos === "" ? proveedor.apellidos : apellidos,
            telefono: telefono === "" ? proveedor.telefono : telefono,
            cedula: cedula === "" ? proveedor.cedula : cedula,
            tipo_user: 'Proveedor_Pendiente',
        }
        return data

    }

    handleFill = () => {
        let buttons = document.getElementsByClassName('ant-btn ant-btn-link')
        for (let btn of buttons) {
            if (btn.id === "fill-form") {
                btn.click()
            }
        }
    }

    handleEdit = (e) => {
        this.handleFill()
        const { setShowEdit, setShow } = this.context
        setShowEdit(true)
        setShow(false)
    }



    handleSaveEdit = (e) => {
        this.handleUpdateData()
    }

    handleConfirmEdit = (e) => {
        this.setState({ confirmEdit: true })
    }

    handleUpdateData = () => {
        const { selected , setShow, setShowEdit, reset} = this.context
        try {
            let data = this.getAllchangedValued(selected)
            const url= 'https://tomesoft1.pythonanywhere.com/update_pendiente/'
            MetodosAxios.actualizar_pendiente(url,data).then(value=>{
                let datos = value.data;
                if(datos.success){
                    this.setState({ is_changed: true, 
                        confirmEdit: false, updated: true,
                        msg: "Se ha actualizado la informacion"})
                    setShow(false)
                    setShowEdit(false)
                }else{
                    this.setState({ failed: true, error_msg: datos.error, 
                    confirmEdit: false, updated: false })
                    setShowEdit(false)
                    console.log(datos.code)
                }

            })
            reset()
        }
        catch (e) {
            this.setState({ failed: true })
            setShow(false)
            reset()

        }

    }


    handleOk = (e) => {
        const { selected, setShow, reset, setShowEdit } = this.context

        try {
            //console.log(selected)
            if (selected.valid_profesion) {
                let data = selected;
                MetodosAxios.register_proveedor(data).then(value => {
                    let datos = value.data;
                    if (datos.success) {
                        this.setState({ created: true })
                        setShow(false)
                        setShowEdit(false)
                        let creado = {
                            password: datos.password,
                            email: datos.username
                        }
                        this.setState({ creado: creado, is_changed: true })
                    } else {
                        this.setState({ failed: true, error_msg: datos.error })
                        setShow(false)
                        console.log(datos.code)
                    }
                })
                reset()
            } else {
                this.setState({ failed: true, error_msg: 'La profesion no está registrada' })
                reset()
            }
        } catch (e) {
            this.setState({ failed: true })
            setShow(false)
            reset()
        }
    };

    handleCancel = e => {
        const { setShow, setShowEdit, setSelected, setEdit, reset } = this.context
        setShow(false)
        setShowEdit(false)
        setSelected({})
        setEdit({})

        this.setState({
            created: false,
            failed: false,
            sent: false,
            confirmEdit: false,
            updated: false,
        });

        reset()
    }


    handleSendEmail = (e) => {
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

    handleReset = () => {
        let buttons = document.getElementsByClassName('ant-btn ant-btn-link')
        for (let btn of buttons) {
            if (btn.id === "reset-form") {
                btn.click()
            }
        }
    }

    handleCloseEdit = () => {
        this.handleReset()
        const { setShow, setShowEdit, setSelected, setEdit, reset } = this.context
        setShow(false)
        setShowEdit(false)
        setSelected({})
        setEdit({})

        this.setState({
            created: false,
            failed: false,
            sent: false,
            confirmEdit: false,
            updated: false,
        });

        reset()

    }





    onSearch = (value) => {
        this.searchProveedor(value)
        this.searchPendiente(value)
    }



    searchProveedor = (value) => {
        this.setState({
            loading_proveedores: true
        })
        let proveedores = []
        if (value !== "") {
            for (let i = 0; i < this.state.all_proveedores.length; i++) {
                let proveedor = this.state.all_proveedores[i];
                value = value.toLowerCase();
                let nombre = proveedor.nombre.toLowerCase();
                let correo = proveedor.email.toLowerCase();
                let profesion = proveedor.profesion.toLowerCase();
                if (nombre.includes(value) || correo.includes(value) || profesion.includes(value)) {
                    proveedores.push(proveedor)
                }
            }
        }
        else {
            proveedores = this.state.all_proveedores
        }
        this.setState({
            proveedores: proveedores,
            loading_proveedores: false,
        })

    }

    searchPendiente = (value) => {
        this.setState({
            loading_pendientes: true
        })
        let pendientes = []
        if (value !== "") {
            for (let i = 0; i < this.state.all_pendientes.length; i++) {
                let pendiente = this.state.all_pendientes[i];
                value = value.toLowerCase();
                let nombre = pendiente.fullName.toLowerCase();
                let correo = pendiente.email.toLowerCase();
                let profesion = pendiente.profesion.toLowerCase();
                if (nombre.includes(value) || correo.includes(value) || profesion.includes(value)) {
                    pendientes.push(pendiente)
                }
            }
        }
        else {
            pendientes = this.state.all_pendientes
        }
        this.setState({
            pendientes: pendientes,
            loading_pendientes: false,
        })

    }

    render() {

        const { show, showEdit } = this.context

        return (
            <div key="proveedor-admin">
                <h1 className="proveedor-title">Proveedor</h1>
                <div>
                    <div style={{ marginBottom: 16 }}></div>
                    <div className="card-container">
                        <Tabs type="card" size="large" tabBarExtraContent={
                            <div className="search-div">
                                <Search
                                    placeholder="Buscar" allowClear
                                    onSearch={this.onSearch} style={{ width: 200, margin: '0 10px' }}
                                    className="search-p" />
                            </div>}>
                            <TabPane tab="PROVEEDORES" key="proveedores" >
                                <Proveedores
                                    proveedores={this.state.proveedores}
                                    loading={this.state.loading_proveedores} />
                            </TabPane>
                            <TabPane tab="PENDIENTES" key="pendientes">
                                <Pendientes
                                    pendientes={this.state.pendientes}
                                    loading={this.state.loading_pendientes} />
                            </TabPane>
                        </Tabs>
                    </div>
                    <div>
                        {/**SHOW DATA */}
                        <Modal
                            key="modal-data"
                            visible={show}
                            width={720}
                            onCancel={this.handleCancel}
                            footer={[
                                <div className="footer">
                                    <Button key="accept" onClick={this.handleOk} className="button-modal" ghost={true}>
                                        <img className="icon" src={aceptar} alt="Aceptar"></img>
                                    </Button>
                                    <Button key="cancel" onClick={this.handleCancel} ghost={true}>
                                        <img className="icon" src={rechazar} alt="Rechazar" />
                                    </Button>
                                </div>

                            ]}
                        >
                            <div className="modal-container">
                                <div className="modal-title">
                                    <h3 className="title">Perfil de proveedor pendiente</h3>
                                    <Button icon={<EditOutlined />} shape="round"
                                        className="edit-button" onClick={this.handleEdit}></Button>
                                </div>
                                <div>
                                    <TablePendiente></TablePendiente>
                                </div>
                            </div>

                        </Modal>
                        {/**EDIT DATA */}
                        <Modal
                            key="modal-edit"
                            visible={showEdit}
                            width={720}
                            onCancel={this.handleCloseEdit}
                            footer={[
                                <div className="footer">
                                    <Button key="accept-edit" onClick={this.handleConfirmEdit} ghost={true} className="button-request">
                                        <img className="icon" src={aceptar} alt="Aceptar"></img>
                                    </Button>
                                    <Button key="cancel-edit" onClick={this.handleCloseEdit} ghost={true} className="button-request">
                                        <img className="icon" src={rechazar} alt="Rechazar" />
                                    </Button>
                                </div>

                            ]}
                        >
                            <div className="modal-container">
                                <div className="modal-title">
                                    <h3 className="title">Perfil de proveedor pendiente</h3>
                                </div>
                                <div>
                                    <TableEditPendiente></TableEditPendiente>
                                </div>
                            </div>

                        </Modal>
                        {/**CONFIRM VALUES EDITED */}
                        <Modal
                            key="modal-confirm-edit"
                            visible={this.state.confirmEdit}
                            width={520}
                            onCancel={this.handleCancel}
                            footer={[
                                <div className="footer">
                                    <Button key="accept-save" onClick={this.handleSaveEdit} className="button-request"
                                        style={{ background: '#052434' }} size="large">
                                        Aceptar
                                    </Button>
                                    <Button key="cancel-save" onClick={this.handleCancel} className="button-request"
                                        style={{ background: '#052434' }} size="large">
                                        Cancelar
                                    </Button>
                                </div>
                            ]}>
                            <div className="msg-container">
                                <div className="success-msg">
                                    <h3 className="msg-text">¿Desea guardar los cambios al perfil?</h3>
                                </div>
                                <div className="detail">
                                    <h3 className="msg-detail">Se guardarán los cambios realizados</h3>
                                </div>
                            </div>
                        </Modal>
                        {/**SUCCESS REGISTER */}
                        <Modal
                            key="modal-succes"
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
                        {/**FAILED REGISTER */}
                        <Modal
                            key="modal-failed"
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
                                <div className="success-msg">
                                    <h3 className="msg-text">No se pudo crear el usuario</h3>
                                </div>
                                <div className="detail">
                                    <h3 className="msg-detail">{this.state.error_msg}</h3>
                                </div>
                            </div>
                        </Modal>
                        {/**SENT EMAIL*/}
                        <Modal
                            key="modal-email"
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

                        {/**UPDATE DATA*/}
                        <Modal
                            key="modal-email"
                            visible={this.state.updated}
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
            </div>
        );
    }
}

export default Proveedor;