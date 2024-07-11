import React from "react";
import Counter from "./components/counter";
import Home from "./pages/Home";
import NavBar from "./components/navbar";
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div style={{height:100}}></div>
        <Home />
      </div>
    );
  }
}

export default App;
