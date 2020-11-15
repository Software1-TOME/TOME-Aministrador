import React, { Component } from "react";
import { Tabs, Switch, Input, Button } from 'antd';
import Categorias from "./tabs/Categorias";
import MetodosAxios from "../../../requirements/MetodosAxios";
import Eliminar from "../../../img/icons/eliminar.png";
import Icon from '@ant-design/icons';
import "./AdmCategorias.css"
const { TabPane } = Tabs;
const { Search } = Input;
class AdmCategorias extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRowKeysCategoria: [],
            base_categoria: [],
            data_categoria: [],
            loadingTable: false,
            loadingCheck: false,
        };
    }
    componentDidMount() {
        this.llenarTablaCategoria();
    }

   
    llenarTablaCategoria = () => {
        this.setState({
            loadingTable: true
        })
        MetodosAxios.obtener_categorias().then(res => {
            let data_categoria = [];
            for (let i = 0; i < res.data.length; i++) {
                let categoria = res.data[i]
                data_categoria.push({
                    key: categoria.id,
                    nombre: categoria.nombre,
                    descripcion: categoria.descripcion,
                    check: <Switch
                        key={categoria.id}
                        loading={this.state.loadingCheck}
                        onChange={(switchValue) => this.onChangeCheckCategoria(categoria.id, switchValue)}
                        defaultChecked={categoria.estado}
                    />,
                });
            }
            this.setState({
                data_categoria: data_categoria,
                base_categoria: data_categoria,
                loadingTable: false
            })
        })
    }


    async onChangeCheckCategoria(i, checked){
        this.setState({
            loadingCheck: true
        })
        await MetodosAxios.cambio_categoria_estado({ 'estado': checked }, i).then(res => {
            console.log(res)
        })
        this.setState({
            loadingCheck: false
        })

    }

    onSelectChangeCategoria = (selectedRowKeys, selectedRows) => {
        console.log('Rows: ', selectedRows);
        console.log('Keys:', selectedRowKeys);
        this.setState({ selectedRowKeysCategoria: selectedRowKeys });
    };



    searchCategorias = (search) => {
        this.setState({
            loadingTable: true
        })
        let data_categoria
        if (search !== "") {
            data_categoria = [];
            for (let i = 0; i < this.state.base_categoria.length; i++) {
                let categoria = this.state.base_categoria[i];
                search = search.toLowerCase();
                let nombre = categoria.nombre.toLowerCase();
                let descripcion = (categoria.descripcion!==null?categoria.descripcion.toLowerCase():"");
                if (nombre.search(search) !== -1 || descripcion.search(search) !== -1 ) {
                    data_categoria.push(categoria);
                }
            }
        } else {
            data_categoria = this.state.base_categoria;
        }
        this.setState({
            data_categoria: data_categoria,
            loadingTable: false
        })
    }

    searchCategoria = (search) => {
        console.log(search);
        this.searchCategorias(search);
    }

    async eliminar() {
        console.log("eliminar", this.state.selectedRowKeysSolicitante)
        
        if (this.state.selectedRowKeysCategoria.length > 0) {
            for (let i = 0; i < this.state.selectedRowKeysCategoria.length; i++) {
                let id = this.state.selectedRowKeysCategoria[i];
                console.log(id)
                await MetodosAxios.eliminar_categoria(id).then(res => {
                    console.log(res)
                })
            }
        }
        this.llenarTablaCategoria();
    }
    render() {

        return (
            < >
                <h1 className="titulo">Categorías</h1>
                <div className="card-container">
                    <Tabs tabBarExtraContent={<div>
                        <Button
                            id="agregarButton"
                            type="text"
                            size="small"
                           // onClick={() => { this.eliminar() }}
                        >Agregar</Button>
                        <Search
                            placeholder="Buscar"
                            allowClear
                            onSearch={this.searchCategoria}
                            style={{ width: 200, margin: '0 10px' }}
                        />
                        
                        <Button
                            type="text"
                            shape="circle"
                            size="small"
                            icon={<Icon component={() => (<img alt="icono eliminar" src={Eliminar} height="auto" width="12px" />)} />}
                            onClick={() => { this.eliminar() }}
                        />
                    </div>}
                        type="card" size="large" >
                    
                        <TabPane tab="CATEGORIAS" key="1">
                            <Categorias
                                onSelectChange={this.onSelectChangeCategoria}
                                data_categoria={this.state.data_categoria}
                                loadingTable={this.state.loadingTable}
                            />
                        </TabPane>
                    </Tabs>
                </div>
                
            </>
        );
    }
}

export default AdmCategorias;