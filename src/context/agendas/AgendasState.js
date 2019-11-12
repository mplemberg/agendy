import React, { useReducer } from "react";
import AgendasContext from "./agendasContext";
import AgendasReducer from "./agendasReducer";
import {
  SET_LOADING,
  LOAD_AGENDA,
  SET_ACTIVE_ITEM,
  SET_ITEM_PROPERTY
} from "../types";

const AgendasState = props => {
  const initialState = {
    agendas: [],
    agenda: {
      outline: {
        activeItem: {
          id: null,
          mode: null
        },
        items: []
      }
    },
    loading: false
  };

  const [state, dispatch] = useReducer(AgendasReducer, initialState);

  const loadAgenda = async agendaId => {
    setLoading();
    //mock api
    const agenda = {
      id: 1,
      name: "Sprint Grooming 11/22",
      outline: {
        activeItem: {
          id: null,
          mode: null
        },
        items: [
          {
            id: 1,
            value: "Review top backlog items"
          },
          {
            id: 3,
            value: "Don't let ilya take the meeting over",
            indent: 1
          },
          {
            id: 2,
            value: "Definition of Ready Checklist"
          },
          {
            id: 4,
            value: "30 points for this sprint",
            indent: 1
          },
          {
            id: 5,
            value: "need to rethink pointing",
            indent: 2
          }
        ]
      }
    };

    /*let foundAgenda = agendas.find(agenda => {
      return agenda.id == agendaId;
    })*/

    dispatch({
      type: LOAD_AGENDA,
      payload: agenda
    });
  };

  const setActiveItem = (itemId, mode) => {
    dispatch({
      type: SET_ACTIVE_ITEM,
      payload: { id: itemId, mode }
    });
  };

  const isEditingMode = () => {
    return state.agenda.outline.activeItem.mode === "editing";
  };

  const isHighlightingItem = itemId => {
    //debugger;
    return (
      state.agenda.outline.activeItem.id === itemId &&
      state.agenda.outline.activeItem.mode === "highlighting"
    );
  };
  const isEditingItem = itemId => {
    return (
      state.agenda.outline.activeItem.id === itemId &&
      state.agenda.outline.activeItem.mode === "editing"
    );
  };

  const setItemProperty = (itemId, property, value) => {
    dispatch({
      type: SET_ITEM_PROPERTY,
      payload: { id: itemId, value, property }
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
        setActiveItem,
        isEditingMode,
        isHighlightingItem,
        isEditingItem,
        setItemProperty
      }}
    >
      {props.children}
    </AgendasContext.Provider>
  );
};

export default AgendasState;
