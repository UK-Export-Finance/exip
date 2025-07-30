import { MAXIMUM_CHARACTERS } from '../../../../../../../../constants';
import DECLARATIONS_FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/declarations';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../../../types';

const {
  HAS_NO_OFFENSES_OR_INVESTIGATIONS,
  CONDITIONAL_REASONS: { OFFENSES_OR_INVESTIGATIONS: FIELD_ID },
} = DECLARATIONS_FIELD_IDS.MODERN_SLAVERY;

const {
  INSURANCE: {
    DECLARATIONS: {
      MODERN_SLAVERY: {
        CONDITIONAL_REASONS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
      },
    },
  },
} = ERROR_MESSAGES;

const MAXIMUM = MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON;

/**
 * offensesOrInvestigationsRules
 * @param {Express.Request.body} Express response body
 * @param {object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} providedAndMaxLength
 */
const offensesOrInvestigationsRules = (formBody: RequestBody, errors: object) => {
  if (formBody[HAS_NO_OFFENSES_OR_INVESTIGATIONS] === 'false') {
    return providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM);
  }

  return errors;
};

export default offensesOrInvestigationsRules;
