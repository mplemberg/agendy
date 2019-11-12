import React, { useContext } from "react";
import AgendasContext from "../../context/agendas/agendasContext";

const OutlineItem = ({ item }) => {
  const agendasContext = useContext(AgendasContext);

  const { setOutlineItemMode } = agendasContext;

  const mouseEnter = () => {
    setOutlineItemMode(item.id, "highlighted");
  };

  const mouseLeave = () => {
    setOutlineItemMode(item.id, null);
  };

  const handleClick = () => {
    setOutlineItemMode(item.id, "editing");
  };

  const staticItem = <div> &bull; {item.label} </div>;
  const highlightedItem = (
    <div className='font-weight-bold p-2 border'> {item.label} </div>
  );

  const editingItem = (
    <input
      type='text'
      className='form-control'
      id='staticEmail'
      value={item.label}
    />
  );

  let content;
  switch (item.mode) {
    case "highlighted":
      content = highlightedItem;
      break;
    case "editing":
      content = editingItem;
      break;
    default:
      content = staticItem;
  }

  return (
    <div
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={handleClick}
    >
      {content}
    </div>
  );
};

export default OutlineItem;
