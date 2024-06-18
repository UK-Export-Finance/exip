/**
 * createAnAccountAndApplicationAndSignIn
 * 1) Create an account directly via the API
 * 2) Verify the account via "verify email" page (mimicking clicking email link)
 * 3) Create an application directly via the API, associated with the created user; Avoiding going through the full eligibility flow.
 * 4) Complete and submit the "account sign in" form
 * 5) Add a new OTP/access code and get it directly from the API
 * 6) Complete and submit the "enter access code" form
 * 7) Check we are on the "all sections" application page.
 * @param {String} Account email address
 * @param {String} Company number/companies house number to use for application creation
 * @param {Boolean} totalContractValueOverThreshold if total contract value in eligibility should be over threshold
 */
const createAnAccountAndApplicationAndSignIn = (emailAddress, companyNumber, totalContractValueOverThreshold = false) =>
  cy.createAccount({ emailAddress }).then(({ accountId, verifyAccountUrl }) => {
    // verify the account by navigating to the "verify account" page
    cy.navigateToUrl(verifyAccountUrl);

    // create an application directly via the API.
    cy.createAnApplication(accountId, companyNumber, totalContractValueOverThreshold).then((createdApplication) => {
      const { referenceNumber } = createdApplication;

      /**
       * Sign in to the account.
       * Check we are on the "all sections" application page.
       */
      cy.signInAndAssertAllSectionsUrl({
        accountId,
        emailAddress,
        referenceNumber,
        verifyAccountUrl,
      });
    });
  });

export default createAnAccountAndApplicationAndSignIn;
