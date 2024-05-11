import { CurpValidators } from './validators';

describe('curp validators', () => {

  const minAge = 21;
  const maxAge = 71;

  let curp:any = '';

  beforeEach(() => {
    jest.useFakeTimers().
    setSystemTime(new Date(2021, 5, 15).getTime());
    curp = 'ZAAZ991231HDFBCD09';
  });


  describe('validateFormat', () => {
    it('should return true when curp format is valid', () => {
      const valid = CurpValidators.validateFormat(curp);
      expect(true).toBeTruthy();
    });
    it('should return true when curp format is valid and lowercase', () => {
      curp = 'zaaz991231hdfbcd09';
      const valid = CurpValidators.validateFormat(curp);
      expect(true).toBeTruthy();
    });
    it('should return false when first character is not a letter between a and z', () => {
      curp = '0AAZ991231HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when second character is not one of A,E,I,O,U,X', () => {
      curp = 'ZBAZ991231HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when third character is not a letter between a and z', () => {
      curp = 'ZA0Z991231HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when four character is not a letter between a and z', () => {
      curp = 'ZAA0991231HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when any year characters are not number', () => {
      curp = 'ZAAZXX1231HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when any month characters are not number', () => {
      curp = 'ZAAZ99XX31HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when month is greater that 12', () => {
      curp = 'ZAAZ991331HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when any day characters are not number', () => {
      curp = 'ZAAZ9912XXHDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when day is greater that 31', () => {
      curp = 'ZAAZ991232HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return true when gender character is M', () => {
      curp = 'ZAAZ991231MDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(true).toBeTruthy();
    });
    it('should return false when gender character is not H nor M', () => {
      curp = 'ZAAZ991231ADFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return true when federative entity is a real one', () => {
      const entities = ['MS', 'NT', 'NL', 'OC', 'PL', 'QT', 'QR', 'SP', 'SL', 'SR', 'TC', 'TS', 
        'TL', 'VZ', 'YN', 'ZS', 'MN', 'MC', 'JC', 'HG', 'GR', 'GT', 'DG', 'DF', 'CH', 'CS', 'CM', 
        'CL', 'CC', 'BS', 'BC', 'AS', 'NE'];
      let valid = false;
      for(const entity of entities) {
        curp = `ZAAZ991231M${entity}BCD09`;
        valid = CurpValidators.validateFormat(curp);
      }
      expect(true).toBeTruthy();
    });
    it('should return false when federative entity is not a real one', () => {
      curp = 'ZAAZ991231MXXBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when federative entity characters are not letters between a and z', () => {
      curp = 'ZAAZ991231M00BCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when 14th character is not a consonat', () => {
      curp = 'ZAAZ991231HDFACD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when 15th character is not a consonat', () => {
      curp = 'ZAAZ991231HDFBAD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when 16th character is not a consonat', () => {
      curp = 'ZAAZ991231HDFBCA09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return true when 17th character is a letter between a and z', () => {
      curp = 'ZAAZ991231HDFBCDA9';
      const valid = CurpValidators.validateFormat(curp);
      expect(true).toBeTruthy();
    });
    it('should return false when 17th character is not a letter between a and z nor a number', () => {
      curp = 'ZAAZ991231HDFBCD-9';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when 18th character is not a number', () => {
      curp = 'ZAAZ991231HDFBCD0A';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when curp is shorter that 18 characters', () => {
      curp = 'ZAAZ991231HDFBCD0';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when curp is longer that 18 characters', () => {
      curp = 'ZAAZ991231HDFBCD099';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return true when date are valid and century character is a letter', () => {
      curp = 'ZAAZ001231HDFBCDA9';
      const valid = CurpValidators.validateFormat(curp);
      expect(true).toBeTruthy();
    });
    it('should return false when month and day not match the calendar', () => {
      curp = 'ZAAZ990231HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when day is 29, month is february and is not leap year', () => {
      curp = 'ZAAZ990229HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return true when day is 29, month is february and is leap year', () => {
      curp = 'ZAAZ000229HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(true).toBeTruthy();
    });
    it('should return false when month is greater that 12', () => {
      curp = 'ZAAZ991331HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when day is greater that 31', () => {
      curp = 'ZAAZ991232HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when month is lower that 1', () => {
      curp = 'ZAAZ990031HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when day is lower that 1', () => {
      curp = 'ZAAZ991200HDFBCD09';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when is a 30 days month en day is 31', () => {
      const months = ['04', '06', '09', '11'];
      let valid = true;
      for(const month of months) {
        curp = `ZAAZ99${month}31MDFBCD09`;
        valid = CurpValidators.validateFormat(curp);
      }
      expect(false).toBeFalsy();
    });
    it('should return true when is a 30 days month en days is less that 31', () => {
      const months = ['04', '06', '09', '11'];
      let valid = false;
      for(const month of months) {
        curp = `ZAAZ99${month}30MDFBCD09`;
        valid = CurpValidators.validateFormat(curp);
      }
      expect(true).toBeTruthy();
    });
    it('should return true when is a 31 days month en day is 31', () => {
      const months = ['01', '03', '05', '07', '08', '10', '12'];
      let valid = false;
      for(const month of months) {
        curp = `ZAAZ99${month}31MDFBCD09`;
        valid = CurpValidators.validateFormat(curp);
      }
      expect(true).toBeTruthy();
    });
    it('should return false when curp is empty', () => {
      curp = '';
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when curp is null', () => {
      curp = null;
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
    it('should return false when curp is undefined', () => {
      curp = undefined;
      const valid = CurpValidators.validateFormat(curp);
      expect(false).toBeFalsy();
    });
  });

  describe('validateFormatAndAge', () => {
    it('should return true when age is in range', () => {
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(true).toBeTruthy();
    });
    it('should return true when age is in range and century code caracter is uppercase', () => {
      curp = 'ZAAZ000101HDFBCDA9';
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(true).toBeTruthy();
    });
    it('should return true when age is in range and century code caracter is lowercase', () => {
      curp = 'zaaz000101hdfbcda9';
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(true).toBeTruthy();
    });
    it('should return false when year is greater that range', () => {
      curp = 'ZAAZ011231HDFBCDA9';
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(false).toBeFalsy();
    });
    it('should return false when year is lower that range', () => {
      curp = 'ZAAZ491231HDFBCD09';
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(false).toBeFalsy();
    });
    it('should return false when year is min allow and month is lower that range', () => {
      curp = 'ZAAZ500530HDFBCD09';
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(false).toBeFalsy();
    });
    it('should return false when year and month are min allow and day is lower that range', () => {
      curp = 'ZAAZ500614HDFBCD09';
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(false).toBeFalsy();
    });
    it('should return false when year and month are min allow and day is equal that range', () => {
      curp = 'ZAAZ500615HDFBCD09';
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(false).toBeFalsy();
    });
    it('should return false when year is max allow and month is greater that range', () => {
      curp = 'ZAAZ000701HDFBCDA9';
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(false).toBeFalsy();
    });
    it('should return false when year and month are max allow and day is greater that range', () => {
      curp = 'ZAAZ000616HDFBCDA9';
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(false).toBeFalsy();
    });
    it('should return false when curp is empty', () => {
      curp = '';
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(false).toBeFalsy();
    });
    it('should return false when curp is null', () => {
      curp = null;
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(false).toBeFalsy();
    });
    it('should return false when curp is undefined', () => {
      curp = undefined;
      const valid = CurpValidators.validateFormatAndAge(curp, minAge, maxAge);
      expect(false).toBeFalsy();
    });
  });
});