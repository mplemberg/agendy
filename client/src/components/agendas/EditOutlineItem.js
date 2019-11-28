import React, { useContext } from "react";
import AgendasContext from "../../context/agendas/agendasContext";
import EditToolbar from "./EditToolbar";
const EditOutlineItem = ({ item }) => {
  const agendasContext = useContext(AgendasContext);
  const { setItemProperty } = agendasContext;
  const onChange = e => {
    setItemProperty(item.id, "text", e.target.value);
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
            value={item.text || ""}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EditOutlineItem;
