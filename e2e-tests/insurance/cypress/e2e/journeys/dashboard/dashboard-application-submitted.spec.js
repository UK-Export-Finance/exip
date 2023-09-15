import dashboardPage from '../../../../../pages/insurance/dashboard';
import partials from '../../../../../partials';
import { BUTTONS, PAGES } from '../../../../../content-strings';
import { APPLICATION, DATE_FORMAT, ROUTES } from '../../../../../constants';
import { formatDate } from '../../../../../helpers/date';

const { table } = dashboardPage;

const { DASHBOARD } = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.DASHBOARD;

const { TABLE_HEADERS } = CONTENT_STRINGS;

const baseUrl = Cypress.config('baseUrl');
const dashboardUrl = `${baseUrl}${DASHBOARD}`;

context('Insurance - Dashboard - submitted application', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({}).then((refNumber) => {
      referenceNumber = refNumber;

      partials.header.navigation.applications().click();
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(dashboardUrl);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should render 'status' cell with ${APPLICATION.STATUS.SUBMITTED}`, () => {
    const cell = table.body.row(referenceNumber).status();

    const expected = APPLICATION.STATUS.SUBMITTED;

    cy.checkText(cell, expected);
  });

  it(`should render ${TABLE_HEADERS.SUBMITTED} cell '${BUTTONS.CONTINUE}' with formatted date`, () => {
    const element = table.body.row(referenceNumber).submitted();

    const today = new Date();
    const expectedDate = formatDate(today, DATE_FORMAT.SHORT_MONTH);

    cy.checkText(element, expectedDate);
  });
});
