import shouldNullifyLossPayeeFinancialUkData from '.';
import { mockNominatedLossPayee } from '../../test-mocks';

const appointedTrue = 'true';
const appointedFalse = 'false';

const mockNominatedLossPayeeNoFields = {
  id: mockNominatedLossPayee.id,
  financialUk: {
    id: mockNominatedLossPayee.financialUk.id,
  },
  financialInternational: {
    id: mockNominatedLossPayee.financialInternational.id,
  },
};

describe('server/helpers/should-nullify-loss-payee-financial-uk-data', () => {
  describe('when isAppointed has a value of `false` and the application has financial UK data', () => {
    it('should return true', () => {
      const result = shouldNullifyLossPayeeFinancialUkData(appointedFalse, mockNominatedLossPayee);

      expect(result).toEqual(true);
    });
  });

  describe('when isAppointed has a value of `false`, but the application has no financial UK data', () => {
    it('should return false', () => {
      const result = shouldNullifyLossPayeeFinancialUkData(appointedFalse, mockNominatedLossPayeeNoFields);

      expect(result).toEqual(false);
    });
  });

  describe('when isAppointed has a value of `true` and the application has financial UK data', () => {
    it('should return false', () => {
      const result = shouldNullifyLossPayeeFinancialUkData(appointedTrue, mockNominatedLossPayee);

      expect(result).toEqual(false);
    });
  });
});
