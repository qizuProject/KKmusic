import { combineReducers } from "redux";
import { NEW, HOT, TAG } from "./contants";

function playList(prevState = [], action) {
  switch (action.type) {
    case "GET_PLAYLIST":
      return action.data;
    default:
      return prevState;
  }
}
//歌单数据
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

//标签数据
function platListTags(prevState = [], action) {
  switch (action.type) {
    case TAG:
      return action.data;

    default:
      return prevState;
  }
}

export default combineReducers({
  playList,
  songList,
  platListTags,
});
