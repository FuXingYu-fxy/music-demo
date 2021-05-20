const store = {
  debug: true,
  state: {
    favoriteSongIds: [], // 用户喜爱歌单的歌曲id,
    musicInfo: {},
    musicInfoFlagBit: 0,
    currentPlayMusicId: -1
  },
  setMessageAction(filed, value) {
    if (this.debug) console.log(`setMessageAction triggered with ${filed} => ${value}`)
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
