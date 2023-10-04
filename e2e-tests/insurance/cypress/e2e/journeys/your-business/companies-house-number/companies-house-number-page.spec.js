import { companiesHouseNumber } from '../../../../../../pages/your-business';
import partials from '../../../../../../partials';
import { field, saveAndBackButton } from '../../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';

const { ROOT } = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER;

const {
  COMPANIES_HOUSE_NUMBER,
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Companies house number page - As an Exporter I want to enter my business\'s CRN So that I can apply for UKEF Export Insurance policy', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER}`,
      backLink: `${ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`,
      lightHouseThresholds: {
        'best-practices': 93,
      },
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it(`should display the ${COMPANIES_HOUSE_NUMBER} input`, () => {
      field(COMPANIES_HOUSE_NUMBER).input().should('exist');
      field(COMPANIES_HOUSE_NUMBER).errorMessage().should('not.exist');
    });

    it('should display a link for no companies house number', () => {
      cy.checkText(companiesHouseNumber.doNotHaveACompaniesHouseNumber(), CONTENT_STRINGS.NO_COMPANIES_HOUSE_NUMBER);
    });

    it('should display save and go back button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });
});
