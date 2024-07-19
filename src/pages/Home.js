import React from "react";
import Products from "../components/products";
import Global from "../utils/Global";

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            productsRef : React.createRef(null)
        }
    }
    
    componentDidMount(){
        Global.setProductsRef(this.state.productsRef.current)
    }

    render(){
        return(
            <Products ref={this.state.productsRef}/>
        )
    }
}

export default Home;