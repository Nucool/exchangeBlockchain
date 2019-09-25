import React from "react";
import SweetAlert from "sweetalert2-react";
import logo from "./logo.svg";
import "./App.css";
import ClaimDiCoin from "./module/ClaimDiCoin";
import { BallScaleRippleMultiple } from "react-pure-loaders";
import { Switch, BrowserRouter as Router } from "react-router-dom";

import Public from "./pages/Public";
import MainPage from "./pages/MainPage";
import ExchangeTokenPage from "./pages/ExchangeTokenPage";
import SearchCarCrashPage from "./pages/SearchCarCrashPage";
import TaskBikePage from "./pages/TaskBikePage";
import ComingSoonPage from "./pages/ComingSoonPage";

const Routes = props => (
  <Router>
    <div>
      <Switch>
        <Public exact path="/" component={MainPage} {...props} />
        <Public
          exact
          path="/ExchangeToken"
          component={ExchangeTokenPage}
          {...props}
        />
        <Public
          exact
          path="/SearchCarCrash"
          component={SearchCarCrashPage}
          {...props}
        />
        <Public
          exact
          path="/TaskBike"
          component={TaskBikePage}
          {...props}
        />{" "}
        <Public
          exact
          path="/ComingSoon"
          component={ComingSoonPage}
          {...props}
        />
      </Switch>
    </div>
  </Router>
);
class App extends React.Component {
  state = {
    loading: true,
    totalCDT: 0,
    alert: {
      show: false,
      title: "",
      text: ""
    }
  };

  constructor(props) {
    super(props);
    this.handleLoading = this.handleLoading.bind(this);
    this.handleBuyClaimDiToken = this.handleBuyClaimDiToken.bind(this);
    this.handleGetAccidentHistory = this.handleGetAccidentHistory.bind(this);
    this.handleAddAccidentHistory = this.handleAddAccidentHistory.bind(this);
  }

  async initState(drizzleState) {
    const { drizzle } = this.props;
    this.claimDiCoin = ClaimDiCoin(drizzle.contracts.ClaimDiCoin);
    this.account = await this.claimDiCoin.getAccount().then(res => res);
    this.handleTotalCDT();
    this.setState({ loading: false, drizzleState });
  }

  componentDidMount() {
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
        this.initState(drizzleState);

        drizzle.web3.currentProvider.publicConfigStore.on(
          "update",
          async () => {
            let checkAccount = this.account;

            let account = await this.claimDiCoin.getAccount().then(res => res);
            if (checkAccount !== account) {
              this.initState(drizzleState);
            }
          }
        );
      }
    });
  }
  compomentWillUnmount() {
    this.unsubscribe();
    this.handleLoading(false);
  }

  handleLoading(isLoading) {
    this.setState({ loading: isLoading });
  }

  async handleTotalCDT() {
    console.log("handle");
    let totalCDT = await this.claimDiCoin.balanceOf(this.account);
    this.setState({
      totalCDT: totalCDT
    });
  }

  async handleBuyClaimDiToken(totalExchange) {
    let amount = totalExchange;
    let account = await this.claimDiCoin.getAccount().then(res => res);
    this.handleLoading(true);
    let response = await this.claimDiCoin.buyToken(amount, account);
    console.log("handleBuyClaimDiToken", response);

    setTimeout(() => {
      this.setState({
        loading: false,
        alert: {
          show: true,
          title: "Exchange",
          text: "Exchange token success"
        }
      });
    }, 700);

    return true;
  }

  async handleGetAccidentHistory(searchValue) {
    this.handleLoading(true);
    let response = await this.claimDiCoin.getAccidentHistory(searchValue);

    let result = response.events.GetAccidentHistory.returnValues[0];
    let accidentHistory = response.events.GetAccidentHistory.returnValues[1];

    let accident = [];
    if (accidentHistory.length > 0) {
      let promises = [];
      for (let i = 0; i < accidentHistory.length; i++) {
        promises.push(
          this.claimDiCoin.getAccidentHistoryById(accidentHistory[i])
        );
      }
      accident = await Promise.all(promises);
    }
    this.handleLoading(false);
    return accident;
  }

  async handleAddAccidentHistory(task) {
    console.log("handleAddAccidentHistory task", task);
    this.claimDiCoin
      .addAccidentHistory(
        task.carRegis,
        task.carChassic,
        task.accidentDetail,
        task.accidentDate,
        task.accidentPlace,
        task.policyNumber,
        task.policyClaimNumber
      )
      .then(res => {
        this.handleLoading(false);
        console.log(res);
      });
  }

  render() {
    return (
      <div>
        <SweetAlert
          show={this.state.alert.show}
          title={this.state.alert.title}
          text={this.state.alert.text}
          onConfirm={() =>
            this.setState({
              alert: {
                show: false
              }
            })
          }
        />
        <Routes
          {...this.state}
          {...this.props}
          handleLoading={this.handleLoading}
          handleTotalCDT={this.handleTotalCDT}
          handleBuyClaimDiToken={this.handleBuyClaimDiToken}
          handleGetAccidentHistory={this.handleGetAccidentHistory}
          handleAddAccidentHistory={this.handleAddAccidentHistory}
        />
      </div>
    );
  }
}
// class App extends React.Component {
//   state = {
//     loading: true
//   };

