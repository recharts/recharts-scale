/**
 * @fileOverview calculate tick values of scale
 * @author xile611
 * @modified by arcthur
 * @date 2015-08-26
 */

import R from 'ramda';

/**
 * 判断数据是否为浮点类型
 *
 * @param {Number} num 输入值
 * @return {Boolean} 是否是浮点类型
 */
function isFloat(num) {
  return /^([+-]?)\d*\.\d+$/.test(num);
}

/**
 * 获取数值的位数
 * 其中绝对值属于区间[0.1, 1)， 得到的值为0
 * 绝对值属于区间[0.01, 0.1)，得到的位数为 -1
 * 绝对值属于区间[0.001, 0.01)，得到的位数为 -2
 *
 * @param  {Number} value 数值
 * @return {Integer} 位数
 */
function getDigitCount(value) {
  if (value === 0) {
    return 1;
  }

  return Math.floor(Math.log(Math.abs(value)) / Math.log(10)) + 1;
}

/**
 * 判断是否为合法的区间，并返回处理后的合法区间
 *
 * @param  {Number} min       最小值
 * @param  {Number} max       最大值
 * @return {Array} 最小最大值数组
 */
function getValidInterval([min, max]) {
  let [validMin, validMax] = [min, max];

  // 交换最大值和最小值
  if (min > max) {
    [validMin, validMax] = [max, min];
  }

  return [validMin, validMax];
}

/**
 * 计算可读性高的刻度间距，如 10, 20
 *
 * @param  {Number}  roughStep 计算的原始间隔
 * @param  {Integer} amendIndex 修正系数
 * @return {Number}  刻度间距
 */
function getFormatStep(roughStep, amendIndex) {
  if (roughStep <= 0) { return 0; }

  const digitCount = getDigitCount(roughStep);
  // 间隔数与上一个数量级的占比
  const stepRatio = roughStep / Math.pow(10, digitCount);

  const amendStepRatio = (Math.ceil(stepRatio / 0.05) + amendIndex) * 0.05;

  return amendStepRatio * Math.pow(10, digitCount);
}

/**
 * 获取最大值和最小值相等的区间的刻度
 *
 * @param  {Number}  value     最大值也是最小值
 * @param  {Integer} tickCount 刻度数
 * @return {Array}   刻度组
 */
function getTickOfSingleValue(value, tickCount) {
  const isFlt = isFloat(value);
  let step = 1;
  let start = value;

  if (isFlt) {
    const absVal = Math.abs(value);

    if (absVal < 1) {
      step = Math.pow(10, getDigitCount(value) - 1);
      start = Math.floor(value / step) * step;
    } else if (absVal > 1) {
      start = Math.floor(value);
    }
  }

  const middleIndex = Math.floor((tickCount - 1) / 2);

  return R.range(0, tickCount).map((i) => {
    return start + (i - middleIndex) * step;
  });
}

/**
 * 计算步长
 *
 * @param  {Number}  min        最小值
 * @param  {Number}  max        最大值
 * @param  {Integer} tickCount  刻度数
 * @param  {Number}  amendIndex 修正系数
 * @return {Object}  步长相关对象
 */
function calculateStep(min, max, tickCount, amendIndex = 0) {
  // 获取间隔步长
  const step = parseInt(getFormatStep((max - min) / (tickCount - 1), amendIndex), 10);
  let start;

  // 当0属于取值范围时
  if (min <= 0 && max >= 0) {
    start = 0;
  } else {
    start = (min + max) / 2;
    start = start - start % step;
  }

  let belowCount = Math.ceil((start - min) / step);
  let upCount =  Math.ceil((max - start) / step);
  const scaleCount = belowCount + upCount + 1;

  if (scaleCount > tickCount) {
    // 当计算得到的刻度数大于需要的刻度数时，将步长修正的大一些
    return calculateStep(min, max, tickCount, amendIndex + 1);
  } else if (scaleCount < tickCount) {
    // 当计算得到的刻度数小于需要的刻度数时，人工的增加一些刻度
    upCount = max > 0 ? upCount + (tickCount - scaleCount) : upCount;
    belowCount = max > 0 ? belowCount : belowCount + (tickCount - scaleCount);
  }

  return {
    step: step,
    tickMin: start - belowCount * step,
    tickMax: start + upCount * step,
  };
}


/**
 * 获取刻度
 *
 * @param  {Number}  min        最小值
 * @param  {Number}  max        最大值
 * @param  {Integer} tickCount  刻度数
 * @return {Array}   取刻度数组
 */
function getTickValues(min, max, tickCount = 6) {
  // 刻度的数量不能小于1
  const count = tickCount < 2 ? 2 : tickCount;
  const [cormin, cormax] = getValidInterval([min, max], count);

  if (cormin === cormax) {
    return getTickOfSingleValue(cormin, tickCount);
  }

  // 获取间隔步长
  const {step, tickMin, tickMax} = calculateStep(cormin, cormax, count);

  let fixlen = 0;

  if (isFloat(step)) {
    const stepstr = (step + '');

    if (stepstr.indexOf('.') > -1) {
      fixlen = stepstr.split('.')[1].length > 4 ? 4 : stepstr.split('.')[1].length;
    }
  }

  return R.filter((n) => {
    return n % step === 0;
  }, R.range(tickMin, tickMax + 1)).map((n) => {
    return +(parseFloat(n).toFixed(fixlen));
  });
}

export default R.memoize(getTickValues);
