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
                <p>Pagina de inicio</p>
                <Link to="/inicio">
                    <img  src={loginMeme} alt="Login Meme" width="auto" height="600px"/>
                </Link>
                
            </>
        );
    }
}

export default IndexPage;