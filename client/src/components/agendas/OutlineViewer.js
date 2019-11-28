import React, { useContext } from "react";
import DisplayOutlineItem from "./DisplayOutlineItem";
import AgendasContext from "../../context/agendas/agendasContext";

const OutlineViewer = () => {
  const agendasContext = useContext(AgendasContext);
  const {
    agenda: { agendaLines }
  } = agendasContext;
  return (
    <div>
      <div className='pb-2'>
        {agendaLines &&
          agendaLines.map(item => (
            <DisplayOutlineItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default OutlineViewer;
