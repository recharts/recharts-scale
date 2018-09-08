import Arithmetic from '../../src/util/arithmetic';
import { expect } from 'chai';

describe('sum', () => {
  describe('of a integer and a float', () => {
    it('should js return a long float', () => {
      expect(1 + 0.14).to.not.equal(1.14);
    });
    it('should return a right float', () => {
      expect(Arithmetic.sum(1, 0.14)).to.equal(1.14);
    });
  });

  describe('of a float and a float', () => {
    it('should js return a long float', () => {
      expect(0.1 + 0.2).to.not.equal(0.3);
    });
    it('should return a right float', () => {
      expect(Arithmetic.sum(0.1, 0.2)).to.equal(0.3);
    });
  });
});

describe('minus', () => {
  describe('of a integer and a float', () => {
    it('should js return a long float', () => {
      expect(1 - 0.7).to.not.equal(0.3);
    });
    it('should return a right float', () => {
      expect(Arithmetic.minus(1, 0.7)).to.equal(0.3);
    });
  });

  describe('of a float and a float', () => {
    it('should js return a long float', () => {
      expect(0.3 - 0.1).to.not.equal(0.2);
    });
    it('should return a right float', () => {
      expect(Arithmetic.minus(0.3, 0.1)).to.equal(0.2);
    });
  });
});

describe('modulo', () => {
  describe('of a integer and a float', () => {
    it('should js return a long float', () => {
      expect(40.54815 % 0.35).to.not.equal(0.29815);
    });
    it('should return a right float', () => {
      expect(Arithmetic.modulo(40.54815, 0.35)).to.equal(0.29815);
    });
  });

  describe('of a float and a float', () => {
    it('should js return a long float', () => {
      expect(-40.54815 % 0.35).to.not.equal(-0.29815);
    });
    it('should return a right float', () => {
      expect(Arithmetic.modulo(-40.54815, 0.35)).to.equal(-0.29815);
    });
  });
});

describe('multiply', () => {
  describe('of a integer and a float', () => {
    it('should js return a long float', () => {
      expect(7 * 0.8).to.not.equal(5.6);
    });
    it('should return a right float', () => {
      expect(Arithmetic.multiply(7, 0.8)).to.equal(5.6);
    });
  });

  describe('of a float and a float', () => {
    it('should js return a long float', () => {
      expect(0.12 * 0.7).to.not.equal(0.084);
    });
    it('should return a right float', () => {
      expect(Arithmetic.multiply(0.12, 0.7)).to.equal(0.084);
    });
  });

  describe('of a huge integer and a integer', () => {
    it('should js return a long float', () => {
      expect(7e+30 * 0.8).to.not.equal(5.6e+30);
    });
    it('should return a right float', () => {
      expect(Arithmetic.multiply(7e+30, 0.8)).to.equal(5.6e+30);
    });
  });

  describe('of a huge integer and a huge integer', () => {
    it('should js return a long float', () => {
      expect(7e+30 * 0.8 + 30).to.not.equal(5.6e+60);
    });
    it('should return a right float', () => {
      expect(Arithmetic.multiply(7e+30, 0.8e+30)).to.equal(5.6e+60);
    });
  });

  describe('of a tiny float and a float', () => {
    it('should return a right float', () => {
      expect(Arithmetic.multiply(0.12e-30, 0.7)).to.equal(0.084e-30);
    });
  });

  describe('of a tiny float and a tiny float', () => {
    it('should return a right float', () => {
      expect(Arithmetic.multiply(0.12e-30, 0.7e-30)).to.equal(0.084e-60);
    });
  });

  describe('of a huge integer and a tiny float', () => {
    it('should js return a long float', () => {
      expect(7e+30 * 0.8e-30).to.not.equal(5.6);
    });
    it('should return a right float', () => {
      expect(Arithmetic.multiply(7e+30, 0.8e-30)).to.equal(5.6);
    });
  });

  describe('of a tiny float and a huge integer', () => {
    it('should js return a long float', () => {
      expect(0.12e-30 * 0.7e+30).to.not.equal(0.084);
    });
    it('should return a right float', () => {
      expect(Arithmetic.multiply(0.12e-30, 0.7e+30)).to.equal(0.084);
    });
  });
});

