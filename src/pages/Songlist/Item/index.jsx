import React, { Component } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.css";
import "../iconfont/iconfont.css";
import { reqMusicList, reqDefaultPlayList } from "@api/songlist";

class Item extends Component {
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
  playMusic = (id) => {
    return async () => {
      this.props.play();
      const result = await reqDefaultPlayList();
      const pid = result.data.data[0].id;
      const result1 = await reqMusicList(pid);
      const rid = result1.data.musicList[0].rid;
      this.props.history.push("/test", { rid: rid });
    };
  };

  render() {
    const { img, title, listencnt, id } = this.props;
    return (
      <div className="item" key={id}>
        <div className="pic_out">
          <div className="cover" onClick={this.playMusic(id)}>
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

export default withRouter(Item);
