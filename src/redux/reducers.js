import { combineReducers } from "redux";
import { NEW, HOT } from "./contants";
function songList(prevState = [], action) {
  switch (action.type) {
    case NEW:
      return action.data;
    case HOT:
      return action.data;
    default:
      return prevState;
  }
}

export default combineReducers({
  songList,
});
