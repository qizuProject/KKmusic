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
    console.log(result);
    // 触发dispatch 更新redux
    const action = await getPlayListSuccess(result.data.data);
    dispatch(action);
  };
};
