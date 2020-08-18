import React, { Component } from "react";

import Container from "./PieContainer";


class PieApp extends Component {
  state = {
    navbarOpen: false,
  };

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  };

  render() {
    return (
      <>
        
        <Container />
      </>
    );
  }
}

export default PieApp;
