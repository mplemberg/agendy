import React, { useContext } from "react";
import AgendasContext from "../../context/agendas/agendasContext";
import EditToolbar from "./EditToolbar";
const EditOutlineItem = ({ item }) => {
  const agendasContext = useContext(AgendasContext);
  const { setItemProperty } = agendasContext;
  const onChange = e => {
    setItemProperty(item.id, "value", e.target.value);
  };
  return (
    <div className='row'>
      <div className='col'>
        <div className='row'>
          <EditToolbar item={item} />
        </div>
        <div className='row'>
          <input
            autoFocus
            type='text'
            className='form-control'
            value={item.value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EditOutlineItem;
