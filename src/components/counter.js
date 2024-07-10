import React from "react";

class Counter extends React.Component {
  constructor(props) {
    console.log('construtor')
    super(props);
    this.state = {
      counter: 0,
    };
  }

  dec=()=>{
    console.log("before",this.state.counter) // before 8
    this.setState({counter:this.state.counter - 1}) //async
    console.log("after",this.state.counter) // after 8
  }
  
  inc=()=>{
    this.setState({counter:this.state.counter + 1})
  }



  render() {
    console.log("component rendered")
    //console.log("counter", this.state.counter)
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.dec} style={{marginRight:4,padding:8}}>-</button>
          <span style={{padding:4}}>{this.state.counter}</span>
          <button onClick={this.inc} style={{marginLeft:4,padding:8}}>+</button>
        </div>
      </div>
    );
  }
}

const styles = {
    btn: {
        padding: 8,
        marginLeft:4,
        marginRight: 4
    }
}

export default Counter
