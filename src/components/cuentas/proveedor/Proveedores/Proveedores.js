import React, { Component } from "react";
import { Table, Switch } from 'antd';
import MetodosAxios from "../../../../requirements/MetodosAxios"
import { getProveedor } from '../funtions'


const columns = [
    {title:'', dataIndex: 'count', className: 'columns-pendientes-1'},
    { title: 'Nombre', dataIndex: 'nombre',className: 'columns-pendientes' },
    { title: 'Profesión', dataIndex: 'profesion', className: 'columns-pendientes' },
    { title: 'Correo Electrónico', dataIndex: 'email', className: 'columns-pendientes'},
    { title: 'Licencia', dataIndex: 'estado', className: 'columns-pendientes'},
    { title: 'Fecha de registro', dataIndex: 'fecha_creacion',className: 'columns-pendientes' },];

class Proveedores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
        };
    }

    componentDidMount() {
    }



    render() {
        
        return (
            <div>
                <Table  columns={columns}
                loading={this.props.loading} 
                dataSource={this.props.proveedores} />
           
            </div>
        )
    }

}

export default Proveedores;