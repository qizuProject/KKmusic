import React, { Component } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./index.css";
import "../iconfont/iconfont.css";
export default class Item extends Component {
  static propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    listencnt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };
  render() {
    const { img, title, listencnt, id } = this.props;
    return (
      <div className="item" key={id}>
        <div className="pic_out">
          <div className="cover">
            {/* <span className="play icon_play"> */}
            {/* <i className="iconfont icon-icon_play_1"></i> */}
            <PlayCircleOutlined className="icon_play" />
            {/* </span> */}
          </div>

          <img src={img} alt="" className="pic" />

          <p className="name">
            {/* <span>心动警告！这些华语R&B糖分已超标</span> */}
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
