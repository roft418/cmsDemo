import React from "react";
import { Form, Radio, Tabs, Carousel, Button, Icon, message } from "antd";
import { CommonUpLoadItem } from "../commonComponent";
import _ from "lodash";

class CarouselEditor extends React.Component {
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
    console.log("CarouselEditor", this.props);
    const {
      form: { getFieldDecorator, setFieldsValue }
    } = this.props;

    return (
      <Form>
        <Form.Item label="选择模版">
          {getFieldDecorator("templateType", {
            rules: [{ required: true, message: "选择模版不可为空" }]
          })(
            <Radio.Group>
              <Radio value="1">轮播海报</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <div>添加图片：最多添加8张，鼠标拖拽调整广告顺序</div>
        {this.props.items.map((item, i) => (
          <Form.Item key={i}>
            {getFieldDecorator(`items[${i}]`)(
              <CommonUpLoadItem name="轮播" {...item} key={i} />
            )}
          </Form.Item>
        ))}
        <Button
          block
          type="dashed"
          onClick={() =>
            setFieldsValue({
              items: [
                ...this.props.items,
                {
                  title: "",
                  url: "",
                  linkType: "c",
                  // imgUrl: this.props.morkUrl,
                  sortId: this.props.addSortId()
                }
              ]
            })
          }
        >
          添加一项
        </Button>
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
    console.info("onValuesChange", props, changedValues, allValues);
    const result = _.merge(props, changedValues);
    props.handleRefresh(result);
    // const result = _.merge(props, allValues);
    // console.info("result", result);
    // const len = result.items.length;
    // const lenMap = {
    //   1: 1,
    //   2: 3
    // };
    // const goalLen = lenMap[allValues.templateType];
    // const newItems = [];
    // [...Array(goalLen).keys()].forEach(i => {
    //   return newItems.length < len
    //     ? newItems.push(result.items[i])
    //     : newItems.push({
    //         title: 1,
    //         url: 2,
    //         linkType: "c",
    //         imgUrl: props.morkUrl,
    //         sortId: props.addSortId()
    //       });
    // });
    // result.items = newItems;
    // console.info("newItems", newItems);

    // props.handleRefresh(result);
  }
})(CarouselEditor);
