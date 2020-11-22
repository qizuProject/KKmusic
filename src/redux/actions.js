//歌单部分，分为最新，最热
import { NEW, HOT } from "./contants";
//引入api
import { reqDefaultPlayList } from "@api/songlist";
export const newPlayList = (data) => ({ type: NEW, data: data });
export const hotPlayList = (data) => ({ type: HOT, data: data });

//最新歌单
// export const newPlayListAsync = (order, rn, pn) => {
//   return async (dispatch) => {
//     const result = await reqDefaultPlayList(order, rn, pn);
//     const data = result.data.map((item) => {
//       return {
//         img: item.img,
//         title: item.name,
//         listencnt: item.listencnt,
//         id: item.id,
//       };
//     });
//     const action = newPlayList(data);
//     dispatch(action);
//   };
// };

// export const hotPlayListAsync = (order, rn, pn) => {
//   return async (dispatch) => {
//     const result = await reqDefaultPlayList(order, rn, pn);
//     const action = hotPlayList(result);
//     dispatch(action);
//   };
// };

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
