import { field } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants/validation';
import application from '../../../../../../fixtures/application';

const {
  ROOT,
  EXPORTER_BUSINESS: { ALTERNATIVE_TRADING_ADDRESS_ROOT },
} = INSURANCE_ROUTES;

const {
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const { DIFFERENT_TRADING_ADDRESS } = application;

context('Insurance - Your business - Alternative trading address - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitYourBusinessForms({ stopSubmittingAfter: 'companyDetails', differentTradingAddress: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_ROOT}`;

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
    before(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `your business` as `in progress', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskBusinessStatusIsInProgress();
    });
  });

  describe('when submitting an invalid answer', () => {
    it('should redirect to `all sections`', () => {
      cy.navigateToUrl(url);

      field(FULL_ADDRESS)
        .textarea()
        .type('a'.repeat(MAXIMUM_CHARACTERS.FULL_ADDRESS + 1));

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `your business` as `in progress', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskBusinessStatusIsInProgress();
    });

    it('should NOT have the originally submitted answer', () => {
      cy.navigateToUrl(url);

      cy.checkText(field(FULL_ADDRESS).textarea(), '');
    });
  });

  describe('when submitting a valid answer', () => {
    it('should redirect to `all sections`', () => {
      cy.navigateToUrl(url);

      field(FULL_ADDRESS).textarea().type(DIFFERENT_TRADING_ADDRESS[FULL_ADDRESS]);

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `your business` as `in progress', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskBusinessStatusIsInProgress();
    });

    it('should have the originally submitted answer', () => {
      cy.navigateToUrl(url);

      cy.checkText(field(FULL_ADDRESS).textarea(), DIFFERENT_TRADING_ADDRESS[FULL_ADDRESS]);
    });
  });
});
