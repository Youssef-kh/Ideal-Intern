import React, { Component, useEffect,useState } from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../appRedux/actions/profile";

const UserInfo = ({
  getCurrentProfile,
  userSignOut,
  auth: { authUser },
  profile: { profile, loader },

}) => {
    const [typeOfUser , setTypeOfUser] = useState()
  useEffect(() => {
    getCurrentProfile();
    setTypeOfUser(localStorage.getItem('typeOfUser'))
    
  }, []);
  

  return (
    <Popover
      overlayClassName="gx-popover-horizantal"
      placement="bottomRight"
      content={
        <ul className="gx-user-popover">
          {typeOfUser === 'yakra' ?(
            <Link to="/social-apps/trainee-profile">
            <li>My trainee profile</li>
          </Link>
          ):(
          <Link to="/social-apps/company-profile">
          <li>My company profile</li>
         </Link>
       )}
          <Link to="/profile/profiles" className="gx-link">
            <li>Connections</li>
          </Link>

          <li onClick={() => userSignOut()}>Logout</li>
        </ul>
      }
      trigger="click"
    >
      <Avatar src={authUser.avatar} className="gx-avatar gx-pointer" alt="" />
    </Popover>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  company: state.company
});
export default connect(mapStateToProps, { getCurrentProfile, userSignOut })(
  UserInfo
);
