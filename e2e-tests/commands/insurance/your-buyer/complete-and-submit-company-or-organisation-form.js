import { FIELD_IDS } from '../../../constants';
import { companyOrOrganisationPage } from '../../../pages/insurance/your-buyer';
import { field } from '../../../pages/shared';
import mockApplication from '../../../fixtures/application';

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

const { BUYER } = mockApplication;

/**
 * completeAndSubmitCompanyOrOrganisationForm
 * Complete and submit the "company or organisation" form.
 * @param {String} buyerName: Buyer name
 * @param {String} buyerAddress: Buyer address
 * @param {String} firstName: Buyer first name
 * @param {String} lastName: Buyer last name
 */
const completeAndSubmitCompanyOrOrganisationForm = ({
  buyerName = BUYER[NAME],
  buyerAddress = BUYER[ADDRESS],
  firstName = BUYER[FIRST_NAME],
  lastName = BUYER[LAST_NAME],
}) => {
  cy.keyboardInput(field(NAME).input(), buyerName);
  cy.keyboardInput(field(ADDRESS).input(), buyerAddress);
  cy.keyboardInput(field(REGISTRATION_NUMBER).input(), BUYER[REGISTRATION_NUMBER]);
  cy.keyboardInput(field(WEBSITE).input(), BUYER[WEBSITE]);
  cy.keyboardInput(field(FIRST_NAME).input(), firstName);
  cy.keyboardInput(field(LAST_NAME).input(), lastName);
  cy.keyboardInput(field(POSITION).input(), BUYER[POSITION]);
  cy.keyboardInput(field(EMAIL).input(), BUYER[EMAIL]);
  companyOrOrganisationPage[CAN_CONTACT_BUYER].yesRadioInput().click();

  cy.clickSubmitButton();
};

export default completeAndSubmitCompanyOrOrganisationForm;
