import React from "react";
import { connect } from "react-redux";
import Widget from "components/Widget/index";
import JobItems from "./JobItems";

const Job = ({ auth: { authUser }, company: { company, loader } }) => {
  const data = company.job;

  return (
    <Widget styleName="gx-card-profile">
      <div className="ant-card-head">
        <span className="ant-card-head-title gx-mb-1">Job</span>
        <p className="gx-text-grey gx-fs-sm gx-mb-0"></p>
      </div>
      <div className="gx-pt-md-3">
        {data.map((data, index) => (
          <JobItems key={index} data={data} />
        ))}
      </div>
    </Widget>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company
});

export default connect(mapStateToProps, {})(Education);