import React from "react";
import { Button } from "antd";
import {
  Carousel,
  EntranceList,
  AdvertList,
  GoodsList,
  SplitLine
} from "../stageComponent";
import { AppContext } from "./AppContext";

const CompMapper = {
  carousel: Carousel,
  entranceList: EntranceList,
  advertList: AdvertList,
  goodsList: GoodsList,
  splitLine: SplitLine
};

export function Stage({ content, handleRemoveContent, handleClickContent }) {
  const contentChildren = content.map(({ children, sortId }, i) => (
    <div className="content-item" onClick={() => handleClickContent(sortId)}>
      <Button
        shape="circle"
        icon="close-circle"
        onClick={() => handleRemoveContent(i)}
      />
      {children.map(({ comp, compProps }) => {
        const Comp = CompMapper[comp];

        return (
          <AppContext.Consumer>
            {context => <Comp {...compProps} {...context} sortId={sortId} />}
          </AppContext.Consumer>
        );
      })}
    </div>
  ));
  console.log("Stage", content);
  return (
    <div className="Stage">
      <div className="Main">
        <div className="Main__head" />
        <div className="Main__body">{contentChildren}</div>
      </div>
      {/* <div className="Column__title">{props.title}</div> */}
    </div>
  );
}
