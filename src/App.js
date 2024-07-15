import React from "react";
import Counter from "./components/counter";
import Home from "./pages/Home";
import NavBar from "./components/navbar";
import Global from "./utils/Global";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navRef: React.createRef(null),
      homeRef: React.createRef(null)
    }
  }

  componentDidMount(){
    Global.setNavRef(this.state.navRef.current)
    Global.setHomeRef(this.state.homeRef.current)
  }

  render() {
    return (
      <div>
        <NavBar ref={this.state.navRef} />
        <div style={{height:100}}></div>
        <Home ref={this.state.homeRef} />
      </div>
    );
  }
}

export default App;
