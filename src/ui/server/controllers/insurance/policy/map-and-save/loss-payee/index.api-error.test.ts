import mapAndSave from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import saveLossPayee from '../../save-data/nominated-loss-payee';
import saveUk from '../../save-data/loss-payee-financial-details-uk';
import saveInternational from '../../save-data/loss-payee-financial-details-international';
import { mockApplication, mockNominatedLossPayee, mockSpyPromiseRejection } from '../../../../../test-mocks';

const {
  LOSS_PAYEE: { IS_APPOINTED },
} = FIELD_IDS;

describe('controllers/insurance/policy/map-and-save/loss-payee - API error', () => {
  jest.mock('../../save-data/nominated-loss-payee');
  jest.mock('../../save-data/loss-payee-financial-details-uk');

  const mockCsrf = '1234';

  const mockFormBody = {
    isAppointed: {
      _csrf: mockCsrf,
      ...mockNominatedLossPayee,
      [IS_APPOINTED]: 'true',
    },
    isNotAppointed: {
      _csrf: mockCsrf,
      ...mockNominatedLossPayee,
      [IS_APPOINTED]: 'false',
    },
  };

  describe('when saveLossPayee.nominatedLossPayee call does not return anything', () => {
    beforeEach(() => {
      saveLossPayee.nominatedLossPayee = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.lossPayee(mockFormBody.isAppointed, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when saveLossPayee.nominatedLossPayee call fails', () => {
    beforeEach(() => {
      saveLossPayee.nominatedLossPayee = mockSpyPromiseRejection;
    });

    it('should return false', async () => {
      const result = await mapAndSave.lossPayee(mockFormBody.isAppointed, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when saveUk.lossPayeeFinancialDetailsUk call does not return anything', () => {
    beforeEach(() => {
      saveUk.lossPayeeFinancialDetailsUk = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.lossPayee(mockFormBody.isNotAppointed, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when saveUk.lossPayeeFinancialDetailsUk call fails', () => {
    beforeEach(() => {
      saveUk.lossPayeeFinancialDetailsUk = mockSpyPromiseRejection;
    });

    it('should return false', async () => {
      const result = await mapAndSave.lossPayee(mockFormBody.isNotAppointed, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when saveInternational.lossPayeeFinancialDetailsInternational call does not return anything', () => {
    beforeEach(() => {
      saveInternational.lossPayeeFinancialDetailsInternational = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.lossPayee(mockFormBody.isNotAppointed, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when saveInternational.lossPayeeFinancialDetailsInternational call fails', () => {
    beforeEach(() => {
      saveInternational.lossPayeeFinancialDetailsInternational = mockSpyPromiseRejection;
    });

    it('should return false', async () => {
      const result = await mapAndSave.lossPayee(mockFormBody.isNotAppointed, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
