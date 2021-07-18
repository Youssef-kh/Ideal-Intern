import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Widget from "components/Widget/index";
import JobItems from "./JobItems";

const Job = ({ auth: { authUser }, company: { company, loader } }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(company.job);
  }, [data]);

  //const data = company.job;
  console.log("data company ", data);

  return (
    <Widget styleName="gx-card-profile">
      <div className="ant-card-head">
        <span className="ant-card-head-title gx-mb-1">Job</span>
        <p className="gx-text-grey gx-fs-sm gx-mb-0"></p>
      </div>
      {data != undefined ? (
        <div className="gx-pt-md-3">
          {data.map((data, index) => (
            <JobItems key={index} data={data} />
          ))}
        </div>
      ) : (
        <div>loading</div>
      )}
    </Widget>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company
});

export default connect(mapStateToProps, {})(Job);
