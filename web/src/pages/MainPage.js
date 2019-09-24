import React from "react";
import { Link } from "react-router-dom";

class MainPage extends React.Component {
  render() {
    return (
      <div className="boxContainerMenu">
        <div className="menu">
          <Link to="/ExchangeToken">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ flex: 10 }}>
                <img
                  src="/images/buyToken.png"
                  style={{ marginTop: 10 }}
                  width={100}
                />
              </div>
              <div
                style={{
                  flex: 2,
                  borderTop: "solid 2px #d5dbdb",
                  paddingTop: "5px"
                }}
              >
                Exchange
              </div>
            </div>
          </Link>
        </div>
        <div className="menu">
          <Link to="/SearchCarCrash">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ flex: 10 }}>
                <img
                  src="/images/carCrash.png"
                  style={{ marginTop: 10 }}
                  width={100}
                />
              </div>
              <div
                style={{
                  flex: 2,
                  borderTop: "solid 2px #d5dbdb",
                  paddingTop: "5px"
                }}
              >
                Search
              </div>
            </div>
          </Link>
        </div>
        <div className="menu">
          <Link to="/SearchCarCrash">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ flex: 10 }}>
                <img
                  src="/images/bidding.png"
                  style={{ marginTop: 10 }}
                  width={100}
                />
              </div>
              <div
                style={{
                  flex: 2,
                  borderTop: "solid 2px #d5dbdb",
                  paddingTop: "5px"
                }}
              >
                Auction
              </div>
            </div>
          </Link>
        </div>
        <div className="menu">
          <Link to="/SearchCarCrash">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ flex: 10 }}>
                <img
                  src="/images/garage.png"
                  style={{ marginTop: 10 }}
                  width={100}
                />
              </div>
              <div
                style={{
                  flex: 2,
                  borderTop: "solid 2px #d5dbdb",
                  paddingTop: "5px"
                }}
              >
                Garage
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default MainPage;
