import MetodosAxios from "../../../requirements/MetodosAxios";

export async function getProfesiones(username) {
    let _profesiones = ""
    let response = await MetodosAxios.obtener_profesiones(username)
    let profesiones = response.data
    for (let i = 0; i < profesiones.length; i++) {
        let _profesion = profesiones[i].profesion.nombre
        if (i === (profesiones.length - 1)) _profesiones += _profesion;
        else _profesiones += _profesion + " , "
    }
    console.log(_profesiones)
    return _profesiones;
}

export async function getCuenta(id_proveedor){
    let accounts =[]
    let response = await MetodosAxios.obtener_cuenta_proveedor(id_proveedor);
    let cuentas = response.data
    if(cuentas.length>0){
        for(let account of cuentas){
            let element={
                id: account.id,
                numero: account.numero_cuenta,
                banco: account.banco.nombre,
                tipo: account.tipo_cuenta.nombre,
                estado: account.estado
            }
            accounts.push(element)
        }
    }
    return accounts;
}

export async function  getProveedor(proveedor, count) {
    let _username = proveedor.user_datos.user.email;
    let fullName = proveedor.user_datos.nombres + " " + proveedor.user_datos.apellidos;
    let date = new Date(proveedor.user_datos.fecha_creacion)
    let fecha = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
    let licencia = "No"
    proveedor.estado ? licencia = "Sí" : licencia = "No"
    let profesion = await getProfesiones(_username);
    let accounts = await getCuenta(proveedor.id)
    let element = {
        count: count,
        key: proveedor.id,
        proveedor_id: proveedor.id,
        user_datos: proveedor.user_datos.id,
        user_id: proveedor.user_datos.user.id,
        username: proveedor.user_datos.user.username,
        email: proveedor.user_datos.user.email,
        tipo_user: proveedor.user_datos.tipo,
        nombre: fullName,
        ciudad: proveedor.user_datos.ciudad,
        cedula: proveedor.user_datos.cedula,
        telefono: proveedor.user_datos.telefono,
        genero: proveedor.user_datos.genero,
        foto: proveedor.user_datos.foto,
        descripcion: proveedor.descripcion,
        document: proveedor.document,
        estado: licencia,
        fecha_creacion: fecha,
        profesion: profesion,
        cuentas: accounts,

    }
    return element;
}



export async function get_Pendientes(pendiente, count){
    let proveedor = pendiente.proveedor
    let fullName = proveedor.user_datos.nombres + " " + proveedor.user_datos.apellidos;
    let date = new Date(proveedor.user_datos.fecha_creacion)
    let fecha = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
    let licencia = "No"
    proveedor.estado ? licencia = "Sí" : licencia = "No"
    let accounts = await getCuenta(proveedor.id)
    let element={
        count: count,
        key: proveedor.id,
        proveedor_id: proveedor.id,
        user_datos: proveedor.user_datos.id,
        email: pendiente.email,
        tipo_user: proveedor.user_datos.tipo,
        nombre: fullName,
        ciudad: proveedor.user_datos.ciudad,
        cedula: proveedor.user_datos.cedula,
        telefono: proveedor.user_datos.telefono,
        genero: proveedor.user_datos.genero,
        foto: proveedor.user_datos.foto,
        descripcion: proveedor.descripcion,
        document: proveedor.document,
        estado: licencia,
        fecha_creacion: fecha,
        profesion: pendiente.profesion,
        ano_experiencia: pendiente.ano_experiencia,
        cuentas: accounts,
    }
    return element
}
