import DECLARATIONS_FIELD_IDS from '../../../../../../../constants/field-ids/insurance/declarations';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const { HAS_NO_OFFENSES_OR_INVESTIGATIONS: FIELD_ID } = DECLARATIONS_FIELD_IDS.MODERN_SLAVERY;

const {
  INSURANCE: {
    DECLARATIONS: {
      MODERN_SLAVERY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

/**
 * hasNoOffensesOrInvestigationsRule
 * Returns the result of emptyFieldValidation
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Errors from previous validation errors
 * @returns {ValidationErrors}
 */
const hasNoOffensesOrInvestigationsRule = (formBody: RequestBody, errors: object) =>
  emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT.IS_EMPTY, errors);

export default hasNoOffensesOrInvestigationsRule;
