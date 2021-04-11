import { SHOW_ADD_PROJECT_MODAL, HIDE_ADD_PROJECT_MODAL } from './actionTypes';
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case SHOW_ADD_PROJECT_MODAL:
      return { ...state, addProject: true };
    case HIDE_ADD_PROJECT_MODAL:
      return { ...state, addProject: false };
    default:
      return state;
  }
};

export default reducer;
