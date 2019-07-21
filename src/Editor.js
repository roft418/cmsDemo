import React from "react";
import { Button } from "antd";
import {
  CarouselEditor,
  EntranceListEditor,
  AdvertListEditor,
  SplitLineEditor,
  GoodsListEditor
} from "./editorComponent";
import { AppContext } from "./AppContext";
// import "./Detail.less";

const CompMapper = {
  carousel: CarouselEditor,
  entranceList: EntranceListEditor,
  advertList: AdvertListEditor,
  goodsList: GoodsListEditor,
  splitLine: SplitLineEditor
};

export function Editor({
  title,
  children: [{ comp, compProps, key }],
  handleCloseEditor
}) {
  const Comp = CompMapper[comp];

  const curChild = (
    <AppContext.Consumer>
      {context => <Comp {...context} {...compProps} key={key} />}
    </AppContext.Consumer>
  );
  // console.log(title, comp, compProps, curChild);

  return (
    <div className="Editor">
      {/* <Button
        shape="circle"
        icon="close-circle"
        onClick={() => handleCloseEditor()}
      /> */}
      <div className="Editor__title">{title}</div>
      <div className="Editor__content" key={key}>
        {curChild}
      </div>
    </div>
  );
}
