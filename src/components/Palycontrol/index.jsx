import React, { Component } from "react";
import { connect } from "react-redux";
import { getPlayList } from "@redux/actions";
import { Slider, Popover, Button, Menu, Dropdown } from "antd";
import moment from "moment";
import {
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  HeartOutlined,
  ArrowDownOutlined,
  MessageOutlined,
  RetweetOutlined,
  MenuFoldOutlined,
  SoundOutlined,
  PlusOutlined,
  DeleteOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import "./index.css";
import { reqMusicInfo, reqMusicPlayUrl } from "@api/palydetail";
class Playcontrol extends Component {
  state = {
    isplay: false, // 控制播放图标
    currentAduioTime: 0, // 进度条位置
    currentSongTime: 0, // 当前歌曲播放的时间位置
    musicInfo: [],
    currentIndex: null, // 当前播放歌曲的索引
    playlist: [],
    songCurrentTime: "00:00", // 歌曲当前播放的时间
    mid: "148370024",
  };
  audioRef = React.createRef();
  // 触发滚动条
  onAfterChangeOne = (value) => {
    // 改变播放的时间点
    this.audioRef.current.currentTime =
      (value / 100) * this.audioRef.current.duration;
    // 改变进度条的位置
    this.setState({
      currentAduioTime: this.audioRef.current.currentTime,
      // currentSongTime: this.audioRef.current.currentTime,
    });
  };
  // 移入显示
  handleEnter = (e) => {
    // e.currentTarget.style.bottom = 0 + "px";
  };
  // 移出隐藏
  handleLeave = (e) => {
    // e.currentTarget.style.bottom = -70 + "px";
  };
  // 音量滚动条
  onAfterChangeTwo = (value) => {
    this.audioRef.current.volume = value / 100;
  };
  // 请求音乐信息
  getmusicinfo = async (mid = "148370024") => {
    // 发送请求 获取歌曲详情信息
    let musicInfo = await reqMusicInfo(mid);
    this.setState({
      musicInfo: musicInfo.data,
    });
  };
  async componentDidMount() {
    await this.props.getPlayList();
    // 将redux中  歌曲列表保存
    this.setState({
      playlist: this.props.playList,
    });
    // 请求歌曲信息  需要id  这里没有
    this.getmusicinfo();
  }
  componentDidUpdate() {
    // 首次渲染 不会触发  歌曲播放进度条
    this.audioRef.current.ontimeupdate = () => {
      this.setState({
        currentAduioTime:
          (this.audioRef.current.currentTime / this.audioRef.current.duration) *
          100,
        songCurrentTime: moment(
          Math.ceil(this.audioRef.current.currentTime * 1000)
        ).format("mm:ss"), // 当前歌曲播放的时间
      });

      // 触发父组件playdetail 的事件 将当前歌曲的播放时间 传过去
      this.props.timeUpdate(this.audioRef.current, this.state.currentAduioTime);
    };
  }
  // 点击切换播放/暂停音乐
  playAudio = (boolean) => {
    return () => {
      if (boolean) {
        this.setState({
          isplay: true,
        });
        this.audioRef.current.play();
      } else {
        this.setState({
          isplay: false,
        });
        this.audioRef.current.pause();
      }
    };
  };
  // 获取id 播放歌曲  更新歌曲函数
  async playSong(mid) {
    // 获取歌曲详情
    this.getmusicinfo(mid);
    // 获取播放连接
    let result = await reqMusicPlayUrl(mid);

    // 将链接给到aduio
    this.audioRef.current.src = result.url;
    this.audioRef.current.play();
  }
  // 点击歌单内歌曲播放
  clickToPlay = (mid, index) => {
    return async () => {
      this.playSong(mid);
      // 改变图标的状态
      this.setState({
        isplay: true, // 控制播放图标
        currentIndex: index, // 保存当前歌的索引
      });
    };
  };
  // 上一首
  playPrevOrNext = (type) => {
    return () => {
      const { currentIndex } = this.state;
      let newIndex = null;
      if (type === "prev") {
        newIndex = currentIndex - 1;
      } else {
        newIndex = currentIndex + 1;
      }
      // 合成事件中 setState是异步的  setState 接收第二个参数 等到setState更新完才 执行第二参数回调
      this.setState(
        {
          currentIndex: newIndex,
        },
        () => {
          // 通过索引找到id
          let mid = this.state.playlist[this.state.currentIndex].rid;
          console.log(mid);
          this.playSong(mid);
        }
      );
    };
  };
  render() {
    // 歌单
    const { playList } = this.props;
    const { isplay, currentAduioTime, musicInfo, songCurrentTime } = this.state;
    // console.log(this.props.timeUpdate); // 父组件传递过来的函数
    // 高品质
    const content = (
      <div>
        <p>高品质</p>
        <p>无损 </p>
      </div>
    );
    // 上拉歌单框
    const menu = (
      <Menu className="list_con " id="ant-dropdown-menu">
        {playList.map((item, index) => {
          return (
            <Menu.Item
              key={item.rid}
              data-id={item.rid}
              onClick={this.clickToPlay(item.rid, index)}
            >
              <div className="flex_c list_item">
                <div className="list_idx">{index + 1}</div>
                <div className="song_name">
                  <span>{item.album}</span>
                </div>
                <div className="artist">
                  <a href="###">{item.artist}</a>
                </div>
                <div className="song_opts flex_c">
                  <PlusOutlined />
                  <HeartOutlined />
                  <ArrowDownOutlined />
                  <DeleteOutlined />
                </div>
                <div className="time">{item.songTimeMinutes}</div>
              </div>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return (
      <div
        className=" playControl nolock"
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
      >
        <div className="playControl_inn">
          <div className="control_out">
            {/* <div className="lock">
              </div> */}
            <div className="posi_re">
              {/* 控制条 */}
              <div className="control">
                {/* 左边 */}
                <div className="con_l flex_c">
                  <div className="cover"></div>
                  <a href="https://www.kuwo.cn/play_detail/156499973">
                    <img
                      src={musicInfo.albumpic}
                      className="song_img"
                      alt="hh"
                    />
                  </a>
                  <div>
                    {/* 歌曲名 */}
                    <div className="flex_c info_con">
                      <div className="info">
                        <div>
                          <span className="song_name">{musicInfo.name}</span>
                          <span className="artist"> - {musicInfo.artist}</span>
                        </div>
                      </div>
                      {/* 时间 */}
                      <span className="time">
                        {songCurrentTime}/{musicInfo.songTimeMinutes}
                      </span>
                      {/* 进度条 */}
                    </div>
                    <div className="progress">
                      <Slider
                        className="progress_bar"
                        tipFormatter={null}
                        defaultValue={0}
                        value={currentAduioTime}
                        onChange={this.onAfterChangeOne}
                      />
                    </div>
                  </div>
                </div>
                {/* 中间 */}
                <div className=" col_c flex_c">
                  <StepBackwardOutlined
                    className="prev"
                    onClick={this.playPrevOrNext("prev")}
                  />
                  <PlayCircleOutlined
                    className="play"
                    style={{ display: isplay ? "none" : "block" }}
                    onClick={this.playAudio(true)}
                  />
                  <PauseOutlined
                    style={{ display: isplay ? "block" : "none" }}
                    className="play"
                    onClick={this.playAudio(false)}
                  />
                  <StepForwardOutlined
                    className="next"
                    onClick={this.playPrevOrNext("next")}
                  />
                </div>
                {/* 右边 */}
                <div className="col_r flex_c">
                  <HeartOutlined className="prev" />
                  <ArrowDownOutlined className="prev" />
                  <MessageOutlined className="prev" />
                  <RetweetOutlined />
                  <MenuFoldOutlined></MenuFoldOutlined>
                  <div>
                    <Popover
                      className="song_type"
                      content={content}
                      trigger="hover"
                    >
                      <Button>高品质</Button>
                    </Popover>
                  </div>
                  {/* 歌单 */}
                  <Dropdown overlay={menu} placement="topRight" trigger="click">
                    <Button>当前歌单</Button>
                  </Dropdown>
                  <div className="aduioTwo">
                    <SoundOutlined />
                    <div className="progress">
                      <Slider
                        className="progress_bar"
                        defaultValue={60}
                        tipFormatter={null}
                        // tooltipVisible="false"
                        onAfterChange={this.onAfterChangeTwo}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <audio
            ref={this.audioRef}
            autoPlay="autoplay"
            src="https://win-web-nf01-sycdn.kuwo.cn/50820ffb9e4a928027984609a6c4f38b/5fbbc616/resource/n3/66/50/1054151104.mp3"
          ></audio>
        </div>
      </div>
    );
  }
}
// 通过conect 传递 需要数据传数据 需要方法传方法
export default connect((state) => ({ playList: state.playList }), {
  getPlayList,
})(Playcontrol);
