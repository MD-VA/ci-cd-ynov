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
    futureDate.setMonth(futureDate.getMonth() + 1); // Set a date one month in the future
    expect(calculateAge(futureDate)).toEqual(-1); // Since monthDiff is negative, age should be 0
  });

  it('should return age 0', () => {
    const birthDate = new Date();
    expect(calculateAge(birthDate)).toEqual(0); // Since monthDiff is 0 and today.getDate() < birthDate.getDate(), age should be 19
  });
});
