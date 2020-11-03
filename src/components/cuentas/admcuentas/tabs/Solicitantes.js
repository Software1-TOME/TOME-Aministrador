import React, { Component } from "react";
import { Table, Switch } from 'antd';
import MetodosAxios from "../../../../requirements/MetodosAxios"

class Solicitantes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            data: [],
        };
    }

    componentDidMount() {
        this.llenarTabla();
    }
   
    llenarTabla = () => {
        //llamar axio y llenar
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
                        onChange={(switchValue) => this.onChangeCheck(solicitante.id, switchValue)}
                        defaultChecked={solicitante.estado}
                    />,
                });
            }
            this.setState({
                data
            })
        })

    }

    onChangeCheck = (checked, i) => {
        console.log(checked, i);
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