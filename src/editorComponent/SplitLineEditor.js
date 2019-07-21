import React from "react";
import { Form, message } from "antd";
import { CommonUpload } from "../commonComponent";
import _ from "lodash";
import cn from "classnames";

async function wait(params) {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(params);
    }, 1000);
  });
}

const _fetchRequestData = async props => {
  const mockData = [
    {
      imgUrl:
        "https://img.yzcdn.cn/upload_files/2014/12/05/bb3503203766425965b7517336df979d.png!large.png"
    },
    {
      imgUrl:
        "https://img.yzcdn.cn/upload_files/2018/05/10/FiwrSj1YlkTDOLUNoR7h4rQFrqOJ.png!large.webp"
    }
  ];
  const result = await wait(mockData);
  return result;
};

class SplitLineEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [{}]
    };
  }

  componentWillMount() {
    // setTimeout()
  }

  render() {
    console.log("SplitLineEditor", this.props);
    const {
      form: { getFieldDecorator, setFieldsValue }
    } = this.props;

    return (
      <Form className={cn("SplitLineEditor")}>
        <div>选择模版：</div>
        {this.props.allItems.map((item, i) => (
          <Form.Item key={i}>
            {getFieldDecorator(`allItems[${i}]`)(
              <div
                key={i}
                className={cn("img-item", {
                  selected: item.imgUrl === this.props.templateType
                })}
                onClick={() => setFieldsValue({ templateType: item.imgUrl })}
              >
                <img src={item.imgUrl} alt="" />
              </div>
            )}
          </Form.Item>
        ))}
        <Form.Item label="">
          {getFieldDecorator("imgUrl", {})(
            <CommonUpload
              showUploadList={false}
              onlyAddMode={true}
              className="block"
            />
          )}
        </Form.Item>
        {/* <Button
          block
          type="dashed"
          onClick={() =>
            setFieldsValue({
              allItems: [...this.props.allItems, { title: 1, url: 2 }]
            })
          }
        >
          添加一项
        </Button> */}
      </Form>
    );
  }
}
export default Form.create({
  async mapPropsToFields(props) {
    console.info(
      "mapPropsToFields... mapPropsToFields... mapPropsToFields...",
      props
    );
    const data = await _fetchRequestData();
    // props.allItems = data;
    data.forEach((item, i) => (props.allItems[i] = item));
    // const newData = _.merge(props, { allItems: data });
    // props.handleRefresh(newData);
    console.info(
      "_fetchRequestData... _fetchRequestData... _fetchRequestData...",
      props
    );
    const allItems = props.allItems.reduce(
      (tol, item, i) => ({
        ...tol,
        [`allItems[${i}]`]: Form.createFormField({
          value: item
        })
      }),
      {}
    );
    const result = {
      templateType: Form.createFormField({
        value: props.templateType
      }),
      imgUrl: Form.createFormField({
        value: props.imgUrl
      }),
      ...allItems
    };
    console.info(
      "_fetchRequestData... _fetchRequestData... _fetchRequestData...",
      result
    );
    return result;
  },
  onValuesChange(props, changedValues, allValues) {
    console.info("onValuesChange", props, changedValues, allValues);

    if (changedValues.imgUrl) {
      message.success("上传成功");
      console.info("上传成功");
      // _fetchRequestData(props);
      setTimeout(() => {
        console.info("_fetchRequestData...", props);

        props.form.setFieldsValue({
          allItems: [...props.allItems, { imgUrl: changedValues.imgUrl }]
        });
      }, 1000);
      // _.flowRight(,_fetchRequestData)

      return;
    }

    const result = _.merge(props, changedValues);
    props.handleRefresh(result);
  }
})(SplitLineEditor);
