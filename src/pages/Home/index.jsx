import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Header from "@comps/Header";
import Recommend from "@pages/Recommend";
import "./index.css";
import { Menu } from "antd";

export default class Home extends Component {
  state = {
    currentMeun: "currentMeun",
  };
  render() {
    const { currentMeun } = this.state;
    return (
      <>
        <div className="home-nav">
          <Menu defaultSelectedKeys={[currentMeun]} mode="horizontal">
            <Menu.Item key={currentMeun}>
              <NavLink to="/recommend">推荐</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/header">排行</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/">歌手</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/">歌单</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/">MV</NavLink>
            </Menu.Item>
          </Menu>
        </div>
        <Switch>
          <Route path="/header" component={Header} />
          <Route
            path="/"
            component={Recommend}
            render={() =>
            <Redirect to="/recommend" />
            }
          />
        </Switch>
      </>
    );
  }
}
