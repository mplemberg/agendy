import React, { useContext } from "react";
import OutlineItem from "./OutlineItem";
import AgendasContext from "../../context/agendas/agendasContext";
import Icon from "react-fontawesome";

const Outline = () => {
  const agendasContext = useContext(AgendasContext);
  const {
    agenda: { agendaLines },
    addItem
  } = agendasContext;
  return (
    <div>
      <div className='pb-2'>
        {agendaLines &&
          agendaLines.map(item => <OutlineItem key={item.id} item={item} />)}
      </div>
      <button className='btn btn-primary btn-sm' onClick={addItem}>
        <Icon name='plus' />
      </button>
    </div>
  );
};

export default Outline;
