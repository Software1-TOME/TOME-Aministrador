import axios from "axios";
import Proveedor from "../components/cuentas/proveedor/Proveedor";
import {API_URL} from "../Constants";

export default class MetodosAxios {
  static instanceAxios = axios.create({
   baseURL: API_URL,
  });

  /*
    obtener_solicitantes
    autor: Axell
    descripccion: Obtiene todos los solicitantes
    parametros: None
  */
  static obtener_solicitantes = () => {
    return MetodosAxios.instanceAxios.get("/solicitantes/")
  };
  /*
    cambio_solicitante_estado
    autor: Axell
    descripccion: Cambia estado de un solicitante
    parametros: boolean estado, int id
  */
  static cambio_solicitante_estado = (estado,id) => {
    console.log(estado,id)
    return MetodosAxios.instanceAxios.put(`/solicitante_estado/${id}`,estado)
  };
  /*
    eliminar_solicitante
    autor: Axell
    descripccion: Elimina un solicitante
    parametros: int id
  */
  static async  eliminar_solicitante(id){
    return  await MetodosAxios.instanceAxios.delete(`/solicitante_delete/${id}`)
  };

  static obtener_proveedores=()=>{
    return MetodosAxios.instanceAxios.get("/proveedores/")
  }

  static obtener_proveedores_pendientes=()=>{
    return MetodosAxios.instanceAxios.get("/proveedores_pendientes/")
  }

  static obtener_cuenta_proveedor=(proveedorID)=>{
    return MetodosAxios.instanceAxios.get(`/cuenta_proveedor/${proveedorID}`)
  }

  static register_proveedor(data){
    let url = '/register_proveedor/'
    return MetodosAxios.instanceAxios.post(url, data)
  }

  static obtener_profesiones(user){
    return MetodosAxios.instanceAxios.get(`/proveedor_profesiones/${user}`)
  }

  static enviar_email(data){
    return MetodosAxios.instanceAxios.post('/email/', data)
  }

}
