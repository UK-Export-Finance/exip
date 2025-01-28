import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  COMPLETE_OTHER_SECTIONS,
  DECLARATIONS: {
    CONFIDENTIALITY,
    ANTI_BRIBERY: { ROOT: ANTI_BRIBERY_ROOT, CODE_OF_CONDUCT, EXPORTING_WITH_CODE_OF_CONDUCT },
    MODERN_SLAVERY,
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');
const insuranceRoute = `${baseUrl}${INSURANCE_ROOT}`;

context('Insurance - Declaration - cannot skip to any Declarations page without completing other required fields/sections', () => {
  let referenceNumber;
  let completeOtherSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      completeOtherSectionsUrl = `${insuranceRoute}/${referenceNumber}${COMPLETE_OTHER_SECTIONS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication();
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Declarations - ${CONFIDENTIALITY} page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${CONFIDENTIALITY}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Declarations - ${ANTI_BRIBERY_ROOT} page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${ANTI_BRIBERY_ROOT}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Declarations - ${CODE_OF_CONDUCT} page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${CODE_OF_CONDUCT}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Declarations - ${EXPORTING_WITH_CODE_OF_CONDUCT} page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Declarations - ${MODERN_SLAVERY} page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${MODERN_SLAVERY}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Declarations - ${CONFIRMATION_AND_ACKNOWLEDGEMENTS} page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });
});
