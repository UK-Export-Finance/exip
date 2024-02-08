import { FIELD_IDS } from '../../../constants';
import { field } from '../../../pages/shared';
import mockApplication from '../../../fixtures/application';

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    REGISTRATION_NUMBER,
    WEBSITE,
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
}) => {
  cy.keyboardInput(field(NAME).input(), buyerName);
  cy.keyboardInput(field(ADDRESS).input(), buyerAddress);
  cy.keyboardInput(field(REGISTRATION_NUMBER).input(), BUYER[REGISTRATION_NUMBER]);
  cy.keyboardInput(field(WEBSITE).input(), BUYER[WEBSITE]);

  cy.clickSubmitButton();
};

export default completeAndSubmitCompanyOrOrganisationForm;
