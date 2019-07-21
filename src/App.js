import React, { Component } from "react";
import "antd/dist/antd.css";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import _ from "lodash";
import { Board } from "./Board";
import { AppContext } from "./AppContext";
import { Button, Row } from "antd";
import {
  initialData,
  TypeMap,
  compiler,
  deCompiler,
  addSortId,
  sortId
} from "./Compiler";
const mockIndex = 4;

let _columnId = 0;
// let sortId = 0;
// let _contentId = 0;
// type：1 banner 2 图片广告 3 商品 4 分类 5分割线
const initialCards = ["轮播", "分类入口", "广告", "商品", "分割线"].map(
  (title, i) => ({
    id: addSortId(),
    title,
    templateType: TypeMap[title]
  })
);

const initialColumns = ["功能项"].map((title, i) => ({
  id: _columnId++,
  title,
  cardIds: initialCards.map(card => card.id)
}));

class App extends Component {
  constructor() {
    super();
    sortId(0);
    this.state = {
      cards: initialCards,
      columns: initialColumns,
      content: [
        {
          ...initialData[mockIndex],
          key: addSortId(),
          sortId: sortId()
        }
      ],
      // curEditorSortId: sortId(),
      handleRefresh: changedEditor => {
        this.setState(({ content, curEditorSortId }) => {
          const newEditor = _.cloneDeep(this.curEditor);
          changedEditor = _.cloneDeep(changedEditor);
          // console.log("oldEditor", newEditor, content);
          newEditor["children"][0]["compProps"] = changedEditor;
          content.splice(this.curEditorIndex, 1, newEditor);
          // console.log("newEditor", newEditor, content);

          return {
            content
          };
        });
      },
      handleMoveItem: (orgId, destId) => {
        // console.info(orgId, destId);
        const {
          children: [{ compProps }]
        } = this.curEditor;
        const { items } = compProps;

        const orgItem = items.find(item => item.sortId === orgId);
        const destIndex = items.map(item => item.sortId).indexOf(destId);

        const newItems = _.flowRight(
          data => {
            return [
              ...data.slice(0, destIndex),
              orgItem,
              ...data.slice(destIndex)
            ];
          },
          data => data.filter(({ sortId }) => sortId !== orgId)
        )(items);

        // console.info(newItems);
        compProps.items = newItems;
        // console.info(compProps);

        this.state.handleRefresh(compProps);
      },
      handleMoveContent: (orgId, destId) => {
        // console.info(orgId, destId);
        const { content } = this.state;

        const orgItem = content.find(item => item.sortId === orgId);
        const destIndex = content.map(item => item.sortId).indexOf(destId);
        const newItems = _.flowRight(
          data => {
            return [
              ...data.slice(0, destIndex),
              orgItem,
              ...data.slice(destIndex)
            ];
          },
          data => data.filter(({ sortId }) => sortId !== orgId)
        )(content);
        // console.info(newItems);

        this.setState(() => {
          return { content: newItems };
        });
      }
    };
  }

  addColumn = _title => {
    const title = _title.trim();
    if (!title) return;

    const newColumn = {
      id: ++_columnId,
      title,
      cardIds: []
    };
    this.setState(state => ({
      columns: [...state.columns, newColumn]
    }));
  };

  addCard = (columnId, _title) => {
    const title = _title.trim();
    if (!title) return;

    const newCard = { id: addSortId(), title };
    this.setState(state => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map(column =>
        column.id === columnId
          ? { ...column, cardIds: [...column.cardIds, newCard.id] }
          : column
      )
    }));
  };

  moveCard = (cardId, destColumnId, index) => {
    console.info(cardId, destColumnId, index);
    this.setState(state => ({
      columns: state.columns.map(column => ({
        ...column,
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          ids => {
            console.info(
              column.id === destColumnId
                ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
                : ids
            );
            return column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids;
          },
          // 1) Remove the cardId for all columns
          ids => ids.filter(id => id !== cardId)
        )(column.cardIds)
      }))
    }));
  };

  handleAddContent = templateType => {
    console.info(templateType);
    this.setState(state => ({
      content: state.content.concat({
        ..._.cloneDeep(initialData[templateType - 1]),
        key: addSortId(),
        sortId: sortId()
      })
    }));
  };

  handleRemoveContent = index => {
    console.info("handleRemoveContent", this.state.content, index);
    this.setState(state => ({
      content: state.content.filter((item, i) => i !== index)
    }));
  };
  handleClickContent = sortId => {
    console.info("handleClickContent", sortId);
    this.setState(() => ({
      curEditorSortId: sortId
    }));
  };
  handleIssue = () => {
    console.info(addSortId());
  };
  handleSubmit = () => {
    const { content } = this.state;
    console.info(compiler(deCompiler(content)));
  };

  get curEditor() {
    const result = this.state.content.find(
      item => item.sortId === this.state.curEditorSortId
    );
    return result;
  }

  get curEditorIndex() {
    const result = this.state.content.indexOf(this.curEditor);
    // console.log(result);
    return result;
  }

  render() {
    // console.clear();
    return (
      <AppContext.Provider
        value={{
          sortId: sortId(),
          addSortId: addSortId,
          curEditorSortId: this.state.curEditorSortId,
          handleMoveItem: this.state.handleMoveItem,
          handleMoveContent: this.state.handleMoveContent,
          handleRefresh: this.state.handleRefresh,
          morkUrl:
            "https://img.yzcdn.cn/upload_files/2017/12/25/FtDJrT32nD8S083XkyxGjOcpSNUx.png!large.webp"
        }}
      >
        <Row type="flex" justify="space-between" style={{ padding: 10 }}>
          <Button onClick={() => {}}>返回</Button>
          <div>
            <Button
              type="primary"
              style={{ marginRight: 10 }}
              onClick={this.handleSubmit}
            >
              保存
            </Button>
            <Button type="primary" onClick={this.handleIssue}>
              发布
            </Button>
          </div>
        </Row>
        <Board
          cards={this.state.cards}
          columns={this.state.columns}
          curEditorSortId={this.state.curEditorSortId}
          curEditor={this.curEditor}
          content={this.state.content}
          moveCard={this.moveCard}
          addCard={this.addCard}
          addColumn={this.addColumn}
          handleAddContent={this.handleAddContent}
          handleRemoveContent={this.handleRemoveContent}
          handleClickContent={this.handleClickContent}
          handleCloseEditor={this.handleCloseEditor}
        />
      </AppContext.Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
