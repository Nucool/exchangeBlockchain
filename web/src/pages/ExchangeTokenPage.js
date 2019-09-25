import React from "react";

class ExchangeTokenPage extends React.Component {
  state = {
    totalExchange: "",
    totalETH: "",
    readyToExchange: false
  };

  constructor(props) {
    super(props);
    this.handleTotalExchange = this.handleTotalExchange.bind(this);
    this.handleBuyClaimDiTokenClick = this.handleBuyClaimDiTokenClick.bind(
      this
    );
    console.log("ExchangeTokenPage", props);
  }

  componentDidMount() {}

  handleTotalExchange = event => {
    this.setState({
      totalExchange: event.target.value,
      totalETH:
        event.target.value !== ""
          ? parseInt(event.target.value) * 0.01
          : "",
      readyToExchange: event.target.value > 0
    });
  };

  async handleBuyClaimDiTokenClick(e) {
    let totalExchange = this.state.totalExchange;
    let response = await this.props.handleBuyClaimDiToken(totalExchange);
    if (response) {
      this.setState({
        totalExchange: "",
        totalETH: "",
        readyToExchange: false
      });
    }
  }

  render() {
    return (
      <div className="boxContainerMenu">
        <div
          className="box"
          style={{ textAlign: "left", borderRadius: "10px" }}
        >
          <div className="box-header with-border">
            <h3 className="box-title col-md-12 no-padding">Exchange Token</h3>
          </div>
          <div className="box-body">
            <div className="form-group">
              <div className="row">
                <div className="col-md-5">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.totalExchange}
                      onChange={this.handleTotalExchange}
                    />
                    <span className="input-group-addon">CLM</span>
                  </div>
                </div>
                <div
                  className="col-md-2"
                  style={{ textAlign: "center", paddingTop: "5px" }}
                >
                  <i className="fa fa-fw fa-exchange"></i>
                </div>
                <div className="col-md-5">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      value={this.state.totalETH}
                    />
                    <span className="input-group-addon">ETH</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-5">
                  <button
                    className="btn btn-block btn-primary"
                    disabled={!this.state.readyToExchange}
                    onClick={this.handleBuyClaimDiTokenClick}
                  >
                    Exchange
                  </button>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExchangeTokenPage;
