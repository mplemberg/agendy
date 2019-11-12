import React, { useReducer } from "react";
import AgendasContext from "./agendasContext";
import AgendasReducer from "./agendasReducer";
import { SET_LOADING, LOAD_AGENDA, SET_OUTLINE_ITEM_MODE } from "../types";

const AgendasState = props => {
  const initialState = {
    agendas: [],
    agenda: {},
    loading: false
  };

  const [state, dispatch] = useReducer(AgendasReducer, initialState);

  const loadAgenda = async agendaId => {
    setLoading();
    //mock api
    const agenda = {
      id: 1,
      name: "Sprint Grooming 11/22",
      outline: [
        {
          id: 1,
          label: "Review top backlog items"
        },
        {
          id: 3,
          label: "30 points for this sprint",
          indent: 1
        },
        {
          id: 2,
          label: "Definition of Ready Checklist"
        },
        {
          id: 4,
          label: "30 points for this sprint",
          indent: 1
        }
      ]
    };

    /*let foundAgenda = agendas.find(agenda => {
      return agenda.id == agendaId;
    })*/

    dispatch({
      type: LOAD_AGENDA,
      payload: agenda
    });
  };

  const setOutlineItemMode = (itemId, mode) => {
    dispatch({
      type: SET_OUTLINE_ITEM_MODE,
      payload: { itemId, mode }
    });
  };

  //Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });
  return (
    <AgendasContext.Provider
      value={{
        //make available to all applications
        agenda: state.agenda,
        loading: state.loading,
        loadAgenda,
        setOutlineItemMode
      }}
    >
      {props.children}
    </AgendasContext.Provider>
  );
};

export default AgendasState;
