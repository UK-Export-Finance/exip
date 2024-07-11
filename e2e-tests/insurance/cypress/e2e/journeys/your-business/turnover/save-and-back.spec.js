import { field } from '../../../../../../pages/shared';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import application from '../../../../../../fixtures/application';

const {
  TURNOVER: {
    ESTIMATED_ANNUAL_TURNOVER,
    PERCENTAGE_TURNOVER,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    TURNOVER_ROOT,
  },
} = ROUTES.INSURANCE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Turnover page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();

      url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER_ROOT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      cy.checkTaskBusinessStatusIsInProgress();
    });
  });

  describe('save and back on a partially entered form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(ESTIMATED_ANNUAL_TURNOVER).input(), application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      cy.checkTaskBusinessStatusIsInProgress();
    });

    it(`should retain the ${ESTIMATED_ANNUAL_TURNOVER} input on the page and the other fields should be empty`, () => {
      cy.startYourBusinessSection({});

      // go through 3 business forms.
      cy.clickSubmitButtonMultipleTimes({ count: 3 });

      field(ESTIMATED_ANNUAL_TURNOVER).input().should('have.value', application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
      field(PERCENTAGE_TURNOVER).input().should('have.value', '');
    });
  });

  describe('when all fields are provided', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(ESTIMATED_ANNUAL_TURNOVER).input(), application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
      cy.keyboardInput(field(PERCENTAGE_TURNOVER).input(), application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      cy.checkTaskBusinessStatusIsInProgress();
    });

    it('should retain all the fields on the page', () => {
      cy.startYourBusinessSection({});

      // go through 2 business forms.
      cy.clickSubmitButtonMultipleTimes({ count: 2 });

      field(ESTIMATED_ANNUAL_TURNOVER).input().should('have.value', application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
      field(PERCENTAGE_TURNOVER).input().should('have.value', application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);
    });
  });
});
