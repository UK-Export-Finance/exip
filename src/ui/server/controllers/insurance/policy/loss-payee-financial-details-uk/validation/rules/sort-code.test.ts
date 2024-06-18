import sortCodeRules from './sort-code';
import { MAXIMUM_CHARACTERS, MINIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import numberHyphenSpacesOnlyValidation from '../../../../../../shared-validation/number-hyphen-and-spaces-only';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/loss-payee-financial-details-uk/validation/rules/sort-code', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of numberHyphenSpacesOnlyValidation', () => {
    const result = sortCodeRules(mockBody, mockErrors);

    const expected = numberHyphenSpacesOnlyValidation(
      mockBody,
      FIELD_ID,
      ERROR_MESSAGES_OBJECT,
      mockErrors,
      MINIMUM_CHARACTERS.SORT_CODE,
      MAXIMUM_CHARACTERS.SORT_CODE,
    );

    expect(result).toEqual(expected);
  });
});
