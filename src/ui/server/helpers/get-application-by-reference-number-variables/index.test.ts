import getApplicationByReferenceNumberVariables from '.';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import { referenceNumber } from '../../test-mocks';

const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: { CHECK_YOUR_ANSWERS, LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT, LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT },
} = INSURANCE_ROUTES;

describe('server/helpers/get-application-by-reference-number-variables', () => {
  describe(`when the URL does NOT include ${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT} or ${CHECK_YOUR_ANSWERS}`, () => {
    const url = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

    it('should return the referenceNumber, decryptFinancialUk and decryptFinancialInternational as undefined', () => {
      const result = getApplicationByReferenceNumberVariables(referenceNumber.toString(), url);

      const expected = {
        referenceNumber,
        decryptFinancialUk: undefined,
        decryptFinancialInternational: undefined,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when the URL includes ${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`, () => {
    const url = `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`;

    it('should return the referenceNumber, decryptFinancialUk as true, decryptFinancialInternational as undefined', () => {
      const result = getApplicationByReferenceNumberVariables(referenceNumber.toString(), url);

      const expected = {
        referenceNumber,
        decryptFinancialUk: true,
        decryptFinancialInternational: undefined,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when the URL includes ${CHECK_YOUR_ANSWERS}`, () => {
    const url = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

    it('should return the referenceNumber, decryptFinancialUk as true, decryptFinancialInternational as undefined', () => {
      const result = getApplicationByReferenceNumberVariables(referenceNumber.toString(), url);

      const expected = {
        referenceNumber,
        decryptFinancialUk: true,
        decryptFinancialInternational: undefined,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when the URL includes ${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`, () => {
    const url = `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`;

    it('should return the referenceNumber, decryptFinancialInternational as true, decryptFinancialUk as false', () => {
      const result = getApplicationByReferenceNumberVariables(referenceNumber.toString(), url);

      const expected = {
        referenceNumber,
        decryptFinancialUk: undefined,
        decryptFinancialInternational: true,
      };

      expect(result).toEqual(expected);
    });
  });
});
