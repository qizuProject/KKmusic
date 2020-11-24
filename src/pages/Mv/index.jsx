import React, { Component } from "react";

import "./index.css";
import { Pagination } from "antd";
import { reqRadioList, reqPlayList } from "@api/mv";

export default class Mv extends Component {
  state = {
    radioList: [],
    showList: [],
    url: "",
    isPlay: false,
  };
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
  handleClick = (e) => {
    const li = e.target.parentNode.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
      li[i].className = "";
    }
    e.target.className = "active";
  };
  onChange = (val) => {
    if (val === 2) {
      this.setState({
        showList: this.state.radioList.slice(8),
      });
    }
    if (val === 1) {
      this.setState({
        showList: this.state.radioList.slice(0, 8),
      });
    }
  };
  async componentDidMount() {
    const result = await reqRadioList();
    const data = await reqPlayList(80958029);
    const url = data.url;
    this.setState({
      radioList: result.data.albumList,
      showList: result.data.albumList.slice(0, 8),
      url: url,
    });
  }
  render() {
    const { showList, url } = this.state;
    return (
      <div className="Mv">
        <ul className="nav" onClick={this.handleClick}>
          <li className="active">首播</li>
          <li>华语</li>
          <li>欧美</li>
          <li>现场</li>
          <li>热舞</li>
          <li>伤感</li>
          <li>剧情</li>
        </ul>
        <div className="content">
          {showList.map((item) => {
            return (
              <div className="list" key={item.rid}>
                <div className="cover">
                  <img
                    src={item.pic}
                    alt=""
                    className="cover pic"
                    onClick={this.play}
                  ></img>
                </div>
                <p className="name">
                  <span>{item.artist}</span>
                  <button style={{ fontSize: "12px" }}>播放</button>
                  <button style={{ fontSize: "12px" }}>暂停</button>                              
                </p>
                <p className="time">
                  <span>{item.album}</span>
                </p>
                <div className="playVideo">
                  <audio src={url} ref="audio"></audio>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagination">
          <Pagination
            defaultCurrent={1}
            pageSize={8}
            total={this.state.radioList.length}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}
