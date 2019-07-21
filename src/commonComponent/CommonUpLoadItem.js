import React from "react";
import { Icon, Form, Select, Radio, Input, Col, Row } from "antd";
import _ from "lodash";
import { DraggableItem, CommonUpload } from "./index";
// import CommonUpload from "./CommonUpload";

function getValueFromEvent(e) {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}

// @DraggableItem("CommonUpLoadItem")
class App extends React.Component {
  constructor() {
    super();
    this.state = { loading: false, fileList: [] };
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { data } = this.props.data;
    console.log("CommonUpLoadItem", this.props);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    // const { fileList } = this.state;
    return (
      // {...formItemLayout}
      <Form className="CommonUpLoadItem">
        <Row
          type="flex"
          // span={8}
          justify="center"
          align="middle"
        >
          <Col style={{ marginRight: 15 }}>
            <Form.Item label="">
              {getFieldDecorator("imgUrl", {
                // valuePropName: "fileList"
                // getValueFromEvent
              })(<CommonUpload />)}
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label={`${this.props.name}名称`}>
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: `请输入${this.props.name}名称`
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="跳转至">
              {getFieldDecorator("linkType", {})(
                <Radio.Group
                  onChange={({ target: { value } }) =>
                    this.setState(state => ({ linkType: value }))
                  }
                >
                  <Radio value="a">原生页面</Radio>
                  <Radio value="b">活动页面</Radio>
                  <Radio value="c">H5页面</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {this.props.linkType === "a" && (
              <Form.Item label="原生页面">
                {getFieldDecorator("link", {
                  rules: [{ required: true, message: "请选择原生页面" }]
                })(
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option value="china">China</Select.Option>
                    <Select.Option value="usa">U.S.A</Select.Option>
                  </Select>
                )}
              </Form.Item>
            )}
            {this.props.linkType === "b" && (
              <Form.Item label="活动页面">
                {getFieldDecorator("link", {
                  rules: [{ required: true, message: "请选择活动页面" }]
                })(
                  <Select>
                    <Select.Option value="china">China</Select.Option>
                    <Select.Option value="usa">U.S.A</Select.Option>
                  </Select>
                )}
              </Form.Item>
            )}
            {this.props.linkType === "c" && (
              <Form.Item label="H5页面">
                {getFieldDecorator("link", {
                  rules: [
                    {
                      required: true,
                      message: "请输入H5页面链接"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    console.info("mapPropsToFields", props);

    // let fileList = (props.imgUrl ? [props.imgUrl] : []).map(url => ({
    //   uid: url,
    //   status: "done",
    //   url: url,
    //   thumbUrl: url
    // }));
    // console.info("fileList", fileList);

    return {
      title: Form.createFormField({
        value: props.title
      }),
      linkType: Form.createFormField({
        value: props.linkType
      }),
      link: Form.createFormField({
        value: props.link
      }),
      imgUrl: Form.createFormField({
        value: props.imgUrl
      })
    };
  },
  onValuesChange(props, changedValues, allValues) {
    console.info("onValuesChange", props, changedValues, allValues);
    props.onChange(changedValues);
  }
})(App);
