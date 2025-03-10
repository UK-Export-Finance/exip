import awardMethodRule from './award-method';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../../test-mocks';
import { RequestBody } from '../../../../../../../types';

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD: FIELD_ID },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      HOW_WAS_THE_CONTRACT_AWARDED: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/export-contract/how-was-the-contract-awarded/validation/rules/award-method', () => {
  const mockBody: RequestBody = {
    [FIELD_ID]: '',
  };

  it('should return `emptyFieldValidation`', () => {
    const result = awardMethodRule(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
