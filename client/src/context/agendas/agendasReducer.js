import {
  SET_LOADING,
  LOAD_AGENDA,
  SET_ACTIVE_ITEM,
  SET_ITEM_PROPERTY,
  SET_OUTLINE_ITEMS,
  REMOVE_OUTLINE_ITEM,
  ADD_OUTLINE_ITEM,
  SET_PENDING_SAVE
} from "../types";

export default (state, action) => {
  let item = null;
  let agenda = {
    ...state.agenda
  };
  switch (action.type) {
    case LOAD_AGENDA:
      return {
        ...state,
        loading: false,
        pendingSave: false,
        agenda: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_PENDING_SAVE:
      return {
        ...state,
        pendingSave: true
      };

    case SET_ACTIVE_ITEM:
      return {
        ...state,
        activeOutlineItem: action.payload
      };
    case SET_ITEM_PROPERTY:
      item = state.agenda.agendaLines.find(i => {
        return i.id === action.payload.id;
      });
      item[action.payload.property] = action.payload.value;
      return {
        ...state
      };
    case SET_OUTLINE_ITEMS:
      agenda.agendaLines = action.payload;
      return {
        ...state,
        agenda
      };
    case ADD_OUTLINE_ITEM:
      agenda.agendaLines.push(action.payload);
      return {
        ...state,
        agenda
      };
    case REMOVE_OUTLINE_ITEM:
      agenda.agendaLines.splice(action.payload, 1);
      return {
        ...state,
        agenda
      };
    default:
      return state;
  }
};
