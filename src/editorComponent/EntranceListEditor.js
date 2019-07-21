import React from "react";
import { Form, Radio } from "antd";
import { CommonUpLoadItem } from "../commonComponent";
import _ from "lodash";

class EntranceListEditor extends React.Component {
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
    // console.log("EntranceListEditor", this.props.handleRefresh);
    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      // <Form onClick={() => this.props.handleRefresh()}>
      <Form>
        <Form.Item label="选择模版">
          {getFieldDecorator("templateType", {
            rules: [{ required: true, message: "选择模版不可为空" }]
          })(
            <Radio.Group>
              <Radio value="1">一行四个</Radio>
              <Radio value="2">一行五个</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <div>添加分类入口：</div>
        {this.props.items.map((item, i) => (
          <Form.Item key={i}>
            {getFieldDecorator(`items[${i}]`)(
              <CommonUpLoadItem
                name="分类"
                key={i}
                {...item}
                handleMoveItem={this.props.handleMoveItem}
              />
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
    // console.info(result);
    return result;
  },
  onValuesChange(props, changedValues, allValues) {
    console.info(props, changedValues, allValues);
    // allValues搜集整个数组注意格式，不然搜集不到。
    // 取allValues原因是需要拿templateType做判断。

    const result = _.merge(props, allValues);
    console.info("result", result);
    const len = result.items.length;
    const lenMap = {
      1: 4,
      2: 5
    };
    const goalLen = lenMap[allValues.templateType];
    console.info("goalLen", allValues.templateType, goalLen);

    const newItems = [];
    [...Array(goalLen).keys()].forEach(i => {
      return newItems.length < len
        ? newItems.push(result.items[i])
        : newItems.push({
            title: null,
            url: null,
            imgUrl: props.morkUrl,
            sortId: props.sortId++
          });
    });
    result.items = newItems;
    console.info("newItems", newItems);

    props.handleRefresh(result);
  }
})(EntranceListEditor);
