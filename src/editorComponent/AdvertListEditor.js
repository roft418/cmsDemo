import React from "react";
import { Form, Radio } from "antd";
import { CommonUpLoadItem } from "../commonComponent";
import _ from "lodash";

class AdvertListEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [{}]
    };
  }
  componentDidMount() {
    this.props.form.setFieldsValue({ templateType: 1 });
  }

  render() {
    console.log("AdvertListEditor", this.props);
    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      <Form>
        <Form.Item label="选择模版">
          {getFieldDecorator("templateType", {
            rules: [{ required: true, message: "选择模版不可为空" }]
          })(
            <Radio.Group>
              <Radio value="1">一行一个</Radio>
              <Radio value="2">1v2</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <div>添加图片：</div>
        {this.props.items.map((item, i) => (
          <Form.Item key={i}>
            {this.props.items.length === 1 ? (
              <div>建议尺寸：宽355px</div>
            ) : (
              (i === 0 && (
                <div>左一（建议尺寸：长172.5px；宽172.5px）：</div>
              )) ||
              (i === 1 && <div>右一（建议尺寸：长172.5；宽86.25）：</div>) ||
              (i === 2 && <div>右二（建议尺寸：长172.5；宽86.25）：</div>)
            )}
            {getFieldDecorator(`items[${i}]`)(
              <CommonUpLoadItem name="图片" {...item} key={i} />
            )}
          </Form.Item>
        ))}
      </Form>
    );
  }
}
export default Form.create({
  mapPropsToFields(props) {
    const items = props.items.reduce(
      (tol, item, i) => ({
        ...tol,
        [`items[${i}]`]: Form.createFormField({
          value: item
        })
      }),
      {}
    );
    const result = {
      templateType: Form.createFormField({
        value: props.templateType
      }),
      ...items
    };
    return result;
  },
  onValuesChange(props, changedValues, allValues) {
    console.info(props, changedValues, allValues);

    const result = _.merge(props, allValues);
    console.info("result", result);
    const len = result.items.length;
    const lenMap = {
      1: 1,
      2: 3
    };
    const goalLen = lenMap[allValues.templateType];
    const newItems = [];
    [...Array(goalLen).keys()].forEach(i => {
      return newItems.length < len
        ? newItems.push(result.items[i])
        : newItems.push({
            title: 1,
            link: "www",
            linkType: "c",
            // imgUrl: props.morkUrl,
            sortId: props.addSortId()
          });
    });
    result.items = newItems;
    console.info("newItems", newItems);

    props.handleRefresh(result);
  }
})(AdvertListEditor);
