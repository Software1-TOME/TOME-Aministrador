import React from "react";
import { Form, Input } from 'antd';
import File from '../../File/FileUpload'
import "../AdmCategorias.css"
import '../../Validacion/validaciones.css';
const AgregarCategoria =(props) => {
  const {param,handleChangeimg} = props
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
  var nombre = document.getElementById("errornombre");
  if (nombre) nombre.textContent = ""
}
const handleChangedescripcion=(event)=> {
  param.descripcion=event.target.value
  var descripcion = document.getElementById("errordescripcion");
  if (descripcion) descripcion.textContent = ""
}
const handleSubmitted = () => {
 if(param.limpiar){
  form.resetFields()
  param.limpiar=false}
}
 
React.useEffect(() => {
  param.nombre=''
  param.descripcion=''
  param.picture=null
});
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
            <div className="Registroerror-div">
              <label className="error" id="errornombre"></label>
            </div>
          </Form.Item>
          
          <Form.Item 
            name="descripcion"
            label="Descripcion"
            className="form"
          >
            <Input.TextArea initialValues="" className="input2" rows="7"  onChange={value=>{handleChangedescripcion(value)}} />
            <div className="Registroerror-div">
              <label className="error" id="errordescripcion"></label>
            </div>
          </Form.Item>
          <Form.Item 
            name="foto"
            label="Foto"
            className="form"
          >
          <File param={param}  handleChangeimg={handleChangeimg}  />
          </Form.Item>
      </Form>
      </div>
    </>
  );
}


export default AgregarCategoria;