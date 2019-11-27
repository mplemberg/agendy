import React, { useReducer } from "react";
import AgendasContext from "./agendasContext";
import AgendasReducer from "./agendasReducer";
import history from "../../history";
import {
  SET_LOADING,
  LOAD_AGENDA,
  SET_ACTIVE_ITEM,
  SET_ITEM_PROPERTY,
  SET_OUTLINE_ITEMS,
  REMOVE_OUTLINE_ITEM,
  ADD_OUTLINE_ITEM,
  SET_PENDING_SAVE,
  SET_PENDING_PUBLISH
} from "../types";
import MockHippidyApiClient from "./MockHippidyApiClient";
import HippidyApiClient from "./HippidyApiClient";

const AgendasState = props => {
  const initialState = {
    agendas: [],
    agenda: {
      agendaLines: []
    },
    activeOutlineItem: {
      id: null,
      mode: null
    },
    loading: false,
    pendingSave: false,
    pendingPublish: false
  };

  const [state, dispatch] = useReducer(AgendasReducer, initialState);

  const {
    agenda: { agendaLines },
    agenda
  } = { ...state };

  //THIS IS JUST A TEST TO SHOW THE API WORKS
  //const apiTest = await axios.get("/api/agendas/");
  //console.log("agendas api test: " + apiTest.data[0].agendaLines[0].text);

  const apiClient = new HippidyApiClient("");

  const saveAgenda = async () => {
    let result;
    let isDraft;
    try {
      if (agenda.saveDatetime) {
        result = await apiClient.updateAgenda(agenda.id, agenda);
      } else {
        isDraft = true;
        result = await apiClient.createAgenda(agenda);
      }

      dispatch({
        type: LOAD_AGENDA,
        payload: result.data
      });

      if (isDraft) {
        history.push(`/agendas/${result.data.editCode}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const loadAgenda = async agendaId => {
    setLoading();
    try {
      const result = await apiClient.getAgenda(agendaId);
      let agenda = result.data;

      dispatch({
        type: LOAD_AGENDA,
        payload: agenda
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadDraft = () => {
    dispatch({
      type: LOAD_AGENDA,
      payload: {
        name: "Untitled",
        agendaLines: [
          {
            id: 1,
            text: "Untitled"
          }
        ]
      }
    });
  };

  const setActiveItem = (itemId, mode) => {
    dispatch({
      type: SET_ACTIVE_ITEM,
      payload: { id: itemId, mode }
    });
  };

  const isEditingMode = () => {
    return state.activeOutlineItem.mode === "editing";
  };

  const isHighlightingItem = itemId => {
    //debugger;
    return (
      state.activeOutlineItem.id === itemId &&
      state.activeOutlineItem.mode === "highlighting"
    );
  };
  const isEditingItem = itemId => {
    return (
      state.activeOutlineItem.id === itemId &&
      state.activeOutlineItem.mode === "editing"
    );
  };

  const setItemProperty = (itemId, property, value) => {
    setPendingSave();
    dispatch({
      type: SET_ITEM_PROPERTY,
      payload: { id: itemId, value, property }
    });
  };

  const moveItemUp = item => {
    setPendingSave();
    const from = agendaLines.indexOf(item);
    const to = from - 1;
    agendaLines.splice(to, 0, agendaLines.splice(from, 1)[0]);

    dispatch({
      type: SET_OUTLINE_ITEMS,
      payload: agendaLines
    });
  };

  const moveItemDown = item => {
    setPendingSave();
    const from = agendaLines.indexOf(item);
    const to = from + 1;

    agendaLines.items.splice(to, 0, agendaLines.items.splice(from, 1)[0]);

    dispatch({
      type: SET_OUTLINE_ITEMS,
      payload: agendaLines
    });
  };

  //TODO: Should we just save the order on the object?
  const isLastItem = item => {
    const index = agendaLines.indexOf(item);
    return index !== agendaLines.length - 1;
  };

  const isFirstItem = item => {
    const index = agendaLines.indexOf(item);
    return index !== 0;
  };

  const addItem = () => {
    const newItem = {
      id: uuidv4(),
      value: "",
      indent: 0,
      mode: "editing"
    };
    dispatch({
      type: ADD_OUTLINE_ITEM,
      payload: newItem
    });
  };

  const removeItem = item => {
    const index = agendaLines.indexOf(item);
    dispatch({
      type: REMOVE_OUTLINE_ITEM,
      payload: index
    });
  };

  const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };
  //Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });
  const setPendingSave = () => dispatch({ type: SET_PENDING_SAVE });
  const setPendingPublish = () => dispatch({ type: SET_PENDING_PUBLISH });
  return (
    <AgendasContext.Provider
      value={{
        //make available to all applications
        agenda: state.agenda,
        loading: state.loading,
        pendingSave: state.pendingSave,
        pendingPublish: state.pendingPublish,
        activeOutlineItem: state.activeOutlineItem,
        saveAgenda,
        loadAgenda,
        loadDraft,
        setActiveItem,
        isEditingMode,
        isHighlightingItem,
        isEditingItem,
        setItemProperty,
        moveItemUp,
        moveItemDown,
        isFirstItem,
        isLastItem,
        addItem,
        removeItem
      }}
    >
      {props.children}
    </AgendasContext.Provider>
  );
};

export default AgendasState;
