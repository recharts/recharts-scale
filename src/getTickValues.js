import getNiceTickValues from './getNiceTickValues';
import R from 'ramda';

function getTickValues(domain, tickCount) {
  if (domain[0] === domain[1]) {
    return getNiceTickValues(domain, tickCount);
  }

  const finalTickCount = Math.max(tickCount, 2);

  const step = (domain[1] - domain[0]) / (finalTickCount - 1);

  const fn = R.compose(
    R.map(n => (domain[0] + n * step)),
    R.range
  );

  return fn(0, finalTickCount);
}

export default getTickValues;
