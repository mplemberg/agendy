import React, { useContext } from "react";
import OutlineItem from "./OutlineItem";
import AgendasContext from "../../context/agendas/agendasContext";

const Outline = () => {
  const agendasContext = useContext(AgendasContext);
  const {
    agenda: { outline }
  } = agendasContext;
  return (
    <div>
      {outline.items &&
        outline.items.map(item => <OutlineItem key={item.id} item={item} />)}
    </div>
  );
};

export default Outline;
