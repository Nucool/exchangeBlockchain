import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ClaimDiCoin from "./module/ClaimDiCoin";
import { BallScaleRippleMultiple } from "react-pure-loaders";

class App extends React.Component {
  state = {
    loading: true
  };

  constructor(props) {
    super(props);
    this.handleBuyClick = this.handleBuyClick.bind(this);
    this.handleGetClick = this.handleGetClick.bind(this);
    this.handleGetbBalanceOfClick = this.handleGetbBalanceOfClick.bind(this);
    this.handleBuyClaimDiTokenClick = this.handleBuyClaimDiTokenClick.bind(
      this
    );
  }

  handleBuyClick(e) {
    this.setState({ loading: true });
    this.claimDiCoin
      .addAccidentHistory(
        "carRegis",
        "carChassic",
        "accidentDetail",
        "accidentDate",
        "accidentPlace",
        "policyNumber",
        "policyClaimNumber"
      )
      .then(res => {
        this.setState({ loading: false });
        console.log(res);
      });
  }

  handleGetClick(e) {
    this.setState({ loading: true });
    this.claimDiCoin.getAccidentHistory("carRegis").then(res => {
      this.setState({ loading: false });
      let eventValues = res.events.GetAccidentHistory.returnValues;
      console.log("eventValues[0]", eventValues[0]);
      console.log("eventValues[1]", eventValues[1]);
      if (eventValues[1].length > 0) {
        var promises = [];
        for (let i = 0; i < eventValues[1].length; i++) {
          promises.push(
            this.claimDiCoin.getAccidentHistoryById(eventValues[1][i])
          );
        }
        Promise.all(promises).then(values => {
          console.log("values", values);
        });
      }
    });
  }

  async handleGetbBalanceOfClick(e) {
    let account = await this.claimDiCoin.getAccount().then(res => res);
    this.claimDiCoin
      .balanceOf(account)
      .then(res => console.log("balanceOf", res));
  }

  async handleBuyClaimDiTokenClick(e) {
    let amount = 10;
    let account = await this.claimDiCoin.getAccount().then(res => res);
    this.claimDiCoin
      .buyToken(amount, account)
      .then(res => console.log("buyToken", res));
  }

  async initState() {
    const { drizzle } = this.props;
    this.claimDiCoin = ClaimDiCoin(drizzle.contracts.ClaimDiCoin);
    this.account = await this.claimDiCoin.getAccount();
    console.log("acc", this.account);
    // let account = await this.claimDiCoin.getAccount().then(res => res);
    // this.claimDiCoin
    //   .getBalanceInEth(account)
    //   .then(res => console.log("getBalanceInEth", res));
  }

  componentDidMount() {
    const { drizzle } = this.props;

    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
        this.initState();
        drizzle.web3.currentProvider.publicConfigStore.on(
          "update",
          async () => {
            this.initState();

            let checkAccount = this.account;

            let account = await this.claimDiCoin.getAccount().then(res => res);
            if (checkAccount !== account) {
              this.initState();
            }
          }
        );
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div
          className="AppLoading"
          style={{ display: this.state.loading ? "block" : "none" }}
        >
          <div className="AppLoadingIcon">
            <BallScaleRippleMultiple
              color={"yellow"}
              loading={this.state.loading}
            />
          </div>
        </div>
        <div className="AppBody">
          <div className="box" style={{flex: 3, backgroundColor:'#85C1E9'}}>AAAA</div>
          <div className="box" style={{flex: 9}}>BBBB</div>
          <div className="boxOver" >CCC</div>
        </div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          ></a>

          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={this.handleBuyClick}
          >
            Add
          </button>
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={this.handleGetClick}
          >
            Get
          </button>
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={this.handleGetbBalanceOfClick}
          >
            GetBalanceOf
          </button>

          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={this.handleBuyClaimDiTokenClick}
          >
            BuyToken
          </button>
        </header> */}
      </div>
    );
  }
}

export default App;
