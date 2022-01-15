import React from "react";
import { Row } from "reactstrap";
import Header from "../fragments/Header";
import Category from "../widgets/Category";
import Search from "../widgets/Search";
import Side from "../widgets/Side";

const MainTemplate = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">
        <Row>
          <div className="col-md-8">{children}</div>
          <div className="col-md-4">
            <Search />
            <Category />
            <Side />
          </div>
        </Row>
      </div>
    </div>
  );
};

export default MainTemplate;
