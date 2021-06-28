import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../../../appRedux/actions/Auth";
import { connect } from "react-redux";

//xl={12} lg={24} md={12} sm={24} xs={24}
import { Avatar, Tabs, Card, Col, Icon, Row, Popconfirm, message } from "antd";
const ProfileItem = ({ followUser, unfollowUser, company }) => {
  const {
    user: { _id, name, avatar },
    company_name,
    company_status
  } = company;
  const { Meta } = Card;
  function confirm(e) {
    console.log(_id);
    followUser(_id);

    message.success("you just followed  ");
  }
  console.log(_id);
  function cancel(e) {
    console.log(e);
    message.error("you refused to follow   ");
  }
  return (
    <Col style={{ width: "auto" }} xl={8} lg={12} md={12} sm={24} xs={24}>
      <Card
        actions={[
          <Popconfirm
            title="you are about to follow the selected user hit no to cancel"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Icon type="user-add" key="edit" />
          </Popconfirm>,
          <Icon type="ellipsis" key="ellipsis" />
        ]}
      >
        <Meta
          avatar={
            <Link
              to={`/company/${_id}`}
              to={{
                pathname: `/company/${_id}`,
                ownProps: { company: company }
              }}
              className="gx-link"
            >
              <Avatar src={avatar} />
            </Link>
          }
          title={<p>{company_name}</p>}
          description={
            <p>
              {company_status}
            </p>
          }
        />
      </Card>
    </Col>
  );
};

ProfileItem.propTypes = {};
const mapStateToProps = state => ({
  //userfollowers: state.auth.user.followers
});
export default connect(mapStateToProps, { followUser, unfollowUser })(
  ProfileItem
);
