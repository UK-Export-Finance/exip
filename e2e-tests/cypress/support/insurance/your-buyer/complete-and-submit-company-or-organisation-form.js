import { FIELD_IDS } from '../../../../constants';
import { companyOrOrganisationPage } from '../../../e2e/pages/insurance/your-buyer';
import { submitButton } from '../../../e2e/pages/shared';
import application from '../../../fixtures/application';
import mockCountries from '../../../fixtures/countries';

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    COUNTRY,
    REGISTRATION_NUMBER,
    WEBSITE,
    FIRST_NAME,
    LAST_NAME,
    POSITION,
    EMAIL,
    CAN_CONTACT_BUYER,
  },
} = FIELD_IDS.INSURANCE.YOUR_BUYER;

const { BUYER } = application;
const countryToSelect = mockCountries[0].isoCode;

export default () => {
  cy.keyboardInput(companyOrOrganisationPage[NAME].input(), BUYER[NAME]);
  cy.keyboardInput(companyOrOrganisationPage[ADDRESS].input(), BUYER[ADDRESS]);
  cy.keyboardInput(companyOrOrganisationPage[REGISTRATION_NUMBER].input(), BUYER[REGISTRATION_NUMBER]);
  cy.keyboardInput(companyOrOrganisationPage[WEBSITE].input(), BUYER[WEBSITE]);
  cy.keyboardInput(companyOrOrganisationPage[FIRST_NAME].input(), BUYER[FIRST_NAME]);
  cy.keyboardInput(companyOrOrganisationPage[LAST_NAME].input(), BUYER[LAST_NAME]);
  cy.keyboardInput(companyOrOrganisationPage[POSITION].input(), BUYER[POSITION]);
  cy.keyboardInput(companyOrOrganisationPage[EMAIL].input(), BUYER[EMAIL]);
  companyOrOrganisationPage[CAN_CONTACT_BUYER].yesRadioInput().click();
  companyOrOrganisationPage[COUNTRY].input().select(countryToSelect);

  submitButton().click();
};
