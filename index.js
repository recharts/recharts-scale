/**
 * @fileOverview calculate tick values of scale
 * @author ling.dingl
 * @date 2015-08-21
 */

/**
 * 判断数据是否为浮点类型
 * @param {Number} num 输入值
 * @return {Boolean}
 */
function isFloat(num) {
  return /^([+-]?)\d*\.\d+$/.test(num);
}

/**
 * 获取数值的位数
 * @param  {Number} value 数值
 * @return {Integer} 位数
 * 其中绝对值属于区间[0.1, 1)， 得到的值为0
 * 绝对值属于区间[0.01, 0.1)，得到的位数为 -1
 * 绝对值属于区间[0.001, 0.01)，得到的位数为 -2
 */
function getDigitCount (value) {
  if (value === 0) {
    return 1;
  }

  return Math.floor(Math.log(Math.abs(value)) / Math.log(10)) + 1;
}

/**
 * 判断是否为合法的区间，并返回处理后的合法区间
 * @param  {Number} min       最小值
 * @param  {Number} max       最大值
 * @return {}           [description]
 */
function getValidInterval ([min, max]) {
  let [validMin, validMax] = [min, max];

  // 交换最大值和最小值
  if (min > max) {
    [validMin, validMax] = [max, min];
  }

  return [validMin, validMax];
}
/**
 * 计算可读性高的刻度间距，如 10, 20
 * @param  {Number} roughStep 计算的原始间隔
 * @param {Integer} amendIndex 修正系数
 * @return {Number}
 */
function getFormatStep (roughStep, amendIndex) {
  if (roughStep <= 0) { return 0; }

  let digitCount = getDigitCount(roughStep),
      // 间隔数与上一个数量级的占比
      stepRatio = roughStep / Math.pow(10, digitCount);

  stepRatio = (Math.ceil(stepRatio / 0.05) + amendIndex) * 0.05;

  return stepRatio * Math.pow(10, digitCount);
}

/**
 * 获取最大值和最小值相等的区间的刻度
 * @param  {Number} value      最大值也是最小值
 * @param  {Integer} tickCount 刻度数
 */
function getTickOfSingleValue (value, tickCount) {
  let isFlt = isFloat(value),
    middleIndex = Math.floor((tickCount - 1) / 2),
    step = 1,
    start = value,
    tickMin, tickMax,
    ticks = [];

  if (isFlt && Math.abs(value) < 1) {
    step = Math.pow(10, getDigitCount(value) - 1);
    start = Math.floor(value /step) * step;
  } else if (isFlt && Math.abs(value) > 1) {
    start = Math.floor(value);
  }

  for (let i = 0; i < tickCount; i++) {
    ticks.push(start + (i - middleIndex) * step);
  }

  return ticks;
}
/**
 * 计算步长
 * @param  {[type]} min        [description]
 * @param  {[type]} max        [description]
 * @param  {[type]} tickCount  [description]
 * @param  {Number} amendIndex [description]
 * @return {[type]}            [description]
 */
function calculateStep (min, max, tickCount, amendIndex = 0) {
  // 获取间隔步长
  let step = getFormatStep((max - min) / (tickCount - 1), amendIndex);
  let start, belowCount, upCount, scaleCount;

  // 当0属于取值范围时
  if (min <= 0 && max >= 0) {
    start = 0;
  } else {
    start = (min + max) / 2;
    start = start - start % step;
  }

  belowCount = Math.ceil((start - min) / step);
  upCount =  Math.ceil((max - start) / step);
  scaleCount = belowCount + upCount + 1;

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
    tickMax: start + upCount * step
  };
}


function getTickValues (min, max, tickCount = 6) {
  // 刻度的数量不能小于1
  let count = tickCount < 2 ? 2 : tickCount,
      [cormin, cormax] = getValidInterval([min, max], count);

  if (cormin === cormax) {
    return getTickOfSingleValue (cormin, tickCount);
  }

  // 获取间隔步长
  let {step, tickMin, tickMax} = calculateStep(cormin, cormax, count);


  let fixlen = 0;

  if (isFloat(step)) {
    let stepstr = (step + '');

    if (stepstr.indexOf('.') > -1) {
      fixlen = stepstr.split('.')[1].length > 4 ? 4 : stepstr.split('.')[1].length;
    }
  }

  let ary = [];

  for (let i = tickMin; i <= tickMax; i += step) {
    ary.push(+(parseFloat(i).toFixed(fixlen)));
  }

  return ary;
}

export default getTickValues;
