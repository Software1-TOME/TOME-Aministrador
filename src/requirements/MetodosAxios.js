import axios from "axios";
import { API_URL } from "../Constants";

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
    obtener_administradores
    autor: Axell
    descripccion: Obtiene todos los administradores
    parametros: None
  */
  static obtener_administradores = () => {
    return MetodosAxios.instanceAxios.get("/administradores/")
  };
  /*
    cambio_solicitante_estado
    autor: Axell
    descripccion: Cambia estado de un solicitante
    parametros: boolean estado, int id
  */
  static cambio_solicitante_estado = (estado, id) => {
    console.log(estado, id)
    return MetodosAxios.instanceAxios.put(`/solicitante_estado/${id}`, estado)
  };
  /*
    eliminar_solicitante
    autor: Axell
    descripccion: Elimina un solicitante
    parametros: int id
  */
  static eliminar_solicitante(id) {
    return MetodosAxios.instanceAxios.delete(`/solicitante_delete/${id}`)
  };

  /*
    cambio_proveedor_estado
    autor: Axell
    descripccion: Cambia estado de un proveedor
    parametros: boolean estado, int id
  */
  static cambio_proveedor_estado = (estado, id) => {
    console.log(estado, id)
    return MetodosAxios.instanceAxios.put(`/proveedor_estado/${id}`, estado)
  };

  /*
    cambio_administrador_estado
    autor: Axell
    descripccion: Cambia estado de un administrador
    parametros: boolean estado, int id
  */
  static cambio_administrador_estado = (estado, id) => {
    console.log(estado, id)
    return MetodosAxios.instanceAxios.put(`/administrador_estado/${id}`, estado)
  };

  /*
    eliminar_proveedor
    autor: Axell
    descripccion: Elimina un proveedor
    parametros: int id
  */
  static eliminar_proveedor(id) {
    return MetodosAxios.instanceAxios.delete(`/proveedor_delete/${id}`)
  };

  /*
    eliminar_administrador
    autor: Axell
    descripccion: Elimina un administrador
    parametros: int id
  */
  static eliminar_administrador(id) {
    return MetodosAxios.instanceAxios.delete(`/administrador_delete/${id}`)
  };

  static obtener_proveedores = () => {
    return MetodosAxios.instanceAxios.get("/proveedores/")
  }

  static obtener_proveedores_pendientes = () => {
    return MetodosAxios.instanceAxios.get("/proveedores_pendientes/")
  }

  static obtener_cuenta_proveedor = (proveedorID) => {
    return MetodosAxios.instanceAxios.get(`/cuenta_proveedor/${proveedorID}`)
  }

  static register_proveedor(data) {
    let url = '/register_proveedor/'
    return MetodosAxios.instanceAxios.post(url, data)
  }

  static obtener_profesiones(user) {
    return MetodosAxios.instanceAxios.get(`/proveedor_profesiones/${user}`)
  }

  static enviar_email(data) {
    return MetodosAxios.instanceAxios.post('/email/', data)
  }

  static obtener_todas_profesiones(){
    return MetodosAxios.instanceAxios.get('/profesiones/')
  }

  static actualizar_pendiente(url, data){
    return MetodosAxios.instanceAxios.post(url, data)
  }

  
  /*
    obtener_categorias
    autor: Lilibeth
    descripccion: Obtiene todas las categorias
    parametros: None
  */
 static obtener_categorias = () => {
  return MetodosAxios.instanceAxios.get("/categorias/")
};
 /*
    cambio_categoria_estado
    autor: Lilibeth
    descripccion: Cambia estado de una categoria
    parametros: boolean estado, int id
  */
 static cambio_categoria_estado = (estado, id) => {
  console.log(estado, id)
  return MetodosAxios.instanceAxios.put(`/categoria_estado/${id}`, estado)
};
/*
    eliminar_categoria
    autor: lilibeth
    descripccion: Elimina una categoria
    parametros: int id
  */
 static eliminar_categoria(id) {
  return MetodosAxios.instanceAxios.delete(`/categoria_delete/${id}`)
};
  /*
    obtener_Subcategorias
    autor: Lilibeth
    descripccion: Obtiene todas las sub-categorias
    parametros: None
  */
 static obtener_subcategorias = () => {
  return MetodosAxios.instanceAxios.get("/servicios/")
};
 /*
    cambio_subcategoria_estado
    autor: Lilibeth
    descripccion: Cambia estado de una subcategoria
    parametros: boolean estado, int id
  */
 static cambio_subcategoria_estado = (estado, id) => {
  console.log(estado, id)
  return MetodosAxios.instanceAxios.put(`/servicios_estado/${id}`, estado)
};
/*
    eliminar_subcategoria
    autor: lilibeth
    descripccion: Elimina una subcategoria
    parametros: int id
  */
 static eliminar_subcategoria(id) {
  return MetodosAxios.instanceAxios.delete(`/servicios_delete/${id}`)
};
/*
    crear_categoria
    autor: lilibeth
    descripccion: crear una categoria
    parametros: none
  */
 static crear_categoria(data) {
  return MetodosAxios.instanceAxios.post(`/categorias/`,data)
};
/*
    crear_subcategoria
    autor: lilibeth
    descripccion: crea una subcategoria
    parametros: none
  */
 static crear_subcategoria(data) {
  return MetodosAxios.instanceAxios.post(`/servicios/`,data)
};
}
