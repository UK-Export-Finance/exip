import generateFullApplicationByReferenceNumberVariables from '.';
import LOSS_PAYEE_ROUTES from '../../constants/routes/insurance/policy/loss-payee';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import { referenceNumber } from '../../test-mocks';

const { LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT, LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT } = LOSS_PAYEE_ROUTES;
const { INSURANCE_ROOT, ALL_SECTIONS } = INSURANCE_ROUTES;

describe('server/helpers/generate-full-application-by-reference-number-variables', () => {
  describe(`when URL is not ${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`, () => {
    const url = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

    it('should return the referenceNumber and decryptFinancialUk and decryptFinancialInternational as "undefined"', () => {
      const result = generateFullApplicationByReferenceNumberVariables(referenceNumber.toString(), url);

      const expected = {
        referenceNumber,
        decryptFinancialUk: undefined,
        decryptFinancialInternational: undefined,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when URL is ${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`, () => {
    const url = `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`;

    it('should return the referenceNumber and decryptFinancialUk as "true"', () => {
      const result = generateFullApplicationByReferenceNumberVariables(referenceNumber.toString(), url);

      const expected = {
        referenceNumber,
        decryptFinancialUk: true,
        decryptFinancialInternational: undefined,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when URL is ${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`, () => {
    const url = `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`;

    it('should return the referenceNumber and decryptFinancialInternational as "true"', () => {
      const result = generateFullApplicationByReferenceNumberVariables(referenceNumber.toString(), url);

      const expected = {
        referenceNumber,
        decryptFinancialUk: undefined,
        decryptFinancialInternational: true,
      };

      expect(result).toEqual(expected);
    });
  });
});
