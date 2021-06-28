import React from "react";
import { connect } from "react-redux";
import { Col, Row, Tabs } from "antd";
import Widget from "components/Widget";
import { aboutList } from "../../../routes/socialApps/Company/data";
import AboutItem from "./AboutItem";

const TabPane = Tabs.TabPane;

const About = ({
  company /*auth: { authUser }, company: { company, loader } */
}) => {



  return (
    <Widget
      title="About"
      styleName="gx-card-tabs gx-card-tabs-right gx-card-profile"
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Overview" key="1">
          <div className="gx-mb-2">
            <h2>company.company_name</h2>
            <Row>
              <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                  <div className="gx-mr-3">
                    <i
                      className={`icon icon-company gx-fs-xlxl gx-text-blue`}
                    />
                  </div>
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                
              </Col>
              <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                  <div className="gx-mr-3">
                    <i className={`icon icon-home gx-fs-xlxl gx-text-blue`} />
                  </div>
                  <div className="gx-media-body">
                    <h6 className="gx-mb-1 gx-text-grey">Location</h6>
                    <p className="gx-mb-0">company.location</p>
                  </div>
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                  <div className="gx-mr-3">
                    <i className={`fas fa-code gx-fs-xlxl gx-text-blue`} />
                  </div>
                  <div className="gx-media-body">
                    <h6 className="gx-mb-1 gx-text-grey">activity</h6>
                    <p className="gx-mb-0">company.company_activity.join(",")</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </TabPane>
      </Tabs>
    </Widget>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company
});

export default connect(null, {})(About);
