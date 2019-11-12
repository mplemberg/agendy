import React, { useContext } from "react";
import AgendasContext from "../../context/agendas/agendasContext";
import HighlightOutlineItem from "./HighlightOutlineItem";
import EditOutlineItem from "./EditOutlineItem";
import DisplayOutlineItem from "./DisplayOutlineItem";
const OutlineItem = ({ item }) => {
  const agendasContext = useContext(AgendasContext);

  const {
    setActiveItem,
    isEditingMode,
    isHighlightingItem,
    isEditingItem
  } = agendasContext;

  const mouseEnter = () => {
    setActiveItem(item.id, "highlighting");
  };

  const mouseLeave = () => {
    if (!isEditingMode()) {
      setActiveItem(null, null);
    }
  };

  const handleClick = () => {
    setActiveItem(item.id, "editing");
  };

  let content = <DisplayOutlineItem item={item} />;
  if (isHighlightingItem(item.id)) {
    content = <HighlightOutlineItem item={item} />;
  } else if (isEditingItem(item.id)) {
    content = <EditOutlineItem item={item} />;
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
      onMouseLeave={mouseLeave}
      onClick={handleClick}
      className={margin}
    >
      {content}
    </div>
  );
};

export default OutlineItem;
