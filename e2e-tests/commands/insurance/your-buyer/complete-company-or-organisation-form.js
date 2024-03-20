import { FIELD_IDS } from '../../../constants';
import { field as fieldSelector } from '../../../pages/shared';
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
 * completeCompanyOrOrganisationForm
 * Complete the "company or organisation" form.
 * @param {String} buyerName: Buyer name
 * @param {String} buyerAddress: Buyer address
 */
const completeCompanyOrOrganisationForm = ({
  buyerName = BUYER[NAME],
  buyerAddress = BUYER[ADDRESS],
}) => {
  cy.keyboardInput(fieldSelector(NAME).input(), buyerName);

  const textareaField = {
    ...fieldSelector(ADDRESS),
    input: fieldSelector(ADDRESS).textarea,
  };

  cy.keyboardInput(textareaField.input(), buyerAddress);

  cy.keyboardInput(fieldSelector(REGISTRATION_NUMBER).input(), BUYER[REGISTRATION_NUMBER]);
  cy.keyboardInput(fieldSelector(WEBSITE).input(), BUYER[WEBSITE]);
};

export default completeCompanyOrOrganisationForm;
