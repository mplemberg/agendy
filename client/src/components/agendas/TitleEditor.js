import React, { useContext, useRef } from "react";
//import EditableField from "./EditableField";
import AgendasContext from "../../context/agendas/agendasContext";
import ContentEditable from "react-contenteditable";
const TitleEditor = ({ item }) => {
  const ref = useRef();
  const agendasContext = useContext(AgendasContext);
  const {
    setTitle,
    clearActiveItem,
    clearHoveredItem,
    setHoveredItem,
    isHovering,
    setEditingItem,
    isEditingItem
  } = agendasContext;
  const onChange = e => {
    setTitle(e.target.value);
  };

  let display = item.text;
  let highlight = (
    <div className='py-1'>
      <span className='font-weight-bold p-2 border rounded'> {item.text} </span>
    </div>
  );

  let edit = (
    <input
      autoFocus
      type='text'
      className='h1'
      value={item.text || ""}
      onChange={onChange}
      size={item && item.text ? item.text.length : 4}
    />
  );

  edit = (
    <ContentEditable
      innerRef={ref}
      html={item.text || ""} // innerHTML of the editable div
      disabled={false} // use true to disable editing
      onChange={onChange} // handle innerHTML change
    />
  );

  if (isEditingItem(item)) {
    display = edit;
  }

  const handleMouseLeave = () => {
    if (isHovering()) {
      clearHoveredItem();
    }
  };

  const mouseEnter = () => {
    setHoveredItem(item);
  };

  const handleClick = () => {
    setEditingItem(item);
  };

  return (
    <div
      className='row'
      onMouseEnter={mouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className='col'
        style={{
          cursor: "text"
        }}
        onClick={handleClick}
      >
        <div className='h1'>{display}</div>
      </div>
    </div>
  );
};

export default TitleEditor;
