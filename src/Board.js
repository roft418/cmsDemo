import React from "react";
import { Column } from "./Column";
import { Stage } from "./Stage";
import { Editor } from "./Editor";
import { DraggableCard } from "./Card";
// import { TextForm } from "./TextForm";

export function Board({
  cards,
  columns,
  curEditorKey,
  curEditor,
  content,
  moveCard,
  addCard,
  addColumn,
  handleAddContent,
  handleRemoveContent,
  handleClickContent,
  handleCloseEditor
}) {
  return (
    <div className="Board">
      {columns.map(column => (
        <Column
          key={column.id}
          title={column.title}
          addCard={addCard.bind(null, column.id)}
        >
          {column.cardIds
            .map(cardId => cards.find(card => card.id === cardId))
            .map((card, index) => (
              <DraggableCard
                key={card.id}
                id={card.id}
                templateType={card.templateType}
                columnId={column.id}
                columnIndex={index}
                title={card.title}
                moveCard={moveCard}
                handleAddContent={handleAddContent}
              />
            ))}
          {column.cardIds.length === 0 && (
            <DraggableCard
              isSpacer
              moveCard={cardId => moveCard(cardId, column.id, 0)}
              handleAddContent={handleAddContent}
            />
          )}
        </Column>
      ))}
      <Stage
        content={content}
        handleRemoveContent={handleRemoveContent}
        handleClickContent={handleClickContent}
      />
      {curEditor && (
        <Editor {...curEditor} handleCloseEditor={handleCloseEditor} />
      )}
      {/* <div className="Column">
        <TextForm onSubmit={addColumn} placeholder="Add Column..." />
      </div> */}
    </div>
  );
}
