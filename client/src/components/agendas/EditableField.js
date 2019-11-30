import React, { useContext, useRef } from "react";
import AgendasContext from "../../context/agendas/agendasContext";
import useOutsideClick from "../hooks/useOutsideClick";

const EditableField = ({ display, highlight, edit, item }) => {
  const agendasContext = useContext(AgendasContext);

  const {
    setActiveItem,
    clearActiveItem,
    //isEditingMode,
    isHighlightingItem,
    isEditingItem
  } = agendasContext;

  let ref = useRef();
  /*useOutsideClick(ref, () => {
    if (isEditingMode()) {
      clearActiveItem();
    }
  });*/

  let refProps = {};
  //if (isEditingMode()) {
  refProps.ref = ref;
  //}

  const mouseEnter = () => {
    //if (!isEditingMode()) {
    setActiveItem(item.id, "highlighting");
    //}
  };

  const mouseLeave = () => {
    //if (!isEditingMode()) {
    clearActiveItem();
    //}
  };

  const handleClick = () => {
    //if (!isEditingMode()) {
    setActiveItem(item.id, "editing");
    //}
  };

  let content = display;
  if (isHighlightingItem(item.id)) {
    content = highlight;
  } else if (isEditingItem(item.id)) {
    content = edit;
  }

  let margin = "";
  if (item.indent && item.indent === 1) {
    margin = "ml-3";
  } else if (item.indent && item.indent === 2) {
    margin = "ml-5";
  }

  return (
    <div
      onMouseEnter={mouseEnter}
      //onMouseLeave={mouseLeave}
      //onClick={handleClick}
      className={margin}
      {...refProps}
    >
      {content}
    </div>
  );
};

export default EditableField;
