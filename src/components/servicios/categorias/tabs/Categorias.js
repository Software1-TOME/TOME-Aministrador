import React, { Component } from "react";
import { Button, Table } from 'antd';


class Categorias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            data: [],
        };
    }

    componentDidMount() {

    }
 
    render() {
        return (
            < >
                <div>
                    <Table
                        onRow={(editar) => {
                            return {
                                onClick: event => {
                                this.props.state.picture=editar.foto
                                console.log(this.props.state.picture)
                                this.props.CategoriaSeleccionada(editar)
                                }
                            }
                        }}
                        loading={this.props.loadingTable}
                        rowSelection={{
                            type: "checkbox",
                            onChange: this.props.onSelectChange,
                        }}
                        columns={[
                            {
                                title: 'Nombre',
                                dataIndex: 'nombre',
                            },
                            {
                                title: 'Descripción',
                                dataIndex: 'descripcion',
                                responsive: ['lg']
                            },
                            {
                                title: 'Habilitar/inhabiliar',
                                dataIndex: 'check',
                            },
                          
                        ]}
                        dataSource={this.props.data_categoria} />
                </div>
            </>
        );
    }
}

export default Categorias;