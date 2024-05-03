import mockLossPayeeFinancialDetailsUk from './mock-loss-payee-financial-details-uk';
import mockLossPayeeFinancialDetailsInternational from './mock-loss-payee-financial-details-international';

const mockNominatedLossPayee = {
  id: '123',
  isAppointed: false,
  isLocatedInUk: false,
  financialUk: {
    id: '2345',
    ...mockLossPayeeFinancialDetailsUk,
  },
  financialInternational: {
    id: '234',
    ...mockLossPayeeFinancialDetailsInternational,
  },
};

export default mockNominatedLossPayee;
