import test from 'ava';
import {
  getNiceTickValues, getTickValues,
  getTickValuesFixedDomain,
} from '../src/getNiceTickValues';

// getNiceTickValues equal values
test('getNiceTickValues equal values of positive integer has odd tick count', (t) => {
  const [min, max, count] = [5, 5, 3];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [4, 5, 6]);
});

test('getNiceTickValues equal values of positive integer has even tick count', (t) => {
  const [min, max, count] = [5, 5, 4];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [4, 5, 6, 7]);
});

test('getNiceTickValues equal values of negative integer has odd tick count', (t) => {
  const [min, max, count] = [-5, -5, 5];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [-7, -6, -5, -4, -3]);
});

test('getNiceTickValues equal values of negative integer has even tick count', (t) => {
  const [min, max, count] = [-5, -5, 2];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [-5, -4]);
});

test('getNiceTickValues equal values all zeros has odd tick count', (t) => {
  const [min, max, count] = [0, 0, 5];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [0, 1, 2, 3, 4]);
});

test('getNiceTickValues equal values all zeros has even tick count', (t) => {
  const [min, max, count] = [0, 0, 4];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [0, 1, 2, 3]);
});

test('getNiceTickValues equal values of positive pure decomal has odd tick count', (t) => {
  const [min, max, count] = [0.05, 0.05, 3];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [0.04, 0.05, 0.06]);
});

test('getNiceTickValues equal values of positive pure decomal has odd tick count not allow decimals', (t) => {
  const [min, max, count] = [0.05, 0.05, 3];
  const scales = getNiceTickValues([min, max], count, false);

  t.deepEqual(scales, [-1, 0, 1]);
});

test('getNiceTickValues equal values of positive pure decomal has even tick count', (t) => {
  const [min, max, count] = [0.8, 0.8, 4];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [0.7, 0.8, 0.9, 1]);
});

test('getNiceTickValues equal values of positive unpure decomal has odd tick count', (t) => {
  const [min, max, count] = [5.2, 5.2, 3];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [4, 5, 6]);
});

test('getNiceTickValues equal values of positive unpure decimals has odd tick count not allow decimals', (t) => {
  const [min, max, count] = [5.2, 5.2, 3];
  const scales = getNiceTickValues([min, max], count, false);

  t.deepEqual(scales, [4, 5, 6]);
});

test('getNiceTickValues equal values of positive unpure decomal has even tick count', (t) => {
  const [min, max, count] = [3.92, 3.92, 2];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [3, 4]);
});

test('getNiceTickValues equal values of negative pure decomal has odd tick count', (t) => {
  const [min, max, count] = [-0.053, -0.053, 5];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [-0.08, -0.07, -0.06, -0.05, -0.04]);
});

test('getNiceTickValues equal values of negative pure decomal has odd tick count not allow decimals', (t) => {
  const [min, max, count] = [-0.053, -0.053, 5];
  const scales = getNiceTickValues([min, max], count, false);

  t.deepEqual(scales, [-3, -2, -1, 0, 1]);
});

test('getNiceTickValues equal values of negative pure decomal has even tick count', (t) => {
  const [min, max, count] = [-0.832, -0.832, 4];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [-1, -0.9, -0.8, -0.7]);
});

test('getNiceTickValues equal values of negative unpure decomal has odd tick count', (t) => {
  const [min, max, count] = [-5.2, -5.2, 3];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [-7, -6, -5]);
});

test('getNiceTickValues equal values of negative unpure decomal has even tick count', (t) => {
  const [min, max, count] = [-3.92, -3.92, 2];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [-4, -3]);
});

test('getNiceTickValues unequal values of positive integer', (t) => {
  const [min, max, count] = [1, 5, 5];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [1, 2, 3, 4, 5]);
});

test('getNiceTickValues unequal values of negative to positive integer & has odd ticks', (t) => {
  const [min, max, count] = [-5, 95, 7];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [-20, 0, 20, 40, 60, 80, 100]);
});

test('getNiceTickValues unequal values of negative integerr', (t) => {
  const [min, max, count] = [-105, -25, 6];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [-120, -100, -80, -60, -40, -20]);
});

test('getNiceTickValues unequal values of min is bigger than max & has odd ticks', (t) => {
  const [min, max, count] = [67, 5, 5];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [80, 60, 40, 20, 0]);
});

test('getNiceTickValues unequal values of min is bigger than max & has even ticks', (t) => {
  const [min, max, count] = [67, 5, 4];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [75, 50, 25, 0]);
});

test('getNiceTickValues unequal values of float [39.9156, 42.5401, 5]', (t) => {
  const [min, max, count] = [39.9156, 42.5401, 5];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [39.9, 40.6, 41.3, 42, 42.7]);
});

test('getNiceTickValues unequal values of float [0.3885416666666666, 0.04444444444444451, 5]', (t) => {
  const [min, max, count] = [0.3885416666666666, 0.04444444444444451, 5];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [0.4, 0.3, 0.2, 0.1, 0]);
});

test('getNiceTickValues unequal values of float [-4.10389, 0.59414, 7]', (t) => {
  const [min, max, count] = [-4.10389, 0.59414, 7];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [-4.25, -3.4, -2.55, -1.7, -0.85, 0, 0.85]);
});

test('getNiceTickValues unequal values of float [-4.10389, 0.59414, 7] not allow decimals', (t) => {
  const [min, max, count] = [-4.10389, 0.59414, 7];
  const scales = getNiceTickValues([min, max], count, false);

  t.deepEqual(scales, [-5, -4, -3, -2, -1, 0, 1]);
});

