import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  COMPLETE_OTHER_SECTIONS,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
    YOUR_BUSINESS,
    YOUR_BUYER,
  },
} = INSURANCE_ROUTES;

context('Insurance - Check your answers - cannot skip to any Check your answers page without completing other required fields/sections', () => {
  const insuranceRoute = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}`;

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

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Check your answers - Policy page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${TYPE_OF_POLICY}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Check your answers - Your business page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${YOUR_BUSINESS}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Check your answers - Your buyer page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${YOUR_BUYER}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });
});
