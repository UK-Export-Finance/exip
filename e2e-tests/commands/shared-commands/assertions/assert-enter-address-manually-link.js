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
 */
const assertEnterAddressManuallyLink = ({ referenceNumber }) => {
  const expectedRoute = `${ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`;

  cy.checkLink(enterAddressManuallyLink(), expectedRoute, LINKS.ENTER_ADDRESS_MANUALLY);

  enterAddressManuallyLink().click();

  const expectedUrl = `${baseUrl}${expectedRoute}`;

  cy.assertUrl(expectedUrl);
};

export default assertEnterAddressManuallyLink;
