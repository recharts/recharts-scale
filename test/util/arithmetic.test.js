import test from 'ava';
import Arithmetic from '../../src/util/arithmetic';
// rangeStep
test('of integer step', (t) => {
  const [start, end, step] = [14, 20, 3];
  const result = Arithmetic.rangeStep(start, end, step);

  t.deepEqual(result, [14, 17]);
});

// of float step
test('should return right step of float start', (t) => {
  const [start, end, step] = [0.1, 0.85, 0.1];
  const result = Arithmetic.rangeStep(start, end, step);

  t.deepEqual(result, [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]);
});

test('should return right step of integer start', (t) => {
  const [start, end, step] = [1, 2, 0.1];
  const result = Arithmetic.rangeStep(start, end, step);

  t.deepEqual(result, [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9]);
});

// getDigitCount
test('should return count of digit', (t) => {
  t.deepEqual(Arithmetic.getDigitCount(1289), 4);
  t.deepEqual(Arithmetic.getDigitCount(0.0912), -1);
  t.deepEqual(Arithmetic.getDigitCount(0), 1);
  t.deepEqual(Arithmetic.getDigitCount(1.1e+21), 22);
  t.deepEqual(Arithmetic.getDigitCount(1.1e-21), -20);
  t.deepEqual(Arithmetic.getDigitCount(12345.67), 5);
  t.deepEqual(Arithmetic.getDigitCount(-12345.67), 5);
  t.deepEqual(Arithmetic.getDigitCount(-0.0000007), -6);
});
