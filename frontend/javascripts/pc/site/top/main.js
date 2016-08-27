import React from 'react'
import ReactDOM from 'react-dom'

var peer = new Peer({
  key: window.ENV.ServiceSettings.peer_api_key
})
peer.on('open', function(id) {
  console.debug("connection opened! ID: " + id)
})

var ProfileInfo = React.createClass({
  updateCallId: function() {
    this.setState({ callId: peer.id })
  },
  getInitialState: function() {
    return { callId: '接続中...' }
  },
  componentDidMount: function() {
    // TODO: 接続後のポーリングは無駄なので止める
    setInterval(this.updateCallId, this.props.pollInterval)
  },
  render: function() {
    return (
      <div className="profile-info">
        あなたの通話用のIDは {this.state.callId} です。
      </div>
    )
  }
})

var VideoBox = React.createClass({
  getInitialState: function() {
    return { src: '' }
  },
  componentDidMount: function() {
    // TODO: 動画の表示処理
    // // ベンダプレフィックスの差を吸収している
    // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
    // navigator.getUserMedia(
    //   { audio: true, video: true },
    //   function(stream) {
    //     this.setState({ src: URL.createObjectURL(stream) })
    //   },
    //   // エラー時のコールバック(本来不要のはずだが省略すると firefox で動かないため記述)
    //   function(){}
    // )
  },
  render: function() {
    return (
      <video className="peer-video" autoPlay src={this.state.src}>
      </video>
    )
  }
})

ReactDOM.render(
  <ProfileInfo pollInterval={1000}/>,
  document.getElementById('profile')
)
ReactDOM.render(
  <VideoBox />,
  document.getElementById('video')
)
