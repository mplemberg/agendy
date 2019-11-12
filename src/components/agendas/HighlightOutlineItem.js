import React from "react";

const HighlightOutlineItem = ({ item }) => {
  return <div className='font-weight-bold p-2 border'> {item.value} </div>;
};

export default HighlightOutlineItem;
