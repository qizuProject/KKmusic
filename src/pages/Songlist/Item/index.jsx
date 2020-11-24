import React, { Component } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./index.css";
import "../iconfont/iconfont.css";
import { reqMusicList, reqDefaultPlayList, reqPlayUrl } from "@api/songlist";
import axios from "axios";

export default class Item extends Component {
  state = {
    isPlay: false,
  };
  static propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    listencnt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    play: PropTypes.func.isRequired,
  };
  playMusic = () => {
    this.props.play();
  };

  // playMusic = (id) => {
  //   return async () => {
  //     const result = await reqDefaultPlayList();
  //     const pid = result.data[0].id;
  //     const result1 = await reqMusicList(pid);
  //     const rid = result1.musicList[0].rid;
  //     const result2 = await axios.get(`http://localhost:3300/url?rid=${rid}`);
  //     const url = result2.data.url;
  //     eventBus.emit("play", url);
  //   };
  // };
  render() {
    const { img, title, listencnt, id } = this.props;
    return (
      <div className="item" key={id}>
        <div className="pic_out">
          <div className="cover" onClick={this.playMusic}>
            <PlayCircleOutlined className="icon_play" />
          </div>

          <img src={img} alt="" className="pic" />

          <p className="name">
            <span>{title}</span>
          </p>

          <p className="count">
            <i className="iconfont icon-bofang"></i>
            {listencnt}万
          </p>
        </div>
      </div>
    );
  }
}
