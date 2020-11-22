//歌单部分，分为最新，最热
import { NEW, HOT, TAG } from "./contants";
//引入api
import { reqDefaultPlayList, reqTags } from "@api/songlist";
export const newPlayList = (data) => ({ type: NEW, data: data });
export const hotPlayList = (data) => ({ type: HOT, data: data });

export const playListTags = (data) => ({ type: TAG, data: data });

//请求最新或最热歌单
export const newOrHotPlayListAsync = (order, rn, pn) => {
  return async (dispatch) => {
    const result = await reqDefaultPlayList(order, rn, pn);
    const data = result.data.map((item) => {
      return {
        img: item.img,
        title: item.name,
        listencnt: item.listencnt,
        id: item.id,
      };
    });
    let action;
    if ((order = "new")) {
      action = newPlayList(data);
    } else if ((order = "hot")) {
      action = hotPlayList(data);
    }
    dispatch(action);
  };
};

//请求标签
export const tags = () => {
  return async (dispatch) => {
    let result = await reqTags();
    const tags = result.map((item) => {
      return {
        type_id: item.id,
        type: item.name,
        data: item.data.map((tag) => {
          return {
            name: tag.name,
            tag_id: tag.id,
          };
        }),
      };
    });
    // console.log(tags);
    const action = playListTags(tags);
    dispatch(action);
  };
};
