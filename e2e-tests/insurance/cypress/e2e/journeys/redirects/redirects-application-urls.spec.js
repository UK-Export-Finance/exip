import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const { ALL_SECTIONS, CHECK_YOUR_ANSWERS, DECLARATIONS, EXPORTER_BUSINESS, EXPORT_CONTRACT, POLICY, ROOT, YOUR_BUYER } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Redirects - `insurance` application URLs should redirect to the `apply` equivalent URL', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({});
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe(`/insurance/:referenceNumber${ALL_SECTIONS}`, () => {
    it(`should redirect to ${ROOT}/:referenceNumber${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(`/insurance/${referenceNumber}${ALL_SECTIONS}`);

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance/:referenceNumber${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, () => {
    it(`should redirect to ${ROOT}/:referenceNumber${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, () => {
      cy.navigateToUrl(`/insurance/${referenceNumber}${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`);

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance/:referenceNumber${DECLARATIONS.ROOT}`, () => {
    it(`should redirect to ${ROOT}/:referenceNumber${DECLARATIONS.ROOT}`, () => {
      cy.navigateToUrl(`/insurance/${referenceNumber}${DECLARATIONS.ROOT}`);

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${DECLARATIONS.ROOT}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance/:referenceNumber${DECLARATIONS.CONFIDENTIALITY}`, () => {
    it(`should redirect to ${ROOT}/:referenceNumber${DECLARATIONS.CONFIDENTIALITY}`, () => {
      cy.navigateToUrl(`/insurance/${referenceNumber}${DECLARATIONS.CONFIDENTIALITY}`);

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${DECLARATIONS.CONFIDENTIALITY}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance/:referenceNumber${EXPORTER_BUSINESS.ROOT}`, () => {
    it(`should redirect to ${ROOT}/:referenceNumber${EXPORTER_BUSINESS.ROOT}`, () => {
      cy.navigateToUrl(`/insurance/${referenceNumber}${EXPORTER_BUSINESS.ROOT}`);

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${EXPORTER_BUSINESS.ROOT}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance/:referenceNumber${EXPORTER_BUSINESS.COMPANY_DETAILS_ROOT}`, () => {
    it(`should redirect to ${ROOT}/:referenceNumber${EXPORTER_BUSINESS.COMPANY_DETAILS_ROOT}`, () => {
      cy.navigateToUrl(`/insurance/${referenceNumber}${EXPORTER_BUSINESS.COMPANY_DETAILS_ROOT}`);

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${EXPORTER_BUSINESS.COMPANY_DETAILS_ROOT}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance/:referenceNumber${EXPORT_CONTRACT.ROOT}`, () => {
    it(`should redirect to ${ROOT}/:referenceNumber${EXPORT_CONTRACT.ROOT}`, () => {
      cy.navigateToUrl(`/insurance/${referenceNumber}${EXPORT_CONTRACT.ROOT}`);

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT.ROOT}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance/:referenceNumber${EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES}`, () => {
    it(`should redirect to ${ROOT}/:referenceNumber${EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES}`, () => {
      cy.navigateToUrl(`/insurance/${referenceNumber}${EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES}`);

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance/:referenceNumber${POLICY.ROOT}`, () => {
    it(`should redirect to ${ROOT}/:referenceNumber${POLICY.ROOT}`, () => {
      cy.navigateToUrl(`/insurance/${referenceNumber}${POLICY.ROOT}`);

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${POLICY.ROOT}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance/:referenceNumber${POLICY.TYPE_OF_POLICY}`, () => {
    it(`should redirect to ${ROOT}/:referenceNumber${POLICY.TYPE_OF_POLICY}`, () => {
      cy.navigateToUrl(`/insurance/${referenceNumber}${POLICY.TYPE_OF_POLICY}`);

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${POLICY.TYPE_OF_POLICY}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance/:referenceNumber${YOUR_BUYER.ROOT}`, () => {
    it(`should redirect to ${ROOT}/:referenceNumber${YOUR_BUYER.ROOT}`, () => {
      cy.navigateToUrl(`/insurance/${referenceNumber}${YOUR_BUYER.ROOT}`);

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUYER.ROOT}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, () => {
    it(`should redirect to ${ROOT}/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, () => {
      cy.navigateToUrl(`/insurance/${referenceNumber}${YOUR_BUYER.COMPANY_OR_ORGANISATION}`);

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUYER.COMPANY_OR_ORGANISATION}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
