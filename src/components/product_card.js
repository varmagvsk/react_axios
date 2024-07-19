import React from "react";
import "../assets/css/product_card.css"
import CartBtn from "./cartbtn";

export default class ProductCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
        //console.log(this.props)
    }
    
    // componentDidUpdate(){
    //     console.log("prodctcard updated")
    // }


    render(){
        //console.log("product rendered")
        let data = this.props.product
        return(
            <div className="place_card">
                <div className="place_card_image">
                <img src={data.prdimg} />
                </div>
                <div className="place_card_content">
                    <span>{data.langpref} - {data.proditems[0].size}</span>
                    <p>₹{data.proditems[0].price}</p>
                </div>
                <CartBtn data={data}/>
                {/*<cart-btn style="" selected="${this.data.selected}" prdid="${this.data.id}" cartcount="${this.data.cartcount}"></cart-btn>*/}
            </div>
        )
    }
}