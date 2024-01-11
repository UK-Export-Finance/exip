import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { field } from '../../../pages/shared';

const {
  ACCOUNT: { SECURITY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  ALL_SECTIONS,
  ROOT,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * signInAndAssertAllSectionsUrl
 * 1) Sign into an account.
 * 2) Check that the URL is the "all sections" application page.
 * If no referenceNumber is provided, it's obtained by invoking cy.getReferenceNumber.
 * @param {String} Account email
 * @returns {Object} Account
 */
const signInAndAssertAllSectionsUrl = ({
  accountId,
  emailAddress,
  referenceNumber,
  verifyAccountUrl,
}) => {
  let applicationReferenceNumber = referenceNumber;

  cy.completeAndSubmitSignInAccountForm({ emailAddress });

  // get the OTP security code
  cy.accountAddAndGetOTP(emailAddress).then((securityCode) => {
    cy.keyboardInput(field(SECURITY_CODE).input(), securityCode);

    // submit the OTP security code
    cy.clickSubmitButton();

    if (referenceNumber) {
      // assert that we are on the "all sections" application page.
      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expectedUrl);
    } else {
      cy.getReferenceNumber().then((refNumber) => {
        applicationReferenceNumber = refNumber;

        // assert that we are on the "all sections" application page.
        const expectedUrl = `${baseUrl}${ROOT}/${refNumber}${ALL_SECTIONS}`;

        cy.assertUrl(expectedUrl);
      });
    }
  }).then(() => ({
    accountId,
    referenceNumber: applicationReferenceNumber,
    verifyAccountUrl,
  }));
};

export default signInAndAssertAllSectionsUrl;