describe('divide', () => {
  describe('of a integer and a float', () => {
    it('should js return a long float', () => {
      expect(15 / 0.000005).to.not.equal(3000000);
    });
    it('should return a right float', () => {
      expect(Arithmetic.divide(15, 0.000005)).to.equal(3000000);
    });
  });

  describe('of a float and a float', () => {
    it('should js return a long float', () => {
      expect(0.6 / 0.2).to.not.equal(3);
    });
    it('should return a right float', () => {
      expect(Arithmetic.divide(0.6, 0.2)).to.equal(3);
    });
  });

  describe('of a huge integer and a float', () => {
    it('should js return a long float', () => {
      expect(15e+30 / 0.000005).to.not.equal(3e+36);
    });
    it('should return a right float', () => {
      expect(Arithmetic.divide(15e+30, 0.000005)).to.equal(3e+36);
    });
  });

  describe('of a huge integer and a huge integer', () => {
    it('should return a right float', () => {
      expect(Arithmetic.divide(0.6e+30, 0.2e+30)).to.equal(3);
    });
  });
});

describe('rangeStep', () => {
  describe('of integer step', () => {
    const [start, end, step] = [14, 20, 3];
    const result = Arithmetic.rangeStep(start, end, step);

    it('should return integers', () => {
      expect(result).to.eql([14, 17]);
    });
  });

  describe('of float step', () => {
    it('should return right step of float start', () => {
      const [start, end, step] = [0.1, 0.85, 0.1];
      const result = Arithmetic.rangeStep(start, end, step);

      expect(result).to.eql([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]);
    });

    it('should return right step of integer start', () => {
      const [start, end, step] = [1, 2, 0.1];
      const result = Arithmetic.rangeStep(start, end, step);

      expect(result).to.eql([1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9]);
    });
  });
});

describe('isFloat', () => {
  describe('of integer', () => {
    it('should return false', () => expect(Arithmetic.isFloat(2)).to.be.false);
  });

  describe('of float integer', () => {
    it('should return false', () => expect(Arithmetic.isFloat(2.000)).to.be.false);
  });

  describe('of float', () => {
    it('should return true', () => expect(Arithmetic.isFloat(0.01)).to.be.true);
  });

});


describe('getDigitCount', () => {
  describe('of integer', () => {
    it('should return count of digit', () => {
      expect(Arithmetic.getDigitCount(1289)).to.equal(4);
    });
  });

  describe('of float', () => {
    it('should return count of digit', () => {
      expect(Arithmetic.getDigitCount(0.0912)).to.equal(-1);
    });
  });

  describe('of zero', () => {
    it('should return count of digit', () => {
      expect(Arithmetic.getDigitCount(0)).to.equal(1);
    });
  });

  describe('of 1.1e+21', () => {
    it('should return 22', () => {
      expect(Arithmetic.getDigitCount(1.1e+21)).to.equal(22);
    });
  });

  describe('of 1.1e-21', () => {
    it('should return -20', () => {
      expect(Arithmetic.getDigitCount(1.1e-21)).to.equal(-20);
    });
  });

  describe('of 12345.67', () => {
    it('should return 5', () => {
      expect(Arithmetic.getDigitCount(12345.67)).to.equal(5);
    });
  });
  describe('of -12345.67', () => {
    it('should return 5', () => {
      expect(Arithmetic.getDigitCount(-12345.67)).to.equal(5);
    });
  });
  describe('of -0.0000007', () => {
    it('should return -0.0000007', () => {
      expect(Arithmetic.getDigitCount(-0.0000007)).to.equal(-6);
    });
  });
});

describe('getDecimalDigitCount', () => {
  describe('of integer', () => {
    it('should return 0', () => {
      expect(Arithmetic.getDecimalDigitCount(12)).to.equal(0);
    });
  });

  describe('of float', () => {
    it('should return count of digit', () => {
      expect(Arithmetic.getDecimalDigitCount(0.0912)).to.equal(4);
    });
  });

  describe('of scientific notation', () => {
    it('should return count of digit', () => {
      expect(Arithmetic.getDecimalDigitCount(-4e-17)).to.equal(17);
    });
  });

  describe('of zero', () => {
    it('should return count of digit', () => {
      expect(Arithmetic.getDecimalDigitCount(0)).to.equal(0);
    });
  });
});
