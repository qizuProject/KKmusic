import { combineReducers } from "redux";
import { NEW, HOT, TAG } from "./contants";
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
      // console.log(action.data);
      return action.data;

    default:
      return prevState;
  }
}

export default combineReducers({
  songList,
  platListTags,
});
