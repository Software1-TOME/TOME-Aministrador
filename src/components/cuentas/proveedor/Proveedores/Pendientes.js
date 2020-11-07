import React, { useContext } from "react";
import { Table} from 'antd';
import SelectedContext from '../../../../context/SelectedContext'
import {copy} from '../functions'
import './pendientes.css'

const columns = [
    { title: '', dataIndex: 'count', className: 'columns-pendientes-1' },
    { title: 'Nombre', dataIndex: 'fullName', className: 'columns-pendientes' },
    { title: 'Profesión', dataIndex: 'profesion', className: 'columns-pendientes' },
    { title: 'Correo Electrónico', dataIndex: 'email', className: 'columns-pendientes',responsive: ['lg']},
    { title: 'Fecha de registro', dataIndex: 'fecha_creacion', className: 'columns-pendientes',responsive: ['lg'] },];

const Pendientes =(props)=>{
    
    const {setShow, setSelected}= useContext(SelectedContext)

    const showInfo=(user)=>{
        console.log(user.nombres)
        let copy_user = copy(user)  
        setSelected(copy_user)
        setShow(true)
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