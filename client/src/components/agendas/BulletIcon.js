import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle as circleSolid,
  faSquare as square
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as circleOutline } from "@fortawesome/free-regular-svg-icons";

const BulletIcon = ({ indent }) => {
  let icon = circleSolid;
  if (indent && indent > 0) {
    icon = indent === 1 ? circleOutline : square;
  }
  return <FontAwesomeIcon className='pr-2' icon={icon} />;
};

export default BulletIcon;