//   constructor(props) {
//     super(props);
//     this.handleBuyClick = this.handleBuyClick.bind(this);
//     this.handleGetClick = this.handleGetClick.bind(this);
//     this.handleGetbBalanceOfClick = this.handleGetbBalanceOfClick.bind(this);
//     this.handleBuyClaimDiTokenClick = this.handleBuyClaimDiTokenClick.bind(
//       this
//     );
//   }

//   handleBuyClick(e) {
//     this.setState({ loading: true });
//     this.claimDiCoin
//       .addAccidentHistory(
//         "carRegis",
//         "carChassic",
//         "accidentDetail",
//         "accidentDate",
//         "accidentPlace",
//         "policyNumber",
//         "policyClaimNumber"
//       )
//       .then(res => {
//         this.setState({ loading: false });
//         console.log(res);
//       });
//   }

//   handleGetClick(e) {
//     this.setState({ loading: true });
//     this.claimDiCoin.getAccidentHistory("carRegis").then(res => {
//       this.setState({ loading: false });
//       let eventValues = res.events.GetAccidentHistory.returnValues;
//       console.log("eventValues[0]", eventValues[0]);
//       console.log("eventValues[1]", eventValues[1]);
//       if (eventValues[1].length > 0) {
//         var promises = [];
//         for (let i = 0; i < eventValues[1].length; i++) {
//           promises.push(
//             this.claimDiCoin.getAccidentHistoryById(eventValues[1][i])
//           );
//         }
//         Promise.all(promises).then(values => {
//           console.log("values", values);
//         });
//       }
//     });
//   }

//   async handleGetbBalanceOfClick(e) {
//     let account = await this.claimDiCoin.getAccount().then(res => res);
//     this.claimDiCoin
//       .balanceOf(account)
//       .then(res => console.log("balanceOf", res));
//   }

//   async handleBuyClaimDiTokenClick(e) {
//     let amount = 10;
//     let account = await this.claimDiCoin.getAccount().then(res => res);
//     this.claimDiCoin
//       .buyToken(amount, account)
//       .then(res => console.log("buyToken", res));
//   }

//   async initState() {
//     const { drizzle } = this.props;
//     this.claimDiCoin = ClaimDiCoin(drizzle.contracts.ClaimDiCoin);
//     this.account = await this.claimDiCoin.getAccount();
//     console.log("acc", this.account);
//     // let account = await this.claimDiCoin.getAccount().then(res => res);
//     // this.claimDiCoin
//     //   .getBalanceInEth(account)
//     //   .then(res => console.log("getBalanceInEth", res));
//   }

//   componentDidMount() {
//     const { drizzle } = this.props;

//     this.unsubscribe = drizzle.store.subscribe(() => {
//       const drizzleState = drizzle.store.getState();

//       if (drizzleState.drizzleStatus.initialized) {
//         this.setState({ loading: false, drizzleState });
//         this.initState();
//         drizzle.web3.currentProvider.publicConfigStore.on(
//           "update",
//           async () => {
//             this.initState();

//             let checkAccount = this.account;

//             let account = await this.claimDiCoin.getAccount().then(res => res);
//             if (checkAccount !== account) {
//               this.initState();
//             }
//           }
//         );
//       }
//     });
//   }

//   render() {
//     return (
//       <div className="App">
//         <div
//           className="AppLoading"
//           style={{ display: this.state.loading ? "block" : "none" }}
//         >
//           <div className="AppLoadingIcon">
//             <BallScaleRippleMultiple
//               color={"yellow"}
//               loading={this.state.loading}
//             />
//           </div>
//         </div>
//         <div className="AppBody">
//           <div className="box" style={{ flex: 2, backgroundColor: "#85C1E9" }}>
//             AAAA
//           </div>
//           <div className="box" style={{ flex: 10 }}></div>
//           <div className="boxOver">
//             <div
//               style={{
//                 flex: 8,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 display: "flex",
//                 flexDirection: "row"
//               }}
//             >
//               <div style={{ flex: 4 }}>
//                 <img src="/images/coin.png" width="70" />
//               </div>
//               <div style={{ flex: 8 }}></div>
//             </div>
//             <div style={{ flex: 4 }}></div>
//           </div>
//           <div className="boxContainerMenu">
//             <div className="menu">
//               <img src="/images/buyToken.png" />
//             </div>
//             <div className="menu">
//               <img src="/images/carCrash.png" width={80} />
//             </div>
//             <div className="menu">
//               <img src="/images/bidding.png" style={{marginTop:10}} width={70} /></div>
//             <div className="menu">
//               <img src="/images/garage.png" style={{marginTop:10}} width={80} />
//               </div>
//           </div>
//         </div>
//         {/* <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           ></a>

//           <button
//             type="button"
//             className="btn btn-block btn-primary"
//             onClick={this.handleBuyClick}
//           >
//             Add
//           </button>
//           <button
//             type="button"
//             className="btn btn-block btn-primary"
//             onClick={this.handleGetClick}
//           >
//             Get
//           </button>
//           <button
//             type="button"
//             className="btn btn-block btn-primary"
//             onClick={this.handleGetbBalanceOfClick}
//           >
//             GetBalanceOf
//           </button>

//           <button
//             type="button"
//             className="btn btn-block btn-primary"
//             onClick={this.handleBuyClaimDiTokenClick}
//           >
//             BuyToken
//           </button>
//         </header> */}
//       </div>
//     );
//   }
// }

export default App;
