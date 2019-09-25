import React from "react";

const CarAccidentItem = item => {
  console.log("item", item.carRegis);
  return (
    <div
      style={{
        backgroundColor: "#85C1E9",
        padding: "5px",
        margin: "10px",
        borderRadius: "5px",
        border: "solid 1px #d5dbdb"
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 4 }}>
          <div
            style={{
              textAlign: "center",
              backgroundColor: "white",
              padding: "5px",
              margin: "5px",
              borderRadius: "5px",
              border: "dashed 1px #d5dbdb"
            }}
          >
            {item.carRegis}
          </div>
        </div>
        <div style={{ flex: 8 }}>
          <div>
            <label style={{ width: "40%" }}>เลขตัวถัง</label>:{"  "}
            {item.carChassic}
          </div>
          <div>
            <label style={{ width: "40%" }}>วันที่เกิดเหตุ</label>:{"  "}
            {item.accidentDate}
          </div>
        </div>
      </div>
      <div style={{ paddingLeft: "10px" }}>
        <label>ลักษณะการเกิดเหตุ</label> : {item.accidentDetail}
      </div>
    </div>
  );
};

class SearchCarCrashPage extends React.Component {
  state = {
    searchValue: "",
    accidentDetail: []
    // accidentDetail: [
    //   {
    //     id: 1,
    //     carRegis: "carRegis",
    //     carChassic: "carRegis",
    //     accidentDetail: "carRegis",
    //     accidentDate: "carRegis",
    //     accidentPlace: "carRegis",
    //     policyNumber: "carRegis",
    //     policyClaimNumer: "carRegis"
    //   }
    // ]
  };

  constructor(props) {
    super(props);
    this.handleSearchValue = this.handleSearchValue.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    console.log("SearchCarCrashPage", props);
  }

  handleSearchValue = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  handleSearchClick = async event => {
    let searchValue = this.state.searchValue;
    let response = await this.props.handleGetAccidentHistory(searchValue);

    let accidentDetail = response.map(item => {
      return {
        id: item[0],
        carRegis: item[1],
        carChassic: item[2],
        accidentDetail: item[3],
        accidentDate: item[4],
        accidentPlace: item[5],
        policyNumber: item[6],
        policyClaimNumer: item[7]
      };
    });

    this.setState({
      accidentDetail: accidentDetail
    });
  };

  render() {
    return (
      <div className="boxContainerMenu">
        <div
          className="box"
          style={{ height: "100%", textAlign: "left", borderRadius: "10px" }}
        >
          <div className="box-header with-border">
            <h3 className="box-title col-md-12 no-padding">Search Car Crash</h3>
          </div>
          <div
            className="box-body"
            style={{ borderBottom: "1px solid #f4f4f4" }}
          >
            <div className="form-group">
              <div className="col-sm-5">
                <label>CarRegis / CarChassic</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.searchValue}
                    onChange={this.handleSearchValue}
                  />
                  <div className="input-group-btn">
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={this.handleSearchClick}
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="box-body" style={{ height: "65%", overflow: "auto" }}>
            {this.state.accidentDetail.map(item => (
              <CarAccidentItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchCarCrashPage;
