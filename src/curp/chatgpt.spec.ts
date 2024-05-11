const assert = require('assert');
const { CurpValidators } = require('./validators');

const minAge = 21;
const maxAge = 71;

let curp:any = '';

beforeEach(() => {
    jest.useFakeTimers().
    setSystemTime(new Date(2021, 5, 15).getTime());
    curp = 'ZAAZ991231HDFBCD09';
});

describe('CurpValidators', () => {
  describe('#validateFormat', () => {
    it('should return true for a valid curp format', () => {
      assert.strictEqual(CurpValidators.validateFormat('ZAAZ991231HDFBCD09'), true);
    });

    it('should return false for an invalid curp format', () => {
      assert.strictEqual(CurpValidators.validateFormat('PEMJ910313HMCNS'), false);
    });
  });

  describe('#validateFormatAndAge', () => {
    it('should return true for a curp with a valid format and age between 18 and 30', () => {
      assert.strictEqual(CurpValidators.validateFormatAndAge('ZAAZ991231HDFBCD09', 18, 30), true);
    });

    it('should return false for a curp with an invalid format', () => {
      assert.strictEqual(CurpValidators.validateFormatAndAge('PEMJ910313HMCNS', 18, 30), false);
    });

    it('should return false for a curp with an age less than 18', () => {
      assert.strictEqual(CurpValidators.validateFormatAndAge('PEMJ910313HMCNS07', 30, 50), false);
    });
  });
});