import React from 'react';
import "./styles.css";
import { Progress } from 'antd';
import iconimg from '../../../img/icons/imagen.png'
class FileUpload extends React.Component {
    state = {};
    props = {}
    fileInput;

    msgTexto= "Error: Formato no permitido { usar: .jpg .png jfif }";
    constructor(props) {
        super(props);
        this.fileInput = React.createRef()
        this.handleUpload = this.handleUpload.bind(this);
        this.state = {
            uploadValue:  props.param.uploadValue,
            picture:  props.param.picture,
            nompicture:  props.param.nompicture,
            file: props.param.fileimg
        };

    }
     ValidarExtension(texto, component) {
        var errorNombre = document.getElementById(component);
        if (texto) { 
            return true
        }
        else {
            if (errorNombre) {
                errorNombre.textContent = this.msgTexto
                return false;
            }  
        }
    }
    triggerInputFile = () => {
        if (this.fileInput.current != undefined && this.fileInput.current.click != undefined)
            this.fileInput.current.click()
            
    }
 
     handleUpload = (event) => {
        this.setState({
            uploadValue: '0'
        })
        const file = event.target.files[0];
        let extension=(file.name).split('.')
        if(extension.length==2){
            var fechac = document.getElementById("error");
            if (fechac) fechac.textContent = ""
            let ext=extension[1]
            ext=ext.toLowerCase()
            if(ext=='jpg'|| ext=='png' || ext=='jfif'){
                console.log("extension valida")
                const reader=new FileReader();
                reader.onload=()=>{
                    if(reader.readyState===2){
                        this.setState({
                            uploadValue: 100,
                            picture: reader.result,
                            nompicture: file.name,
                            file:file
                        });
                        this.props.handleChangeimg(reader.result,100,file.name,file)
                    }
                }
                reader.readAsDataURL(file) 
            }else{
                var fechac = document.getElementById("error");
                if (fechac) fechac.textContent = ""
                 this.ValidarExtension(false, "error")
                 this.setState({
                    uploadValue: 0,
                    picture: iconimg,
                    nompicture: file.name,
                    file:null
                });
                this.props.handleChangeimg(iconimg,0,'',null)
            }
        }   
    }

    render() {

        return (

            <div>
            <input type="file" onChange={this.handleUpload} ref={this.fileInput} className="selectedFile" />

            <div className="container">
                <div className="item">
                    <img className="selectedImg" src={this.state.picture} onClick={() => this.triggerInputFile()} alt="" />
                </div>
                <div className="item">
                </div>
               <div className="item2">
                  <Progress 
                   className="prossbar"
                    type="circle" 
                    width={105}
                    percent={this.state.uploadValue}  
                    strokeColor={{
                        '0%': '#2282B4',
                        '100%': '#052434',
                    }}/>
                </div>
            </div>
            <div className="limitlabel">
                <label className="LetterMontserrat">{this.state.nompicture}</label>
            </div>
            <div className="Registroerror-div">
                <label className="error" id="error"></label>
            </div>
            <br />
        </div>
        )
    }
}
export default FileUpload