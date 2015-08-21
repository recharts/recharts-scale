import scale from '../index';
import {expect} from 'chai';

describe('equal values', () => {

  describe('positive integer', () => {
    let [min, max, count] = [5, 5, 3],
        scales = scale(min, max, count);

    it('should return five scales', () => {
      expect(scales).to.have.length(count);
    });

    it('should scales[0] is not bigger than min', () => {
      expect(min).to.not.below(scales[0]);
    });

    it('should last element of scales is not smaller than min', () => {
      expect(max).to.not.above(scales[scales.length - 1]);
    });

    it('should middle element of odd scales is equal to min && max', () => {
      expect(scales[Math.floor((count - 1) / 2)]).to.equal(min);
    });

  });

  describe('negative integer', () => {
    let [min, max, count] = [-5, -5, 2],
        scales = scale(min, max, count);

    it('should return five scales', () => {
      expect(scales).to.have.length(count);
    });

    it('should scales[0] is not bigger than min', () => {
      expect(min).to.not.below(scales[0]);
    });

    it('should last element of scales is not smaller than min', () => {
      expect(max).to.not.above(scales[scales.length - 1]);
    });

  });

  describe('positive decomal', () => {
    let [min, max, count] = [0.05, 0.05, 3],
        scales = scale(min, max, count);

    it('should return five scales', () => {
      expect(scales).to.have.length(count);
    });

    it('should scales[0] is not bigger than min', () => {
      expect(min).to.not.below(scales[0]);
    });

    it('should last element of scales is not smaller than min', () => {
      expect(max).to.not.above(scales[scales.length - 1]);
    });

    it('should middle element of odd scales is equal to min && max', () => {
      expect(scales[Math.floor((count - 1) / 2)]).to.equal(min);
    });

  });
});
