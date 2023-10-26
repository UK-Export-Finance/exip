import { INSURANCE_FIELD_IDS } from '../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { field, submitButton, backLink } from '../../../../../pages/shared';
import dashboardPage from '../../../../../pages/insurance/dashboard';
import partials from '../../../../../partials';
import mockAccount from '../../../../../fixtures/account';
import mockApplication from '../../../../../fixtures/application';
import mockNameWithSpecialCharacters from '../../../../../fixtures/name-with-special-characters';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME, SECURITY_CODE },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME: BUYER_NAME, FIRST_NAME: BUYER_CONTACT_FIRST_NAME, LAST_NAME: BUYER_CONTACT_LAST_NAME },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT, DASHBOARD, ALL_SECTIONS,
} = INSURANCE_ROUTES;

const {
  taskList: {
    prepareApplication: { tasks },
  },
} = partials.insurancePartials;

const mockAccountSpecialCharacters = {
  ...mockAccount,
  [FIRST_NAME]: mockNameWithSpecialCharacters(mockAccount[FIRST_NAME]),
  [LAST_NAME]: mockNameWithSpecialCharacters(mockAccount[LAST_NAME]),
};

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Name fields - Header and page fields should render special characters without character codes after submission', () => {
  let referenceNumber;
  let allSectionsUrl;

  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

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

      // get the OTP security code
      cy.accountAddAndGetOTP(mockAccount.emailAddress).then((securityCode) => {
        cy.keyboardInput(field(SECURITY_CODE).input(), securityCode);

        // submit the OTP security code
        submitButton().click();
      });
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(dashboardUrl);

    dashboardPage.startNewApplicationButton().click();

    cy.submitInsuranceEligibilityAnswersFromExporterLocationHappyPath();

    cy.getReferenceNumber().then((refNumber) => {
      referenceNumber = refNumber;

      allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;
    });
  });

  it("should render special characters in the header's user name/'manage account' link", () => {
    const expected = `${mockAccountSpecialCharacters[FIRST_NAME]} ${mockAccountSpecialCharacters[LAST_NAME]}`;

    cy.checkText(
      partials.header.navigation.manageAccount(),
      expected,
    );
  });

  describe("'your buyer - company or organisation' page", () => {
    describe('when submitting name fields with special characters and going back to the page', () => {
      const nameWithSpecialCharacters = mockNameWithSpecialCharacters(mockApplication.BUYER[BUYER_NAME]);

      beforeEach(() => {
        cy.navigateToUrl(allSectionsUrl);

        tasks.buyer.link().click();

        cy.completeAndSubmitCompanyOrOrganisationForm({
          buyerName: nameWithSpecialCharacters,
          firstName: nameWithSpecialCharacters,
          lastName: nameWithSpecialCharacters,
        });

        backLink().click();
      });

      it('should render special characters in the company/organisation name field', () => {
        const buyerNameField = field(BUYER_NAME);
        cy.checkValue(buyerNameField, nameWithSpecialCharacters);

        const buyerFirstNameField = field(BUYER_CONTACT_FIRST_NAME);
        cy.checkValue(buyerFirstNameField, nameWithSpecialCharacters);

        const buyerLastNameField = field(BUYER_CONTACT_LAST_NAME);
        cy.checkValue(buyerLastNameField, nameWithSpecialCharacters);
      });
    });
  });
});
