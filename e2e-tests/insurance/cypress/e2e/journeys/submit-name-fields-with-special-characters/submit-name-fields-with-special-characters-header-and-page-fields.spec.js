import { INSURANCE_FIELD_IDS } from '../../../../../constants/field-ids/insurance';
import { field } from '../../../../../pages/shared';
import { header } from '../../../../../partials';
import mockAccount from '../../../../../fixtures/account';
import mockNameWithSpecialCharacters from '../../../../../fixtures/name-with-special-characters';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME, ACCESS_CODE },
} = INSURANCE_FIELD_IDS;

const mockAccountSpecialCharacters = {
  ...mockAccount,
  [FIRST_NAME]: mockNameWithSpecialCharacters(mockAccount[FIRST_NAME]),
  [LAST_NAME]: mockNameWithSpecialCharacters(mockAccount[LAST_NAME]),
};

context('Insurance - Name fields - Header and page fields should render special characters without character codes after submission', () => {
  let referenceNumber;

  before(() => {
    cy.deleteAccount();

    cy.createAccount({
      ...mockAccountSpecialCharacters,
      nameFirst: mockAccountSpecialCharacters[FIRST_NAME],
      nameLast: mockAccountSpecialCharacters[LAST_NAME],
    }).then(({ verifyAccountUrl }) => {
      // verify the account by navigating to the "verify account" page
      cy.navigateToUrl(verifyAccountUrl);

      // sign in to the account. Behind the scenes, an application is created at this point.
      cy.completeAndSubmitSignInAccountForm({});

      // get the OTP access code
      cy.accountAddAndGetOTP(mockAccount.emailAddress).then((accessCode) => {
        cy.keyboardInput(field(ACCESS_CODE).input(), accessCode);

        // submit the OTP access code
        cy.clickSubmitButton();
      });
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToDashboardUrl();

    cy.clickStartNewApplicationButton();

    cy.submitInsuranceEligibilityAnswersFromExporterLocationHappyPath({});

    cy.getReferenceNumber().then((refNumber) => {
      referenceNumber = refNumber;
    });
  });

  it("should render special characters in the header's user name/'manage account' link", () => {
    const expected = `${mockAccountSpecialCharacters[FIRST_NAME]} ${mockAccountSpecialCharacters[LAST_NAME]}`;

    cy.checkText(header.navigation.manageAccount(), expected);
  });
});
