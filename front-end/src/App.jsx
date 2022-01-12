import React, { useState } from "react";
import Header from "./components/fragments/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "reactstrap";
import Category from "./components/widgets/Category";
import Search from "./components/widgets/Search";
import Side from "./components/widgets/Side";
import Home from "./components/Home";
import Pagenation from "./components/fragments/Pagenation";

function App() {
  return (
    <div>
      y
      <Header />
      <div className="container">
        <Row>
          <div className="col-md-8">
            <h1 class="my-4">
              Page Heading
              <small>Secondary Text</small>
            </h1>
            <Home />
            <Pagenation />
          </div>
          <div className="col-md-4">
            <Search />
            <Category />
            <Side />
          </div>
        </Row>
      </div>
    </div>
  );
}

export default App;
