const obj = {
  /**
   * 获取版本 '0.10.1' => 1001
   * @param {*} str
   */
  getVerNum: function getVerNum(str) {
    const list = str.split('.');
    return list.reduce((sum, cur, index) => {
      return cur * Math.pow(100, list.length - index - 1) + sum;
    }, 0);
  },
  getVerStr: function getVerStr(num) {
    const str = obj.PrefixZero(num, 6);
    return insertPlacehoderInterval(str, '.', 2);
  },
  /**
   * 自定义函数名：PrefixZero
   * @param num： 被操作数
   * @param n： 固定的总位数
   */
  PrefixZero: function PrefixZero(num, n) {
    return (Array(n).join(0) + num).slice(-n);
  },
  /**
   * 间隔插入占位符
   * @param {*} str
   * @param {*} placeholder
   * @param {*} n
   */
  insertPlacehoderInterval: function insertPlacehoderInterval(
    str,
    placeholder,
    n = 2
  ) {
    let list = [];
    for (let index = 0; index < str.length; index++) {
      list.push(str[index]);
      // not append when cursor at first and latest char
      if (index !== 0 && index !== str.length - 1) {
        // insert placeholder
        if ((index + 1) % n === 0) {
          list.push(placeholder);
        }
      }
    }
    return list.join('');
  },
};

module.exports = obj;
