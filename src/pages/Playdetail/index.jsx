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
import { reqMusicInfo, reqMusicRecComment } from "@api/palydetail";

export default class Playdetail extends Component {
  state = {
    current: 1,
    musicInfo: {}, // 歌曲详情
    recComment: [],
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
      // 热门评论
      let recComment = await reqMusicRecComment("156499973");
      console.log(recComment.rows);
      // 更新数据
      this.setState({
        musicInfo: musicInfo.data,
        recComment: recComment.rows,
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
                  <div id="comment_con" className="comment_con">
                    {/* 热门评论 */}
                    <div className="all-comment">
                      <div className="type">
                        <span>热门评论</span>
                        <span className="comment-num">2条</span>
                      </div>
                      <div className="each-comment">
                        <div className="each-comment-avatar">
                          <img
                            src="http://img1.kuwo.cn/star/userhead/0/43/1605847800492_519843400s.jpg"
                            alt=""
                          />
                        </div>
                        <div className="each-comment-msg">
                          <div className="each-comment-nickname">
                            <span>晚晴</span>
                          </div>
                          <div className="each-comment-content text-selection">
                            鱼那么信任水，水却把它给煮了。树叶那么信任风，风却把它给吹落了。我那么信任你，你却把我给删了。后来我才知道，把鱼煮了的不是水，而是火。把树叶吹落的不是风，而是秋天。删我的不是你，而是我的自作多情!
                          </div>
                          <div className="each-comment-time">
                            <div className="time">20小时前</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 最新评论 */}
                    <div className="all-comment">
                      <div className="type">
                        最新评论
                        <span className="comment-num">32条</span>
                      </div>
                      <div className="new-comment-out">
                        <div className="each-comment">
                          <div className="each-comment-avatar">
                            <img
                              src="http://img3.kuwo.cn/star/userhead/53/43/1594599120301_521837953s.jpg"
                              alt=""
                            />
                          </div>
                          <div className="each-comment-msg">
                            <div className="each-comment-nickname">
                              <span>晚晴</span>
                            </div>
                            <div className="each-comment-content text-selection">
                              <a href="##" className="reply-name">
                                回复
                                <span>@晚晴</span>
                              </a>
                              <span>说的对</span>
                            </div>
                            <div className="each-reply-content">
                              <span className="text-selection">
                                鱼那么信任水，水却把它给煮了。树叶那么信任风，风却把它给吹落了。我那么信任你，你却把我给删了。后来我才知道，把鱼煮了的不是水，而是火。把树叶吹落的不是风，而是秋天。删我的不是你，而是我的自作多情!
                              </span>
                            </div>
                            <div className="each-comment-time">
                              <div className="time">20小时前</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Pagination
                        current={this.state.current}
                        onChange={this.onChange}
                        total={50}
                      />
                      ;
                    </div>
                  </div>
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
