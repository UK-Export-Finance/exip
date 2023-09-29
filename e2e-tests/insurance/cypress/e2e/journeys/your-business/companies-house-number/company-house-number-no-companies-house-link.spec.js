import { companiesHouseNumber } from '../../../../../../pages/your-business';
import { insurance } from '../../../../../../pages';
import {
  cannotApplyPage,
} from '../../../../../../pages/shared';
import INSURANCE_PAGES from '../../../../../../content-strings/pages/insurance';
import { ROUTES } from '../../../../../../constants';

const {
  APPLY_OFFLINE: { ACTIONS, REASON },
  EXPORTER_BUSINESS: { COMPANIES_HOUSE_NUMBER: { NO_COMPANIES_HOUSE_NUMBER } },
} = INSURANCE_PAGES;

const {
  ROOT,
  APPLY_OFFLINE,
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE_NUMBER,
    NO_COMPANIES_HOUSE_NUMBER: NO_COMPANIES_HOUSE_NUMBER_ROUTE,
  },
} = ROUTES.INSURANCE;

context('Insurance - Your business - Company details page - As an Exporter it should take me to the apply offline page if I do not have a companies house number', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${COMPANIES_HOUSE_NUMBER}`;

      cy.navigateToUrl(url);

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    const expectedHref = `${ROOT}/${referenceNumber}${NO_COMPANIES_HOUSE_NUMBER_ROUTE}`;

    const expectedText = NO_COMPANIES_HOUSE_NUMBER;

    cy.checkLink(
      companiesHouseNumber.doNotHaveACompaniesHouseNumber(),
      expectedHref,
      expectedText,
    );

    companiesHouseNumber.doNotHaveACompaniesHouseNumber().click();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${APPLY_OFFLINE} page when pressing the no companies house number link`, () => {
    cy.assertUrl(`${Cypress.config('baseUrl')}${APPLY_OFFLINE}`);
  });

  it(`should contain "${REASON.NO_COMPANIES_HOUSE_NUMBER}" message on apply offline page`, () => {
    const expected = `${REASON.INTRO} ${REASON.NO_COMPANIES_HOUSE_NUMBER}`;

    cy.checkText(cannotApplyPage.reason(), expected);
  });

  it('should contain link to proposal form on the apply offline page', () => {
    const expectedHref = ACTIONS.DOWNLOAD_FORM.LINK.HREF_PROPOSAL;
    const expectedText = ACTIONS.DOWNLOAD_FORM.LINK.TEXT;

    cy.checkLink(
      insurance.applyOfflinePage.downloadFormLink(),
      expectedHref,
      expectedText,
    );
  });

  it('should take you back to company-details page when pressing the back button', () => {
    cy.clickBackLink();

    cy.assertUrl(url);
  });
});
