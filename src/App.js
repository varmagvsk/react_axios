import React from "react";
import Counter from "./components/counter";
import Products from "./components/products";
class App extends React.Component{

  constructor(props){
    super(props)
  }


  render(){
    return(
     <div>
      <Products />
     </div>
    )
  }
}


export default App;