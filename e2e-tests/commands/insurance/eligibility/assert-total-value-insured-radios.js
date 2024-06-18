import { field } from '../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { FIELDS_ELIGIBILITY } from '../../../content-strings/fields/insurance/eligibility';

const {
  ELIGIBILITY: { TOTAL_CONTRACT_VALUE },
} = INSURANCE_FIELD_IDS;

const { ABOVE, BELOW } = FIELDS_ELIGIBILITY[TOTAL_CONTRACT_VALUE].OPTIONS;

/**
 * assertTotalValueInsuredRadios
 * can assert above or below threshold radio and if checked or not
 * @param {Boolean} underThreshold if under set threshold - default true
 * @param {Boolean} checked if radio is checked or not
 */
const assertTotalValueInsuredRadios = ({ underThreshold = true, checked = true }) => {
  let fieldId = `${TOTAL_CONTRACT_VALUE}-${ABOVE.ID}`;

  if (underThreshold) {
    fieldId = `${TOTAL_CONTRACT_VALUE}-${BELOW.ID}`;
  }

  if (checked) {
    cy.assertRadioOptionIsChecked(field(fieldId).input());
  } else {
    field(fieldId).input().should('not.be.checked');
  }
};

export default assertTotalValueInsuredRadios;
