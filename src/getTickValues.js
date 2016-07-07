import { compose, map, range } from './util/utils';
import getNiceTickValues from './getNiceTickValues';

function getTickValues(domain, tickCount) {
  if (domain[0] === domain[1]) {
    return getNiceTickValues(domain, tickCount);
  }

  const count = Math.max(tickCount, 2);

  const step = (domain[1] - domain[0]) / (count - 1);

  const fn = compose(
    map(n => (domain[0] + n * step)),
    range
  );

  return fn(0, count);
}

export default getTickValues;
