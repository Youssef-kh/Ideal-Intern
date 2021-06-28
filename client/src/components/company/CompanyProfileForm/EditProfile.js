import React, { Component, Fragment } from "react";
import CircularProgress from "components/CircularProgress/index";
import { connect } from "react-redux";
import {
  createCompany,
  getCurrentcompany
} from "../../../appRedux/actions/company";
import { showAuthLoader } from "../../../appRedux/actions/Auth";
import {
  Button,
  Card,
  Form,
  Row,
  Col,
  notification,
  Select,
  Input,
  Icon,
  AutoComplete,
  message,
  DatePicker
} from "antd";

import "./otherFormControls.less";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
class Editcompany extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    expand: false,
    isLoading: true
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
      message: "company Updated Successfully",
      description: "Hello  " + this.props.authUser.user.name
    });
  };
  handleOnChange = e => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.showAuthLoader();
        this.props.createCompany(values, true);
        this.openNotificationWithIcon("success");
        if (this.props.company !== null) {
          this.props.history.push("/social-apps/company-profile");
        }
      }
    });
  };
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
  componentDidMount() {
    getCurrentcompany();
    const { showMessage, loader, alertMessage } = this.props;
    const { company } = this.props;
    //console.log(this.props.company.company);

    if (this.state.isLoading) {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { company } = this.props;
    const { showMessage, loader, alertMessage } = this.props;

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
      <Card className="gx-card" title="Edit Your company">
        {this.state.isLoading ? (
          <div className="gx-loader-view">
            <CircularProgress />
          </div>
        ) : (
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
            <FormItem {...formItemLayout} label="Company Status">
              {getFieldDecorator("company_status", {
                rules: [{ required: false, message: "Please input the company's status!" }]
              })(
                <Input placeholder="Please enter the company's status here" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Date of creation">
              {getFieldDecorator("dateOfBirth", {
                rules: [{ required: false, message: "Please input the company creation's date!" }]
              })(<DatePicker onChange={onChange} />
                
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Location">
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
            <FormItem {...formItemLayout} label="Activity">
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
            <FormItem {...formItemLayout} label="website adress">
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
                    Update Social Network Links{" "}
                    <Icon type={this.state.expand ? "up" : "down"} />
                  </Button>
                </Col>
              </Row>
              <div id="myDIV" style={{ display: "none" }}>
                {company.social !== undefined ? (
                  <Fragment>
                    <FormItem {...formItemLayout} label="Twitter">
                      {getFieldDecorator("twitter", {
                        initialValue: company.social.twitter,
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
                    <FormItem {...formItemLayout} label="Instagram">
                      {getFieldDecorator("instagram", {
                        initialValue: company.social.instagram,
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
                    <FormItem {...formItemLayout} label="Facebook">
                      {getFieldDecorator("facebook", {
                        initialValue: company.social.facebook,
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
                    <FormItem {...formItemLayout} label="LinkedIn">
                      {getFieldDecorator("linkedin", {
                        initialValue: company.social.linkedin,
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
                    <FormItem {...formItemLayout} label="Youtube">
                      {getFieldDecorator("youtube", {
                        initialValue: company.social.youtube,
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
                  </Fragment>
                ) : (
                  <Fragment>
                    <FormItem {...formItemLayout} label="Twitter">
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
                    <FormItem {...formItemLayout} label="Instagram">
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
                    <FormItem {...formItemLayout} label="Facebook">
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
                    <FormItem {...formItemLayout} label="LinkedIn">
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
                    <FormItem {...formItemLayout} label="Youtube">
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
                  </Fragment>
                )}
              </div>
              <FormItem wrapperCol={{ xs: 24, sm: { span: 14, offset: 6 } }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </FormItem>
            </Form>
          </div>
        )}
      </Card>
    );
  }
}

const WrappedEditcompany = Form.create()(Editcompany);
const mapStateToProps = state => ({
  authUser: state.auth,
  company: state.company.company,
  loader: state.company.loader,
  alertMessage: state.company.alertMessage,
  showMessage: state.company.showMessage
});

export default connect(mapStateToProps, {
  createCompany,
  getCurrentcompany,
  showAuthLoader
})(WrappedEditcompany);
