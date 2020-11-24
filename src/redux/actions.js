import { reqPlayList } from "@api/songPlayList";
// 同步action
const getPlayListSuccess = (playlist) => ({
  type: "GET_PLAYLIST",
  data: playlist,
});

// 异步action
export const getPlayList = () => {
  return async (dispatch) => {
    const result = await reqPlayList();
    // 触发dispatch 更新redux
    const action = await getPlayListSuccess(result.data.musicList);
    dispatch(action);
  };
};
