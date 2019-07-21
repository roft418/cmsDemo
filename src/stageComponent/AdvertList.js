import React from "react";
import { DraggableItem } from "../commonComponent";
import cn from "classnames";

const initialSrc =
  "https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png";
const layout = {
  1: "one",
  2: "oneVsTwo"
};
@DraggableItem("content")
class AdvertList extends React.Component {
  render() {
    const { items, templateType } = this.props;
    console.log("AdvertList", this.props);

    return (
      <div
        className={cn("AdvertList", {
          [layout[templateType]]: true
        })}
      >
        {items.length ? (
          items.map(({ title, url, imgUrl }, i) => (
            <div
              className={cn("Advert", {
                initial: !imgUrl,
                [layout[templateType]]: true
              })}
              key={i}
            >
              <div className="img-item" key={i}>
                <img src={imgUrl ? imgUrl : initialSrc} alt="" />
              </div>
            </div>
          ))
        ) : (
          <span className={`img-item ${items.length ? "" : "initial"}`}>
            <img src={initialSrc} alt="" />
          </span>
        )}
      </div>
    );
  }
}

export default AdvertList;
