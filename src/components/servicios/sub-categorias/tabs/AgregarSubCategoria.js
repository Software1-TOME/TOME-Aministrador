import React, { Component } from "react";
import { Form, Input } from 'antd';
import "../AdmSubCategorias.css"

const AgregarCategoria =(props) => {
  const {param} = props
  const [form] = Form.useForm();
  const layout ={
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 25,
        },
      }

const handleChangenombre=(event)=> {
  param.nombre=event.target.value
}
const handleChangedescripcion=(event)=> {
  param.descripcion=event.target.value
}
const handleSubmitted = () => {
  form.resetFields();
}
 
  return (
    <>
      <div className="div_form" >
      <Form {...layout} form={form}  onSubmit={handleSubmitted()} >
          <Form.Item
              name="nombre"
              label="Nombre"
              className="form"
          >
              <Input initialValues="" className="input"  onChange={value=>{handleChangenombre(value)}} />
          </Form.Item>
          
          <Form.Item 
              name="descripcion"
              label="Descripcion"
              className="form"
              >
              <Input.TextArea initialValues="" className="input2" rows="7"  onChange={value=>{handleChangedescripcion(value)}} />
           
          </Form.Item>
      </Form>
      </div>
    </>
  );
}


export default AgregarCategoria;