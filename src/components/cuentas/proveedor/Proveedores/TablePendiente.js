import React, { useContext } from 'react';
import SelectedContext from '../../../../context/SelectedContext';
import { Button } from 'antd';
import pdf from '../../../../img/icons/pdf.png'


const TablePendiente = (props) => {
    const { selected } = useContext(SelectedContext)
    const API_URL = 'http://tomesoft1.pythonanywhere.com/'



    const getNombre = (proveedor) => {
        if (!proveedor) return ""
        return proveedor.nombres + " " + proveedor.apellidos;
    }


    const getDocuments = (proveedor) => {
        let documents = proveedor.document;
        return documents.map((doc, i) => {
            return (
                <div className="document-container">
                    <a href={API_URL + doc.documento} target="_blank" className="document-link">
                        <Button key="accept" onClick={() => { }}
                            className="button-document" ghost={true} block={true}>
                            <img className="icon" src={pdf}></img>
                        </Button>
                        <span className="document-name">{doc.descripcion}</span>
                    </a>
                </div>
            )
        })


    }

    const openDocument = (url) => {
        console.log(url)
        //Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }


    return (
        <div>
            <table className="table">
                <tbody>
                    <tr className="row" key="1">
                        <th className="column-name">Nombre</th>
                        <th className="column-data">{getNombre(selected)}</th>
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
                        <td className="column-data">{selected.tipo_cuenta} </td>
                    </tr>
                    <tr className="row" key="5">
                        <td className="column-data-3">{selected.numero_cuenta}</td>
                    </tr>
                    <tr className="row" key="6">
                        <td className="column-data">
                            {selected.banco}
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
                        <th className="column-data">
                            <div className="section-document">
                                {getDocuments(selected)}
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


export default TablePendiente;