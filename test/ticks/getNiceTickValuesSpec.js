import getNiceTickValues from '../../src/getNiceTickValues';
import {expect} from 'chai';

describe('getNiceTickValues of equal values', () => {
  describe('of positive integer has odd tick count', () => {
    const [min, max, count] = [5, 5, 3];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [4, 5, 6]', () => {
      expect(scales).to.eql([4, 5, 6]);
    });
  });

  describe('of positive integer has even tick count', () => {
    const [min, max, count] = [5, 5, 4];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [4, 5, 6, 7]', () => {
      expect(scales).to.eql([4, 5, 6, 7]);
    });
  });

  describe('of negative integer has odd tick count', () => {
    const [min, max, count] = [-5, -5, 5];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [-7, -6, -5, -4, -3]', () => {
      expect(scales).to.eql([-7, -6, -5, -4, -3]);
    });
  });

  describe('of negative integer has even tick count', () => {
    const [min, max, count] = [-5, -5, 2];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [-5, -4]', () => {
      expect(scales).to.eql([-5, -4]);
    });
  });

  describe('all zeros has odd tick count', () => {
    const [min, max, count] = [0, 0, 5];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [-2, -1, 0, 1, 2]', () => {
      expect(scales).to.eql([-2, -1, 0, 1, 2]);
    });

  });

  describe('all zeros has even tick count', () => {
    const [min, max, count] = [0, 0, 4];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [-1, 0, 1, 2]', () => {
      expect(scales).to.eql([-1, 0, 1, 2]);
    });

  });

  describe('of positive pure decomal has odd tick count', () => {
    const [min, max, count] = [0.05, 0.05, 3];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [0.04, 0.05, 0.06]', () => {
      expect(scales).to.eql([0.04, 0.05, 0.06]);
    });
  });

  describe('of positive pure decomal has even tick count', () => {
    const [min, max, count] = [0.8, 0.8, 4];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [0.7, 0.8, 0.9, 1]', () => {
      expect(scales).to.eql([0.7, 0.8, 0.9, 1]);
    });
  });

  describe('of positive unpure decomal has odd tick count', () => {
    const [min, max, count] = [5.2, 5.2, 3];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [4, 5, 6]', () => {
      expect(scales).to.eql([4, 5, 6]);
    });
  });

  describe('of positive unpure decomal has even tick count', () => {
    const [min, max, count] = [3.92, 3.92, 2];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [3, 4]', () => {
      expect(scales).to.eql([3, 4]);
    });
  });

  describe('of negative pure decomal has odd tick count', () => {
    const [min, max, count] = [-0.053, -0.053, 5];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [-0.08, -0.07, -0.06, -0.05, -0.04]', () => {
      expect(scales).to.eql([-0.08, -0.07, -0.06, -0.05, -0.04]);
    });
  });

  describe('of negative pure decomal has even tick count', () => {
    const [min, max, count] = [-0.832, -0.832, 4];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [-1, -0.9, -0.8, -0.7]', () => {
      expect(scales).to.eql([-1, -0.9, -0.8, -0.7]);
    });
  });

  describe('of negative unpure decomal has odd tick count', () => {
    const [min, max, count] = [-5.2, -5.2, 3];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [-7, -6, -5]', () => {
      expect(scales).to.eql([-7, -6, -5]);
    });
  });

  describe('of negative unpure decomal has even tick count', () => {
    const [min, max, count] = [-3.92, -3.92, 2];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [-4, -3]', () => {
      expect(scales).to.eql([-4, -3]);
    });
  });
});

// TODO: 这样的测试方法是否合适
describe('getNiceTickValues of unequal values', () => {
  describe('of positive integer', () => {
    const [min, max, count] = [1, 5, 5];
    const scales = getNiceTickValues([min, max], count);

    it('should return [1, 2, 3, 4, 5]', () => {
      expect(scales).to.eql([1, 2, 3, 4, 5]);
    });
  });

  describe('of negative to positive integer & has odd ticks', () => {
    const [min, max, count] = [-5, 95, 7];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales [-20, 0, 20, 40, 60, 80, 100]', () => {
      expect(scales).to.eql([-20, 0, 20, 40, 60, 80, 100]);
    });
  });

  describe('of negative integerr', () => {
    const [min, max, count] = [-105, -25, 6];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales [-120, -100, -80, -60, -40, -20]', () => {
      expect(scales).to.eql([-120, -100, -80, -60, -40, -20]);
    });
  });

  describe('of min is bigger than max & has odd ticks', () => {
    const [min, max, count] = [67, 5, 5];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [80, 60, 40, 20, 0]', () => {
      expect(scales).to.eql([80, 60, 40, 20, 0]);
    });

  });

  describe('of min is bigger than max & has even ticks', () => {
    const [min, max, count] = [67, 5, 4];
    const scales = getNiceTickValues([min, max], count);

    it('should return scales of [75, 50, 25, 0]', () => {
      expect(scales).to.eql([75, 50, 25, 0]);
    });

  });
});