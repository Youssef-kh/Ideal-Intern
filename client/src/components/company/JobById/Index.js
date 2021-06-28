import React, { Fragment } from "react";
import { connect } from "react-redux";
import Widget from "components/Widget/index";
import JobItems from "./JobItems";

const Job = ({ company }) => {
  const data = company.job;
  console.log(company);

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

export default connect(null, {})(Job);