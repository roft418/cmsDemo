import React from "react";
import { Form, Select, Button } from "antd";
import DraggableItem from "./DraggableItem";

@DraggableItem("CommonGoodsItem")
class App extends React.Component {
  constructor() {
    super();
    this.state = { skipType: "a" };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // const { data } = this.props.data;
    // console.log(this.props);
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

    return (
      <Form {...formItemLayout}>
        {this.state.skipType === "a" && (
          <div>
            {this.props.productCode}_{this.props.productName}
          </div>
        )}
      </Form>
    );
  }
}
export default Form.create({
  // mapPropsToFields(props) {
  //   return {
  //     title: Form.createFormField({
  //       value: props.title
  //     }),
  //     skipType: Form.createFormField({
  //       value: props.skipType
  //     }),
  //     url: Form.createFormField({
  //       value: props.url
  //     })
  //   };
  // },
  // onValuesChange(props, changedValues, allValues) {
  //   // console.info(props, changedValues, allValues);
  //   props.onChange(changedValues);
  // }
})(App);
