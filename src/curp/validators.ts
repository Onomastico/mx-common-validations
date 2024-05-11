
export namespace CurpValidators {
  export const regexFormat = /^([A-Z][AEIOUX][A-Z]{2})((?:\d{2})(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))([HM])(AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)([B-DF-HJ-NP-TV-Z]{3})([A-Z\d])(\d)$/i;

  const regexOnlyNumber = /^([0-9])$/;
  const regexOnlyLetter = /^([A-Z])$/i;

  export function validateFormat(curp: string) {
    const fullDate = getCurpFullDate(curp);
    if (fullDate) {
      return isValidDate(fullDate);
    }
    return false;
  }

  export function validateFormatAndAge(curp: string, minAge: number, maxAge: number) {
    const fullDate = getCurpFullDate(curp);
    if (fullDate && isValidDate(fullDate)) {
      return isValidAge(fullDate, minAge, maxAge);
    }
    return false;
  }

  function getCurpFullDate(curp: string) {
    const groups = regexFormat.exec(curp);
    if (!groups) {
      return null;
    }

    const date = groups[2];
    const centuryCode = groups[6];
    if (!date || !centuryCode) {
      return null;
    }

    if (regexOnlyNumber.test(centuryCode)) {
      return `19${date}`;
    } else if (regexOnlyLetter.test(centuryCode)) {
      return `20${date}`;
    }
    return null;
  }

  function isValidDate(date: string) {
    const month30Days = [4, 6, 9, 11];

    const day = parseInt(date.substring(6, 8));
    const month = parseInt(date.substring(4, 6));
    const year = parseInt(date.substring(0, 4));

    const isLeap = year % 4 === 0;

    if (day < 1 || day > 31) {
      return false;
    }
    if (month < 1 || month > 12) {
      return false;
    }
    if (month30Days.indexOf(month) > -1 && day === 31) {
      return false;
    }
    if (month === 2) {
      if (day > 28 && !isLeap) {
        return false;
      }
      if (day > 29 && isLeap) {
        return false;
      }
    }
    return true;
  }

  function isValidAge(date: string, minAge: number, maxAge: number) {
    const day = parseInt(date.substring(6, 8));
    const month = parseInt(date.substring(4, 6));
    const year = parseInt(date.substring(0, 4));

    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    const minYear = yyyy - maxAge;
    const maxYear = yyyy - minAge;

    if (year < minYear || year > maxYear) {
      return false;
    }
    if (year === minYear) {
      if (month < mm) {
        return false;
      } else if (month === mm && day <= dd) {
        return false;
      }
    }
    if (year === maxYear) {
      if (month > mm) {
        return false;
      } else if (month === mm && day > dd) {
        return false;
      }
    }
    return true;
  }
}
