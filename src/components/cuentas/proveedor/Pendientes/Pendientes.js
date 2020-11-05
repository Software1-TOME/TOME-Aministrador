import React, { useContext } from "react";
import { Table} from 'antd';
import SelectedContext from '../../../../context/SelectedContext'
import './pendientes.css'

const columns = [
    { title: '', dataIndex: 'count', className: 'columns-pendientes-1' },
    { title: 'Nombre', dataIndex: 'nombre', className: 'columns-pendientes' },
    { title: 'Profesión', dataIndex: 'profesion', className: 'columns-pendientes' },
    { title: 'Correo Electrónico', dataIndex: 'email', className: 'columns-pendientes' },
    { title: 'Fecha de registro', dataIndex: 'fecha_creacion', className: 'columns-pendientes' },];

const Pendientes =(props)=>{
    
    const {setShow, setSelected, selected}= useContext(SelectedContext)

    const showInfo=(user)=>{   
        setSelected(user)
        setShow(true)
        console.log(selected)
    };
    
        return (
            <div className="container-pendientes">

                <Table onRow={(pendiente) => {
                    return {
                        onClick: event => {
                         showInfo(pendiente)
                        }
                    }
                }}
                    loading={props.loading}
                    columns={columns} dataSource={props.pendientes} >

                </Table>
            </div>
        )
}

export default Pendientes;