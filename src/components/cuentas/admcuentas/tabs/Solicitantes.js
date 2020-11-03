import React, { Component } from "react";
import { Table, Switch } from 'antd';
import MetodosAxios from "../../../../requirements/MetodosAxios"

class Solicitantes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            data: [],
            loadingCheck:false,
            loadingTable:false,
        };
    }

    componentDidMount() {
        this.llenarTabla();
    }
   
    llenarTabla = () => {
        //llamar axio y llenar
        this.setState({
            loadingTable:true
        })
        MetodosAxios.obtener_solicitantes().then(res => {
            let data = [];
            for (let i = 0; i < res.data.length; i++) {
                let solicitante = res.data[i]
                data.push({
                    key: solicitante.id,
                    nombres: solicitante.user_datos.nombres +" "+ solicitante.user_datos.apellidos,
                    cedula: solicitante.user_datos.cedula,
                    correo: solicitante.user_datos.user.email,
                    check: <Switch
                        key={solicitante.id}
                        loading={this.state.loadingCheck}
                        onChange={(switchValue) => this.onChangeCheck(solicitante.id, switchValue)}
                        defaultChecked={solicitante.estado}
                    />,
                });
            }
            this.setState({
                data:data,
                loadingTable:false
            })
        })

    }

    onChangeCheck = (i, checked) => {
        console.log(i,checked);
        this.setState({
            loadingCheck:true
        })
        MetodosAxios.cambio_solicitante_estado({'estado':checked},i).then(res => {
            console.log(res)
        }) 
        this.setState({
            loadingCheck:false
        })
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('Rows: ', selectedRows);
        console.log('Keys:', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        return (
            < >
                <div>
                    <Table
                        loading={this.state.loadingTable}
                        rowSelection={{
                            type: "checkbox",
                            onChange: this.onSelectChange
                        }}
                        columns={[
                            {
                                title: 'Nombres',
                                dataIndex: 'nombres',
                            },
                            {
                                title: 'Cédula',
                                dataIndex: 'cedula',
                            },
                            {
                                title: 'Correo electrónico',
                                dataIndex: 'correo',
                            },
                            {
                                title: 'Habilitar/inhabiliar',
                                dataIndex: 'check',
                            },
                        ]}
                        dataSource={this.state.data} />
                </div>
            </>
        );
    }
}

export default Solicitantes;