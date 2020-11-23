import React, { Component } from "react";
import { connect } from "react-redux";
import { getPlayList } from "@redux/actions";
import { Slider, Popover, Button, Menu, Dropdown } from "antd";
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
import { reqMusicInfo } from "@api/palydetail";
class Playcontrol extends Component {
  state = {
    isplay: false, // 控制播放
    currentAduioTime: 0, // 进度条位置
    musicInfo: [],
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
  getmusicinfo = async () => {
    // 发送请求 获取歌曲详情信息
    let musicInfo = await reqMusicInfo("156499973");
    this.setState({
      musicInfo: musicInfo.data,
    });
  };
  async componentDidMount() {
    this.props.getPlayList();
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
      });
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
  // 播放时间变化

  render() {
    // 歌单
    const { playList } = this.props;
    const { isplay, currentAduioTime, musicInfo } = this.state;
    // 高品质
    const content = (
      <div>
        <p>高品质</p>
        <p>无损 </p>
      </div>
    );
    // 上拉歌单框
    const menu = (
      <Menu className="list_con " data-id="ant-dropdown-menu">
        {playList.map((item, index) => {
          return (
            <Menu.Item key={item.rid} id={item.rid}>
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
                          <span className="song_name">{musicInfo.album}</span>
                          <span className="artist"> - {musicInfo.artist}</span>
                        </div>
                      </div>
                      {/* 时间 */}
                      <span className="time">
                        00:00/{musicInfo.songTimeMinutes}
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
                  <StepBackwardOutlined className="prev" />
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
                  <StepForwardOutlined className="next" />
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
            src="https://ex-sycdn.kuwo.cn/745801553bc3f4a3631df5cd2566c834/5fbb0d13/resource/n1/50/53/1833251662.mp3"
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
