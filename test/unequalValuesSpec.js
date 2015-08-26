import scale from '../index';
import {expect} from 'chai';

describe('unequal values', () => {

  describe('positive interge', () => {
    const [min, max, count] = [1, 5, 5];
    const scales = scale(min, max, count);

    it('should return five scales', () => {
      expect(scales).to.have.length(count);
    });

    it('should scales[0] is not bigger than min', () => {
      expect(min).to.not.below(scales[0]);
    });

    it('should last elemtnt of scales is not smaller than min', () => {
      expect(max).to.not.above(scales[scales.length - 1]);
    });

  });

  describe('negative and positive interge', () => {
    const [min, max, count] = [-5, 95, 5];
    const scales = scale(min, max, count);

    it('should return five scales', () => {
      expect(scales).to.have.length(count);
    });

    it('should scales[0] is not bigger than min', () => {
      expect(min).to.not.below(scales[0]);
    });

    it('should last elemtnt of scales is not smaller than min', () => {
      expect(max).to.not.above(scales[scales.length - 1]);
    });

  });

  describe('negative interger', () => {
    const [min, max, count] = [-105, -5, 5];
    const scales = scale(min, max, count);

    it('should return five scales', () => {
      expect(scales).to.have.length(count);
    });

    it('should scales[0] is not bigger than min', () => {
      expect(min).to.not.below(scales[0]);
    });

    it('should last elemtnt of scales is not smaller than min', () => {
      expect(max).to.not.above(scales[scales.length - 1]);
    });

  });

  describe('wrong min & max', () => {
    const [min, max, count] = [67, 5, 5];
    const scales = scale(min, max, count);

    it('should return scales of length count', () => {
      expect(scales).to.have.length(count);
    });

    it('should scales[0] is not bigger than min', () => {
      expect(max).to.not.below(scales[0]);
    });

    it('should last elemtnt of scales is not smaller than min', () => {
      expect(min).to.not.above(scales[scales.length - 1]);
    });

  });
});
