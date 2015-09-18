import R from 'ramda';

/**
 * 按指定的步长和初始值计算一些节点数据
 *
 * @param  {Number} start 初始值
 * @param  {Number} step  步长
 * @param  {Number} count 节点数
 * @return {Array}        节点数组
 */
function steps(start, step, count) {
  const fn = R.compose(
    R.map(n => (start + step * n)),
    R.range
  );

  return fn(0, count);
}

/**
 * 获取数组的取值范围
 *
 * @param  {Array} domain 一串按照升序或者降序排列的数组
 * @return {Array}        [最小值，最大值]
 */
function extent(domain) {
  const start = domain[0];
  const stop = domain[domain.length - 1];

  return start < stop ? [start, stop] : [stop, start];
}
/**
 * 序数刻度
 *
 * @param  {Array} domain 定义域
 * @param  {[type]} ranger [description]
 * @return {[type]}        [description]
 */
function ordinal(domain = [], ranger = {type: 'range', args: [[]]}) {
  let index;
  let range;
  let rangeBand;

  function scale(x) {
    let i = index[x];

    i = (i === +i) || (ranger.type === 'range' ? (index[x] = domain.push(x)) : NaN);

    return range[i % range.length];
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;

    domain = [];

    index = {};

    const n = x.length;
    let i = -1;
    let xi;

    while (++i < n) {
      xi = x[i];

      if (index[xi] !== +index[xi]) {
        domain.push(xi);
        index[xi] = i;
      }
    }

    return scale[ranger.type].apply(scale, ranger.args);
  };

  scale.range = function(x) {
    if (!arguments.length) return range;

    range = x;
    rangeBand = 0;
    ranger = {type: 'range', args: arguments};

    return scale;
  };

  scale.rangePoints = function(x, padding) {
    if (arguments.length < 2) padding = 0;

    const stop = x[1];
    let start = x[0];
    const step = domain.length < 2 ?
              (start = (start + stop) / 2, 0) :
              (stop - start) / (domain.length - 1 + padding);

    range = steps(start + step * padding / 2, step, domain.length);

    rangeBand = 0;
    ranger = {type: 'rangePoints', args: arguments};
    return scale;
  };

  scale.rangeRoundPoints = function(x, padding) {
    if (arguments.length < 2) padding = 0;

    const len = domain.length;
    let start = x[0];
    let stop = x[1];
    const step = len < 2 ?
              (start = stop = Math.round((start + stop) / 2), 0) :
              // bitwise floor for symmetry
              (stop - start) / (len - 1 + padding) | 0;
    const offset = (stop - start - (len - 1 + padding) * step) / 2;

    range = steps(start + Math.round(step * padding / 2 + offset), step, len);

    rangeBand = 0;

    ranger = {type: 'rangeRoundPoints', args: arguments};

    return scale;
  };

  scale.rangeBands = function(x, padding, outerPadding) {
    if (arguments.length < 2) padding = 0;
    if (arguments.length < 3) outerPadding = padding;

    const reverse = x[1] < x[0];
    const start = x[reverse - 0];
    const stop = x[1 - reverse];
    const step = (stop - start) / (domain.length - padding + 2 * outerPadding);

    range = steps(start + step * outerPadding, step, domain.length);

    if (reverse) range.reverse();

    rangeBand = step * (1 - padding);

    ranger = {type: 'rangeBands', args: arguments};
    return scale;
  };

  scale.rangeRoundBands = function(x, padding, outerPadding) {
    if (arguments.length < 2) padding = 0;
    if (arguments.length < 3) outerPadding = padding;

    const reverse = x[1] < x[0];
    const start = x[reverse - 0];
    const stop = x[1 - reverse];
    const len = domain.length;
    const step = Math.floor((stop - start) / (len - padding + 2 * outerPadding));

    range = steps(start + Math.round((stop - start - (len - padding) * step) / 2), step, len);

    if (reverse) range.reverse();

    rangeBand = Math.round(step * (1 - padding));
    ranger = {type: 'rangeRoundBands', args: arguments};

    return scale;
  };

  scale.rangeBand = function() {
    return rangeBand;
  };

  scale.rangeExtent = function() {
    return extent(ranger.args[0]);
  };

  scale.copy = function() {
    return ordinal(domain, ranger);
  };

  return scale.domain(domain);
}

export default ordinal;
