import getApplicationByReferenceNumberVariables from '.';
import LOSS_PAYEE_ROUTES from '../../constants/routes/insurance/policy/loss-payee';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import { referenceNumber } from '../../test-mocks';

const { LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT } = LOSS_PAYEE_ROUTES;
const { INSURANCE_ROOT, ALL_SECTIONS } = INSURANCE_ROUTES;

describe('server/helpers/generate-full-application-by-reference-number-variables', () => {
  describe(`when URL is not ${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`, () => {
    const url = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

    it('should return the referenceNumber and decryptFinancialUk as "undefined"', () => {
      const result = getApplicationByReferenceNumberVariables(referenceNumber.toString(), url);

      const expected = {
        referenceNumber,
        decryptFinancialUk: undefined,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when URL is ${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`, () => {
    const url = `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`;

    it('should return the referenceNumber and decryptFinancialUk as "true"', () => {
      const result = getApplicationByReferenceNumberVariables(referenceNumber.toString(), url);

      const expected = {
        referenceNumber,
        decryptFinancialUk: true,
      };

      expect(result).toEqual(expected);
    });
  });
});