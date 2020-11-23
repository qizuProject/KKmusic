import React, { Component } from "react";
import "./index.css";

import img from "./images/logo.dac7499.png";
import { Menu } from "antd";
import { SearchOutlined,RightOutlined } from "@ant-design/icons";


export default class index extends Component {
  state = {
    current: "currentId",
  };
  bandleMouse=()=>{
    
  }
  render() {
    const { current } = this.state;
    return (
      <>
        <div className="header-container">
          <div className="header-logo">
            <img className="header-img" src={img} alt="" />
          </div>
          {/*  <div>
            <ul className="header-nav">
              <li>发现音乐</li>
              <li>下载客户端</li>
              <li>
                <a href="http://jx.kuwo.cn/">音乐现场</a>{" "}
              </li>
              <li>VIP会员</li>
              <li>酷我畅听</li>
              <li>酷我耳机</li>
            </ul>
          </div> */}
          <div className="header-nav">
            <Menu
              mode="horizontal"
              defaultSelectedKeys={[current]}
            >
              <Menu.Item key={current}>
                <p>发现音乐</p>
              </Menu.Item>
              <Menu.Item>
                <p>下载客户端</p>
              </Menu.Item>
              <Menu.Item>
                <p>
                  <a href="http://jx.kuwo.cn/">音乐现场</a>
                </p>
              </Menu.Item>
              <Menu.Item>
                <p>VIP会员</p>
              </Menu.Item>
              <Menu.Item>
                <p>酷我畅听</p>
              </Menu.Item>
              <Menu.Item>
                <p>酷我耳机</p>
              </Menu.Item>
              <Menu.Item>
                <p>更多<RightOutlined /></p>
              </Menu.Item>
            </Menu>
          </div>
          <div className="header-sousu" onMouseEnter={this.bandleMouse}>
            <button className="header-btn" >
              <SearchOutlined />
            </button>
            <input className="header-input" placeholder="搜素音乐/MV/歌单/歌手" type="text" />
          </div>
        </div>
      </>
    );
  }
}
