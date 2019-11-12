import React, { useContext } from "react";
import AgendasContext from "../../context/agendas/agendasContext";
import Icon from "react-fontawesome";
const EditToolbar = ({ item }) => {
  const agendasContext = useContext(AgendasContext);
  const { setItemProperty } = agendasContext;

  const indent = item.indent ? item.indent : 0;
  const moveLeft = () => {
    setItemProperty(item.id, "indent", indent - 1);
  };

  const moveRight = () => {
    setItemProperty(item.id, "indent", indent + 1);
  };
  return (
    <div>
      {item.indent > 0 && (
        <button className='btn btn-primary btn-sm' onClick={moveLeft}>
          <Icon name='chevron-left' />
        </button>
      )}
      {(!item.indent || item.indent !== 2) && (
        <button className='btn btn-primary btn-sm' onClick={moveRight}>
          {" "}
          <Icon name='chevron-right' />{" "}
        </button>
      )}
    </div>
  );
};

export default EditToolbar;