test('getNiceTickValues unequal values of integers [0, 14, 5]', (t) => {
  const [min, max, count] = [0, 14, 5];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [0, 4, 8, 12, 16]);
});

test('getNiceTickValues unequal values of integers [0, 1, 5]', (t) => {
  const [min, max, count] = [0, 1, 5];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [0, 0.25, 0.5, 0.75, 1]);
});

test('getNiceTickValues unequal values of integers [0, 1e+100, 6]', (t) => {
  const [min, max, count] = [0, 1e+100, 6];
  const scales = getNiceTickValues([min, max], count);

  t.deepEqual(scales, [0, 2e+99, 4e+99, 6e+99, 8e+99, 1e+100]);
});

// getTickValues of unequal values
test('getTickValues unequal values of positive integer', (t) => {
  const [min, max, count] = [1, 5, 5];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [1, 2, 3, 4, 5]);
});

test('getTickValues unequal values of negative to positive integer & has odd ticks', (t) => {
  const [min, max, count] = [-5, 95, 7];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [-5, 15, 35, 55, 75, 95]);
});

test('getTickValues unequal values of negative integerr', (t) => {
  const [min, max, count] = [-105, -25, 6];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [-105, -85, -65, -45, -25]);
});

test('getTickValues unequal values of min is bigger than max & has odd ticks', (t) => {
  const [min, max, count] = [67, 5, 5];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [65, 45, 25, 5]);
});

test('getTickValues unequal values of min is bigger than max & has even ticks', (t) => {
  const [min, max, count] = [67, 5, 4];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [55, 30, 5]);
});

test('getTickValues unequal values of float [-4.10389, 0.59414, 7]', (t) => {
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

test('getTickValues unequal values of float [-4.10389, 0.59414, 7] not allow decimals', (t) => {
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

test('getTickValues unequal values of integers [0, 14, 5]', (t) => {
  const [min, max, count] = [0, 14, 5];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [0, 4, 8, 12]);
});

test('getTickValues unequal values of integers [0, 1e+100, 6]', (t) => {
  const [min, max, count] = [0, 1e+100, 6];
  const scales = getTickValues([min, max], count);

  t.deepEqual(scales, [0, 2e+99, 4e+99, 6e+99, 8e+99, 1e+100]);
});

test('getTickValuesFixedDomain unequal values of positive integer', (t) => {
  const [min, max, count] = [1, 7, 5];
  const scales = getTickValuesFixedDomain([min, max], count);

  t.deepEqual(scales, [1, 3, 5, 7]);
});

test('getTickValuesFixedDomain unequal values of negative to positive integer & has odd ticks', (t) => {
  const [min, max, count] = [-5, 95, 7];
  const scales = getTickValuesFixedDomain([min, max], count);

  t.deepEqual(scales, [-5, 15, 35, 55, 75, 95]);
});

test('getTickValuesFixedDomain unequal values of negative integerr', (t) => {
  const [min, max, count] = [-105, -25, 6];
  const scales = getTickValuesFixedDomain([min, max], count);

  t.deepEqual(scales, [-105, -85, -65, -45, -25]);
});

test('getTickValuesFixedDomain unequal values of min is bigger than max & has odd ticks', (t) => {
  const [min, max, count] = [67, 5, 5];
  const scales = getTickValuesFixedDomain([min, max], count);

  t.deepEqual(scales, [67, 45, 25, 5]);
});

test('getTickValuesFixedDomain unequal values of min is bigger than max & has even ticks', (t) => {
  const [min, max, count] = [67, 5, 4];
  const scales = getTickValuesFixedDomain([min, max], count);

  t.deepEqual(scales, [67, 30, 5]);
});

test('getTickValuesFixedDomain unequal values of float [-4.10389, 0.59414, 7]', (t) => {
  const [min, max, count] = [-4.10389, 0.59414, 7];
  const scales = getTickValuesFixedDomain([min, max], count);

  t.deepEqual(scales, [
    -4.10389,
    -3.30389,
    -2.50389,
    -1.70389,
    -0.90389,
    0.59414,
  ]);
});

test('getTickValuesFixedDomain unequal values of float [-4.10389, 0.59414, 7] not allow decimals', (t) => {
  const [min, max, count] = [-4.10389, 0.59414, 7];
  const scales = getTickValuesFixedDomain([min, max], count, false);

  t.deepEqual(scales, [
    -4.10389,
    -3.10389,
    -2.10389,
    -1.10389,
    0.59414,
  ]);
});

test('getTickValuesFixedDomain unequal values of integers [0, 14, 5]', (t) => {
  const [min, max, count] = [0, 14, 5];
  const scales = getTickValuesFixedDomain([min, max], count);

  t.deepEqual(scales, [0, 4, 8, 14]);
});

test('getTickValuesFixedDomain unequal values of integers [0, 1e+100, 6]', (t) => {
  const [min, max, count] = [0, 1e+100, 6];
  const scales = getTickValuesFixedDomain([min, max], count);

  t.deepEqual(scales, [0, 2e+99, 4e+99, 6e+99, 8e+99, 1e+100]);
});

test('getTickValuesFixedDomain equal values of positive integer', (t) => {
  const [min, max, count] = [1, 1, 5];
  const scales = getTickValuesFixedDomain([min, max], count);

  t.deepEqual(scales, [1]);
});
