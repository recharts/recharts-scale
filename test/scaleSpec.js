import scale from '../src/scale';
import {expect} from 'chai';

describe('Scales', () => {

  describe('positive-interge', () => {
    let [min, max, count] = [5, 95, 5],
        scales = scale(min, max, count);

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

  describe('negative and positive', () => {
    let [min, max, count] = [-5, 95, 5],
        scales = scale(min, max, count);

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
});
