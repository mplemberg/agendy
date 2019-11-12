import { SET_LOADING, LOAD_AGENDA, SET_OUTLINE_ITEM_MODE } from "../types";

export default (state, action) => {
  let item = null;
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
    case SET_OUTLINE_ITEM_MODE:
      item = state.agenda.outline.find(i => i.id === action.payload.itemId);
      item.mode = action.payload.mode;
      return {
        ...state
      };
    default:
      return state;
  }
};
