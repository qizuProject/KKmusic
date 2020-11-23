import React, { Component } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./index.css";
import "../iconfont/iconfont.css";
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
