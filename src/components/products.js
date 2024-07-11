import React from "react";
import { callservice } from "../utils/Services";
import ProductCard from "./product_card";

export default class Products extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            products: []
        }
        console.log("constructor")
    }

    componentDidMount(){
        console.log('componentDidMount')
        this.getProducts();
    }

    

    getProducts=()=>{
        let inpobj = {
            orgid: "9GZMP1618460747",
            langpref: "English",
        }
        callservice('post',inpobj,'/allprodlist')
        .then((res)=>{
            console.log("callsvcRes",res)
            this.setState({products:res.prodlist},()=>console.log("setStateCallback",this.state.products))
            //console.log("products",this.state.products)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{})
    }

    render(){
        console.log("render")
        return(
            <div>
                {this.state.products.length > 0 ? <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>

                {this.state.products.map((prod)=>{
                    return(
                        <ProductCard product={prod} id={prod.id}  />
                    )
                })}
                    
                    
                    
                </div> : <div>Fetching Products...</div>}
            
            </div>
        )
    }
}