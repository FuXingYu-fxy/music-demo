import global from './global';
/**
 * 
 * @param {Number} dt 歌曲持续时间, ms
 * @returns {String}  返回 mm:ss 格式的时间
 */
function formatDuration(dt) {
  let second = Math.floor(dt / 1000);
  let minute = Math.floor(second / 60);
  second = second % 60;
  minute = minute > 9 ? minute : "0" + minute;
  second = second > 9 ? second : "0" + second;
  return `${minute}:${second}`;
}

/**
 * 
 * @param {Array} songIds 歌曲ID，必须是数组
 * @returns {Promise} 返回一个Promise，需使用then(value)接受
 */
function getSongInfoByFetch(songIds) {
  let url = `${global.server}/song/detail?ids=${songIds.join(",")}`;
  // debugger;
  return fetch(url, {
    method: "GET",
    headers: {
      Origin: "http://localhost:8080",
    },
    credentials: "include",
  })
    .then(response => response.json())
    .catch(reason => alert(reason));
}
export default {
  formatDuration,
  getSongInfoByFetch,
}