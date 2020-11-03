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

}
