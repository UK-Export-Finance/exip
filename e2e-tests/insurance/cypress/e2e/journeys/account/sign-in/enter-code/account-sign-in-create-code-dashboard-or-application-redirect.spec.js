import header from '../../../../../../../partials/header';

context(
  'Insurance - Account - Sign in - I want to go straight to my application if there is exactly one application in progress or the dashboard otherwise',
  () => {
    before(() => {
      cy.navigateToCheckIfEligibleUrl();
    });

    beforeEach(() => {
      cy.saveSession();
    });

    afterEach(() => {
      // sign out for next test
      header.navigation.signOut().click();
    });

    describe('when there are no applications', () => {
      it('should redirect to the dashboard', () => {
        cy.completeSignInAndGoToDashboard({});
      });
    });

    describe('when there is one application', () => {
      it('should redirect to the application directly', () => {
        // creates new application and account
        cy.completeSignInAndGoToApplication({}).then(({ referenceNumber }) => {
          // sign out for next test
          header.navigation.signOut().click();

          // sign in again and complete OTP (without creating account)
          cy.completeSignInAndOTP({ referenceNumber, shouldRedirectToApplication: true });
        });
      });
    });

    describe('when there is more than one application', () => {
      it('should redirect to the dashboard', () => {
        // creates account and application
        cy.completeSignInAndGoToApplication({}).then(() => {
          // go to all applications for user
          cy.clickHeaderApplicationsLink();
          // click on start new application page
          cy.clickStartNewApplicationButton();

          // complete eligibility questions
          cy.submitInsuranceEligibilityAnswersHappyPath();

          // sign out for next test
          header.navigation.signOut().click();

          // sign in again and check it redirects to dashboard
          cy.completeSignInAndOTP({ shouldRedirectToApplication: false });
        });
      });
    });
  },
);
