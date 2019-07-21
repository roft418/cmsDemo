import React from "react";
import { Form, Modal, Select, Button, message, Row, Table } from "antd";
import _ from "lodash";

const columns = [
  {
    title: "商品编码",
    dataIndex: "productCode"
  },
  {
    title: "商品名称",
    dataIndex: "productName"
  },
  {
    title: "商品类别",
    dataIndex: "transformType"
  }
];

const mockTags = ["cat", "dog", "bird"];
const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    productName: `productName${i + 1}`,
    type: `type${i + 1}`,
    disabled: i % 4 === 0,
    productCode: mockTags[i % 3]
  });
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { skipType: "a", dataSource: mockData, selectedRowKeys: [] };
  }

  onSelectChange = curSelect => {
    this.setState({ curSelect });
  };
  handleCancel = e => {
    const { handleCancel } = this.props;
    if (handleCancel) {
      handleCancel(e);
    }
  };

  handleOk = e => {
    const { handleOk } = this.props;
    const { dataSource, selectedRowKeys } = this.state;
    const targets = dataSource.filter(item =>
      selectedRowKeys.includes(item.key)
    );
    if (!selectedRowKeys.length) return message.error("请选择一项");

    if (handleOk) {
      handleOk({ e, selectedRowKeys, targets });
    }
  };

  handleGoodsSelectChange = selectedRowKeys => {
    console.info(selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const {
      dataSource,
      selectedRowKeys,
      targetKeys,
      disabled,
      showSearch
    } = this.state;
    const { title, width, tableTransferProps = {} } = this.props;

    const setting = {
      wrapClassName: "",
      visible: true,
      title: title || "",
      closable: false,
      onOk: this.handleOk,
      onCancel: this.handleCancel,
      width: width || 1024,
      footer: (
        <div>
          <Button key="back" size="large" onClick={this.handleCancel}>
            取消
          </Button>
          <Button
            key="submit"
            type="danger"
            size="large"
            onClick={this.handleOk}
          >
            确定
          </Button>
        </div>
      )
    };

    return (
      <Modal {...setting}>
        <Form layout="inline" className="search-form">
          <Row className="mb10 form-item-block">
            <Select
              onChange={this.onSelectChange}
              defaultValue="0"
              style={{ width: "20%" }}
            >
              <Select.Option value="0">商品编码</Select.Option>
              <Select.Option value="1">商品名称</Select.Option>
            </Select>
            <Button onClick={this.handleSearch}>{"查询"}</Button>
          </Row>
          <Row className="mb10 form-item-block">
            <Table
              title={() => "商品信息"}
              scroll={{
                x: _.sumBy(this.columns, "width") + 65
              }}
              pagination={true}
              rowSelection={{
                selectedRowKeys: selectedRowKeys, // 表格中选中的数据集下标
                onChange: this.handleGoodsSelectChange
              }}
              columns={columns}
              dataSource={dataSource}
              size="small"
              // style={{ pointerEvents: listDisabled ? "none" : null }}
            />
          </Row>
        </Form>
        {/* <Input.Group compact style={{ marginBottom: 15 }}>
          <Select
            onChange={this.onSelectChange}
            defaultValue="0"
            style={{ width: "20%" }}
          >
            <Select.Option value="0">商品编码</Select.Option>
            <Select.Option value="1">商品名称</Select.Option>
          </Select>
          <Input
            onPressEnter={this.handleSearch}
            style={{ width: "80%" }}
            placeholder="输入后按回车可搜索"
          />
        </Input.Group>
        {...tableTransferProps}
        /> */}
      </Modal>
    );
  }
}

export default App;
