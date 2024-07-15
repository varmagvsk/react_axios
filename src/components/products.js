import React from "react";
import { callservice } from "../utils/Services";
import ProductCard from "./product_card";
import { CUST_ID, ORG_ID } from "../utils/Constants";
import Global from "../utils/Global";

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    console.log("constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.getProducts();
  }



  getProducts = () => {
    let inpobj = {
      orgid: "9GZMP1618460747",
      langpref: "English",
    };
    callservice("post", inpobj, "/allprodlist")
      .then((res) => {
        //console.log("callsvcRes", res);
        for(let i=0;i<res.prodlist.length;i++){
            //console.log("hre")
            res.prodlist[i]['selected'] = false;
            res.prodlist[i]['selcount'] = 0;
            res.prodlist[i]['ordid'] = '';
            res.prodlist[i]['orditid'] = '';
        }
        console.log(res.prodlist)
        this.setState({ products: res.prodlist }, () => this.getCart());
        // console.log("products",this.state.products)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  getCart = () => {
    let inpobj = {
      orgid: ORG_ID,
      custid: CUST_ID,
    };

    callservice("post", inpobj, "/getnewcart").then((res) => {
      if (res.code == "999") {
        console.log(res)
        Global.getNavRef().setState({ cartcount: res.cartcount });
        for (let i = 0; i < this.state.products.length; i++) {
          for (let j = 0; j < res.orditlist.length; j++) {
            if (this.state.products[i].id == res.orditlist[j].prdid) {
              this.state.products[i]["selected"] = true;
              this.state.products[i]["selcount"] = res.orditlist[j].itemcount;
              this.state.products[i]['ordid']  = res.ordid;
              this.state.products[i]['orditid'] = res.orditlist[j].orditid;
              break;
            }else{
                this.state.products[i]["selected"] = false;
                this.state.products[i]["selcount"] = 0;
            }
          }
        }
        if (res.orditlist.length > 0) {
            console.log("sencond")
          this.setState({ products: this.state.products });
        }
      }
    });
  };

  render() {
    console.log("prodrender");
    return (
      <div>
        {this.state.products.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {this.state.products.map((prod, index) => {
              return <ProductCard key={index} product={prod} id={prod.id} />;
            })}
          </div>
        ) : (
          <div>Fetching Products...</div>
        )}
      </div>
    );
  }
}
