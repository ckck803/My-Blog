import React from "react";
import { Row } from "reactstrap";
import Footer from "../fragments/Footer";
import Header from "../fragments/Header";
import Category from "../widgets/Category";
import Search from "../widgets/Search";
import Side from "../widgets/Side";

const MainTemplate = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container" id="main-body">
        <Row>
          <div className="col-lg-8">{children}</div>
          <div className="col-md-4">
            <Search />
            <Category />
            <Side />
          </div>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default MainTemplate;
