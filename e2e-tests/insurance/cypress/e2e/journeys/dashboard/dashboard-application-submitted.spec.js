import dashboardPage from '../../../../../pages/insurance/dashboard';
import partials from '../../../../../partials';
import { BUTTONS, PAGES } from '../../../../../content-strings';
import { DATE_FORMAT } from '../../../../../constants';
import { formatDate } from '../../../../../helpers/date';

const { table } = dashboardPage;

const CONTENT_STRINGS = PAGES.INSURANCE.DASHBOARD;

const { TABLE_HEADERS } = CONTENT_STRINGS;

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

    cy.navigateToDashboardUrl();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should render `status` cell with `submitted` status tag', () => {
    const selector = table.body.row(referenceNumber).status;

    cy.checkTaskStatusSubmitted(selector);
  });

  it(`should render ${TABLE_HEADERS.SUBMITTED} cell '${BUTTONS.CONTINUE}' with formatted date`, () => {
    const element = table.body.row(referenceNumber).submitted();

    const today = new Date();
    const expectedDate = formatDate(today, DATE_FORMAT.SHORT_MONTH);

    cy.checkText(element, expectedDate);
  });
});
