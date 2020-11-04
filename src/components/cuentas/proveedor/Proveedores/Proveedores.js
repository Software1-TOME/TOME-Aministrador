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
            proveedores: [],
        };
    }

    componentDidMount() {
        this.load_proveedores();
        //this.load_Pendientes();
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    async load_proveedores() {
        let proveedores = []
        let value = await MetodosAxios.obtener_proveedores();
        let data = value.data
        let count =1;
        for (let proveedor of data) {
            let element = await getProveedor(proveedor, count)
            proveedores.push(element)
            count++;
        }
        this.setState({ proveedores })
        console.log(proveedores)
    }



    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <Table  columns={columns} dataSource={this.state.proveedores} />
           
            </div>
        )
    }

}

export default Proveedores;