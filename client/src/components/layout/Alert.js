import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import Icon from "react-fontawesome";

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type} mt-2`}>
        <Icon name='info-circle' /> {alert.msg}
      </div>
    )
  );
};

export default Alert;
