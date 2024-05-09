import mapAndSave from '.';
import mapSubmittedData from '../../map-submitted-data/broker';
import saveLossPayee from '../../save-data/nominated-loss-payee';
import nullifyLossPayeeFinancialUkData from '../../../../../helpers/nullify-loss-payee-financial-uk-data';
import saveUk from '../../save-data/loss-payee-financial-details-uk';
import generateValidationErrors from '../../../../../helpers/validation';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../types';
import {
  mockApplicationNominatedLossPayeeAppointedEmptyData,
  mockApplicationNominatedLossPayeeNotAppointedFullData,
  mockSpyPromise,
} from '../../../../../test-mocks';

const {
  LOSS_PAYEE: { IS_APPOINTED },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-and-save/loss-payee', () => {
  jest.mock('../../save-data/nominated-loss-payee');
  jest.mock('../../save-data/loss-payee-financial-details-uk');

  const mockCsrf = '1234';

  let mockFormBody = {} as RequestBody;
  let populatedData = {};

  const mockApplication = {
    withAppointedEmptyData: mockApplicationNominatedLossPayeeAppointedEmptyData,
    withAppointedFalseAndData: mockApplicationNominatedLossPayeeNotAppointedFullData,
  };

  const mockValidationErrors = generateValidationErrors(IS_APPOINTED, 'error', {});

  let mockSaveNominatedLossPayee;
  let mockSaveLossPayeeFinancialDetailsUk;

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

    saveLossPayee.nominatedLossPayee = mockSaveNominatedLossPayee;
    saveUk.lossPayeeFinancialDetailsUk = mockSaveLossPayeeFinancialDetailsUk;
  };

  describe('when the form has data, IS_APPOINTED=true, no financial UK data', () => {
    describe('when the form has validation errors', () => {
      beforeEach(() => {
        setupMocks();
      });

      it('should call saveLossPayee.nominatedLossPayee with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.lossPayee(mockFormBody, mockApplication.withAppointedEmptyData, mockValidationErrors);

        expect(saveLossPayee.nominatedLossPayee).toHaveBeenCalledTimes(1);
        expect(saveLossPayee.nominatedLossPayee).toHaveBeenCalledWith(mockApplication.withAppointedEmptyData, populatedData, mockValidationErrors?.errorList);
      });

      it('should NOT call saveUk.lossPayeeFinancialDetailsUk with application, submitted data and validationErrors.errorList', async () => {
        await mapAndSave.lossPayee(mockFormBody.isAppointed, mockApplication.withAppointedEmptyData, mockValidationErrors);

        expect(saveUk.lossPayeeFinancialDetailsUk).toHaveBeenCalledTimes(0);
      });

      it('should return true', async () => {
        const result = await mapAndSave.lossPayee(populatedData, mockApplication.withAppointedEmptyData, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors', () => {
      beforeEach(() => {
        setupMocks();
      });

      it('should call saveLossPayee.nominatedLossPayee with application and populated submitted data', async () => {
        await mapAndSave.lossPayee(mockFormBody, mockApplication.withAppointedEmptyData);

        expect(saveLossPayee.nominatedLossPayee).toHaveBeenCalledTimes(1);
        expect(saveLossPayee.nominatedLossPayee).toHaveBeenCalledWith(mockApplication.withAppointedEmptyData, populatedData);
      });

      it('should NOT call saveUk.lossPayeeFinancialDetailsUk with application and submitted data', async () => {
        await mapAndSave.lossPayee(mockFormBody.isAppointed, mockApplication.withAppointedEmptyData);

        expect(saveUk.lossPayeeFinancialDetailsUk).toHaveBeenCalledTimes(0);
      });

      it('should return true', async () => {
        const result = await mapAndSave.lossPayee(populatedData, mockApplication.withAppointedEmptyData, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form has data, IS_APPOINTED=false, has financial UK data', () => {
    describe('when the form has validation errors', () => {
      beforeEach(() => {
        setupMocks();
      });

      it('should call saveLossPayee.nominatedLossPayee with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.lossPayee(mockFormBody, mockApplication.withAppointedFalseAndData, mockValidationErrors);

        expect(saveLossPayee.nominatedLossPayee).toHaveBeenCalledTimes(1);
        expect(saveLossPayee.nominatedLossPayee).toHaveBeenCalledWith(
          mockApplication.withAppointedFalseAndData,
          populatedData,
          mockValidationErrors?.errorList,
        );
      });

      it('should NOT call saveUk.lossPayeeFinancialDetailsUk with application, submitted data and validationErrors.errorList', async () => {
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

      it('should call saveUk.lossPayeeFinancialDetailsUk with application and submitted data', async () => {
        await mapAndSave.lossPayee(mockFormBody.isNotAppointed, mockApplication.withAppointedFalseAndData);

        expect(saveUk.lossPayeeFinancialDetailsUk).toHaveBeenCalledTimes(1);
        expect(saveUk.lossPayeeFinancialDetailsUk).toHaveBeenCalledWith(mockApplication.withAppointedFalseAndData, nullifyLossPayeeFinancialUkData());
      });

      it('should return true', async () => {
        const result = await mapAndSave.lossPayee(mockFormBody.isNotAppointed, mockApplication.withAppointedFalseAndData, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      const emptyMockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.lossPayee(emptyMockFormBody, mockApplication.withAppointedFalseAndData, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
