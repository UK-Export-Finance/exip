import validation from '.';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../content-strings/error-messages';
import emptyFieldValidation from '../../../../../shared-validation/empty-field';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';
import { RequestBody } from '../../../../../../types';

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  ELIGIBILITY: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

const mockBody = {};

describe('server/controllers/insurance/eligibility/companies-house-search/validation', () => {
  it('should return the alkjdsfjlkas jdf', () => {
    const result = validation(mockBody);

    const expetedRules = [(formBody: RequestBody) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, {})];

    const expected = combineValidationRules(expetedRules, mockBody);

    expect(result).toEqual(expected);
  });
});
