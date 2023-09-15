import { FIELD_IDS } from '../../../constants';
import { companyOrOrganisationPage } from '../../../pages/insurance/your-buyer';
import { submitButton } from '../../../pages/shared';
import application from '../../../fixtures/application';

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
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

const completeAndSubmitCompanyOrOrganisationForm = ({
  buyerName = BUYER[NAME],
  firstName = BUYER[FIRST_NAME],
  lastName = BUYER[LAST_NAME],
}) => {
  cy.keyboardInput(companyOrOrganisationPage[NAME].input(), buyerName);
  cy.keyboardInput(companyOrOrganisationPage[ADDRESS].input(), BUYER[ADDRESS]);
  cy.keyboardInput(companyOrOrganisationPage[REGISTRATION_NUMBER].input(), BUYER[REGISTRATION_NUMBER]);
  cy.keyboardInput(companyOrOrganisationPage[WEBSITE].input(), BUYER[WEBSITE]);
  cy.keyboardInput(companyOrOrganisationPage[FIRST_NAME].input(), firstName);
  cy.keyboardInput(companyOrOrganisationPage[LAST_NAME].input(), lastName);
  cy.keyboardInput(companyOrOrganisationPage[POSITION].input(), BUYER[POSITION]);
  cy.keyboardInput(companyOrOrganisationPage[EMAIL].input(), BUYER[EMAIL]);
  companyOrOrganisationPage[CAN_CONTACT_BUYER].yesRadioInput().click();

  submitButton().click();
};

export default completeAndSubmitCompanyOrOrganisationForm;
