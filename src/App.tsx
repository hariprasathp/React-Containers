import React from "react";
import { Navbar } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom";
import "./App.scss";
import { CarouselComponent } from "./components/CarouselComponent";
import { ContentContainer } from "./containers/ContentContainer";

ReactDOM.render(
  <div className="app-container">
    <Navbar bg="dark" style={{ color: "white" }}>
      Sample Containers
    </Navbar>
    <CarouselComponent />
    <DndProvider backend={HTML5Backend}>
      <ContentContainer />
    </DndProvider>
  </div>,
  document.getElementById("root")
);
