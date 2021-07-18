import React from "react";
import { Button, Tag, Icon, Popconfirm, message } from "antd";
import CircularProgress from "components/CircularProgress/index";
import moment from "moment";
import { connect } from "react-redux";

function JobItem({ data }) {
  const {
    title,
    job_type,
    posted_date,
    start_date,
    employees_needed,
    description,
    to,
    title,
    location
  } = data;

  return (
    <div className="gx-media gx-featured-item">
      <div className="gx-featured-thumb">
        {/* <img className="gx-rounded-lg" src={} alt="..." /> */}
      </div>
      <div className="gx-media-body gx-featured-content">
        <div className="gx-featured-content-left">
          <Tag className="gx-rounded-xs gx-text-uppercase" color="#06BB8A">
            {job_type}
          </Tag>
          <h3 className="gx-mb-2">{title}</h3>
          <div className="ant-row-flex">
            <div className="gx-media gx-text-grey gx-mb-1">
              <i
                className={`icon icon-location gx-fs-lg gx-mr-2 gx-d-inline-flex gx-vertical-align-middle`}
              />
              <span className="gx-media-body gx-ml-1">{location}</span>
            </div>
          </div>
          <div className="ant-row-flex">
            <div className="gx-media gx-text-grey gx-mb-1">
              <i
                className={`icon icon-calendar gx-fs-lg gx-mr-2 gx-d-inline-flex gx-vertical-align-middle`}
              />
              {moment(start_date).format("MMMM Do YYYY")} -
              {
                <span className="gx-media-body gx-ml-1">
                  {moment(to).format("MMMM Do YYYY")}
                </span>
             }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, {})(JobItem);