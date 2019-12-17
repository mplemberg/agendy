import React from "react";
import BulletIcon from "./BulletIcon";
const DisplayOutlineItem = ({ item }) => {
  let margin = "";
  if (item.indent && item.indent === 1) {
    margin = "ml-3";
  } else if (item.indent && item.indent === 2) {
    margin = "ml-5";
  }

  return (
    <div className={`${margin}`}>
      <BulletIcon indent={item.indent} /> {item.text}{" "}
    </div>
  );
};

export default DisplayOutlineItem;
