import React from "react";

class TaskBikePage extends React.Component {
  state = {
    taskId: "CLM-FRS-1909215151"
  };
  constructor(props) {
    super(props);
    this.handleTaskId = this.handleTaskId.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleTaskId = event => {
    this.setState({
      taskId: event.target.value
    });
  };

  handleSearchClick = async event => {
    this.props.handleLoading(true);
    let taskData = await fetch(
      "https://apibike.claimdi.com/v2/intergration/TaskCarInsurerForChromeExtension/" +
        this.state.taskId
    )
      .then(function(response) {
        return response.json().then(function(data) {
          console.log(data);

          let task = {
            carRegis: data.result.car_insurer.car_insurer_info.car_regis,
            carChassic: data.result.car_insurer.car_insurer_info.car_chassis,
            accidentDetail: data.result.summary_of_case.result_case_name,
            accidentDate:
              data.result.summary_of_case.accident_date_text +
              " " +
              data.result.summary_of_case.accident_time_text,
            accidentPlace: data.result.summary_of_case.schedule_place,
            policyNumber:
              data.result.car_insurer.car_insurer_info.car_policy_no,
            policyClaimNumber: ""
          };
          console.log("task", task);
          return task;
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });

    await this.props.handleAddAccidentHistory(taskData);
  };

  render() {
    return (
      <div className="boxContainerMenu">
        <div
          className="box"
          style={{ height: "100%", textAlign: "left", borderRadius: "10px" }}
        >
          <div className="box-header with-border">
            <h3 className="box-title col-md-12 no-padding">TaskBike</h3>
          </div>
          <div
            className="box-body"
            style={{ borderBottom: "1px solid #f4f4f4" }}
          >
            <div className="form-group">
              <div className="col-sm-5">
                <label>Task Id</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.taskId}
                    onChange={this.handleTaskId}
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
        </div>
      </div>
    );
  }
}
export default TaskBikePage;
