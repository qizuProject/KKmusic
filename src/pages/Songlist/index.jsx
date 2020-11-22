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
  changeList = (id) => {
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
      });
    };
  };

  render() {
    const { songList, currentPage, upOrDown, isActive, tags } = this.state;
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
              <span className="tit">精选歌单</span>
              {upOrDown ? (
                <UpOutlined
                  className="icon"
                  onClick={() => {
                    this.setState({ upOrDown: !upOrDown });
                  }}
                />
              ) : (
                <DownOutlined
                  className="icon"
                  onClick={() => {
                    this.setState({ upOrDown: !upOrDown });
                  }}
                />
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
              <div className="showTag">
                <div className="tag">
                  <div>
                    {/* 头部 */}
                    <div className="tag_header">
                      <BookOutlined className="tag_icon" />
                      <h4 className="tag_title">默认</h4>
                    </div>

                    {/* 精选歌单 */}
                    <span className="list_tag">精选歌单</span>

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
                                    onClick={this.changeList(item.tag_id)}
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
            </div>

            {/* 主体部分 */}
            <div className="songlist_content">
              {/* 主体歌单部分 */}
              <div className="rec_list">
                {songList.map((song) => {
                  return <Item {...song} key={song.id} />;
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
