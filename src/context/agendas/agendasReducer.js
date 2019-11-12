import {
  SET_LOADING,
  LOAD_AGENDA,
  SET_ACTIVE_ITEM,
  SET_ITEM_PROPERTY,
  SET_OUTLINE_ITEMS
} from "../types";

export default (state, action) => {
  let item = null;
  let agenda = null;
  switch (action.type) {
    case LOAD_AGENDA:
      return {
        ...state,
        loading: false,
        agenda: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_ACTIVE_ITEM:
      agenda = {
        ...state.agenda
      };
      agenda.outline.activeItem = action.payload;
      return {
        ...state,
        agenda
      };
    case SET_ITEM_PROPERTY:
      item = state.agenda.outline.items.find(i => {
        return i.id === action.payload.id;
      });
      item[action.payload.property] = action.payload.value;
      return {
        ...state
      };
    case SET_OUTLINE_ITEMS:
      agenda = {
        ...state.agenda
      };
      agenda.outline.items = action.payload;
      return {
        ...state,
        agenda
      };
    default:
      return state;
  }
};