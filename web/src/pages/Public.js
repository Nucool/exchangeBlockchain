import React from "react";
import { Link, Route } from "react-router-dom";
import { BallScaleRippleMultiple } from "react-pure-loaders";

const Loading = props => {
  return (
    <div
      className="AppLoading"
      style={{ display: props.loading ? "block" : "none" }}
    >
      {" "}
      {console.log("Loading props", props)}
      <div className="AppLoadingIcon">
        <BallScaleRippleMultiple color={"yellow"} loading={props.loading} />
      </div>
    </div>
  );
};

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const Public = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      console.log("public props", props);
      return (
        <div className="App">
          <Loading {...rest} />
          <div className="AppBody">
            <div
              className="boxBody"
              style={{ flex: 2, backgroundColor: "#85C1E9" }}
            ></div>
            <div className="boxBody" style={{ flex: 10 }}></div>
            <div className="boxOver">
              <div
                style={{
                  flex: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <div style={{ flex: 4 }}>
                  <Link to="/">
                    <img src="/images/coin.png" width="90" />
                  </Link>
                </div>
                <div style={{ flex: 8, fontSize: "1.4em" }}>
                  You have <b>{formatNumber(rest.totalCDT)}</b> CLM
                </div>
              </div>
            </div>
            {React.createElement(component, rest)}
          </div>
        </div>
      );
    }}
  />
);

export default Public;
