import { field } from '../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { FIELDS_ELIGIBILITY } from '../../../content-strings/fields/insurance/eligibility';

const {
  ELIGIBILITY: { TOTAL_CONTRACT_VALUE },
} = INSURANCE_FIELD_IDS;

const { ABOVE, BELOW } = FIELDS_ELIGIBILITY[TOTAL_CONTRACT_VALUE].OPTIONS;

/**
 * assertTotalValueInsuredRadios
 * assert if total value insured radio is checked or not
 * can assert first or second radio and if checked or not
 * @param {Boolean} secondOption if first or second radio
 * @param {Boolean} checked if radio is checked or not
 */
const assertTotalValueInsuredRadios = ({ secondOption = false, checked = true }) => {
  let fieldId = `${TOTAL_CONTRACT_VALUE}-${ABOVE.ID}`;

  if (secondOption) {
    fieldId = `${TOTAL_CONTRACT_VALUE}-${BELOW.ID}`;
  }

  if (checked) {
    field(fieldId).input().should('be.checked');
  } else {
    field(fieldId).input().should('not.be.checked');
  }
};

export default assertTotalValueInsuredRadios;
