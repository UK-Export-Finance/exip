import { FIELD_IDS } from '../../../constants';
import mockApplication from '../../../fixtures/application';

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
  },
} = FIELD_IDS.INSURANCE.YOUR_BUYER;

const { BUYER } = mockApplication;

/**
 * completeAndSubmitCompanyOrOrganisationForm
 * Complete and submit the "company or organisation" form.
 * @param {String} buyerName: Buyer name
 * @param {String} buyerAddress: Buyer address
 */
const completeAndSubmitCompanyOrOrganisationForm = ({
  buyerName = BUYER[NAME],
  buyerAddress = BUYER[ADDRESS],
}) => {
  cy.completeCompanyOrOrganisationForm({ buyerName, buyerAddress });

  cy.clickSubmitButton();
};

export default completeAndSubmitCompanyOrOrganisationForm;
