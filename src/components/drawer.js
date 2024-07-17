import React from "react";
import { Drawer, Button } from "antd";
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
      this.setState({ orditlist: res.orditlist,checkout:false });
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.open != this.props.open) {
      this.getCart();
    }
  }

  checkoutTitle=()=>{
    return(
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <LeftOutlined onClick={()=>this.setState({checkout:false})} style={{fontSize:"16px"}}/>
            <span style={{marginLeft:8}}>Checkout</span>
        
        
        </div>
    )
  }

  render() {
    return (
      <Drawer
        open={this.props.open}
        loading={this.props.loading}
        onClose={() => this.props.onClose()}
        title={this.state.checkout? this.checkoutTitle() :"Cart"}
        style={{ position: "relative" }}
        closeIcon={!this.state.checkout}
      >
        {this.state.checkout ? <div>
            
            <h2>Checkout</h2>
            
            </div> :<div>
          <h2>Cart Items</h2>
          {this.state.orditlist.length > 0 &&
            this.state.orditlist.map((item, index) => {
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
              onClick={()=>this.setState({checkout:true})}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>}
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
};

export default Cart;
