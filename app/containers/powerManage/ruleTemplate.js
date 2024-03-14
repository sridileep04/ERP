import React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Radio } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
// Radio component
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import PropTypes from 'prop-types';
class RuleTemplate extends React.Component {
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
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        const parentsArr = ['Top', 'set up', 'authority management', 'Rule management', 'role management']
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
                    label='Rule name'
                    hasFeedback
                >
                    {getFieldDecorator('rule_name', {
                        rules: [{ required: true, message: 'Please input your rule_name!' }],
                        initialValue: this.state.renderObj.rule_name || ''
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            rule&nbsp;
              <Tooltip title='Group name/controller name/method name;The controller class name does not contain"Controller;Method name without"Action";Without it at the end"/";Leave it blank if no authority authentication is required.. '>
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('rule_url', {
                        rules: [{ required: true, message: 'Please input your rule_url!', whitespace: true }]
                        , initialValue: this.state.renderObj.rule_url || ''
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='Additional conditions'
                    hasFeedback
                >
                    {getFieldDecorator('additional', {
                        rules: [{ required: true, message: 'Please input your additional!' }],
                        initialValue: this.state.renderObj.additional || ''
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Father"
                    hasFeedback
                >
                    {getFieldDecorator('parent_level', {
                        rules: [
                            { required: true, message: 'Please select your parent level!' },
                        ], initialValue: this.state.renderObj.parent_level || ''
                    })(
                        <Select placeholder="Please select a country">
                            {parentsArr.map((item, index) => {
                                return (<Option key={index} value={item} >{item}</Option>)
                            })
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="state"
                >
                    {getFieldDecorator('status', {
                        rules: [{ required: true, message: 'Please choose the status' }],
                        initialValue: this.state.renderObj.status || '0'
                    })(
                        <RadioGroup >
                            <Radio value="0" >invalid</Radio>
                            <Radio value="1">efficient</Radio>
                        </RadioGroup>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="show"
                >
                    {getFieldDecorator('isshow', {
                        rules: [{ required: true, message: 'Please decide it what is  waited to choose' }],
                        initialValue: this.state.renderObj.isshow || '0'
                    })(
                        <RadioGroup >
                            <Radio value="0" >show</Radio>
                            <Radio value="1">Do not show</Radio>
                        </RadioGroup>
                        )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label='icon'
                    hasFeedback
                >
                    {getFieldDecorator('icon', {
                        rules: [{ required: true, message: 'Please input your icon!' }],
                        initialValue: this.state.renderObj.icon || ''
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem {...tailFormItemLayout} style={{ marginTop: '70px' }}>
                    <Button type="primary" htmlType="submit">submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const RuleComponents = Form.create()(RuleTemplate);

module.exports = RuleComponents;