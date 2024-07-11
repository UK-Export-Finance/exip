import sanitiseCompaniesHouseNumber from '.';
import removeWhiteSpace from '../remove-white-space';
import mockCompany from '../../test-mocks/mock-company';

describe('sanitiseCompaniesHouseNumber', () => {
  const { companyNumber } = mockCompany;

  describe('when a company number does not have white spaces, lowercase characters or a leading zero', () => {
    it('should return the company number as is, but with a leading zero', () => {
      const numb = 'A123456';

      const response = sanitiseCompaniesHouseNumber(numb);

      const expected = `0${numb}`;

      expect(response).toEqual(expected);
    });
  });

  describe('when a company number has white spaces, lowercase characters and a leading zero', () => {
    it('should return the company number without white spaces', () => {
      const numb = ` ${companyNumber} `;

      const response = sanitiseCompaniesHouseNumber(numb);

      const expected = removeWhiteSpace(numb);

      expect(response).toEqual(expected);
    });
  });

  describe('when a company number has white spaces, lowercase characters and a leading zero', () => {
    it('should return the company number without white spaces', () => {
      const numb = ` ${companyNumber.toLowerCase()} `;

      const response = sanitiseCompaniesHouseNumber(numb);

      const expected = removeWhiteSpace(numb).toUpperCase();

      expect(response).toEqual(expected);
    });
  });
});
