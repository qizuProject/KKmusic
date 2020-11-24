//react
import React, { Component } from "react";
import { reqMusicList } from "@api/MusicList/index.js";
import { Pagination } from "antd";

// 引入样式
import "./index.css";
// 引入图片
import bsb from "@assets/images/bsb.png";
import dy from "@assets/images/dy.png";
import rgb from "@assets/images/rgb.png";
import xgb from "@assets/images/xgb.png";
import hyrt from "@assets/images/hyrt.png";

import axios from "axios";

export default class index extends Component {
  // 初始定义一个空的数组
  state = {
    musicList: [],
    comment: [],
  };
  onMusicChange = async (val) => {
    const size = val;
    const page = 93;
    const sizePage = 30;
    const ff = await reqMusicList(page, size, sizePage);
    this.setState({
      musicList: ff.data.musicList,
    });
  };
  onPlayChange = async (val) => {
    const page = val;
    const comm = await axios.get(
      `http://localhost:3300/comment?sid=80958029&type=get_rec_comment&page=${page}&rows=30&digest=15`
    );
    if (comm.data.rows) {
      this.setState({
        comment: comm.data.rows,
      });
    }
    // console.log(comm);
  };

  // 异步请求音乐排行列表
  async componentDidMount() {
    const ff = await reqMusicList();
    this.setState({
      musicList: ff.data.musicList,
    });
    const comm = await axios.get(
      `http://localhost:3300/comment?sid=80958029&type=get_rec_comment&page=1&rows=30&digest=15`
    );
    // console.log(comm);
    this.setState({
      comment: comm.data.rows,
    });
  }

  render() {
    // 将音乐排行榜数据进行解构
    const { musicList, comment } = this.state;

    // 分页

    /* 最外层盒子 */
    return (
      <div className="__nuxt">
        {/* 第二层盒子 */}
        <div className="__layout">
          {/* 第三层盒子 */}
          <div className="page">
            {/* 内容区域 */}
            <div className="container">
              <div>
                {/* 搜索跳转栏 */}
                <div className="sub_nav">
                  <div>
                    <a href="##">推荐</a>
                    <a href="##" className="active">
                      排行榜
                    </a>
                    <a href="##">歌手</a>
                    <a href="##">歌单</a>
                    <a href="##">MV</a>
                  </div>
                </div>
                {/* 酷我飙升榜 */}
                <div className="main_con">
                  {/* 左边栏区域 */}
                  <div className="con_l">
                    {/* 左边栏内容 */}
                    <div className="con">
                      {/* 左边栏头部 */}
                      <div className="tabs flex_c">
                        <span className="active">官方版</span>
                        <span>特色版</span>
                        <span>场景版</span>
                      </div>
                      {/*  标签内容*/}
                      <ul className="tab_con">
                        <li className="flex_c active">
                          <img className="cover" src={bsb} alt="飙升榜" />
                          <div className="item_info">
                            <p className="name">酷我飙升榜</p>
                            <p className="time">今日更新</p>
                          </div>
                        </li>
                        <li className="flex_c">
                          <img className="cover" src={xgb} alt="新歌榜" />
                          <div className="item_info">
                            <p className="name">酷我新歌榜</p>
                            <p className="time">今日更新</p>
                          </div>
                        </li>
                        <li className="flex_c">
                          <img className="cover" src={rgb} alt="热歌榜" />
                          <div className="item_info">
                            <p className="name">酷我热歌榜</p>
                            <p className="time">今日更新</p>
                          </div>
                        </li>
                        <li className="flex_c">
                          <img className="cover" src={dy} alt="抖音热歌榜" />
                          <div className="item_info">
                            <p className="name">抖音热歌榜</p>
                            <p className="time">今日更新</p>
                          </div>
                        </li>
                        <li className="flex_c">
                          <img className="cover" src={hyrt} alt="会员畅听榜" />
                          <div className="item_info">
                            <p className="name">会员畅听榜</p>
                            <p className="time">今日更新</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {/* 右边区域栏 */}
                    <div className="con_r">
                      <div>
                        <div className="con_r1">
                          <span className="title">酷我飙升榜</span>
                          <span className="update_time">
                            更新时间：2020-11-21
                          </span>
                        </div>
                        <div className="btns">
                          <button className="play bg_primary">
                            <i className="iconfont icon-icon_play_"></i>
                            <span> 播放全部</span>
                          </button>
                          <button>
                            <i className="iconfont icon-playlist_icon_add_"></i>
                            <span>添加</span>
                          </button>
                          <button>
                            <i className="iconfont icon-bar_icon_heart_"></i>
                            <span>收藏</span>
                          </button>
                          <a href="##">
                            <i className="iconfont icon-bar_icon_ncomment_"></i>
                            <span>评论</span>
                          </a>
                        </div>
                        {/* 右侧歌曲详情列表 */}
                        <div className="list_out">
                          <div>
                            <div className="list_head">
                              <ul className="flex_cd">
                                <li className="c">序号</li>
                                <li className="head_name">歌曲</li>
                                <li className="head_artist">歌手</li>
                                <li className="head_album">专辑</li>
                                <li className="head_time">时长</li>
                              </ul>
                            </div>
                            {/* 排行榜列表 */}
                            <ul className="rank_list">
                              {/* 第一排 */}
                              {musicList.map((item, index) => {
                                return (
                                  <li className="song_item" key={item.rid}>
                                    <div className="song_rank ">
                                      <div className="rank_num top1">
                                        {index + 1}
                                      </div>
                                      <div className="status"></div>
                                      <img className="cover" src="" alt="" />
                                    </div>
                                    <div className="song_name ">
                                      <img src={item.pic} alt="" />
                                      <a href="##" className="name">
                                        {item.album}
                                      </a>
                                      <i className="type iconfont icon-tag_wusun"></i>
                                    </div>
                                    <div className="song_artist">
                                      <span title="IN-K&王忻辰">
                                        {item.artist}
                                      </span>
                                    </div>
                                    <div className="song_album">
                                      <span title="迷失幻境">{item.name}</span>
                                    </div>
                                    <div className="song_time">
                                      <span>{item.songTimeMinutes}</span>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                            <div className="page_con">
                              <Pagination
                                defaultCurrent={1}
                                total={50}
                                onChange={this.onMusicChange}
                              />
                            </div>
                          </div>
                        </div>

                        {/* 评论区域 */}
                        <div id="comment_con" className="comment_con">
                          <div className="all-comment">
                            {/* 热门评论 */}

                            <div className="type">
                              <span>热门评论</span>
                            </div>
                            {/* 首条评论 */}
                            {comment.map((item) => {
                              return (
                                <div className="each-comment" key={item.id}>
                                  <div className="each-comment-avatar">
                                    <img src={item.u_pic} alt="" />
                                  </div>
                                  <div className="each-comment-msg">
                                    <div className="each-comment-nickname">
                                      {decodeURIComponent(item.u_name)}
                                    </div>
                                    <div className="each-comment-content text-selection">
                                      {item.msg}
                                    </div>
                                    <div className="each-comment-time">
                                      <div className="time">{item.time}</div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div>
                            <div className="page_con">
                              <Pagination
                                defaultCurrent={1}
                                total={50}
                                onChange={this.onPlayChange}
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
          </div>
        </div>
      </div>
    );
  }
}
