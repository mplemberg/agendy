import React, { useContext } from "react";
import EditableField from "./EditableField";
import AgendasContext from "../../context/agendas/agendasContext";
import Icon from "react-fontawesome";
import DisplayOutlineItem from "./DisplayOutlineItem";
import HighlightOutlineItem from "./HighlightOutlineItem";
import EditOutlineItem from "./EditOutlineItem";
const OutlineEditor = () => {
  const agendasContext = useContext(AgendasContext);
  const {
    agenda: { agendaLines },
    addItem
  } = agendasContext;

  return (
    <div>
      <div className='pb-2'>
        {agendaLines &&
          agendaLines.map(item => {
            let display = <DisplayOutlineItem item={item} />;
            let highlight = <HighlightOutlineItem item={item} />;
            let edit = <EditOutlineItem item={item} />;
            return (
              <EditableField
                key={item.id}
                item={item}
                display={display}
                highlight={highlight}
                edit={edit}
              />
            );
          })}
      </div>
      <button className='btn btn-primary btn-sm' onClick={addItem}>
        <Icon name='plus' />
      </button>
    </div>
  );
};

export default OutlineEditor;
