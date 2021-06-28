import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Tabs, Card, Col, Icon, Row } from "antd";
import ProfileItem from "./ProfileItem";
import Followings from "./followings";
import Followers from "./followers";
import { connect } from "react-redux";
import CircularProgress from "../../../components/CircularProgress/index";
import { getProfiles } from "../../../appRedux/actions/company";
import { getProfileById } from "../../../appRedux/actions/company";
import followings from "./followings";
const Profiles = ({
  userfollowings,
  getFollowings,
  getFollowers,
  user,
  listfollowings,
  listfollowers,
  getProfiles,
  company: { profiles, loader }
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getProfiles();

    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  const { TabPane } = Tabs;
  const newList = profiles.filter(company => company.user._id !== user._id);
  console.log(listfollowings);
  if (user && user.following !== undefined) {
    const array = user.following;
    const promises = array.map(n =>
      fetch(`https://networkymern.herokuapp.com/api/profile/user/${n}`)
        .then(response => response.json())
        .then(user => {
          followings.push(user);
          // console.log(following);
        })
    );
  }
  return (
    <Card className="gx-card" title="Friends">
      <Tabs className="gx-main-content" defaultActiveKey="1">
        <TabPane tab={<span>All users</span>} key="1">
          <Row style={{ justifyContent: "center" }}>
            {isLoaded && newList.length > 0 ? (
              <Row>
                {newList.map(company => (
                  <ProfileItem key={company._id} company={company} />
                ))}
              </Row>
            ) : (
              <div className="gx-loader-view">
                <CircularProgress />
              </div>
            )}
          </Row>
        </TabPane>
        <TabPane tab={<span>Following</span>} key="2">
          <Row>
            {isLoaded && listfollowings.length > 0 ? (
              <Row>
                {listfollowings.map(company => (
                  <Followings key={company[0]._id} company={company[0]} />
                ))}
              </Row>
            ) : (
              <div className="gx-loader-view">
                <CircularProgress />
              </div>
            )}
          </Row>
        </TabPane>
        <TabPane tab={<span>Followers</span>} key="3">
          <Row>
            {isLoaded && listfollowers.length > 0 ? (
              <Row>
                {listfollowers.map(company => (
                  <Followers key={company[0]._id} company={company[0]} />
                ))}
              </Row>
            ) : (
              <div className="gx-loader-view">
                <CircularProgress />
              </div>
            )}
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  );
};

Profiles.propTypes = {};
const mapStateToProps = state => ({
  company: state.company,
  user: state.auth.user,
  listfollowings: state.company.followings,
  listfollowers: state.company.followers
});

export default connect(mapStateToProps, {
  getProfileById,
  getProfiles
})(Profiles);
