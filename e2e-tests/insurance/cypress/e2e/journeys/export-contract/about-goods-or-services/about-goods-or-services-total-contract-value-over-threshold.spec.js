import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES,
    HOW_WILL_YOU_GET_PAID,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - About goods or services page - Submission with total contract value over threshold', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceExportContractSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('after submitting the form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${HOW_WILL_YOU_GET_PAID}`, () => {
      cy.completeAndSubmitAboutGoodsOrServicesForm({ finalDestinationKnown: false });

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`;
      cy.assertUrl(expectedUrl);
    });

    it('should retain the `export contract` task status as `in progress`', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsInProgress();
    });
  });
});
