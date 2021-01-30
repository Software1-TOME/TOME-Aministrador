import React, { Component, } from "react";
import { Input, Table, Button, Modal, Select } from 'antd';
import MetodosAxios from '../../requirements/MetodosAxios';
import { formatTimeStr } from "antd/lib/statistic/utils";
import Detalle from './Detalle';
import { verifyDate, validateRange, isBetween } from './validaciones';
const { Search } = Input;
const { Option } = Select;


const columns = [
    { title: '', dataIndex: 'count', className: 'columns-pendientes' },
    { title: 'Transaccion', dataIndex: 'transaccion', className: 'columns-pendientes' },
    { title: 'Concepto', dataIndex: 'concepto', className: 'columns-pendientes' },
    { title: 'Fecha', dataIndex: 'fecha', className: 'columns-pendientes', responsive: ['lg'] },
    { title: 'Forma de cobro', dataIndex: 'tipo_pago', className: 'columns-pendientes', responsive: ['lg'] },
    { title: 'Valor', dataIndex: 'valor', className: 'columns-pendientes', responsive: ['lg'] },
    { title: 'Descuento', dataIndex: 'tiene_descuento', className: 'columns-pendientes', responsive: ['lg'] },

];


class Pagos extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            previous: {},
            loading_pagos: false,
            allpagos: [],
            allefectivo: [],
            alltarjeta: [],
            pagos: [],
            tarjetas: [],
            efectivos: [],
            conceptos: [],
            concialiacion: false,
            show: false,
            selected: null,
            detail: false,
            init: "",
            end: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    async componentDidMount() {
        await this.loadPagos();
    }

    async loadPagos() {
        this.setState({ loading_pagos: true });
        await this.getPagosEfectivo();
        await this.getPagosTarjeta();
        let total = [...this.state.tarjetas, ...this.state.efectivos];


        this.setState({ pagos: total, allpagos: total });
        this.setState({ loading_pagos: false });
    }

    async getPagosEfectivo() {
        try {
            let response = await MetodosAxios.obtener_pagos_efectivo();
            let data = response.data;
            let pago_t = [];
            let concept = [];
            for (let pago of data) {
                let fecha = new Date(pago.fecha_creacion);
                let _date = fecha.getFullYear() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getDate();
                pago.fecha = _date;
                pago.transaccion = "EFEC" + pago.id;
                pago.tipo_pago = "Efectivo";
                if (!concept.includes(pago.concepto)) {
                    concept.push(pago.concepto);
                }


                if (pago.promocion == null) {
                    pago.tiene_descuento = "No aplica";
                } else {
                    pago.tiene_descuento = "Aplica";
                }

                if (pago.concepto == "Solicitud") {
                    let pago_sol = await MetodosAxios.obtener_pago_solE(pago.id);
                    if (pago_sol.data.length > 0) {
                        let specific_pay = pago_sol.data[0];
                        pago.solicitud = specific_pay.solicitud;

                    }
                }
                pago_t.push(pago);
            }
            let k = [...this.state.conceptos, ...concept]
            this.setState({ conceptos: k })
            this.setState({ efectivos: pago_t, allefectivo: pago_t });
        } catch (e) {
            this.setState({ loading_pagos: false });
        }

    }
    async getPagosTarjeta() {
        try {
            let response = await MetodosAxios.obtener_pagos_tarjeta();
            let data = response.data;
            let pago_t = [];
            let concept = [];
            for (let pago of data) {
                let fecha = new Date(pago.fecha_creacion);
                let _date = fecha.getFullYear() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getDate();
                pago.fecha = _date;
                pago.transaccion = pago.carrier_id;
                pago.tipo_pago = "Tarjeta";
                if (pago.promocion == null) {
                    pago.tiene_descuento = "No aplica";
                } else {
                    pago.tiene_descuento = "Aplica";
                }
                if (!concept.includes(pago.concepto)) {
                    concept.push(pago.concepto);
                }

                if (pago.concepto == "Solicitud") {
                    let pago_sol = await MetodosAxios.obtener_pago_solT(pago.id);
                    if (pago_sol.data.length > 0) {
                        let specific_pay = pago_sol.data[0];
                        pago.solicitud = specific_pay.solicitud;

                    }
                }
                pago_t.push(pago);
            }
            this.setState({ tarjetas: pago_t, alltarjeta: pago_t });
            let k = [...this.state.conceptos, ...concept]
            this.setState({ conceptos: k })
        } catch (e) {
            this.setState({ loading_pagos: false });
        }
    }

    handleShow = (value) => {
        this.setState({ show: true, selected: value });
    }

    handleCancel = () => {
        this.setState({
            show: false,
            detail: false,
        });
    }



    verifyDateInput = () => {
        let start = this.state.init;
        let finish = this.state.end;
        return verifyDate(start, finish);
    }

    filterDate = () => {
        let _pagos = [];
        let result = this.verifyDateInput();
        this.setState({ loading_pagos: true });
        if (result) {
            for (let i = 0; i < this.state.allpagos.length; i++) {
                let _pago = this.state.allpagos[i];
                let fecha = _pago.fecha_creacion;
                let isHere = isBetween(this.state.init, this.state.end, fecha);
                if (isHere) {
                    _pagos.push(_pago);
                }
            }
        } else {
            _pagos = this.state.allpagos;
        }
        this.setState({
            pagos: _pagos,
            loading_pagos: false,
        })
    }



