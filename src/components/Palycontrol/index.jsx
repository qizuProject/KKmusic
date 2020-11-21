import React, { Component } from "react";
import { Slider, Popover, Button } from "antd";
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
} from "@ant-design/icons";
import "./index.css";
export default class index extends Component {
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
  render() {
    // 高品质
    const content = (
      <div>
        <p>高品质</p>
        <p>无损 </p>
      </div>
    );
    return (
      <div>
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
                    <RetweetOutlined className="prev" />
                    <MenuFoldOutlined className="prev" />
                    <div>
                      <Popover
                        className="song_type"
                        content={content}
                        trigger="hover"
                      >
                        <Button>高品质</Button>
                      </Popover>
                    </div>
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
      </div>
    );
  }
}
