import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
} = POLICY_FIELD_IDS;

/**
 * assertEmptyOtherCompanyDetailsFieldValues
 * Assert all field values in the "other company details" form are empty
 */
const assertEmptyOtherCompanyDetailsFieldValues = () => {
  cy.assertEmptyFieldValue(COMPANY_NAME);
  cy.assertEmptyAutocompleteFieldValue(COUNTRY_CODE);
  cy.assertEmptyFieldValue(COMPANY_NUMBER);
};

export default assertEmptyOtherCompanyDetailsFieldValues;
