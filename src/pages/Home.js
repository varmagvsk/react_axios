import React from "react";
import Products from "../components/products";

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <Products />
        )
    }
}

export default Home;