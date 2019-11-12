import React, { useContext } from "react";
import OutlineItem from "./OutlineItem";
import AgendasContext from "../../context/agendas/agendasContext";

const Outline = () => {
  const agendasContext = useContext(AgendasContext);
  const {
    agenda: { outline: items }
  } = agendasContext;
  return (
    <div>
      {items && items.map(item => <OutlineItem key={item.id} item={item} />)}
    </div>
  );
};

export default Outline;
