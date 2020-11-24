import React, { Component } from 'react'
// 引入swiper
import Swiper from "swiper/js/swiper.min";
// 引入swiper样式
import "swiper/css/swiper.min.css";
import './index.css';
// 引入图标
import {
  WindowsOutlined,
  AndroidOutlined,
  AppleOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { reqBannerImg} from '@api/index';
export default class Banner extends Component {
  state={
     // 轮播图数据
     banner: [],
     // 唯一标识符，用来在componentDidUpdate中加载轮播图数据时使用
     flag: true,
  }
  componentDidUpdate() {
    const { flag } = this.state;
    if (flag) {
      new Swiper(".swiper-container", {
        loop: true, // 循环模式选项
        autoplay: true, //自动播放

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      this.setState({
        flag: false,
      });
    }
  }
 async componentDidMount(){
     // 获取轮播图数据
     const result = await reqBannerImg();
     this.setState({
       banner: result.data,
     });
  }
  render() {
    const {banner} = this.state
    return (
      <div>
        {/* 轮播图 */}
        <div className="home-swiper-banner">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {banner.map((item) => {
                return (
                  <div className="swiper-slide" key={item.id}>
                    <a href={item.url}>
                      <img src={item.pic} alt="轮播图图片" />
                    </a>
                  </div>
                );
              })}
            </div>
            {/* <!-- 如果需要分页器 --> */}
            <div className="swiper-pagination"></div>
            {/* <!-- 如果需要导航按钮 --> */}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
          <div className="home-banner-download">
            <ul className="home-banner-btn">
              <li>
                <a href="https://down.kuwo.cn/mbox/kwmusic_web_1.exe">
                  <i>
                    <WindowsOutlined />
                  </i>
                  <span className="home-icon">下载PC版</span>
                </a>
              </li>
              <li>
                <a href="###">
                  <i>
                    <AndroidOutlined />
                  </i>
                  <span className="">下载Android版</span>
                </a>
              </li>
              <li>
                <a href="###">
                  <i>
                    <AppleOutlined />
                  </i>
                  <span className="">下载Iphone版</span>
                </a>
              </li>
              <li>
                <a href="###">
                  <i>
                    <DesktopOutlined />
                  </i>
                  <span className="">下载其他版本</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
