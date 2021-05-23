const store = {
  debug: false,
  state: {
    // 用户喜爱歌单的歌曲id,
    favoriteSongIds: [],
    // 播放列表的音乐信息
    musicListInfo: {},
    // 通过监听标志位的改变就可以知道musicListInfo改变
    musicListInfoFlagBit: 0,
    // 当前播放的音乐id
    currentPlayMusicId: -1,
    // 当前播放的单首音乐信息, 搜索出来的或者推荐歌单里点击播放的音乐信息都会被放到这里, 用户自己歌单里的歌曲还是放到musicInfo 里面
    currentPlayMusicInfo: {},
    // 通过监听标志位的该表就可以知道currentPlayMusicInfo的改变
    currentPlayMusicInfoFlagBit: 0,
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
