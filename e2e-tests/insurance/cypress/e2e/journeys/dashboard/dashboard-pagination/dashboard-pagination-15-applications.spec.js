import { MAX_APPLICATIONS_PER_PAGE } from '../../../../../../constants';

const totalApplications = MAX_APPLICATIONS_PER_PAGE;

context(`Insurance - Dashboard - pagination - ${totalApplications} applications`, () => {
  let applications;

  before(() => {
    cy.completeSignInAndGoToDashboard().then(({ accountId }) => {
      cy.createApplications(accountId, totalApplications).then((createdApplications) => {
        applications = createdApplications;
      });

      cy.navigateToDashboardUrl();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplications(applications);
  });

  it(`should NOT render pagination list items because there are no more than ${MAX_APPLICATIONS_PER_PAGE} applications`, () => {
    cy.assertPaginationDoesNotExist();
  });
});
