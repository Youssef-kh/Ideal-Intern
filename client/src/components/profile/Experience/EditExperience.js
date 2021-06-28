import React, { Component, Fragment } from "react";
import CircularProgress from "../../../components/CircularProgress/index";
import { connect } from "react-redux";
import { editExperience } from "../../../appRedux/actions/profile";

import {
    Button,
    Card,
    Form,
    Row,
    Tooltip,
    Col,
    notification,
    PageHeader,
    DatePicker,
    Select,
    Switch,
    Checkbox,
    Input,
    Icon,
    AutoComplete,
    message
} from "antd";

import "../profile_forms/otherFormControls.less";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
class EditExperience extends Component {
    state = {
        disabled: false
    };

    toggle = () => {
        this.setState({
            disabled: !this.state.disabled
        });
    };
    openNotificationWithIcon = type => {
        notification[type]({
            message: "Experience Editted Successfully"
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log("Received values of form: ", values);

                this.props.editExperience(values);
                this.openNotificationWithIcon("success");
                this.props.history.push("/social-apps/trainee-profile");
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { showMessage, loader, alertMessage } = this.props;
        const formItemLayout = {
            labelCol: { xs: 24, sm: 6 },
            wrapperCol: { xs: 24, sm: 14 }
        };
        const formTailLayout = {
            wrapperCol: { xs: 24, sm: 14 }
        };

        return (
            <Fragment>
            <Card
                className="gx-card"
                title="Add any developer/programming
        positions that you have had in the past"
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="Job Title">
                        {getFieldDecorator("title", {
                            rules: [{ required: true, message: "Please input Job Title!" }]
                        })(<Input placeholder="" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Company">
                        {getFieldDecorator("company", {
                            rules: [{ required: true, message: "Please input Company!" }]
                        })(
                            <Input placeholder="Could be your own company or one you work/worked for" />
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
                    <Form.Item {...formItemLayout} label="From Date">
                        {getFieldDecorator("from", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select From date!"
                                }
                            ]
                        })(<DatePicker />)}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={
                            <span>
                                Current&nbsp;
                                <Tooltip title="Is this your current Job?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator("current", { valuePropName: "checked" })(
                            <Switch onClick={this.toggle} />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="To Date">
                        {getFieldDecorator("to", {
                            rules: [
                                {
                                    required: false,
                                    message: "Please select To date!"
                                }
                            ]
                        })(<DatePicker disabled={this.state.disabled} />)}
                    </Form.Item>
                    <FormItem {...formItemLayout} label="Job Description">
                        {getFieldDecorator("description", {
                            rules: [
                                {
                                    required: false
                                }
                            ]
                        })(
                            <TextArea
                                placeholder="Tell us more about it"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{ xs: 24, sm: { span: 14, offset: 6 } }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </FormItem>
                </Form>
            </Card>
      </Fragment >
    )
                        }
}

const WrappedEditExperience = Form.create()(EditExperience);
const mapStateToProps = state => ({
    authUser: state.auth,
    profile: state.profile.profile,
    loader: state.profile.loader,
    alertMessage: state.profile.alertMessage,
    showMessage: state.profile.showMessage
});
export default connect(mapStateToProps, { editExperience })(
    WrappedEditExperience
);