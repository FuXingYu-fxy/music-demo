const store = {
  debug: true,
  state: {
    favoriteSongIds: [], // 用户喜爱歌单的歌曲id,
    musicInfo: {},     // 播放列表的音乐信息
    musicInfoFlagBit: 0,  // 通过监听标志位的改变就可以知道musicInfo改变
    currentPlayMusicId: -1, // 当前播放的音乐id
    currentPlayMusicInfo: {} // 当前播放的单首音乐信息, 搜索出来的或者推荐歌单里点击播放的音乐信息都会被放到这里, 用户自己歌单里的歌曲还是放到musicInfo 里面
  },
  setMessageAction(filed, value) {
    if (this.debug) console.log(`setMessageAction triggered with ${filed} => ${value}`);
    this.state[filed] = value;
  },
  clearMessageAction(filed, value) {
    if (this.debug) console.log('clearMessageAction triggered');
    if (typeof this.state[filed] === 'string') this.state[filed] = '';
    else if (this.state[filed] instanceof Array) this.state[filed] = [];
    else this.state[filed] = null;
  }
}
export default store
