import sanitiseCompaniesHouseNumber from '.';
import removeWhiteSpace from '../remove-white-space';
import mockCompany from '../../test-mocks/mock-company';

describe('sanitiseCompaniesHouseNumber', () => {
  const { companyNumber } = mockCompany;

  describe('when a company number does not have white spaces or lowercase characters', () => {
    it('should return the company number as is', () => {
      const numb = companyNumber.toUpperCase();

      const response = sanitiseCompaniesHouseNumber(numb);

      expect(response).toEqual(companyNumber);
    });
  });

  describe('when a company number has white spaces, lowercase characters', () => {
    it('should return the company number without white spaces', () => {
      const numb = ` ${companyNumber} `;

      const response = sanitiseCompaniesHouseNumber(numb);

      const expected = removeWhiteSpace(numb);

      expect(response).toEqual(expected);
    });
  });

  describe('when a company number has white spaces and lowercase characters', () => {
    it('should return the company number without white spaces', () => {
      const numb = ` ${companyNumber.toLowerCase()} `;

      const response = sanitiseCompaniesHouseNumber(numb);

      const expected = removeWhiteSpace(numb).toUpperCase();

      expect(response).toEqual(expected);
    });
  });
});
