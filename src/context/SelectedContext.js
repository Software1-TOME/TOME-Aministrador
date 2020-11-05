import React, {Component} from 'react';

const SelectedContext = React.createContext();

class SelectedProvider extends Component{

    state={
        selected:{},
        show: false,
    }


    setSelected=(selected)=>{
        this.setState((prevState)=>({selected}))
    }

    setShow=(show)=>{
        this.setState((prevState)=>({show}))
    }


    render(){
        const { children } = this.props
        const { selected, show} = this.state
        const {setSelected, setShow} =this

        return(
            <SelectedContext.Provider
            value={{
                show, selected,
                setShow, setSelected
            }}>
                {children}
            </SelectedContext.Provider>
        )
    }

}


export default SelectedContext;


export{SelectedProvider}