import mapAndSave from '.';
import mapSubmittedData from '../../map-submitted-data/broker';
import saveLossPayee from '../../save-data/nominated-loss-payee';
import nullifyLossPayeeFinancialInternationalData from '../../../../../helpers/nullify-loss-payee-financial-international-data';
import saveUk from '../../save-data/loss-payee-financial-details-uk';
import saveInternational from '../../save-data/loss-payee-financial-details-international';
import generateValidationErrors from '../../../../../helpers/validation';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../types';
import {
  mockApplicationNominatedLossPayeeAppointedEmptyData,
  mockApplicationNominatedLossPayeeNotAppointedFullFinancialInternationalData,
  mockSpyPromise,
} from '../../../../../test-mocks';

const {
  LOSS_PAYEE: { IS_APPOINTED },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-and-save/loss-payee - with IS_APPOINTED=false and financial international data', () => {
  jest.mock('../../save-data/nominated-loss-payee');
  jest.mock('../../save-data/loss-payee-financial-details-uk');
  jest.mock('../../save-data/loss-payee-financial-details-international');

  const mockCsrf = '1234';

  let mockFormBody = {} as RequestBody;
  let populatedData = {};

  const mockApplication = {
    withAppointedEmptyData: mockApplicationNominatedLossPayeeAppointedEmptyData,
    withAppointedFalseAndData: mockApplicationNominatedLossPayeeNotAppointedFullFinancialInternationalData,
  };

  const mockValidationErrors = generateValidationErrors(IS_APPOINTED, 'error', {});

  let mockSaveNominatedLossPayee;
  let mockSaveLossPayeeFinancialDetailsUk;
  let mockSaveLossPayeeFinancialDetailsInternational;

  const setupMocks = () => {
    jest.resetAllMocks();

    mockFormBody = {
      isAppointed: {
        _csrf: mockCsrf,
        [IS_APPOINTED]: 'true',
      },
      isNotAppointed: {
        _csrf: mockCsrf,
        [IS_APPOINTED]: 'false',
      },
    };

    populatedData = mapSubmittedData(mockFormBody);

    mockSaveNominatedLossPayee = mockSpyPromise();
    mockSaveLossPayeeFinancialDetailsUk = mockSpyPromise();
    mockSaveLossPayeeFinancialDetailsInternational = mockSpyPromise();

    saveLossPayee.nominatedLossPayee = mockSaveNominatedLossPayee;
    saveUk.lossPayeeFinancialDetailsUk = mockSaveLossPayeeFinancialDetailsUk;
    saveInternational.lossPayeeFinancialDetailsInternational = mockSaveLossPayeeFinancialDetailsInternational;
  };

  describe('when the form has validation errors', () => {
    beforeEach(() => {
      setupMocks();
    });

    it('should call saveLossPayee.nominatedLossPayee with application, populated submitted data and validationErrors.errorList', async () => {
      await mapAndSave.lossPayee(mockFormBody, mockApplication.withAppointedFalseAndData, mockValidationErrors);

      expect(saveLossPayee.nominatedLossPayee).toHaveBeenCalledTimes(1);
      expect(saveLossPayee.nominatedLossPayee).toHaveBeenCalledWith(mockApplication.withAppointedFalseAndData, populatedData, mockValidationErrors?.errorList);
    });

    it('should NOT call saveInternational.lossPayeeFinancialDetailsInternational', async () => {
      await mapAndSave.lossPayee(mockFormBody.isAppointed, mockApplication.withAppointedFalseAndData, mockValidationErrors);

      expect(saveInternational.lossPayeeFinancialDetailsInternational).toHaveBeenCalledTimes(0);
    });

    it('should NOT call saveUk.lossPayeeFinancialDetailsUk', async () => {
      await mapAndSave.lossPayee(mockFormBody.isAppointed, mockApplication.withAppointedFalseAndData, mockValidationErrors);

      expect(saveUk.lossPayeeFinancialDetailsUk).toHaveBeenCalledTimes(0);
    });

    it('should return true', async () => {
      const result = await mapAndSave.lossPayee(populatedData, mockApplication.withAppointedFalseAndData, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });

  describe('when the form does NOT have validation errors', () => {
    beforeEach(() => {
      setupMocks();
    });

    it('should call saveLossPayee.nominatedLossPayee with application and populated submitted data', async () => {
      await mapAndSave.lossPayee(mockFormBody, mockApplication.withAppointedFalseAndData);

      expect(saveLossPayee.nominatedLossPayee).toHaveBeenCalledTimes(1);
      expect(saveLossPayee.nominatedLossPayee).toHaveBeenCalledWith(mockApplication.withAppointedFalseAndData, populatedData);
    });

    it('should call saveInternational.lossPayeeFinancialDetailsInternational with application and submitted data', async () => {
      await mapAndSave.lossPayee(mockFormBody.isNotAppointed, mockApplication.withAppointedFalseAndData);

      expect(saveInternational.lossPayeeFinancialDetailsInternational).toHaveBeenCalledTimes(1);
      expect(saveInternational.lossPayeeFinancialDetailsInternational).toHaveBeenCalledWith(
        mockApplication.withAppointedFalseAndData,
        nullifyLossPayeeFinancialInternationalData(),
      );
    });

    it('should NOT call saveUk.lossPayeeFinancialDetailsUk', async () => {
      await mapAndSave.lossPayee(mockFormBody.isAppointed, mockApplication.withAppointedFalseAndData, mockValidationErrors);

      expect(saveUk.lossPayeeFinancialDetailsUk).toHaveBeenCalledTimes(0);
    });

    it('should return true', async () => {
      const result = await mapAndSave.lossPayee(mockFormBody.isNotAppointed, mockApplication.withAppointedFalseAndData, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
