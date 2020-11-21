import React, { Component } from "react";

import "./index.css";

export default class index extends Component {
  render() {
    return (
      <>
        <div className="home-container">
          <div className="home-banner-nav">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Tab 1" key="1">
                推荐
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                排行榜
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                歌单
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                歌手
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                MV
              </TabPane>
            </Tabs>
          </div>
        </div>
      </>
    );
  }
}
