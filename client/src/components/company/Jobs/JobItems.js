import React, { useEffect, useState } from "react";
import { Button, Tag, Icon, Popconfirm, message } from "antd";
import CircularProgress from "components/CircularProgress/index";
import moment from "moment";
import { connect } from "react-redux";
import { deleteJob } from "../../../appRedux/actions/company";
import { Link } from "react-router-dom";
import axios from "axios";
function JobItems({ deleteJob, data }) {
  const {
    _id,
    title,
    job_type,
    start_date,
    employees_needed,
    description,
    to,
    location,
    trainee,
    appliedTrainees
  } = data;
  const [appliedTraineesNames, setAppliedTraineesNames] = useState([]);
  const [loading, setLoading] = useState(true);

  function confirm(e) {
    console.log(_id);
    deleteJob(_id);

    message.success("Job deleted");
  }
  async function getTraineeById(id) {
    const trainee = await axios.get("/api/trainee/user/" + id);
    setAppliedTraineesNames(appliedTraineesNames.push(trainee.data.firstName));
  }

  function cancel(e) {
    console.log(e);
    message.error("Job not deleted");
  }
  useEffect(() => {
    if (appliedTrainees) {
      appliedTrainees.forEach(trainee => {
        getTraineeById(trainee);
      });
    }
  }, []);
  useEffect(() => {
    setLoading(false);
  }, [appliedTraineesNames]);
  return (
    <div className="gx-media gx-featured-item">
      <div className="gx-featured-thumb">
        {/* {<img className="gx-rounded-lg" src={} alt="..." />} */}
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
            </div>
            <div>
              <span className="gx-media-body gx-ml-1">{location}</span>
            </div>
          </div>
          <div>
            Applied Trainees :
            <span className="gx-mb-2">
              {appliedTrainees ? appliedTrainees.length : null}
            </span>
          </div>
          <div>{!loading ? appliedTraineesNames[0] : <div>Loading..</div>}</div>
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
              <Link to={"/edit-company-job/?jobId=" + _id}>
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
