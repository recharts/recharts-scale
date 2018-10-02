/**
 * @fileOverview Common operational method
 * @author xile611, arcthur
 * @date 2018-10-02
 */
import Decimal from 'decimal.js-light';
import { curry } from './utils';

/**
 * calculate the digit of numerical value
 * absolute value belong to [0.1, 1) will get the digit is 0
 * absolute value belong to [0.01, 0.1) will get the digit is -1
 * absolute value belong to [0.001, 0.01) will get the digit is -2
 *
 * @param  {Number} value numerical value
 * @return {Integer} digit
 */
function getDigitCount(value) {
  return value === 0 ? 1 : Math.floor(new Decimal(value).abs().log(10)
    .toNumber()) + 1;
}

/*
 * calculate value of fixed range to get the range value of [start, end)
 * and need to handle precision problem
 *
 * @param  {Number} start range of start
 * @param  {Number} end   not contain the value
 * @param  {Number} step  range step
 * @return {Array}
 */
function rangeStep(start, end, step) {
  let num = new Decimal(start);
  const result = [];

  while (num.lt(end)) {
    result.push(num.toNumber());

    num = num.add(step);
  }

  return result;
}

/**
 * interpolate number
 *
 * @param  {Number} a  the extremum of continuous definition domain
 * @param  {Number} b  the extremum of continuous definition domain
 * @param  {Number} t  the number of [0, 1]
 * @return {Number}
 */
const interpolateNumber = curry((a, b, t) => {
  const newA = +a;
  const newB = +b;

  return newA + t * (newB - newA);
});

/**
 * inverse operation of interpolate
 *
 * @param  {Number} a the extremum of continuous definition domain
 * @param  {Number} b the extremum of continuous definition domain
 * @param  {Number} x the output of interpolate
 * @return {Number}   when x in a ~ b, the output belong to [0, 1]
 */
const uninterpolateNumber = curry((a, b, x) => {
  let diff = b - (+a);

  diff = diff || Infinity;

  return (x - a) / diff;
});

/**
 * inverse operation of interpolate, and will be truncate
 *
 * @param  {Number} a the extremum of continuous definition domain
 * @param  {Number} b the extremum of continuous definition domain
 * @param  {Number} x the output of interpolate
 * @return {Number}   when x in a ~ b, the output belong to [0, 1]，
 *                    when x not in a ~ b, will be truncate the range
 */
const uninterpolateTruncation = curry((a, b, x) => {
  let diff = b - (+a);

  diff = diff || Infinity;

  return Math.max(0, Math.min(1, (x - a) / diff));
});

export default {
  rangeStep,
  getDigitCount,

  interpolateNumber,
  uninterpolateNumber,
  uninterpolateTruncation,
};
