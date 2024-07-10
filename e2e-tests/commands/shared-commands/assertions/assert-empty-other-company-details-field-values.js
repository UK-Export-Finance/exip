import { field as fieldSelector, autoCompleteField } from '../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
} = POLICY_FIELD_IDS;

/**
 * assertEmptyOtherCompanyDetailsFieldValues
 * Assert all field values in the "other company details" form are empty
 */
const assertEmptyOtherCompanyDetailsFieldValues = () => {
  cy.checkValue(fieldSelector(COMPANY_NAME), '');
  cy.checkValue(autoCompleteField(COUNTRY_CODE), '');
  cy.checkValue(fieldSelector(COMPANY_NUMBER), '');
};

export default assertEmptyOtherCompanyDetailsFieldValues;
