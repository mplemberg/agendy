import React from "react";

const HighlightOutlineItem = ({ item }) => {
  return (
    <div className='py-1'>
      &bull;{" "}
      <span className='font-weight-bold p-2 border rounded'> {item.text} </span>
    </div>
  );
};

export default HighlightOutlineItem;
