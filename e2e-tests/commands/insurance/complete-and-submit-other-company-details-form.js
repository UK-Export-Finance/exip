import { field, countryInput } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import application from '../../fixtures/application';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME, COUNTRY },
} = POLICY_FIELD_IDS;

const { REQUESTED_JOINTLY_INSURED_PARTY: FIXTURES } = application;

/**
 * completeAndSubmitOtherCompanyDetailsForm
 * Complete and submit the "Other company details" form
 */
const completeAndSubmitOtherCompanyDetailsForm = () => {
  cy.keyboardInput(field(COMPANY_NAME).input(), FIXTURES[COMPANY_NAME]);
  cy.keyboardInput(countryInput.field(COUNTRY).input(), FIXTURES[COUNTRY]);

  cy.clickSubmitButton();
};

export default completeAndSubmitOtherCompanyDetailsForm;
