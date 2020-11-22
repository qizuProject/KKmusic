import { combineReducers } from "redux";
function playList(prevState = [], action) {
  switch (action.type) {
    case "GET_PLAYLIST":
      return action.data;
    default:
      return prevState;
  }
}

export default combineReducers({
  playList,
});
