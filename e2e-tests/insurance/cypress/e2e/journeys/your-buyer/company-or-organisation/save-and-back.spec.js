import { field } from '../../../../../../pages/shared';
import { ROUTES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    REGISTRATION_NUMBER,
    WEBSITE,
  },
} = FIELD_IDS;

const {
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION,
  },
} = ROUTES.INSURANCE;

const { BUYER } = application;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Company or organisation - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your buyer` task status as `not started yet`', () => {
      cy.checkTaskPolicyStatusIsNotStartedYet();
    });
  });

  describe('when submitting a partially entered form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(NAME).input(), BUYER[NAME]);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });

    it(`should retain the ${NAME} input on the page and the other fields should be empty`, () => {
      cy.startInsuranceYourBuyerSection({});

      cy.checkValue(field(NAME), BUYER[NAME]);

      cy.checkTextareaValue({
        fieldId: ADDRESS,
        expectedValue: '',
      });

      cy.checkValue(field(REGISTRATION_NUMBER), '');
      cy.checkValue(field(WEBSITE), '');
    });
  });

  describe('when submitting a fully filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCompanyOrOrganisationForm({});

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });

    it('should retain all inputs on the page', () => {
      cy.startInsuranceYourBuyerSection({});

      cy.checkTextareaValue({
        fieldId: ADDRESS,
        expectedValue: BUYER[ADDRESS],
      });

      cy.checkValue(field(REGISTRATION_NUMBER), BUYER[REGISTRATION_NUMBER]);
      cy.checkValue(field(WEBSITE), BUYER[WEBSITE]);
    });
  });
});
