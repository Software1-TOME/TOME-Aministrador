import React, { Component } from "react";
import { Link } from "react-router-dom";
import loginMeme from "../img/loginMeme.jpg";
class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            < >
                <h1>Pagina de inicio</h1>
                <Link to="/inicio">
                    <img src={loginMeme} alt="Login Meme" />
                </Link>
                
            </>
        );
    }
}

export default IndexPage;