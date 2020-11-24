import React, { Component } from "react";
// 引入图标
import { RightOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import "./index.css";
import Banner from "@pages/Recommend/Banner";
import {
  reqPlayListTags,
  reqPlayListById,
  reqRecommend,
  reqBangList,
  reqRecSinger,
} from "@api/index.js";

import { Menu } from "antd";

export default class Recommend extends Component {
  state = {
    // 歌单分类导航事件
    playList: [],
    // 需要使用的歌单数据
    useSongList: [],
    // 每日推荐歌单数据
    useRecommendSong: [],
    // 排行榜数据
    bangList: [],
    // 歌手分类导航数据
    singerList: [],
    // 控制样式是否显示的状态数据
    currentIndex: -1,
    current: true,
    currentMeun: "currentMeun",
  };

  async componentDidMount() {
    // 获取分类导航数量
    const songTags = await reqPlayListTags();
    const playList = songTags.data[0].data.slice(0, 4);
    this.setState({
      playList,
    });
    // 每日推荐数据
    this.getRecommendSong();
    // 排行榜数据
    this.getBanglist();
    // 获取歌手对应歌曲数据信息
    this.getChinaMusic();
  }
  // 获取排行榜事件
  getBanglist = async () => {
    const result = await reqBangList();
    this.setState({
      bangList: result.data,
    });
  };
  // 获取每日推荐数据
  getRecommendSong = async () => {
    const recommendSong = await reqRecommend();
    const useRecommendSong = recommendSong.data.data.slice(0, 5);

    this.setState({
      useRecommendSong,
      current: true,
      currentIndex: -1,
    });
  };

  // 根据id获取歌单数据
  handleClick = (id, index) => {
    return async () => {
      // 总歌单数据
      const songList = await reqPlayListById(id);
      console.log(songList);
      // 使用的歌单数据
      const useRecommendSong = songList.data.data.slice(0, 5);
      this.setState({
        useRecommendSong,
        currentIndex: index,
        current: false,
      });
    };
  };
  // 获取华语歌手数据 用来界面渲染就展示
  getChinaMusic = async () => {
    const result = await reqRecSinger(11);
    console.log(result);
    this.setState({
      singerList: result.data.artistList,
    });
  };
  // 获取歌手对应歌曲数据信息
  handleSinger = async (e) => {
    const categoryId = e.target.dataset.id * 1;
    // 获取歌手分类导航数据
    const singerList = await reqRecSinger(categoryId);
    this.setState({
      singerList: singerList.data.artistList,
    });
  };
  toPlayDetail = (rid) => {
    return () => {
      this.props.history.push("/playdetail", { rid: rid });
    };
  };
  render() {
    const {
      playList,
      useRecommendSong,
      bangList,
      singerList,
      current,
      currentIndex,
      currentMeun,
    } = this.state;
    return (
      <div className="home-container">
        {/* 轮播图 */}
        <Banner />
        {/* 推荐歌单 */}
        <div className="home-day-recommend">
          <div className="home-day-recommend-nav">
            <h1>歌单推荐</h1>
            <div className="home-day-recommend-select">
              <ul className="home-day-recmmend-ul">
                <div className="home-day-recommend-a">
                  <a
                    onClick={this.getRecommendSong}
                    className={
                      current && currentIndex === -1 ? "RecommendActive" : ""
                    }
                    href="###"
                  >
                    每日推荐
                  </a>
                  {playList.map((song, index) => {
                    return (
                      <a
                        onClick={this.handleClick(song.id, index)}
                        key={song.id}
                        className={
                          currentIndex === index ? "RecommendActive" : ""
                        }
                        href="###"
                      >
                        {song.name}
                      </a>
                    );
                  })}
                </div>

                <li>
                  <NavLink to="" className="home-day-recommend-font">
                    更多
                    <RightOutlined />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="home-day-recomment-btn">
            {useRecommendSong.map((item) => {
              return (
                <div className="home-day-recomment-all" key={item.id}>
                  <div>
                    <div>
                      <img
                        className="home-day-recomment-img"
                        src={item.img}
                        alt=""
                      />
                    </div>
                  </div>
                  <p className="name">
                    <span title="每日最新单曲推荐">{item.name}</span>
                  </p>
                  <p>
                    <i></i>
                    {item.listencnt}万
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {/* 推荐活动 */}
        <h1 className="home-origin">推荐活动</h1>
        <div className="act_out">
          <div className="act">
            <a href="https://weibo.com/1738434147/Ju92elMtz?from=page_1006061738434147_profile&amp;wvr=6&amp;mod=weibotime&amp;type=comment#_rnd1605496460595">
              <img
                src="https://kwimg4.kuwo.cn/star/upload/26/26/1605511903868_.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="act">
            <a href="https://weibo.com/1738434147/JowgHph9I?ref=home&amp;type=comment#_rnd1602300066216">
              <img
                src="https://kwimg3.kuwo.cn/star/upload/59/65/1602306237569_.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
        {/* 排行榜 */}
        <div className="home-list-nav">
          <h1 className="home-list-title">排行榜</h1>
          <NavLink to="/">
            <p>
              更多
              <RightOutlined />
            </p>
          </NavLink>
        </div>
        <div className="home-list">
          {bangList.map((item) => {
            return (
              <div className="home-list-song" key={item.id}>
                <ul>
                  <img className="home-list-img" src={item.pic} alt="" />
                  {item.musicList.slice(0, 5).map((music, index) => {
                    return (
                      <li
                        key={music.rid}
                        onClick={this.toPlayDetail(music.rid)}
                      >
                        <span>{index + 1}</span>
                        {music.name}
                        <p>{music.artist}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="home-songer-list">
          <h1>歌手推荐</h1>
          <div className="home-songer">
            <ul className="home-songer-ul">
              <Menu mode="horizontal" defaultSelectedKeys={[currentMeun]}>
                <Menu.Item key={currentMeun}>
                  <p
                    onClick={this.handleSinger}
                    data-id="11"
                    className="home-day-recommend-font"
                  >
                    华语
                  </p>
                </Menu.Item>
                <Menu.Item>
                  <p
                    onClick={this.handleSinger}
                    data-id="13"
                    className="home-day-recommend-font"
                  >
                    欧美
                  </p>
                </Menu.Item>
                <Menu.Item>
                  <p
                    onClick={this.handleSinger}
                    data-id="12"
                    className="home-day-recommend-font"
                  >
                    日韩
                  </p>
                </Menu.Item>
                <Menu.Item>
                  <p
                    onClick={this.handleSinger}
                    data-id="16"
                    className="home-day-recommend-font"
                  >
                    组合
                  </p>
                </Menu.Item>
              </Menu>
              <li>
                <NavLink to="" className="home-day-recommend-font">
                  更多
                  <RightOutlined />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="home-songer-select">
          {singerList.map((singer) => {
            return (
              <div className="home-songer-box" key={singer.id}>
                <img className="home-songer-img" src={singer.pic} alt="" />
                <p>
                  {singer.name} <br />
                  <span>{singer.musicNum}首歌曲</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
