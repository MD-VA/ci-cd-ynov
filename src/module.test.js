import { calculateAge } from "./module";

describe('calculateAge Unit Test Suites', () => {
  let people20years;

  beforeEach(() => {
    let date = new Date();
    people20years = {
      birth: new Date(date.setFullYear(date.getFullYear() - 20))
    };
  });

  it('should return a correct age', () => {
    expect(calculateAge(people20years.birth)).toEqual(20);
  });

  it('should throw a "missing param p" error', () => {
    expect(() => calculateAge()).toThrow("missing param p");
  });

  it('should return age - 1 when birthdate is in the future', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1); 
    expect(calculateAge(futureDate)).toEqual(-1); 
  });

  it('should return age - 1 when monthDiff is negative', () => {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 1); 
    expect(calculateAge(futureDate)).toEqual(-1); 
  });

  it('should return age 0', () => {
    const birthDate = new Date();
    expect(calculateAge(birthDate)).toEqual(0);
  });
});
