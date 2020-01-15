import React from "react";
import Moment from "react-moment";

export const AgendaDate = ({ date }) => {
  return <Moment format='LLL'>{date}</Moment>;
};
