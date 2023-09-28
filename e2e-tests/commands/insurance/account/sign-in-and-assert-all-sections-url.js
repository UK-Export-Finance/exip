import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { submitButton } from '../../../pages/shared';
import { enterCodePage } from '../../../pages/insurance/account/sign-in';

const {
  ACCOUNT: { SECURITY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  ALL_SECTIONS,
  ROOT,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

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
    cy.keyboardInput(enterCodePage[SECURITY_CODE].input(), securityCode);

    // submit the OTP security code
    submitButton().click();

    if (!referenceNumber) {
      cy.getReferenceNumber().then((refNumber) => {
        applicationReferenceNumber = refNumber;
      });
    }

    // assert that we are on the "all sections" application page.
    const expectedUrl = `${baseUrl}${ROOT}/${applicationReferenceNumber}${ALL_SECTIONS}`;

    cy.assertUrl(expectedUrl);
  }).then(() => ({
    accountId,
    referenceNumber: applicationReferenceNumber,
    verifyAccountUrl,
  }));
};

export default signInAndAssertAllSectionsUrl;
