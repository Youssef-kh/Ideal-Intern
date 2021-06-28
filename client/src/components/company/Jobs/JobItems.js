import React from "react";
import { Button, Tag, Icon, Popconfirm, message } from "antd";
import CircularProgress from "components/CircularProgress/index";
import moment from "moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../../appRedux/actions/company";
import { Link } from "react-router-dom";

function JobItems({ deleteJob, data }) {
  const {
    _id,
    title,
    job_type,
    posted_date,
    start_date,
    employees_needed,
    description,
    company_id,
    to,
    title,
    location
  } = data;
  function confirm(e) {
    console.log(_id);
    deleteJob(_id);

    message.success("Job deleted");
  }

  function cancel(e) {
    console.log(e);
    message.error("Job not deleted");
  }
  return (
    <div className="gx-media gx-featured-item">
      <div className="gx-featured-thumb">
        <img className="gx-rounded-lg" src={title} alt="..." />
      </div>
      <div className="gx-media-body gx-featured-content">
        <div className="gx-featured-content-left">
          <Tag className="gx-rounded-xs gx-text-uppercase" color="#06BB8A">
            {job_type}
          </Tag>
          <h3 className="gx-mb-2">{employees_needed}</h3>
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
        <div className="gx-featured-content-right gx-profile-content-right">
          <h2 className="gx-text-primary gx-mb-1">
            <Button>
            <Link to="/edit-company-job" >
              <Icon
                className="gx-text-primary gx-text-truncate gx-mt-sm-auto gx-mb-0 gx-pointer"
                type="edit"
                theme="twoTone"
              />
              </Link>
            </Button>
          </h2>
          <h2 className="gx-text-primary gx-mb-1">
            <Popconfirm
              title="Are you sure delete this?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                <Icon
                  className="gx-text-primary gx-text-truncate gx-mt-sm-auto gx-mb-0 gx-pointer"
                  type="delete"
                  theme="twoTone"
                />
              </Button>
            </Popconfirm>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { deleteJob })(JobItems);