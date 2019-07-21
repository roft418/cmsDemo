import React from "react";
import { DraggableItem } from "../commonComponent";
import cn from "classnames";

const mock = [
  { productCode: 1, productName: 2, skipType: "a" },
  { productCode: 2, productName: 3, skipType: "a" }
];
const initialSrc =
  "https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png!middle.png";
const layout = {
  1: "list",
  2: "two",
  3: "three",
  4: "swipe"
};
@DraggableItem("content")
class GoodsList extends React.Component {
  render() {
    const { items, templateType } = this.props;
    console.log("GoodsList", this.props);

    return (
      <div
        className={cn("GoodsList", {
          [layout[templateType]]: true
        })}
      >
        {items.length ? (
          items.map(({ title, url, imgUrl }, i) => (
            <div
              className={cn("Goods", {
                initial: imgUrl,
                [layout[templateType]]: true
              })}
              key={i}
            >
              <div className="img-item">
                <img src={imgUrl ? imgUrl : initialSrc} alt="" />
              </div>
              <div className="content-item">
                {title ? title : `商品${i + 1}`}
              </div>
            </div>
          ))
        ) : (
          <span className={`img-item ${items.length ? "" : "initial"}`}>
            <img src={initialSrc} alt="" />
          </span>
        )}

        {/* {items.length
          ? items.map(({ productCode, productName }, i) => (
              <div className="Goods" key={i}>
                <div className="Entrance-img">{productCode}</div>
                <div>{productName}</div>
              </div>
            ))
          : mock.map(({ productCode, productName }, i) => (
              <div className="Goods" key={i}>
                <div className="Entrance-img">{productCode}</div>
                <div>{productName}</div>
              </div>
            ))} */}
      </div>
    );
  }
}

export default GoodsList;
