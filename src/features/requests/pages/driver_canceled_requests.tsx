import React from "react";

import Navigation from "../../../shared/layout/navigation";

function DriverCanceledRequests() {
  function handle_burger_btn(): void {
    const sidebar = document.getElementById("sidebar");
    sidebar?.classList.toggle("close");
  }

  return (
    <React.Fragment>
      <div className="d-flex">
        <Navigation />
        <div className="page_content">
          <div className="nav_header">
            <i
              className="bx bx-menu burger_icon"
              onClick={handle_burger_btn}
            ></i>
            <span className="text">Driver Canceled Requests</span>
          </div>
          <div className="container-fluid">
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DriverCanceledRequests;
