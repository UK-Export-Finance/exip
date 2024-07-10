import shouldNullifyLossPayeeFinancialInternationalData from '.';
import FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { mockNominatedLossPayee } from '../../test-mocks';

const {
  LOSS_PAYEE_DETAILS: { IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK },
} = FIELD_IDS;

const appointedTrue = 'true';
const appointedFalse = 'false';

const mockNominatedLossPayeeNoFields = {
  ...mockNominatedLossPayee,
  financialInternational: {
    id: mockNominatedLossPayee.financialInternational.id,
  },
};

describe('server/helpers/should-nullify-loss-payee-financial-international-data', () => {
  describe('when isAppointed=`false`, location=IS_LOCATED_INTERNATIONALLY and the application has financial international data', () => {
    it('should return true', () => {
      const result = shouldNullifyLossPayeeFinancialInternationalData(appointedFalse, IS_LOCATED_INTERNATIONALLY, mockNominatedLossPayee);

      expect(result).toEqual(true);
    });
  });

  describe('when isAppointed=`false`, location=IS_LOCATED_IN_UK, but the application has no financial international data', () => {
    it('should return false', () => {
      const result = shouldNullifyLossPayeeFinancialInternationalData(appointedFalse, IS_LOCATED_IN_UK, mockNominatedLossPayeeNoFields);

      expect(result).toEqual(false);
    });
  });

  describe('when isAppointed=`false`, location=IS_LOCATED_INTERNATIONALLY, but the application has no financial international data', () => {
    it('should return false', () => {
      const result = shouldNullifyLossPayeeFinancialInternationalData(appointedFalse, IS_LOCATED_INTERNATIONALLY, mockNominatedLossPayeeNoFields);

      expect(result).toEqual(false);
    });
  });

  describe('when isAppointed=`true`, location=IS_LOCATED_INTERNATIONALLY and the application has financial international data', () => {
    it('should return false', () => {
      const result = shouldNullifyLossPayeeFinancialInternationalData(appointedTrue, IS_LOCATED_INTERNATIONALLY, mockNominatedLossPayee);

      expect(result).toEqual(false);
    });
  });
});
