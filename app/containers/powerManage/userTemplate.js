import React from 'react'
import Moment from 'moment'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;
const PropTypes = require('prop-types');

const formatTime = Moment(Date.now());

class UserTemplate extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {
        getFormVal: PropTypes.func,
        renderObj: PropTypes.object
    }
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        renderObj: this.context.renderObj
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                    'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss')
                }
                this.context.getFormVal(values)
                // console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.in'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '91',
        })(
            <Select style={{ width: 60 }}>
                <Option value="91">+91</Option>
                <Option value="92">+92</Option>
            </Select>
            );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        const time = this.state.renderObj["date-time-picker"] ? Date.parse(this.state.renderObj["date-time-picker"]) : Date.now();
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }]
            , initialValue: Moment(time) || formatTime
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            username&nbsp;
                            <Tooltip title="please input the username of your expect ">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!', whitespace: true }]
                        , initialValue: this.state.renderObj.username || ''
                    })(
                        <Input placeholder="Please use your mobile phone number as your username" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Name"
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!', whitespace: true }]
                        , initialValue: this.state.renderObj.name || ''
                    })(
                        <Input placeholder="Name" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Email"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                        initialValue: this.state.renderObj.email || ''
                    })(
                        <Input placeholder="demo@example.com" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="password"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" placeholder="Please enter password" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} placeholder="Please enter password again" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="state"
                >
                    {getFieldDecorator('status', {
                        rules: [{ required: true, message: 'Please choose the status' }],
                        initialValue: this.state.renderObj.status || '1'
                    })(
                        <RadioGroup>
                            <Radio value="0" >invalid</Radio>
                            <Radio value="1" >efficient</Radio>
                        </RadioGroup>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Organization"
                    hasFeedback
                >
                    {getFieldDecorator('group', {
                        rules: [
                            { required: true, message: 'Please select your group!' },
                        ], initialValue: this.state.renderObj.group || 'customer'
                    })(
                        <Select>
                            <Option value="yun">Cloud and interaction</Option>
                            <Option value="customer">customer base</Option>
                            <Option value="call">Call Center</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Role"
                    hasFeedback
                >
                    {getFieldDecorator('role', {
                        rules: [
                            { required: true, message: 'Please select your role!' },
                        ], initialValue: this.state.renderObj.group || 'advance'
                    })(
                        <Select>
                            <Option value="admin">super administrator</Option>
                            <Option value="operate">Operations Administrator</Option>
                            <Option value="advance">Premium account</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Validity period"
                >
                    {getFieldDecorator('date-time-picker', config)(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout} style={{ marginTop: '70px' }}>
                    <Button type="primary" htmlType="submit">submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const UserComponents = Form.create()(UserTemplate);

module.exports = UserComponents;