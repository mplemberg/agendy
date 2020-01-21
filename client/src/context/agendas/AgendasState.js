import React, { useReducer } from "react";
import AgendasContext from "./agendasContext";
import AgendasReducer from "./agendasReducer";
import history from "../../history";
import {
  SET_LOADING,
  LOAD_AGENDA,
  SET_HOVERED_ITEM,
  SET_EDITING_ITEM,
  SET_ITEM_PROPERTY,
  SET_OUTLINE_ITEMS,
  REMOVE_OUTLINE_ITEM,
  ADD_OUTLINE_ITEM,
  SET_PENDING_SAVE,
  SET_TITLE
} from "../types";
import MockHippidyApiClient from "./MockHippidyApiClient";
import HippidyApiClient from "./HippidyApiClient";

const AgendasState = props => {
  const initialState = {
    agendas: [],
    agenda: {
      agendaLines: []
    },
    hoveredItem: null,
    editingItem: null,
    loading: false,
    pendingSave: false
  };

  const [state, dispatch] = useReducer(AgendasReducer, initialState);

  const {
    agenda: { agendaLines },
    agenda
  } = { ...state };

  const apiClient = new HippidyApiClient("");

  const getNewItem = (indent = 0) => {
    return { id: uuidv4(), text: "", indent: indent };
  };

  const saveAgenda = async () => {
    let result;
    let isDraft;
    try {
      if (agenda.savedDate) {
        result = await apiClient.saveDraftAgenda(agenda);
      } else {
        isDraft = true;
        result = await apiClient.createAgenda(agenda);
      }

      dispatch({
        type: LOAD_AGENDA,
        payload: result.data
      });

      if (isDraft) {
        history.push(`/agenda/edit/${result.data.editCode}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const publishAgenda = async () => {
    try {
      const result = await apiClient.publishDraftAgenda(agenda.id);
      dispatch({
        type: LOAD_AGENDA,
        payload: result.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadAgenda = async (code, mode = "view") => {
    setLoading();
    try {
      let result;
      if (mode && mode === "edit") {
        result = await apiClient.getDraftAgenda(code);
      } else {
        result = await apiClient.getPublishedAgenda(code);
      }
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
            text: ""
          }
        ]
      }
    });
  };

  const setEditingItem = item => {
    dispatch({
      type: SET_EDITING_ITEM,
      payload: item
    });
  };

  const clearEditingItem = () => {
    setEditingItem(null);
  };

  const isEditing = () => {
    return state.editingItem !== null;
  };

  const isEditingItem = item => {
    return state.editingItem && item && state.editingItem.id === item.id;
  };

  const setHoveredItem = item => {
    dispatch({
      type: SET_HOVERED_ITEM,
      payload: item
    });
  };

  const clearHoveredItem = () => {
    setHoveredItem(null);
  };

  const isHovering = () => {
    return state.hoveredItem !== null;
  };

  const isHoveredItem = item => {
    return state.hoveredItem === item;
  };

  const setItemProperty = (itemId, property, value) => {
    setPendingSave();
    dispatch({
      type: SET_ITEM_PROPERTY,
      payload: { id: itemId, value, property }
    });
  };

  const setTitle = title => {
    setPendingSave();
    dispatch({
      type: SET_TITLE,
      payload: title
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

    agendaLines.splice(to, 0, agendaLines.splice(from, 1)[0]);

    dispatch({
      type: SET_OUTLINE_ITEMS,
      payload: agendaLines
    });
  };

  const addNewAfter = item => {
    setPendingSave();
    const currentIndex = agendaLines.indexOf(item);
    let newItem = getNewItem(item.indent);
    agendaLines.splice(currentIndex + 1, 0, newItem);
    dispatch({
      type: SET_OUTLINE_ITEMS,
      payload: agendaLines
    });
    setEditingItem(newItem);
    setHoveredItem(newItem);
  };

  const reorderItems = (index, currentItem) => {
    setPendingSave();
    let newAgendaLines = agendaLines.filter(item => item !== currentItem);

    // add the dragged item after the dragged over item
    newAgendaLines.splice(index, 0, currentItem);
    dispatch({
      type: SET_OUTLINE_ITEMS,
      payload: newAgendaLines
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
    setPendingSave();

    dispatch({
      type: ADD_OUTLINE_ITEM,
      payload: getNewItem()
    });
  };

  const removeItem = item => {
    setPendingSave();
    const index = agendaLines.indexOf(item);
    const newlyFocusedItem = agendaLines[index - 1];
    dispatch({
      type: REMOVE_OUTLINE_ITEM,
      payload: index
    });
    setHoveredItem(newlyFocusedItem);
    setEditingItem(newlyFocusedItem);
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

  const moveLeft = item => {
    if (item.indent > 0) {
      setItemProperty(item.id, "indent", item.indent - 1);
    }
  };

  const moveRight = item => {
    if (!item.indent || item.indent !== 2) {
      const indent = (item.indent ? item.indent : 0) + 1;
      setItemProperty(item.id, "indent", indent);
    }
  };
  return (
    <AgendasContext.Provider
      value={{
        //make available to all applications
        agenda: state.agenda,
        loading: state.loading,
        pendingSave: state.pendingSave,
        editingItem: state.editingItem,
        saveAgenda,
        loadAgenda,
        loadDraft,
        setEditingItem,
        setHoveredItem,
        isEditing,
        isHovering,
        isHoveredItem,
        clearHoveredItem,
        clearEditingItem,
        isEditingItem,
        setItemProperty,
        moveItemUp,
        moveItemDown,
        isFirstItem,
        isLastItem,
        addItem,
        removeItem,
        publishAgenda,
        setTitle,
        reorderItems,
        moveLeft,
        moveRight,
        addNewAfter
      }}
    >
      {props.children}
    </AgendasContext.Provider>
  );
};

export default AgendasState;
