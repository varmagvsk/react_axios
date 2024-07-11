import React from "react";
import "../assets/css/cartbtn.css";

export default class CartBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  inc=()=>{
    this.setState({count:this.state.count+1})
  }

  dec=()=>{
    this.setState({count:this.state.count-1})

  }

  render() {
    return (
      <div>
        {this.state.count <= 0 ? (
          <div class="place_card_action">
            <button onClick={()=>this.setState({count:1})} class="cart-btn">Add to Cart</button>
          </div>
        ) : (
          <div class="count-btns">
            <button onClick={this.dec} class="dec-btn" style={{width:"20%"}}>
              -
            </button>
            <div style={{width:"60%",textAlign:"center"}} >{this.state.count}</div>
            <button onClick={this.inc} class="inc-btn" style={{width:"20%"}}>
              +
            </button>
          </div>
        )}
      </div>
    );
  }
}
