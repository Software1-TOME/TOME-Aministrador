import React, { Component } from "react";
import { Table } from 'antd';
class Solicitantes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_solicitante: [],
            loadingTable: false,
        };
    }    

    render() {
        return (
            < >
                <div>
                    <Table
                        loading={this.props.loadingTable}
                        rowSelection={{
                            type: "checkbox",
                            onChange: this.props.onSelectChange
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
                        dataSource={this.props.data_solicitante} />
                </div>
            </>
        );
    }
}

export default Solicitantes;