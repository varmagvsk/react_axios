import React from "react";
import Counter from "./components/counter";
import Home from "./pages/Home";
import NavBar from "./components/navbar";
import Global from "./utils/Global";
import Cart from "./components/drawer";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navRef: React.createRef(null),
      homeRef: React.createRef(null),
      modalOpen: false,
      modalLoading: true,
    };
  }

  componentDidMount() {
    Global.setNavRef(this.state.navRef.current);
    Global.setHomeRef(this.state.homeRef.current);
  }

  modalClose=()=>{
   this.setState({modalOpen:false}) 
  }

  onContentLoad=()=>{
    this.setState({modalLoading:false})
  }

  openDrawer=()=>{
    this.setState({modalOpen:true})
  }

  render() {
    console.log("App rendered")
    return (
      <div>
        <NavBar ref={this.state.navRef} openDrawer={this.openDrawer} />
        <div style={{ height: 100 }}></div>
        <Home ref={this.state.homeRef} />
        <Cart onClose={this.modalClose} onContentLoad={this.onContentLoad} open={this.state.modalOpen} loading={this.state.modalLoading} />
      </div>
    );
  }
}

export default App;
