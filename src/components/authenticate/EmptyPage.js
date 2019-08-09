import React from "react";
import missing from "./../../../src/missing.jpg";

const EmptyPage = props => {
    window.scrollTo(0, 0);

  return (
    <div className="container missing">
      <h2 className="bungee"> Page under Construction</h2>
      <img src={missing} alt="rick and morty tampering"/>
    </div>
  );
};

export default EmptyPage;
