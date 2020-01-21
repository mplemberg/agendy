import React, { useContext, useState, Fragment } from "react";
//import EditableField from "./EditableField";
import AgendasContext from "../../context/agendas/agendasContext";
import Icon from "react-fontawesome";
import DisplayOutlineItem from "./DisplayOutlineItem";
import HighlightOutlineItem from "./HighlightOutlineItem";
import EditOutlineItem from "./EditOutlineItem";
const OutlineEditor = () => {
  const [draggedItem, setDraggedItem] = useState({});
  const agendasContext = useContext(AgendasContext);
  const {
    agenda: { agendaLines },
    addItem,
    reorderItems,
    isHoveredItem,
    setHoveredItem,
    clearEditingItem
  } = agendasContext;

  const onDragStart = (e, index) => {
    clearEditingItem();
    setDraggedItem(agendaLines[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOver = index => {
    const draggedOverItem = agendaLines[index];

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    reorderItems(index, draggedItem);
  };

  const style = {
    cursor: "move"
  };

  return (
    <Fragment>
      {agendaLines &&
        agendaLines.map((item, idx) => {
          return (
            <HighlightOutlineItem
              item={item}
              key={item.id}
              onDragStart={e => onDragStart(e, idx)}
              handleDragOver={() => onDragOver(idx)}
              canDelete={agendaLines.length > 1}
            />
          );
        })}
    </Fragment>
  );
};

export default OutlineEditor;
