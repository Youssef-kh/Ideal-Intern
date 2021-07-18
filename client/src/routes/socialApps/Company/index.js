import React, { Component, Fragment, useEffect } from "react";
import { Col, Row } from "antd";
import Event from "../../../components/company/Events/index";
import About from "../../../components/company/About/index";
import CompanyGithub from "../../../components/company/ProfileGithub/index";
import Contact from "../../../components/company/contact/index";
import { Avatar, Button } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentcompany } from "../../../appRedux/actions/company";
import Job from "../../../components/company/Jobs/Index";
import { friendList } from "./data";
import { photoList } from "../Wall/data";
import Friends from "../../../components/company/Friends/index";
import Photos from "../../../components/company/photos/index";
import Auxiliary from "../../../util/Auxiliary";
import ProfileHeader from "../../../components/company/ProfileHeader/index";

import Spinner from "../../../components/Spinner";

const Company = ({
  getCurrentCompany,
  auth: { authUser, user },
  company: { company, loader }
}) => {
  useEffect(() => {
    getCurrentcompany();
  }, []);
  return (
    <Fragment>
      {company !== null ? (
        <Auxiliary>
          <ProfileHeader />
          <div className="gx-profile-content">
            <Row>
              <Col xl={16} lg={14} md={14} sm={24} xs={24}>
                <About Company={Company} />
                <Job />
                
              </Col>

              <Col xl={8} lg={10} md={10} sm={24} xs={24}>
                {Company.githubusername && (
                  <CompanyGithub username={Company.githubusername} />
                )}
                <Row>
                  <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                    <Friends friendList={friendList} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Auxiliary>
      ) : (
        <Fragment>
          <p>you have not yet setup a Profile , please add some info</p>
          
          <Button type="dashed">
            <Link to="/create-company-profile" className="gx-link">
              Create Profile
            </Link>
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company
});
export default connect(mapStateToProps, { getCurrentcompany })(Company);
