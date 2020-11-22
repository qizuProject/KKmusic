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
} from "@ant-design/icons";
import "./index.css";
import { reqPlayList } from "@api/songPlayList";
class Playcontrol extends Component {
  state = {
    palylist: [],
  };
  // 触发滚动条
  onAfterChangeOne = (value) => {
    console.log(value);
  };
  // 移入显示
  handleEnter = (e) => {
    e.currentTarget.style.bottom = 0 + "px";
  };
  // 移出隐藏
  handleLeave = (e) => {
    e.currentTarget.style.bottom = -70 + "px";
  };
  onAfterChangeTwo = (value) => {
    console.log(value);
  };
  async componentDidMount() {
    let palyList = await this.props.getPlayList();
    /* this.setState({
      palylist: palyList,
    }); */
  }

  render() {
    // 歌单
    const  {playList} = this.props
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
        {
          playList.map((item)=> {
            return <Menu.Item>
          <div className="flex_c list_item">
            <div className="list_idx"></div>
            <div className="song_name">
              <span>{三生试下}</span>
            </div>
            <div className="artist">
              <a href="/singer_detail/3281874">大欢</a>
            </div>
            <div className="song_opts flex_c">
              <PlusOutlined />
              <HeartOutlined />
              <ArrowDownOutlined />
              <DeleteOutlined />
            </div>
            <div className="time">04:23</div>
          </div>
        </Menu.Item>
          })
        }
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
                      src="https://img1.kuwo.cn/star/albumcover/500/50/90/1786305155.jpg"
                      className="song_img"
                      alt=""
                    />
                  </a>
                  <div>
                    {/* 歌曲名 */}
                    <div className="flex_c info_con">
                      <div className="info">
                        <div>
                          <span className="song_name">入了心的人</span>
                          <span className="artist"> - 苏谭谭</span>
                        </div>
                      </div>
                      {/* 时间 */}
                      <span className="time">00:00/03:47</span>
                      {/* 进度条 */}
                    </div>
                    <div className="progress">
                      <Slider
                        className="progress_bar"
                        tipFormatter={null}
                        defaultValue={60}
                        onAfterChange={this.onAfterChangeOne}
                      />
                    </div>
                  </div>
                </div>
                {/* 中间 */}
                <div className=" col_c flex_c">
                  <StepBackwardOutlined className="prev" />
                  <PlayCircleOutlined className="play" />
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
        </div>
      </div>
    );
  }
}
// 通过conect 传递 需要数据传数据 需要方法传方法
export default connect((state) => ({ playList: state.playList }), {
  getPlayList,
})(Playcontrol);
