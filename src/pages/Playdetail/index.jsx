import React, { Component } from "react";
import { Button, Pagination } from "antd";
import {
  DownloadOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  HeartOutlined,
  RotateRightOutlined,
  EllipsisOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./index.css";
import Playcontrol from "@comps/Palycontrol";
// 引入请求函数
import { reqMusicInfo } from "@api/palydetail";
// 评论组件
import Commenet from "@comps/comment";
export default class Playdetail extends Component {
  state = {
    current: 1,
    musicInfo: {}, // 歌曲详情
    mid:'156499973', // 歌曲id
  };
  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
    });
  };
  async componentDidMount() {
    try {
      // 发送请求 获取歌曲详情信息
      let musicInfo = await reqMusicInfo("156499973");
      // 更新数据
      this.setState({
        musicInfo: musicInfo.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { musicInfo } = this.state;
    return (
      <>
        <div className="container">
          <div className="main_con">
            {/* 主内容 */}
            <div className="content">
              {/* 内容左边 */}
              <div className="info_l">
                <div className="cover_out">
                  <img src={musicInfo.albumpic} className="cover" />
                  <p className="intr">专辑简介</p>
                  <p className="intr_txt">{musicInfo.albuminfo}</p>
                  <Button
                    className="download bg_primary"
                    type="primary"
                    icon={<DownloadOutlined />}
                    size="large"
                  >
                    下载这首歌
                  </Button>
                </div>
                {/* 二维码 */}
                <div className="qrcode-container">
                  <img
                    src="https://h5static.kuwo.cn/www/kw-www/img/qrcode.d53daff.png"
                    alt="扫码下载"
                  />
                  <p>手机扫描二维码下载客户端</p>
                </div>
              </div>
              {/* 内容右边 */}
              <div className="info_r">
                {/* <input type="hidden" value="入了心的人" /> */}
                {/* 歌曲信息 */}
                {/* 上部分 */}
                <div>
                  {/* <h1 style={{ display: "block" }}>入了心的人</h1> */}
                  <p className="song_name flex_c">
                    <span className="name">{musicInfo.name}</span>
                  </p>
                  <p>
                    <span className="name">{musicInfo.artist}</span>
                  </p>
                  <p className="song_info">
                    <span>专辑：</span>
                    <span className="tip"></span>
                    <span className="tip album_name">{musicInfo.album}</span>
                    <span>发行时间：</span>
                    {/* <span>上传时间</span> */}
                    <span>{musicInfo.releaseDate}</span>
                  </p>
                  <div className="btns">
                    <Button
                      className="paly bg_primary"
                      type="primary"
                      shape="round"
                      icon={<PlayCircleOutlined />}
                      size="large"
                    >
                      播放歌曲
                    </Button>
                    <Button
                      className="paly"
                      type="default"
                      shape="round"
                      icon={<PlusOutlined />}
                      size="large"
                    >
                      添加
                    </Button>
                    <Button
                      className="paly"
                      type="default"
                      shape="round"
                      icon={<HeartOutlined />}
                      size="large"
                    >
                      收藏
                    </Button>
                    <Button
                      className="paly"
                      type="default"
                      shape="round"
                      icon={<RotateRightOutlined />}
                      size="large"
                    >
                      分享
                    </Button>
                    <Button
                      className="paly"
                      type="default"
                      shape="round"
                      icon={<EllipsisOutlined />}
                      size="large"
                    >
                      评论
                    </Button>
                  </div>
                  {/* 歌词 */}
                  <div>
                    {/* 无歌词 */}
                    <div
                      id="lyric"
                      className="lyric"
                      style={{ maxHeight: "429px" }}
                    >
                      <div>
                        <p>暂无歌词</p>
                      </div>
                    </div>
                    {/* 有歌词 */}
                    <div className="loading-mask" style={{ display: "none" }}>
                      <div className="loading-wrap">
                        <div className="load ">....歌词区域</div>
                      </div>
                      <div className="down" style={{ display: "none" }}>
                        <span>
                          展开
                          <DownOutlined className="iconfont"></DownOutlined>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 评论 */}
                  <Commenet mid={this.state.mid}></Commenet>
                  <Pagination
                    current={this.state.current}
                    onChange={this.onChange}
                    total={50}
                  />
                </div>
              </div>
            </div>
          </div>
          <Playcontrol></Playcontrol>
        </div>
      </>
    );
  }
}
