import { field as fieldSelector } from '../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { ELIGIBILITY_FIELDS } from '../../../content-strings/fields/insurance/eligibility';

const {
  ELIGIBILITY: { COVER_PERIOD },
} = INSURANCE_FIELD_IDS;

const { ABOVE, BELOW } = ELIGIBILITY_FIELDS[COVER_PERIOD].OPTIONS;

/**
 * assertCoverPeriodRadios
 * can assert above or below threshold radio and if checked or not
 * @param {boolean} underThreshold if under set threshold - default true
 * @param {boolean} checked if radio is checked or not
 */
const assertCoverPeriodRadios = ({ underThreshold = true, checked = true }) => {
  let fieldId = `${COVER_PERIOD}-${ABOVE.ID}`;

  if (underThreshold) {
    fieldId = `${COVER_PERIOD}-${BELOW.ID}`;
  }

  const field = fieldSelector(fieldId);
  if (checked) {
    cy.assertRadioOptionIsChecked(field.input());
  } else {
    field.input().should('not.be.checked');
  }
};

export default assertCoverPeriodRadios;
