import React from "react";

import "../../css/spinner.css";

const Spinner = (props) => (
  <div className="center">
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Spinner;
