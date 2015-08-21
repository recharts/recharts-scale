function identity (x) {
  return +x;
}

const scales = {

};


function getTickValues (cormin, cormax, tickCount) {
  // 刻度的数量不能小于1
  if (tickCount < 1) {
    tickCount = 2;
  }

  var corstep,
    tmpstep,
    tmp, //幂
    step,
    min,
    max,
    middle,
    log = Math.log,
    pow = Math.pow,
    ary = [],
    fixlen = 0,
    isFloat = function(num) {
      return /^([+-]?)\d*\.\d+$/.test(num);
    };

  // if (cormax < cormin) return;
  if (cormax === cormin && cormin > 0) {
    cormin = 0;
    cormax = cormax * 2;
  } else if (cormax === cormin && cormin < 0) {
    cormax = 0;
    cormin = cormin * 2;
  } else if (cormax === cormin) {
    cormin = 0;
    cormax = 100;
  }

  // 获取间隔宽度
  corstep = (cormax - cormin) / (tickCount - 1);
  // 获取间隔宽度的位数
  tmp = Math.floor(log(corstep) / log(10)) + 1;

  tmpstep = corstep / pow(10, tmp);

  if (tmpstep > 0 && tmpstep <= 0.1) {

    tmpstep = 0.1;

  } else if (tmpstep > 0.1 && tmpstep <= 0.2) {

    tmpstep = 0.2;

  } else if (tmpstep > 0.2 && tmpstep <= 0.25) {

    tmpstep = 0.25;

  } else if (tmpstep > 0.25 && tmpstep <= 0.5) {

    tmpstep = 0.5;

  } else {

    tmpstep = 1;

  }

  step = tmpstep * pow(10, tmp);
  // 中值的偏移量
  var middleOffset = ((cormax + cormin) / 2) % step;

  middle = (cormax + cormin) / 2 - middleOffset;

  min = max = middle;

  while (min > cormin) {
    min -= step;
  }

  while (max < cormax) {
    max += step;
  }
  // 当middleOffset = 0时，生成的刻度的数量等于 tickCount
  // 当刻度的区间长度和原始的区间长度的差值 大于 刻度向下偏移的值 时，生成的刻度数量等于 tickCount - 1
  // 当刻度的区间长度和原始的区间长度的差值 小于或等于 刻度向下偏移的值 时，生成的刻度数量等于 tickCount
  // 下面对这两种情况进行修正， 达到最后得到的刻度的个数 等于 tickCount 的 效果
  if (((tickCount - 1) * step - (cormax - cormin)) > middleOffset && middleOffset > 0) {
    max += step;
  }


  if (isFloat(step)) {
    var stepstr = (step + '');
    if (stepstr.indexOf('.') > -1) {
      fixlen = stepstr.split('.')[1].length > 4 ? 4 : stepstr.split('.')[1].length;
    }
  }
  for (var i = min; i <= max; i += step) {
    ary.push(+(parseFloat(i).toFixed(fixlen)));
  }

  return ary;
}

export default getTickValues;
