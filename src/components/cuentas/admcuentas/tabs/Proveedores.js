import React, { Component } from "react";
import { Table, Switch } from 'antd';

class Proveedores extends Component {
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
        let data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                key: i,
                nombres: `Kevin ${i}`,
                cedula: "0999999999",
                correo: `Café@outlook.com`,
                check: <Switch 
                            key={i} 
                            onChange={(switchValue)=>this.onChangeCheck(i,switchValue)} 
                            defaultChecked={false}
                        />,
            });
        }
        this.setState({
            data
        })
    }

    onChangeCheck=(checked,i) =>{
        console.log(checked,i);
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

export default Proveedores;