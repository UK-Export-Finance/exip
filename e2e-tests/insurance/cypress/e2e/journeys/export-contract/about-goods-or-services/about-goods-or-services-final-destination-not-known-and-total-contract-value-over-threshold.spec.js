import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES,
    HOW_WILL_YOU_GET_PAID,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - About goods or services page - Final destination not known, Submission with total contract value over threshold', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceExportContractSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
      allSectionsUrl = `${ROOT}/${referenceNumber}${ALL_SECTIONS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${HOW_WILL_YOU_GET_PAID}`, () => {
      cy.completeAndSubmitAboutGoodsOrServicesForm({ finalDestinationKnown: false });

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`;
      cy.assertUrl(expectedUrl);
    });

    describe('after submitting the form', () => {
      it('should retain the `export contract` task status as `in progress`', () => {
        cy.navigateToUrl(allSectionsUrl);

        cy.checkTaskExportContractStatusIsInProgress();
      });
    });
  });
});
