import { ROUTES } from '../../../../../../constants';

const {
  QUOTE: {
    EXPORTER_LOCATION,
    EXPORTER_LOCATION_CHANGE,
    NEED_TO_START_AGAIN,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `Exporter location` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(EXPORTER_LOCATION);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

    cy.assertUrl(expectedUrl);
  });
});

context('Manually going to the `Change Exporter location lo` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(EXPORTER_LOCATION_CHANGE);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

    cy.assertUrl(expectedUrl);
  });
});
