import axios from "axios";
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

}
