import React from "react";
import { Form, Button, Radio, message } from "antd";
import { CommonGoodsItem } from "../commonComponent";
import CommonGoodsModal from "./CommonGoodsModal";
import _ from "lodash";

class GoodsListEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [{}],
      isShowGoodsModal: false
    };
  }

  handleShowGoodsModal = () => {
    this.setState({ isShowGoodsModal: true });
  };
  handleHideGoodsModal = () => {
    this.setState({ isShowGoodsModal: false });
  };
  handleOk = listProps => {
    const { targets } = listProps;
    if (_.isEmpty(targets)) {
      return message.warn("未选择商品");
    }
    this.props.form.setFieldsValue({
      items: [...this.props.items, ...targets]
    });
    console.info(targets);
    this.handleHideGoodsModal();
    message.success("操作成功");
  };

  render() {
    console.log("GoodsListEditor", this.props.handleRefresh);
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
              <Radio value="1">列表模式</Radio>
              <Radio value="2">一行两个</Radio>
              <Radio value="3">一行三个</Radio>
              <Radio value="4">横向滑动</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="添加商品">
          {getFieldDecorator("goodsType", {
            rules: [{ required: true, message: "添加商品不可为空" }]
          })(
            <Radio.Group>
              <Radio value="1">商品</Radio>
            </Radio.Group>
          )}
        </Form.Item>

        <Button
          type="dashed"
          style={{ marginRight: 10 }}
          onClick={() => this.handleShowGoodsModal()}
        >
          添加一项
        </Button>
        <Button type="dashed" onClick={() => this.handleShowGoodsModal()}>
          批量导入
        </Button>
        {this.props.items.map((item, i) => (
          <Form.Item key={i}>
            {getFieldDecorator(`items[${i}]`)(
              <CommonGoodsItem
                name="商品"
                key={i}
                {...item}
                handleMoveItem={this.props.handleMoveItem}
              />
            )}
          </Form.Item>
        ))}
        {this.state.isShowGoodsModal && (
          <CommonGoodsModal
            {...this.state}
            handleCancel={this.handleHideGoodsModal}
            handleOk={this.handleOk}
          />
        )}
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
      goodsType: Form.createFormField({
        value: props.goodsType
      }),
      ...items
    };
    // console.info(result);
    return result;
  },
  onValuesChange(props, changedValues, allValues) {
    // props.onChange(changedFields);
    console.info("onValuesChange", props, changedValues, allValues);
    // allValues搜集整个数组注意格式，不然搜集不到。
    const result = _.merge(props, changedValues);
    console.info("result", result);
    props.handleRefresh(result);
  }
})(GoodsListEditor);
