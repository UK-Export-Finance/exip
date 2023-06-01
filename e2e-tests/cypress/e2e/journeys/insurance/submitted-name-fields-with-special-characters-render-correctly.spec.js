import { FIELD_IDS, ROUTES } from '../../../../constants';
import { enterCodePage } from '../../pages/insurance/account/sign-in';
import { yourContactPage } from '../../pages/your-business';
import { companyOrOrganisationPage } from '../../pages/insurance/your-buyer';
import { submitButton, backLink } from '../../pages/shared';
import dashboardPage from '../../pages/insurance/dashboard';
import partials from '../../partials';
import mockAccount from '../../../fixtures/account';
import mockApplication from '../../../fixtures/application';

const {
  INSURANCE: {
    ACCOUNT: { FIRST_NAME, LAST_NAME, SECURITY_CODE },
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: { NAME: BUYER_NAME, FIRST_NAME: BUYER_CONTACT_FIRST_NAME, LAST_NAME: BUYER_CONTACT_LAST_NAME },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: { ROOT, DASHBOARD, ALL_SECTIONS },
} = ROUTES;

const {
  taskList: {
    prepareApplication: { tasks },
  },
} = partials.insurancePartials;

const specialCharacters = '<>"\'/*&';

const mockNameWithSpecialCharacters = (name) => `${name}${specialCharacters}`;

const mockAccountSpecialCharacters = {
  ...mockAccount,
  [FIRST_NAME]: mockNameWithSpecialCharacters(mockAccount[FIRST_NAME]),
  [LAST_NAME]: mockNameWithSpecialCharacters(mockAccount[LAST_NAME]),
};

context('Insurance - Name fields - should render special characters after submission', () => {
  const baseUrl = Cypress.config('baseUrl');
  let referenceNumber;
  let allSectionsUrl;

  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

  before(() => {
    cy.createAccount({
      ...mockAccountSpecialCharacters,
      nameFirst: mockAccountSpecialCharacters[FIRST_NAME],
      nameLast: mockAccountSpecialCharacters[LAST_NAME],
    }).then((verifyAccountUrl) => {
      // verify the account by navigating to the "verify account" page
      cy.navigateToUrl(verifyAccountUrl);

      // sign in to the account. Behind the scenes, an application is created at this point.
      cy.completeAndSubmitSignInAccountForm({});

      // get the OTP security code
      cy.accountAddAndGetOTP(mockAccount.emailAddress).then((securityCode) => {
        cy.keyboardInput(enterCodePage[SECURITY_CODE].input(), securityCode);

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

    dashboardPage.startNewApplication().click();

    cy.submitInsuranceEligibilityAnswersFromBuyerCountryHappyPath();

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

  describe("'your business - contact details' page", () => {
    describe('when submitting a name with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(allSectionsUrl);

        tasks.business.link().click();

        cy.completeAndSubmitCompanyDetails();

        cy.completeAndSubmitYourContact({
          [FIRST_NAME]: mockAccountSpecialCharacters[FIRST_NAME],
          [LAST_NAME]: mockAccountSpecialCharacters[LAST_NAME],
        });

        backLink().click();
      });

      it("should render special characters in the contact's first and last name fields", () => {
        const firstNameField = yourContactPage.field(FIRST_NAME);

        cy.checkValue(firstNameField, mockAccountSpecialCharacters[FIRST_NAME]);

        const lastNameField = yourContactPage.field(FIRST_NAME);

        cy.checkValue(lastNameField, mockAccountSpecialCharacters[FIRST_NAME]);
      });
    });
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

      it('should render special characters in the comapny/organisation name field', () => {
        const buyerNameField = companyOrOrganisationPage[BUYER_NAME];
        cy.checkValue(buyerNameField, nameWithSpecialCharacters);

        const buyerFirstNameField = companyOrOrganisationPage[BUYER_CONTACT_FIRST_NAME];
        cy.checkValue(buyerFirstNameField, nameWithSpecialCharacters);

        const buyerLasttNameField = companyOrOrganisationPage[BUYER_CONTACT_LAST_NAME];
        cy.checkValue(buyerLasttNameField, nameWithSpecialCharacters);
      });
    });
  });
});
