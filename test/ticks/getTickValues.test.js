import test from 'ava';
import { getTickValues } from '../../src/getNiceTickValues';

test('of unequal values of positive integer', (t) => {
  const [min, max, count] = [1, 5, 5];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [1, 2, 3, 4, 5]);
});

test('of unequal values: of negative to positive integer & has odd ticks', (t) => {
  const [min, max, count] = [-5, 95, 7];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [-5, 15, 35, 55, 75, 95]);
});

test('of unequal values: of negative integerr', (t) => {
  const [min, max, count] = [-105, -25, 6];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [-105, -85, -65, -45, -25]);

});

test('of unequal values: of min is bigger than max & has odd ticks', (t) => {
  const [min, max, count] = [67, 5, 5];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [65, 45, 25, 5]);
});

test('of unequal values: of min is bigger than max & has even ticks', (t) => {
  const [min, max, count] = [67, 5, 4];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [55, 30, 5]);
});

test('of unequal values: of float [-4.10389, 0.59414, 7]', (t) => {
  const [min, max, count] = [-4.10389, 0.59414, 7];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [
    -4.10389,
    -3.30389,
    -2.50389,
    -1.70389,
    -0.90389,
    -0.10389,
  ]);
});

test('of unequal values: of float [-4.10389, 0.59414, 7] not allow decimals', (t) => {
  const [min, max, count] = [-4.10389, 0.59414, 7];
  const scales = getTickValues([min, max], count, false);

  t.deepEqual(scales, [
    -4.10389,
    -3.10389,
    -2.10389,
    -1.10389,
    -0.10389,
  ]);
});

test('of unequal values: of integers [0, 14, 5]', (t) => {
  const [min, max, count] = [0, 14, 5];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [0, 4, 8, 12]);

});

test('of unequal values: of integers [0, 1e+100, 6]', (t) => {
  const [min, max, count] = [0, 1e+100, 6];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [0, 2e+99, 4e+99, 6e+99, 8e+99, 1e+100]);
});

test('of unequal values: of Infinity values [-Infinity, Infinity, 5]', (t) => {
  const [min, max, count] = [-Infinity, Infinity, 5];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [-Infinity, Infinity]);
});

test('of unequal values: of Infinity values [-Infinity, 100, 5]', (t) => {
  const [min, max, count] = [-Infinity, 100, 5];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [-Infinity, 100]);
});

test('of unequal values: of Infinity values [-100, Infinity, 5]', (t) => {
  const [min, max, count] = [-100, Infinity, 5];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [-100, Infinity]);
});
