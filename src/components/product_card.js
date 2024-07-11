import React from "react";
import "../assets/css/product_card.css"
import CartBtn from "./cartbtn";

export default class ProductCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
        console.log(this.props)
    }


    render(){
        let data = this.props.product
        return(
            <div class="place_card">
                <div class="place_card_image">
                <img src={data.prdimg} />
                </div>
                <div class="place_card_content">
                    <span>{data.langpref} - {data.proditems[0].size}</span>
                    <p>₹{data.proditems[0].price}</p>
                </div>
                <CartBtn />
                {/*<cart-btn style="" selected="${this.data.selected}" prdid="${this.data.id}" cartcount="${this.data.cartcount}"></cart-btn>*/}
            </div>
        )
    }
}