onSearch = (value) => {
    this.setState({ loading_pagos: true });
    let _pagos = [];
    if (value != "") {
        for (let i = 0; i < this.state.allpagos.length; i++) {
            let _pago = this.state.allpagos[i];
            value = value.toLowerCase();
            let concepto = _pago.concepto.toLowerCase();
            let isHere = concepto.includes(value);
            if (isHere) {
                _pagos.push(_pago);
            }
        }
    } else {
        _pagos = this.state.allpagos;
    }
    this.setState({
        pagos: _pagos,
        loading_pagos: false,
    })
}

handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
}

render() {
    return (
        <div>
            <h1 className="proveedor-title">Pagos</h1>
            <div>
                <div style={{ marginBottom: 16 }}></div>
                <div className="card-container">
                    <div className="block">
                        <div className="conciliacion-item">
                            <Button key="accept-edit-prom" className="button-request">
                                Conciliacion
                                </Button>
                        </div>
                        <div className="flex-content-pay">
                            <div className="fecha-flex">
                                <div className="flex-items">
                                    <div>
                                        <label className="ghost-label-input">Desde </label>
                                        <input type="date" name="init" className="input-round-pay" value={this.state.start}
                                            onChange={e => this.setState({ init: e.target.value })}></input>
                                        <h6 id="invalid-range" className="error-input-pay"></h6>
                                    </div>
                                    <div>
                                        <label className="ghost-label-input">Hasta </label>
                                        <input type="date" name="end" value={this.state.end}
                                            onChange={e => this.setState({ end: e.target.value })} className="input-round-pay"
                                        ></input>
                                    </div>
                                    <div>
                                        <Button onClick={this.filterDate}>
                                            Buscar
                                            </Button>
                                    </div>
                                </div>
                                <div className="select-input">
                                    <Select
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Concepto"
                                        onChange={this.onSearch}
                                    >
                                        {
                                            this.state.conceptos.map((concept, i) => {
                                                return <Option key={i + "CNCP"} value={concept}>{concept}</Option>
                                            })
                                        }
                                    </Select>

                                </div>
                            </div>
                        </div>


                    </div>


                    <Table
                        onRow={(pago) => {
                            return {
                                onClick: event => {
                                    this.handleShow(pago)
                                }
                            }
                        }}
                        loading={this.state.loading_pagos}
                        columns={columns}
                        dataSource={this.state.pagos}
                    >
                    </Table>

                    {/** Modal para ver la informacion del pago */}

                    <Modal style={{ backgraoundColor: "white" }}
                        key="modal-edit-prom"
                        visible={this.state.show}
                        width={720}
                        onCancel={this.handleCancel}
                        footer={[]}
                    >
                        <Detalle
                            pago_info={this.state.selected}
                        ></Detalle>
                    </Modal>
                </div>
            </div>
        </div>
    )
}


}


export default Pagos;