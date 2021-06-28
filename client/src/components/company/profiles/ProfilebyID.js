import React, { Component, Fragment, useEffect } from "react";
import { Col, Row } from "antd";
import Event from "../Events/index";
import About from "../About/index";
import ProfileGithub from "../ProfileGithub/index";

import Contact from "../contact/index";
import { Avatar, Button } from "antd";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getProfileById } from "../../../appRedux/actions/company";

import { friendList } from "../../../routes/socialApps/Company/data";
import { photoList } from "../../../routes/socialApps/Wall/data";
import Friends from "../Friends/index";
import Photos from "../photos/index";
import Auxiliary from "../../../util/Auxiliary";
import ProfilebyIDheader from "../ProfileIDHeader/index";

import Spinner from "../../Spinner";

const ProfilebyID = (
  //getProfileById,
  props
  //auth: { authUser, user },
  // profile: { company, loader },
  // match
) => {
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);

    return () => {
      window.removeEventListener("beforeunload", alertUser);
      //history.push("/company/profiles");
    };
  }, []);
  const alertUser = e => {
    e.preventDefault();
    e.returnValue = "";
  };
  localStorage.setItem("profilebyID", JSON.stringify(props.location.ownProps));

  let profilebyID = localStorage.getItem("profilebyID");
  profilebyID = JSON.parse(profilebyID);
  const { user } = profilebyID.profile;
  const { company } = profilebyID;
  console.log(profilebyID);
  return (
    <Fragment>
      {company !== null ? (
        <Auxiliary>
          <ProfilebyIDheader company={company} />
          <div className="gx-profile-content">
            <Row>
              <Col xl={16} lg={14} md={14} sm={24} xs={24}>
                <About company={company} />

              </Col>

              <Col xl={8} lg={10} md={10} sm={24} xs={24}>
               
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
          <p>you have not yet setup a profile , please add some info</p>
          <Button type="dashed">
            <Link to="/create-company-profile" className="gx-link">
              Create Profile As A Company
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
export default connect(null, { getProfileById })(ProfilebyID);
