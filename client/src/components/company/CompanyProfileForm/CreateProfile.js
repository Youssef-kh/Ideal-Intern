import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  hideMessage,
  showAuthLoader,
  createCompany,
  getCurrentcompany
  
} from "../../../appRedux/actions/company";

import CircularProgress from "components/CircularProgress/index";
import {
  Button,
  DatePicker,
  Space,
  Card,
  Form,
  Icon,
  notification,
  Row,
  Col,
  InputNumber,
  Radio,
  Rate,
  Select,
  Input,
  Slider,
  Switch,
  Upload,
  AutoComplete,
  message
} from "antd";

import "./otherFormControls.less";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const AutoCompleteOption = AutoComplete.Option;
class CreateCompany extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    expand: false
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };
  myFunction = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };
  openNotificationWithIcon = type => {
    notification[type]({
      message: "Company Profile Created Successfully",
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("------------------------------------------------- ");

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.showAuthLoader();
        this.props.createCompany(values, false);
      }
    });
  };
  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }

    if (this.props.company !== null) {
      this.openNotificationWithIcon("success");
      this.props.history.push("/social-apps/company-profile");
    }
  }
  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { showMessage, loader, alertMessage } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const openNotificationWithIcon = type => {
      notification[type]({
        message: "Notification Title",
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification."
      });
    };
    const formItemLayout = {
      labelCol: { xs: 24, sm: 6 },
      wrapperCol: { xs: 24, sm: 14 }
    };
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    function onChange(date, dateString) {
      console.log(date, dateString);
    }
    return (
      <Card className="gx-card" title="Create Your Profile As A Company">
        <div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Company Name" hasFeedback>
              {getFieldDecorator("company_name", {
                rules: [
                  {
                    required: false,
                    message: "Please input the company name"
                  }
                ]
              })(<Input placeholder="Please enter the company name here" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Company Status" hasFeedback>
              {getFieldDecorator("company_status", {
                rules: [{ required: false, message: "Please input the company's status!" }]
              })(
                <Input placeholder="Please enter the company's status here" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Date of creation"  hasFeedback>
              {getFieldDecorator("date_of_creation", {
                rules: [{ required: false, message: "Please input the company creation's date!" }]
              })(<DatePicker onChange={onChange} />
                
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Location" hasFeedback>
              {getFieldDecorator("location", {
                rules: [{ required: false, message: "Please input Location!" }]
              })(
                <Select placeholder="Please select your location">
                    <Option value="Ariana">Ariana</Option>
                    <Option value="Beja">Beja</Option>
                    <Option value="Ben Arous">Ben Arous</Option>
                    <Option value="Gafsa">Gafsa</Option>
                    <Option value="Gabes">Gabes</Option>
                    <Option value="Jendouba">Jendouba</Option>
                    <Option value="Kairaouen">Kairaouen</Option>
                    <Option value="Kasserine">Kasserine</Option>
                    <Option value="Kebili">kebili</Option>
                    <Option value="Nabeul">Nabeul</Option>
                    <Option value="Manouba">Manouba</Option>
                    <Option value="Kef">Kef</Option>
                    <Option value="Mahdia">Mahdia</Option>
                    <Option value="Tataouin">Tataouin</Option>
                    <Option value="Medenin">Medenin</Option>
                    <Option value="Monastir">Monastir</Option>
                    <Option value="Bizerte">Bizert</Option>
                    <Option value="Sfax">Sfax</Option>
                    <Option value="Sidi Bouzid">Sidi Bouzid</Option>
                    <Option value="Siliana">Siliana</Option>
                    <Option value="Soussa">Soussa</Option>
                    <Option value="Touzeur">Tozeur</Option>
                    <Option value="Tunis">Tunis</Option>
                    <Option value="Zaghouen">Zaghouen</Option>
                  </Select> 
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Activity" hasFeedback>
              {getFieldDecorator("activity", {
                rules: [
                  {
                    required: false,
                    message:
                      "Please enter the company's main activity"
                  }
                ]
              })(
                <Input placeholder="Please enter the company's main activity" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="website adress" hasFeedback>
              {getFieldDecorator("website_adress", {
                rules: [
                  { required: false, message: "Please input the company's website !" }
                ]
              })(
                <Input
                  placeholder="www.companywebsite.com"
                />
              )}
            </FormItem>
            
            <Row>
              <Col span={20} className="gx-text-right">
                <Button
                  type="dashed"
                  className="gx-link gx-btn-link gx-ml-2"
                  onClick={this.myFunction}
                >
                  Add Social Network Links{" "}
                  <Icon type={this.state.expand ? "up" : "down"} />
                </Button>
              </Col>
            </Row>
            <div id="myDIV" style={{ display: "none" }}>
              <FormItem {...formItemLayout} label="Twitter" hasFeedback>
                {getFieldDecorator("twitter", {
                  rules: [{ required: false }]
                })(
                  <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                  >
                    <Input placeholder="Twitter URL" />
                  </AutoComplete>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Instagram" hasFeedback>
                {getFieldDecorator("instagram", {
                  rules: [{ required: false }]
                })(
                  <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                  >
                    <Input placeholder="Instagram URL" />
                  </AutoComplete>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Facebook" hasFeedback>
                {getFieldDecorator("facebook", {
                  rules: [{ required: false }]
                })(
                  <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                  >
                    <Input placeholder="Facebook URL" />
                  </AutoComplete>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="LinkedIn" hasFeedback>
                {getFieldDecorator("linkedin", {
                  rules: [{ required: false }]
                })(
                  <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                  >
                    <Input placeholder="LinkedIn URL" />
                  </AutoComplete>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Youtube" hasFeedback>
                {getFieldDecorator("youtube", {
                  rules: [{ required: false }]
                })(
                  <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                  >
                    <Input placeholder="Youtube URL" />
                  </AutoComplete>
                )}
              </FormItem>
            </div>
            <FormItem wrapperCol={{ xs: 24, sm: { span: 14, offset: 6 } }} >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Form>
          {loader ? (
            <div className="gx-loader-view">
              <CircularProgress />
            </div>
          ) : null}
          {showMessage ? message.error(alertMessage.toString()) : null}
        </div>
      </Card>
    );
  }
}

const WrappedcreateCompany = Form.create()(CreateCompany);
const mapStateToProps = state => {
  const { company, loader, alertMessage, showMessage } = state.company;
  const { authUser } = state.auth;
  return { authUser, company, loader, alertMessage, showMessage };
};

export default connect(mapStateToProps, {
  createCompany,
  showAuthLoader,
  hideMessage
})(WrappedcreateCompany);