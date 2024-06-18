import { field as fieldSelector, autoCompleteField } from '../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import mockApplication from '../../../fixtures/application';

const { REQUESTED_JOINTLY_INSURED_PARTY } = mockApplication;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
} = POLICY_FIELD_IDS;

/**
 * assertOtherCompanyDetailsFieldValues
 * Assert all field values in the "other company details" form.
 * @param {String} expectedCompanyName: Company name
 * @param {String} expectedCountry: Country
 * @param {String} expectedCompanyNumber: Company number
 */
const assertOtherCompanyDetailsFieldValues = ({
  expectedCompanyName = REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NAME],
  expectedCountry = REQUESTED_JOINTLY_INSURED_PARTY[COUNTRY_CODE],
  expectedCompanyNumber = REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NUMBER],
}) => {
  cy.checkValue(fieldSelector(COMPANY_NAME), expectedCompanyName);
  cy.checkValue(autoCompleteField(COUNTRY_CODE), expectedCountry);
  cy.checkValue(fieldSelector(COMPANY_NUMBER), expectedCompanyNumber);
};

export default assertOtherCompanyDetailsFieldValues;
