import './index.css'
import React from 'react'
import avatar from './images/avatar.png'
import {v4 as uuid }from 'uuid'

class App extends React.Component {
  // 依赖的数据
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot'
      },
      {
        id: 2,
        name: '时间',
        type: 'time'
      }
    ],
    active: 'hot',
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1
      }
    ],
    comment: ""
  }
  switchTab = (type) => {
    this.setState({
      active: type
    })
  }

  commentChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  publishComment = () => {
    if (this.state.comment != "") {
      this.setState({
        list: [
          ...this.state.list,
          {
            id: uuid(),
            author: '五月天',
            comment: this.state.comment,
            time: new Date(),
            // 1: 点赞 0：无态度 -1:踩
            attitude: 0
          }
        ],
        comment: ""
      })
    }
  }
  deleteComment = (id) => {
    this.setState({
      list: this.state.list.filter(el => el.id != id)
    })
  }

  like = (comment) => {
    const {attitude, id} = comment
    this.setState({
      list: this.state.list.map(el => {
        if (comment.id === el.id) {
          return {
            ...el,
            attitude: attitude === 0 || attitude == -1 ? 1 : 0
          }
        } else {
          return el
        }
      })
    })
  }

  hate = (comment) => {
    const {attitude, id} = comment
    this.setState({
      list: this.state.list.map(el => {
        if (comment.id === el.id) {
          return {
            ...el,
            attitude: attitude === 0 || attitude === 1 ? -1 : 0
          }
        } else {
          return el
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="comment-container">
          {/* 评论数 */}
          <div className="comment-head">
            <span>5 评论</span>
          </div>
          {/* 排序 */}
          <div className="tabs-order">
            <ul className="sort-container">
              {
                this.state.tabs.map(tab => <li className={this.state.active === tab.type ? 'on' : ''} key={tab.id} onClick={() => this.switchTab(tab.type)}>{tab.name}</li>)
              }
            </ul>
          </div>
  
          {/* 添加评论 */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="textarea-container">
              <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                onChange={this.commentChange}
                value={this.state.comment}
              />
              <button className="comment-submit" onClick={this.publishComment}>发表评论</button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>
  
          {/* 评论列表 */}
          <div className="comment-list">
            {
              this.state.list.map(comment => (
                <div className="list-item" key={comment.id}>
                  <div className="user-face">
                    <img className="user-head" src={avatar} alt="" />
                  </div>
                  <div className="comment">
                    <div className="user">{comment.author}</div>
                    <p className="text">{comment.comment}</p>
                    <div className="info">
                      <span className="time">2021-10-08 09:05:00</span>
                      <span className={comment.attitude === 1 ? 'like liked' : 'like'} onClick={() => this.like(comment)}>
                        <i className="icon" />
                      </span>
                      <span className={comment.attitude === -1 ? 'hate hated' : 'hate'} onClick={() => this.hate(comment)}>
                        <i className="icon" />
                      </span>
                      <span className="reply btn-hover" onClick={() => this.deleteComment(comment.id)}>删除</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App
