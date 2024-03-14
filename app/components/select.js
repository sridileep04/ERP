import React from 'react'
import { Row, Col, Select } from 'antd';

const Option = Select.Option;

class SelectSearch extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {

        }
    }
    static defaultProps = {
        title: '',
        optionArr: [
            { id: '0', value: 'dillu' },
            { id: '1', value: 'dilli' },
            { id: '2', value: 'hero' },
            { id: '3', value: 'subbu' }
        ],
        cueWords: 'please choose',
        label: 'I am label'
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }
    render() {
        return (
            <Row gutter={0} type="flex" justify="center" align="middle" style={{ height: '48px' }}>
                <Col span={12}><span style={{ display: 'inline-block', width: '100%', textAlign: 'center', fontSize: '14px', color: '#929aab' }}>{this.props.label}</span></Col>
                <Col span={12} >
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder={this.props.cueWords}
                        optionFilterProp="children"
                        onChange={this.handleChange.bind(this)}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {
                            this.props.optionArr.map(function (item) {
                                return (<Option key={item.id} value={item.id}>{item.value}</Option>
                                )

                            })
                        }
                    </Select>
                </Col>
            </Row>

        )
    }
}
module.exports = SelectSearch
