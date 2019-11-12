import React, { useContext } from "react";
import OutlineItem from "./OutlineItem";
import AgendasContext from "../../context/agendas/agendasContext";
import Icon from "react-fontawesome";

const Outline = () => {
  const agendasContext = useContext(AgendasContext);
  const {
    agenda: { outline },
    addItem
  } = agendasContext;
  return (
    <div>
      <div className='pb-2'>
        {outline.items &&
          outline.items.map(item => <OutlineItem key={item.id} item={item} />)}
      </div>
      <button className='btn btn-primary btn-sm' onClick={addItem}>
        <Icon name='plus' />
      </button>
    </div>
  );
};

export default Outline;
