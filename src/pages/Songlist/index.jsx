import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import "./iconfont/iconfont.css";
import Item from "./Item";
import { connect } from "react-redux";
import { newOrHotPlayListAsync, tags } from "@redux/actions";
import { Pagination, Tag } from "antd";
import { reqPlayListById } from "@api/songlist";
import {
  DownOutlined,
  UpOutlined,
  BookOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

class Songlist extends Component {
  state = {
    songList: [], //歌单数组
    currentPage: 1, //默认当前第一页
    upOrDown: false, //切换精选歌单显示隐藏，true为up
    isActive: true, //最新最热按钮点击高亮标识,true为最新
    tags: [], //存放标签
    isShow: false, //显示隐藏tag区域
    tag_title: "精选歌单",
    isPlay: false, //音乐播放
  };
  async componentDidMount() {
    //开始默认渲染最热歌单数据，每页10条数，默认显示第一页
    await this.props.newOrHotPlayListAsync("new", 10, 1);
    this.setState({
      songList: this.props.songList,
    });

    await this.props.tags();
    this.setState({
      tags: this.props.platListTags,
    });
  }

  //分页切换页码回调
  changePage = async (page) => {
    //如果isActive为true，表示目前为最新歌单，否则为最热歌单
    this.state.isActive
      ? await this.props.newOrHotPlayListAsync("new", 10, page)
      : await this.props.newOrHotPlayListAsync("hot", 10, page);

    this.setState({
      songList: this.props.songList,
    });
  };

  //点击最热或最新获取最热歌单数据
  show = (type) => {
    return async () => {
      let isActive;
      if (type === "new") {
        await this.props.newOrHotPlayListAsync("new", 10, 1);
        isActive = true;
      }
      if (type === "hot") {
        await this.props.newOrHotPlayListAsync("hot", 10, 1);
        isActive = false;
      }
      this.setState({
        songList: this.props.songList,
        isActive,
      });
    };
  };

  //点击tag
  changeList = (id, name) => {
    return async () => {
      const result = await reqPlayListById(id);
      const data = result.data.map((item) => {
        return {
          img: item.img,
          title: item.name,
          listencnt: item.listencnt,
          id: item.id,
        };
      });
      this.setState({
        songList: data,
        isShow: !this.state.isShow,
        tag_title: name,
        upOrDown: !this.state.upOrDown,
      });
    };
  };

  //点击icon，切换并显示隐藏tag区域
  changeIcon = () => {
    //切换icon,显示隐藏tag区域
    const { upOrDown, isShow } = this.state;
    this.setState({ upOrDown: !upOrDown, isShow: !isShow });
  };

  //点击精选歌单
  defaultList = async () => {
    await this.props.newOrHotPlayListAsync("new", 10, 1);
    this.setState({
      songList: this.props.songList,
      tag_title: "精选歌单",
      isShow: false,
    });
  };

  //点击播放音乐
  play = () => {
    const audioDom = this.refs.audio;
    const { isPlay } = this.state;
    if (!isPlay) {
      audioDom.play();
      this.setState({
        isPlay: true,
      });
    } else {
      audioDom.pause();
      this.setState({
        isPlay: false,
      });
    }
  };

  render() {
    const {
      songList,
      currentPage,
      upOrDown,
      isActive,
      tags,
      isShow,
      tag_title,
    } = this.state;
    return (
      <div className="songlist_page">
        {/* 头部 */}
        <div className="songlist_header"></div>

        {/* 内容 */}
        <div className="songlist_container">
          <div className="songlist_main">
            {/* 导航部分 */}
            <div className="songlist_subNav">
              <div>
                <NavLink to="javascript:;" className="nav_a">
                  推荐
                </NavLink>
                <NavLink to="javascript:;" className="nav_a">
                  排行榜
                </NavLink>
                <NavLink to="javascript:;" className="nav_a">
                  歌手
                </NavLink>
                <NavLink to="javascript:;" className="active nav_a">
                  歌单
                </NavLink>
                <NavLink to="javascript:;" className="nav_a">
                  MV
                </NavLink>
              </div>
            </div>

            {/* 最新最热 */}
            <div className="tit_out flex_c">
              <span className="tit">{tag_title}</span>
              {upOrDown ? (
                <UpOutlined className="icon" onClick={this.changeIcon} />
              ) : (
                <DownOutlined className="icon" onClick={this.changeIcon} />
              )}

              <div>
                <span
                  className={isActive ? "active" : ""}
                  onClick={this.show("new")}
                >
                  最新
                </span>

                <span
                  className={!isActive ? "active" : ""}
                  onClick={this.show("hot")}
                >
                  最热
                </span>
              </div>

              {/* 标签部分 */}
              {isShow ? (
                <div className="showTag">
                  <div className="tag">
                    <div>
                      {/* 头部 */}
                      <div className="tag_header">
                        <BookOutlined className="tag_icon" />
                        <h4 className="tag_title">默认</h4>
                      </div>

                      {/* 精选歌单 */}
                      <span className="list_tag" onClick={this.defaultList}>
                        精选歌单
                      </span>

                      {/* 内容区域 */}
                      <div className="content">
                        {tags.map((tag) => {
                          return (
                            <div key={tag.type_id}>
                              <div className="tag_header">
                                <AppstoreOutlined className="tag_icon" />
                                <h4 className="tag_title">{tag.type}</h4>
                              </div>

                              <div className="tag_content">
                                {tag.data.map((item) => {
                                  return (
                                    <Tag
                                      color="#f7f7f7"
                                      className="single_tag"
                                      key={item.tag_id}
                                      onClick={this.changeList(
                                        item.tag_id,
                                        item.name
                                      )}
                                    >
                                      {item.name}
                                    </Tag>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>

            {/* 主体部分 */}
            <div className="songlist_content">
              {/* 主体歌单部分 */}
              <div className="rec_list">
                {songList.map((song) => {
                  return <Item {...song} key={song.id} play={this.play} />;
                })}
              </div>
            </div>
          </div>
        </div>
        {/* 分页 */}
        <div className="songlist_pagination">
          <Pagination
            defaultCurrent={currentPage}
            pageSize={10}
            total={30}
            onChange={this.changePage}
            showQuickJumper={true}
          />
        </div>

        {/* 底部 */}
        <div className="footer"></div>

        <audio
          src="http://win.web.nf03.sycdn.kuwo.cn/ee63770fe17cf0269c811197ac35ebb2/5fbb4fd9/resource/m1/83/31/2636392037.mp4"
          ref="audio"
        ></audio>
      </div>
    );
  }
}

export default connect(
  (state) => ({ songList: state.songList, platListTags: state.platListTags }),
  {
    newOrHotPlayListAsync,
    tags,
  }
)(Songlist);
