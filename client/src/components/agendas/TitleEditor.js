import React, { useContext } from "react";
import EditableField from "./EditableField";
import AgendasContext from "../../context/agendas/agendasContext";

const TitleEditor = ({ title }) => {
  const agendasContext = useContext(AgendasContext);
  const { setTitle, clearActiveItem } = agendasContext;
  const onChange = e => {
    setTitle(e.target.value);
  };

  let display = title;
  let highlight = (
    <div className='py-1'>
      <span className='font-weight-bold p-2 border rounded'> {title} </span>
    </div>
  );

  let edit = (
    <input
      autoFocus
      type='text'
      className='form-control'
      value={title || ""}
      onChange={onChange}
    />
  );

  return (
    <div>
      <EditableField
        item={{ id: "title" }}
        display={display}
        highlight={highlight}
        edit={edit}
      />
    </div>
  );
};

export default TitleEditor;
