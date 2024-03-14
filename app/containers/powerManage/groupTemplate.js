import React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;
const PropTypes = require('prop-types');
class GroupTemplate extends React.Component {
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
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.context.getFormVal(values)

                // (values)
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

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            name of association&nbsp;
                            <Tooltip title="please input the group name of your expect ">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
                        , initialValue: this.state.renderObj.nickname || ''
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="category"
                    hasFeedback
                >
                    {getFieldDecorator('category', {
                        rules: [
                            { required: true, message: 'Please select your country!' },
                        ], initialValue: this.state.renderObj.category || ''
                    })(
                        <Select placeholder="Please select a country">
                            <Option value="india">India</Option>
                            <Option value="use">U.S.A</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            address&nbsp;
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('adress', {
                        rules: [{ required: true, message: 'Please input your adress!' }],
                        initialValue: this.state.renderObj.adress || ''
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Telephone"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                        initialValue: this.state.renderObj.phone || ''
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
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
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="website"
                >
                    {getFieldDecorator('website', {
                        rules: [{ required: true, message: 'Please input website!' }],
                        initialValue: this.state.renderObj.website || ''
                    })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="website"
                        >
                            <Input />
                        </AutoComplete>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Remark"
                >
                    {getFieldDecorator('remark', {
                        rules: [{ required: true, message: 'Please input website!' }],
                        initialValue: this.state.renderObj.remark || ''
                    })(
                        <AutoComplete
                            placeholder="remark"
                        >
                            <TextArea style={{ resize: 'none', height: '80px' }} rows={4} />
                        </AutoComplete>
                        )}
                </FormItem>

                <FormItem {...tailFormItemLayout} style={{ marginTop: '70px' }}>
                    <Button type="primary" htmlType="submit">submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const GroupComponents = Form.create()(GroupTemplate);

module.exports = GroupComponents;