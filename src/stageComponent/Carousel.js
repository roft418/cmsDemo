import React from "react";
import { Carousel } from "antd";
import { DraggableItem } from "../commonComponent";
const initialSrc =
  "https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png";

@DraggableItem("content")
class App extends React.Component {
  render() {
    const { items } = this.props;
    console.log("Carousel", this.props);
    return (
      <Carousel autoplay className={`Carousel`}>
        {items.length ? (
          items.map(({ url, imgUrl }, i) => (
            <div className={`img-item ${imgUrl ? "" : "initial"}`} key={i}>
              <img src={imgUrl ? imgUrl : initialSrc} alt="" />
            </div>
          ))
        ) : (
          <span className={`img-item ${items.length ? "" : "initial"}`}>
            <img src={initialSrc} alt="" />
          </span>
        )}
      </Carousel>
    );
  }
}
export default App;
