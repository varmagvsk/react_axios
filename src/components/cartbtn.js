import React from "react";
import "../assets/css/cartbtn.css";

export default class CartBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        {this.state.count <= 0 ? (
          <div class="place_card_action">
            <button class="cart-btn">Add to Cart</button>
          </div>
        ) : (
          <div class="count-btns">
            <button class="dec-btn" style="width:20%">
              -
            </button>
            <div style="width:60%;text-align:center">${this.state.count}</div>
            <button class="inc-btn" style="width:20%">
              +
            </button>
          </div>
        )}
      </div>
    );
  }
}
