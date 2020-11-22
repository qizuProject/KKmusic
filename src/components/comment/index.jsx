import React, { Component } from "react";
import "./index.css";

import { reqMusicRecComment, reqNewComment } from "@api/comment";
export default class Comment extends Component {
  state = {
    recComment: [], // 热门评论
    newComment: [], // 最新评论
  };
  async componentDidMount() {
    // 接收传递过来的mid
    const { mid } = this.props;
    // 热门评论
    let recComment = await reqMusicRecComment(mid);
    let newComment = await reqNewComment(mid);
    this.setState({
      recComment: recComment.rows,
      newComment: newComment.rows,
    });
  }
  render() {
    const { recComment, newComment } = this.state;
    return (
      <div>
        <div id="comment_con" className="comment_con">
          {/* 热门评论 */}
          <div className="all-comment">
            <div className="type">
              <span>热门评论</span>
              <span className="comment-num">
                {recComment.length ? recComment.length : ""}条
              </span>
            </div>
            {recComment.map((item) => {
              return (
                <div className="each-comment" key={item.id}>
                  <div className="each-comment-avatar">
                    <img src={item.u_pic} alt="" />
                  </div>
                  <div className="each-comment-msg">
                    <div className="each-comment-nickname">
                      {/* node搭建的服务器 在重定向请求时 在修改referer时  使用encodeURIComponent进行了编码 
                      在我得到用户名 发现是一串urlcode编码 于是尝试使用decodeURIComponent  问题解决
                      关于referer:http请求头中的一部分，这个信息会告诉服务器，我是从哪个页面过来的，服务器可以得到某些信息，用于处理
                      */}
                      <span>{decodeURIComponent(item.u_name)}</span>
                    </div>
                    <div className="each-comment-content text-selection">
                      {item.msg}
                    </div>
                    <div className="each-comment-time">
                      <div className="time">{item.time}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* 最新评论 */}
          <div className="all-comment">
            <div className="type">
              最新评论
              <span className="comment-num">
                {newComment.length ? newComment.length : ""}条
              </span>
            </div>
            {newComment.map((item) => {
              return (
                <div className="new-comment-out" key={item.id}>
                  <div className="each-comment">
                    <div className="each-comment-avatar">
                      <img src={item.u_pic} alt="" />
                    </div>
                    <div className="each-comment-msg">
                      <div className="each-comment-nickname">
                        <span>{decodeURIComponent(item.u_name)}</span>
                      </div>
                      <div className="each-comment-content text-selection">
                        <a href="##" className="reply-name">
                          回复
                          <span>
                            @
                            {decodeURIComponent(item.reply.u_name)
                              ? decodeURIComponent(item.reply.u_name)
                              : ""}
                          </span>
                        </a>
                        <span>{item.reply.msg}</span>
                      </div>
                      <div className="each-reply-content">
                        <span className="text-selection">{item.msg}</span>
                      </div>
                      <div className="each-comment-time">
                        <div className="time">20小时前</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
