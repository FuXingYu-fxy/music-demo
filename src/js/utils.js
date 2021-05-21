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

function getSongInfoByKeywords(keywords) {
  let url = `${global.server}/search?keywords=${keywords.join(",")}`;
  // debugger;
  return fetch(url, {
    method: "GET",
    credentials: "include",
  })
    .then(response => response.json())
    .catch(reason => alert(reason));

}

/**
 * 防抖装饰器，传入一个函数，返回一个新增防抖函数的新函数
 * @param func
 * @param wait
 * @param immediate
 * @return {(function(...[*]=): void)|*}
 */
function debounce(func, wait = 300, immediate = true) {
  let context, params, timer;
  return function (...args) {
    if (timer) {
      // 如果在指定时间内再次调用，就清空定时器，达到防抖的作用
      clearTimeout(timer);
    } else {
      // 如果没有定时器，说明是时间轴上的初次调用
      if (immediate) {
        // 如果是立即调用函数，就立即调用
        func.apply(this, args);
      } else {
        // 否则缓存参数
        context = this;
        params = args;
      }
    }

    // 设定定时器，x ms 后没有再次调用的行为就会触发
    timer = setTimeout(() => {
      // 函数运行时清空定时器, 这样在函数执行完毕后就可以再次立即调用
      timer = null;
      if (!immediate) {
        func.apply(context, params);
        context = params = null;
      }
    }, wait);
  }
}

export default {
  formatDuration,
  getSongInfoByFetch,
  debounce,
  getSongInfoByKeywords,
}
