import React from "react";
import ReactDOM from "react-dom";
import { CarouselComponent } from "./components/CarouselComponent";
import { Navbar } from "react-bootstrap";
import { ContentContainer } from "./containers/ContentContainer";

ReactDOM.render(
  <>
    <Navbar bg="dark" style={{ color: "white" }}>
      Sample Containers
    </Navbar>
    <CarouselComponent />
    <ContentContainer />
  </>,
  document.getElementById("root")
);
