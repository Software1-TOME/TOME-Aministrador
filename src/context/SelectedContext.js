import React, { Component } from 'react';

const SelectedContext = React.createContext();

class SelectedProvider extends Component {

    state = {
        selected: {},
        show: false,
        edited: {},
        showEdit: false,
        nombres: "",
        apellidos: "",
        telefono: "",
        ciudad: "",
        cedula: "",
        email: "",
        banco: "",
        tipo_cuenta: "",
        numero_cuenta: "",
        profesion: "",
    }


    setSelected = (selected) => {
        this.setState({ selected: selected })
    }

    setShow = (show) => {
        this.setState((prevState) => ({ show }))
    }

    setEdit = (edited) => {
        this.setState({ edited: edited })
    }

    setShowEdit = (showEdit) => {
        this.setState((prevState) => ({ showEdit }))
    }

    setNombres = (nombres) => {
        this.setState({ nombres })
    }

    setApellidos = (apellidos) => {
        this.setState({ apellidos })
    }

    setTelefono = (telefono) => {
        this.setState({ telefono })
    }

    setCiudad = (ciudad) => {
        this.setState({ ciudad })
    }
    setCedula = (cedula) => {
        this.setState({ cedula })
    }
    setEmail = (email) => {
        this.setState({ email })
    }

    setProfesion = (profesion) => {
        this.setState({ profesion })
    }
    setBanco = (banco) => {
        this.setState({ banco })
    }
    setNumCuenta = (numero_cuenta) => {
        this.setState({ numero_cuenta })
    }

    setTipoCuenta = (tipo_cuenta) => {
        this.setState({ tipo_cuenta })
    }

    reset =()=>{
        this.setState({
            nombres: "",
            apellidos: "",
            telefono: "",
            ciudad: "",
            cedula: "",
            email: "",
            banco: "",
            tipo_cuenta: "",
            numero_cuenta: "",
            profesion: "",  
        })
    }



    render() {
        const { children } = this.props
        const { selected, show, edited, showEdit, nombres,
            apellidos, ciudad, telefono, cedula, numero_cuenta,
            banco, tipo_cuenta, email, profesion } = this.state
        const { setSelected, setShow, setEdit, setShowEdit, setNombres,
            setApellidos, setEmail, setTelefono,
            setCiudad, setCedula, setTipoCuenta, setNumCuenta,
            setProfesion, setBanco, reset } = this

        return (
            <SelectedContext.Provider
                value={{
                    show, selected, edited, 
                    showEdit, nombres,
                    apellidos, ciudad, telefono,
                    cedula, numero_cuenta,
                    banco, tipo_cuenta, email, profesion,
                    setShow, setSelected, setEdit, 
                    setShowEdit, setNombres,
                    setApellidos, setEmail, 
                    setTelefono, setCiudad, 
                    setCedula, setTipoCuenta, 
                    setNumCuenta, setProfesion, 
                    setBanco, reset
                }}>
                {children}
            </SelectedContext.Provider>
        )
    }

}


export default SelectedContext;


export { SelectedProvider }