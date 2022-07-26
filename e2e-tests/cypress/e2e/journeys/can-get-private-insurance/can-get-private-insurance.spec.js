import {
  companyBasedPage,
  canGetPrivateInsurancePage,
} from '../../pages';
import partials from '../../partials';
import {
  ORGANISATION,
  BUTTONS,
  FIELDS,
  LINKS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.CAN_GET_PRIVATE_INSURANCE_PAGE;
const { FIELD_IDS, ROUTES } = CONSTANTS;

context('Are you able to get private insurance page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.COMPANY_BASED, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    companyBasedPage[FIELD_IDS.VALID_COMPANY_BASE].yes().click();
    companyBasedPage.submitButton().click();

    cy.url().should('include', ROUTES.CAN_GET_PRIVATE_INSURANCE);
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 80,
      'best-practices': 100,
      seo: 60,
    });
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    cy.url().should('include', ROUTES.COMPANY_BASED);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    canGetPrivateInsurancePage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders `yes` radio button', () => {
    const fieldId = FIELD_IDS.CAN_GET_PRIVATE_INSURANCE;
    const yesRadio = canGetPrivateInsurancePage[fieldId].yes();
    yesRadio.should('exist');

    yesRadio.invoke('text').then((text) => {
      const expected = FIELDS[fieldId].OPTIONS.YES.TEXT;
      expect(text.trim()).equal(expected);
    });
  });

  it('renders `no` radio button', () => {
    const fieldId = FIELD_IDS.CAN_GET_PRIVATE_INSURANCE;
    const noRadio = canGetPrivateInsurancePage[fieldId].no();
    noRadio.should('exist');

    noRadio.invoke('text').then((text) => {
      const expected = FIELDS[fieldId].OPTIONS.NO.TEXT;
      expect(text.trim()).equal(expected);
    });
  });

  it('renders a submit button', () => {
    const button = canGetPrivateInsurancePage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        canGetPrivateInsurancePage.submitButton().click();
      });

      it('should render validation errors', () => {
        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE];

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        canGetPrivateInsurancePage[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE].errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });

      it('should focus on inputs when clicking summary error message', () => {
        partials.errorSummaryListItemLinks().eq(0).click();
        canGetPrivateInsurancePage[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE].yesInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `no`', () => {
      it(`should redirect to ${ROUTES.UK_GOODS_OR_SERVICES}`, () => {
        canGetPrivateInsurancePage[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE].no().click();
        canGetPrivateInsurancePage.submitButton().click();

        cy.url().should('include', ROUTES.UK_GOODS_OR_SERVICES);
      });
    });
  });
});
