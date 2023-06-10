import React from "react";

export default function Report() {
  return (
    <React.Fragment>
      <h3 className="mt-3">Daily Report</h3>
      <div className="row mt-2 justify-content-center">
        <div className="col-md-3 mt-3">
          <div className="rounded background_primary shadow p-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <h2 className="text-white">1,504</h2>
                <p className="color_secondary">New Passengers</p>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <i className="bx bx-user text-white font_report_icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-3">
          <div className="rounded background_primary shadow p-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <h2 className="text-white">43</h2>
                <p className="color_secondary">Active Drivers</p>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <i className="bx bx-car text-white font_report_icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-3">
          <div className="rounded background_primary shadow p-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <h2 className="text-white">500</h2>
                <p className="color_secondary">Inactive Drivers</p>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <i className="bx bx-car text-white font_report_icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-3">
          <div className="rounded background_primary shadow p-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <h2 className="text-white">1,504 ETB</h2>
                <p className="color_secondary">New Income</p>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <i className="bx bx-money text-white font_report_icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mt-3">Summary Report</h3>
      <div className="row mt-2">
        <div className="col-md-3 mt-3">
          <div className="rounded background_secondary shadow p-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <h2 className="text-white">2567</h2>
                <p className="color_primary">Total Passengers</p>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <i className="bx bx-user text-white font_report_icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-3">
          <div className="rounded background_secondary shadow p-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <h2 className="text-white">876</h2>
                <p className="color_primary">Total Drivers</p>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <i className="bx bx-user text-white font_report_icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-3">
          <div className="rounded background_secondary shadow p-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <h2 className="text-white">1000 ETB</h2>
                <p className="color_primary">Total Income</p>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <i className="bx bx-user text-white font_report_icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
