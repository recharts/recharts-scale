import R from 'ramda';
import getNiceTickValues from './getNiceTickValues';
import getTickValues from './getTickValues';
import Arithmetric from '../util/arithmetric';
/**
 * 线性映射
 *
 * @param  {Array} domain      定义域
 * @param  {Array} range       值域
 * @param  {Function} inputFn  定义域的计算函数
 * @param  {Function} outputFn 值域的计算函数
 * @return {Function}          将定义域映射到值域的一个线性映射
 */
function scaleLinear(domain, range, inputFn, outputFn) {
  const input = inputFn(domain[0], domain[1]);
  const output = outputFn(range[0], range[1]);

  return R.compose(output, input);
}
/**
 * 转化为数值类型
 * @param  {Number|String} a 输入值
 * @return {Number}   数值
 */
function toNumber(a) {
  return +a;
}
/**
 * 线性刻度
 *
 * @param {Array}   domain     定义域
 * @param {Array}   range      值域
 * @param {Boolean} isNice     是否对刻度进行美化处理
 * @param {Boolean} isTruncate 是否对定义域做截断处理
 * 例如，定义域为[0, 10]，输入值为-1，isTruncate为true，则映射到0，否则映射到 -0.1
 * @param {Number}  tickCount  刻度数
 * @return {Number}   输出值
 */
function linear(domain = [0, 1], range = [0, 1], interpolate = interpolateNumber, isTruncate = false) {
  let output;
  let input;
  let tickValues;

  function scale(x) {
    return output(x);
  }

  function rescale() {
    const inputFn = isTruncate ? uninterpolateTruncation : uninterpolateNumber;

    // 根据输入值，获取输出值
    output = scaleLinear(domain, range, inputFn, interpolate);

    // 根据输出值，反过来得到输入值
    input = scaleLinear(range, domain, inputFn, interpolateNumber);

    return scale;
  }

  // Note: requires range is coercible to number!
  scale.invert = function(y) {
    return input(y);
  };

  scale.domain = function(x) {
    if (!arguments.length) return domain;

    domain = R.map(toNumber)(x);

    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;

    range = R.map(toNumber)(x);

    return rescale();
  };

  scale.nice = function(tickCount) {
    tickValues = getNiceTickValues(domain, tickCount);

    domain = [tickValues[0], tickValues[tickValues.length - 1]];

    return rescale();
  };

  scale.truncate = function(x) {
    if (!arguments.length) return isTruncate;

    isTruncate = x;

    return rescale();
  };

  scale.interpolate = function(x) {
    if (!arguments.length) return interpolate;

    interpolate = x;

    return rescale();
  };

  scale.getTickValues = function(tickCount) {
    tickValues = tickValues || getTickValues(domain[0], domain[1], tickCount);

    return tickValues;
  };


  scale.copy = function() {
    return linear(domain, range, interpolate, isTruncate);
  };

  return rescale();
}

export default linear;
