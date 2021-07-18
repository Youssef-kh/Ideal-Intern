import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  hideMessage,
  showAuthLoader,
  createProfile,
  getCurrentProfile
} from "../../../appRedux/actions/profile";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import CircularProgress from "components/CircularProgress/index";
import {
  Button,
  DatePicker,
  Space,
  Card, 
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
  message,
  Form
} from "antd";



import "./otherFormControls.less"; 

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group; 
const AutoCompleteOption = AutoComplete.Option;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
class CreateProfile extends Component {
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
      message: "Profile Created Successfully",
      description: "Hello   " + this.props.profile.firstName
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log("Received values of form: ", values);
        this.props.showAuthLoader();
        this.props.createProfile(values, false);
      }
    });
  };
  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }

    if (this.props.profile !== null) {
      this.openNotificationWithIcon("success");
      this.props.history.push("/social-apps/trainee-profile");
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
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
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
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Card className="gx-card" title="Create Your Profile As A Trainee">
        <div>
          <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Trainee's picture" hasFeedback>
            {getFieldDecorator("avatar")}
          <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
          </FormItem>
          
          
      
            <FormItem {...formItemLayout} label="First name" hasFeedback>
              {getFieldDecorator("firstName", {
                rules: [
                  {
                    required: false,
                    message: "Please input your first name"
                  }
                ]
              })(<Input placeholder="Please enter you first name here" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Last name" hasFeedback>
              {getFieldDecorator("lastName", {
                rules: [{ required: false, message: "Please input your last name!" }]
              })(
                <Input placeholder="Please enter your last name here" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Date of birth" hasFeedback>
              {getFieldDecorator("dateOfBirth", {
                rules: [{ required: false, message: "Please input your date of birth!" }]
              })(<DatePicker onChange={onChange} />
                
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Location" hasFeedback>
              {getFieldDecorator("location", {
                rules: [{ required: false, message: "Please input Location!" }]
              })(
                <Select placeholder="Please select your location" hasFeedback>
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
            <FormItem {...formItemLayout} label="Skills" hasFeedback>
              {getFieldDecorator("skills", {
                rules: [
                  {
                    required: false,
                    message:
                      "Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                  }
                ]
              })(
                <Input placeholder="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="GithubUsername" hasFeedback>
              {getFieldDecorator("githubusername", {
                rules: [
                  { required: false, message: "Please input GithubUsername!" }
                ]
              })(
                <Input
                  placeholder="If you want your latest repos and a Github link, include your
            username"
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Bio" hasFeedback>
              {getFieldDecorator("bio", {
                rules: [
                  {
                    required: false,
                    message: "Tell us a little about yourself"
                  }
                ]
              })(<Input placeholder="A short bio of yourself" />)}
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
            <FormItem wrapperCol={{ xs: 24, sm: { span: 14, offset: 6 } }}>
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

const WrappedCreateProfile = Form.create()(CreateProfile);
const mapStateToProps = state => {
  const { profile, loader, alertMessage, showMessage } = state.profile;
  const { authUser } = state.auth;
  return { authUser, profile, loader, alertMessage, showMessage };
};

export default connect(mapStateToProps, {
  createProfile,

  showAuthLoader,
  hideMessage
})(WrappedCreateProfile);
