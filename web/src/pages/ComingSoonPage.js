import React from "react";

class ComingSoonPage extends React.Component {
  state = {};
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="boxContainerMenu">
        <div
          className="box"
          style={{ height: "100%", textAlign: "left", borderRadius: "10px" }}
        >
          <div className="box-header with-border">
            <h3 className="box-title col-md-12 no-padding">Coming Soon</h3>
          </div>
          <div
            className="box-body"
            style={{ borderBottom: "1px solid #f4f4f4" }}
          ></div>
        </div>
      </div>
    );
  }
}
export default ComingSoonPage;
