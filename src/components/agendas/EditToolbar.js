import React, { useContext } from "react";
import AgendasContext from "../../context/agendas/agendasContext";
import Icon from "react-fontawesome";
const EditToolbar = ({ item }) => {
  const agendasContext = useContext(AgendasContext);
  const {
    setItemProperty,
    moveItemUp,
    isFirstItem,
    isLastItem,
    moveItemDown
  } = agendasContext;

  const indent = item.indent ? item.indent : 0;
  const moveLeft = () => {
    setItemProperty(item.id, "indent", indent - 1);
  };

  const moveRight = () => {
    setItemProperty(item.id, "indent", indent + 1);
  };

  const handleItemUp = () => {
    moveItemUp(item);
  };

  const handleItemDown = () => {
    moveItemDown(item);
  };

  const showUp = !isFirstItem(item);
  const showDown = !isLastItem(item);
  return (
    <div>
      {item.indent > 0 && (
        <button className='btn btn-primary btn-sm' onClick={moveLeft}>
          <Icon name='chevron-left' />
        </button>
      )}
      {(!item.indent || item.indent !== 2) && (
        <button className='btn btn-primary btn-sm' onClick={moveRight}>
          <Icon name='chevron-right' />
        </button>
      )}
      {!showUp && (
        <button className='btn btn-secondary btn-sm' onClick={handleItemUp}>
          <Icon name='chevron-up' />
        </button>
      )}
      {!showDown && (
        <button className='btn btn-secondary btn-sm' onClick={handleItemDown}>
          <Icon name='chevron-down' />
        </button>
      )}
    </div>
  );
};

export default EditToolbar;
