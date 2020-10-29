import React, { Component } from "react";


class Administrador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
        };
    }
    render() {
        return (
            < >
                <h1>Pagina de Administrador</h1>
            </>
        );
    }
}

export default Administrador;