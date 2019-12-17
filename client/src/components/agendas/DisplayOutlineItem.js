import React from "react";
import BulletIcon from "./BulletIcon";
const DisplayOutlineItem = ({ item }) => {
  let margin = "";
  if (item.indent && item.indent === 1) {
    margin = "ml-3";
  } else if (item.indent && item.indent === 2) {
    margin = "ml-5";
  }

  const leftColumnSpacer = (
    <div className='col-auto pr-0'>
      {
        //This is needed to line all the text up and have the drag icon to the left
      }
      <div
        style={{
          width: "24px"
        }}
      ></div>
    </div>
  );
  return (
    <div className='row'>
      {leftColumnSpacer}
      <div className='col pl-1'>
        <div className={`row ${margin}`}>
          <div className='col-auto'>
            <BulletIcon indent={item.indent} /> {item.text}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayOutlineItem;
