import React from "react";
import { Drawer, Button, Empty, Radio, message } from "antd";
import { callservice } from "../utils/Services";
import { CUST_ID, ORG_ID } from "../utils/Constants";
import Global from "../utils/Global";
import { LeftOutlined } from "@ant-design/icons";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orditlist: [],
      checkout: false,
      delOption: 'home',
      paymentOption: 'cod',
      cartobj: {},
    };
  }

  componentDidMount() {
    this.getCart();
  }

  getCart = () => {
    let inpobj = {
      orgid: ORG_ID,
      custid: CUST_ID,
    };
    callservice("post", inpobj, "/getnewcart").then((res) => {
      this.props.onContentLoad();
      this.setState({ orditlist: res.orditlist,cartobj:res,checkout:false });
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.open != this.props.open) {
      this.getCart();
    }
  }

  checkoutTitle = () => {
    return (
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <LeftOutlined
          onClick={() => this.setState({ checkout: false })}
          style={{ fontSize: "16px" }}
        />
        <span style={{ marginLeft: 8 }}>Checkout</span>
      </div>
    );
  };

  submitOrder=()=>{
    message.open({
      type: 'loading',
      content: 'Submitting the order..',
      duration: 0,
    });
    let dt = new Date();
    let inpobj = {
      deladdr: '',
      city: 'Hyderabad',
      state: 'TN',
      zipcode: '500019',
      comments: '',
      custid: CUST_ID,
      orgid: ORG_ID,
      ordid: this.state.cartobj.ordid,
      delmethod: this.state.delOption,
      delprice: this.state.cartobj.deliveryprice,
      locid: 1,
      ordtotal: (parseFloat(this.state.cartobj.ordtotal) + parseFloat(this.state.cartobj.deliveryprice)).toFixed(2),
      paymethod: this.state.paymentOption,
      pmtstatus: '',
      pmtant: '',
      pmtid: '',
      promocode: '',
      source: 'WEBAPP',
      walamt: 0,
      lat:'',
      lon: '',
      promodscnt: 0,
      phone: 8332926463,
      name: "saivarma",
      bookdt: `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}` 
    }

    callservice('post',inpobj,'/ordersubmit')
    .then((res)=>{
      if(res.code ==='999'){
        message.destroy()
        message.open({
          type: 'success',
          content: 'Your order submitted successfully..',
          duration: 5,
        })
        
      }else{
        message.open({
          type: "error",
          content: "Something went wrong!, Please try again..",
          duration: 5
        })
      }
    }).catch((err)=>{
      message.open({
        type: "error",
        content: "Something went wrong!, Please try again..",
        duration: 5
      })
    }).finally(()=>this.props.onClose())
  }

  render() {
    return (
      <Drawer
        open={this.props.open}
        loading={this.props.loading}
        onClose={() => this.props.onClose()}
        title={this.state.checkout ? this.checkoutTitle() : "Cart"}
        style={{ position: "relative" }}
        closeIcon={!this.state.checkout}
      >
        {this.state.checkout ? (
          <div>
            <h2>Order Breakups</h2>
            <div>
              <div style={Styles.breakup} >
              <span>Subtotal</span> <span>Rs. {this.state.cartobj.ordsubtotal}</span>
              </div>
              <div style={Styles.breakup}>
              <span>Discount</span> <span>(-) Rs. {this.state.cartobj.orddscnt}</span>
              </div>
              <div style={Styles.breakup}>
              <span>Vat/Tax</span> <span>(+) Rs. {this.state.cartobj.ordtax}</span>
              </div>
              <div style={Styles.breakup}>
              <span>Delivery Fee</span> <span>(+) Rs. {this.state.cartobj.deliveryprice}</span>
              </div>
              <hr/>
              <div style={Styles.breakup}>
              <span>Total Amount</span> <span>Rs. {(parseFloat(this.state.cartobj.ordtotal) + parseFloat(this.state.cartobj.deliveryprice)).toFixed(2)}</span>
              </div>
              <hr />
            </div>
            <h2>Choose Payment Method</h2>
            <div>
            <Radio.Group onChange={(val)=>this.setState({paymentOption:val})} value={this.state.paymentOption}>
              <Radio value={'cod'}>Cash on Delivery</Radio>
              <Radio value={'online'}>Online</Radio>
            </Radio.Group>
            </div>
            <h2>Choose Delivery Method</h2>
            <div>
            <Radio.Group onChange={(val)=>this.setState({delOption:val})} value={this.state.delOption}>
              <Radio value={'pickup'}>Pickup</Radio>
              <Radio value={'home'}>Home Delivery</Radio>
            </Radio.Group>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="primary"
                    style={{ position: "absolute", bottom: 20 }}
                    danger
                    onClick={() => this.submitOrder()}
                  >
                    Submit Order Rs.{(parseFloat(this.state.cartobj.ordtotal) + parseFloat(this.state.cartobj.deliveryprice)).toFixed(2)}
                  </Button>
                </div>
          </div>
        ) : (
          <div>
            {this.state.orditlist.length > 0 ? (
              <div>
                <h2>Cart Items</h2>
                {this.state.orditlist.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 20,
                        width: "100%",
                      }}
                    >
                      <img
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                        src={item.prdimg}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: 8,
                          width: "60%",
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>
                          {item.prdname.length > 30
                            ? item.prdname.slice(0, 30) + "..."
                            : item.prdname}
                        </div>
                        <div>{item.size}</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "25%",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#fff",
                            border: `1px solid ${Global.appTheme.colors.primaryColor}`,
                            padding: 2,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <button style={Styles.btn}>-</button>
                          <span style={{}}>{item.itemcount}</span>
                          <button style={Styles.btn}>+</button>
                        </div>
                        <div
                          style={{
                            alignSelf: "flex-end",
                            marginTop: 4,
                            marginRight: 2,
                          }}
                        >
                          Rs. {item.totprice}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="primary"
                    style={{ position: "absolute", bottom: 20 }}
                    danger
                    onClick={() => this.setState({ checkout: true })}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            ) : (
              <Empty description="Cart is Empty!">
                <Button type="primary" onClick={() => this.props.onClose()}>
                  Explore Items
                </Button>
              </Empty>
            )}
          </div>
        )}
      </Drawer>
    );
  }
}

const Styles = {
  btn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "2px 8px",
    backgroundColor: Global.appTheme.colors.btnBgColor,
  },
  breakup: {
    display: "flex",
    flexDirection:"row",
    justifyContent: "space-between"
  }
};

export default Cart;
