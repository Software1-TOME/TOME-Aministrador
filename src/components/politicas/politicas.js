import React, { Component } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { Mentions } from 'antd';
import {Text, Tabs, Switch,Modal } from 'antd';
import Icon from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';


import Agregar from '../../img/icons/agregar.png';
const { TabPane } = Tabs;



export default class Politicas extends Component {
    

    constructor(props, context) {
        super(props);

        this.state = {
            textInput:'',
            showModal:false,
        }
        
    }

    


    async componentDidMount() {
      this.GetPoliticas()
        
    }
    onChangeMention=(value)=>{
        console.log("value",value)
        this.setState({
            textInput:value
        })

    }
    onSelect =(option)=>{
        console.log("option",option)
    }

    editPoliticas=()=>{
      this.setState({
        showModal:true
      })
    }
    GetPoliticas=()=>{
      let url= "https://tomesoft1.pythonanywhere.com/politics/";
      console.log(this.state.textInput)
      console.log(url)     
      fetch(url, {
        method: 'GET',
        headers: {
          'x-csrftoken': 'csrf_token',
        },
      }).then((response) => {
          return response.json()
      }).then(data =>{
        console.log(data)
        data.forEach(element => {
          console.log(element.identifier)
          if(element.identifier=='0'){
            console.log(element.terminos)
            this.setState({
              textInput:element.terminos
            })
            return element.terminos
          }
        });
      })
      .catch((error)=>{
        console.log(error)
      })

    }

    SendPoliticas = () =>{
      let url= "https://tomesoft1.pythonanywhere.com/politics/";
      console.log(this.state.textInput)
      console.log(url)
      const data = new FormData()
      data.append('identifier', "0")
      data.append('terminos', this.state.textInput)
      console.log(data)
      fetch(url, {
        method: 'POST',
        headers: {
          'x-csrftoken': 'csrf_token',
        },
        body: data,
      }).then((response) => {
          console.log(response)
      }).catch((error)=>{
        console.log(error)
      })

      this.setState({showModal:false})

    }
    changeInput = (e) =>{
        this.setState({
            textInput: e.target.value
        })
    }
    onResize =(size)=>{
        console.log(size)
    }

    CerrarAgregar() {
            this.setState({showModal:false})
       }

      formatearText=(terminos)=>{
        
        let arr=this.state.textInput.split("\n")
        return (< div style={{margin:'1rem'}}>
          {
            arr.map(element =>{
              return (
                <div>{element}</div>
              )
            })
          }
        </div>
        )
        


      
      }

    


  render() {
    const {TextArea} = Input;
    const { Option } = Mentions;

    return (

      <div> 
       <div>
            <h1 className="proveedor-title">Terminos y Condiciones</h1>
            <div>
                <div style={{ marginBottom: 16 }}></div>
            </div>

            <Tabs tabBarExtraContent={<div>
                        <Button
                            id="agregarButton"
                            type="text"
                            shape="circle"
                            size="small"
                            icon={<EditOutlined style={{fontSize:'x-large'}}/>}
                           onClick={() => { this.editPoliticas()}} 
                        />
                    </div>}
                        type="card" size="large" >
                        <TabPane tab="" key="1">
                           {this.formatearText(this.state.textInput)}
                        </TabPane>
                    
                        
                    </Tabs>


        </div>
        <Modal
                    className="modal"
                    title="Agregar Categoría"
                    centered
                    visible={this.state.showModal}
                    okText="Guardar"
                    cancelText="Cancelar"
                    closable={false}
                    onOk={() => this.SendPoliticas()}
                    onCancel={() => this.CerrarAgregar()}
                >
                <div>
                <h1>Términos y Condiciones</h1>
                <Mentions
                  style={{ width: '100%',height:'600px' }}
                  autoSize={{ minRows: '8',maxRows:'25' }}
                  onChange={this.onChangeMention}
                  onSelect={this.onSelect}
                  defaultValue={this.state.textInput}

                >
                  <Option value="título">título</Option>
                  <Option value="subtítulo">subtítulo</Option>
                  <Option value="contenido">contenido</Option>
                </Mentions>
                </div>
                </Modal>

      </div>
    );
  }
}
