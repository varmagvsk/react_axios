import React from "react";
import "../assets/css/cartbtn.css";
import { CUST_ID, ORG_ID } from "../utils/Constants";
import { callservice } from "../utils/Services";
import Global from "../utils/Global";
import { Button } from "antd";

export default class CartBtn extends React.Component {
  
  constructor(props) {
    //console.log("cartbtn constructed")
    super(props);
    this.state = {
      count: this.props.data.selcount,
      ordid: this.props.data.ordid,
      orditid: this.props.data.orditid,
      countZeroUpdated: false,
      loading:false,
      //afterRenderProps: {...this.props.data},
    };
    //console.log("cartbtn constructed",this.state.count)
  }

  componentDidUpdate(prevProps){
    if(this.props.data.selected && this.state.count <=0 && !this.state.countZeroUpdated){
      this.setState({count:this.props.data.selcount,ordid:this.props.data?.ordid,orditid:this.props.data?.orditid})
    }

    
  }

  inc=()=>{
    this.setState({count:this.state.count+1})
  }

  dec=()=>{
    this.setState({count:this.state.count-1})

  }


  addToCart=(type='add')=>{
    this.setState({loading:true})
    let ordquan = type == 'add' ? parseInt(this.state.count) + 1 : parseInt(this.state.count) - 1
    let productData = this.props.data
    let inpobj = {
      orgid: ORG_ID,
      custid: CUST_ID,
      prdid: productData.id,
      prdimg: productData.prdimg,
      prditid: productData.proditems[0].itemid,
      price: productData.proditems[0].price,
      onpromo: productData.proditems[0].promo,
      promoprice: productData.proditems[0].promoprice,
      size: productData.proditems[0].size,
      ordquan: ordquan,
      ordid: this.state.ordid,
      orditid: this.state.orditid,
      totprice: (ordquan * parseFloat(productData.proditems[0].price)).toFixed(2),
      addons: JSON.stringify([]),
      hsn: 1234,
    }

    callservice('post',inpobj,'/addtocart')
    .then((res)=>{
      if(res.code == "999"){
        if(res.itemcount == 0){
          this.setState({count:0,countZeroUpdated:true})
        }else{
          this.setState({count:res.itemcount,ordid:res.cartobj.ordid,orditid:res.cartobj.orditid,countZeroUpdated:false})
        }
        Global.getNavRef().setState({cartcount:res.cartcount})
      }
    })
    .catch(err=>console.log(err))
    .finally(()=>this.setState({loading:false}))
  }

  render() {
    return (
      <div>
        {(this.state.count <= 0) ? (
          <div className="place_card_action">
            <Button loading={this.state.loading} onClick={()=>this.addToCart()} className="cart-btn">{this.state.loading ? "Adding.." : 'Add to Cart'}</Button>
          </div>
        ) : (
          <div className="count-btns">
            <button onClick={()=>this.addToCart('dec')} className="dec-btn" style={{width:"20%"}}>
              -
            </button>
            <div style={{width:"60%",textAlign:"center"}} >{this.state.count}</div>
            <button onClick={()=>this.addToCart()} className="inc-btn" style={{width:"20%"}}>
              +
            </button>
          </div>
        )}
      </div>
    );
  }
}
