import mockLossPayeeFinancialDetailsUk from './mock-loss-payee-financial-details-uk';

const mockNominatedLossPayee = {
  id: '123',
  isAppointed: false,
  financialUk: {
    id: '2345',
    ...mockLossPayeeFinancialDetailsUk,
  },
};

export default mockNominatedLossPayee;
