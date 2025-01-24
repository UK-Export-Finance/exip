import { enterAddressManuallyLink } from '../../../partials/insurance';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { LINKS } from '../../../content-strings';

const {
  ROOT,
  POLICY: { BROKER_MANUAL_ADDRESS_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * assertEnterAddressManuallyLink
 * Check the "enter address manually" link and redirection
 * @param {Number} referenceNumber: Application reference number
 * @param {Number} expectedText: Expected link text
 */
const assertEnterAddressManuallyLink = ({ referenceNumber, expectedText = LINKS.ENTER_ADDRESS_MANUALLY }) => {
  const expectedRoute = `${ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`;

  cy.checkLink(enterAddressManuallyLink(), expectedRoute, expectedText);

  cy.clickEnterAddressManuallyLink();

  const expectedUrl = `${baseUrl}${expectedRoute}`;

  cy.assertUrl(expectedUrl);
};

export default assertEnterAddressManuallyLink;
