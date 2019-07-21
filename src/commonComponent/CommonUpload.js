import React from "react";
import _ from "lodash";
import { Icon, message, Upload } from "antd";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  console.log("beforeUpload", file);
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJPG && isLt2M;
}

export default class CommonUpload extends React.Component {
  constructor(props) {
    super();
    this.state = {
      fileList: []
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.info("CommonUpload:nextProps", nextProps);
    this.setState({
      fileList: (nextProps.value ? [nextProps.value] : []).map((url, i) => ({
        uid: `${i}`,
        status: "done",
        url
      }))
    });
  }

  handleChange = ({ fileList, file }) => {
    console.log("handleChange", fileList, file);
    if (file.status === "uploading") {
      console.info("uploading", "uploading");
      this.setState({ loading: true });
    } else if (file.status === "removed") {
      console.info("removed", "removed");
      this.setState({ loading: false });
      this.props.onChange(null);
    } else if (file.status === "done") {
      console.info("done", "done");
      this.setState({ loading: false });
      this.props.onChange(
        "https://img.yzcdn.cn/upload_files/2017/12/25/FtDJrT32nD8S083XkyxGjOcpSNUx.png!large.webp"
      );
    }

    this.setState({ fileList: [...fileList] });
  };

  render() {
    const { fileList } = this.state;
    const { onlyAddMode, showUploadList, className } = this.props;

    console.info(
      "CommonUpload",
      this.props,
      showUploadList !== undefined ? showUploadList : true,
      _.isEmpty(fileList)
    );
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div>
        <Upload
          name="avatar"
          listType="picture-card"
          fileList={fileList}
          className={className || "avatar-uploader"}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          showUploadList={showUploadList !== undefined ? showUploadList : true}
          // beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {onlyAddMode
            ? uploadButton
            : null || _.isEmpty(fileList)
            ? uploadButton
            : null}
        </Upload>
      </div>
    );
  }
}
