import ukContentPercentagePage from '../pages/ukContentPercentage';
import partials from '../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  FIELDS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';

const CONTENT_STRINGS = PAGES.UK_CONTENT_PERCENTAGE_PAGE;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('What percentage of your export is UK content page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.UK_CONTENT_PERCENTAGE, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
    cy.url().should('include', ROUTES.UK_CONTENT_PERCENTAGE);
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 80,
      'best-practices': 100,
      seo: 75,
    });
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    cy.url().should('include', ROUTES.FINAL_DESTINATION);
  });

  it('renders a page title, heading and descriptions', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    ukContentPercentagePage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });

    ukContentPercentagePage.description1().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.DESCRIPTION_1);
    });

    ukContentPercentagePage.description2().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.DESCRIPTION_2);
    });
  });

  it('renders a warning', () => {
    const warning = ukContentPercentagePage.warning();
    warning.should('exist');

    warning.invoke('text').then((text) => {
      expect(text.trim()).includes(CONTENT_STRINGS.WARNING);
    });
  });

  it('renders a label and hint', () => {
    ukContentPercentagePage.label().should('exist');

    const hint = ukContentPercentagePage.hint();
    hint.should('exist');

    const input = FIELD_IDS.UK_CONTENT_PERCENTAGE;

    hint.invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[input].HINT);
    });
  });

  it('renders an input', () => {
    const input = ukContentPercentagePage.input();
    input.should('exist');
  });

  it('renders a submit button', () => {
    const button = ukContentPercentagePage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        ukContentPercentagePage.submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].IS_EMPTY;

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        ukContentPercentagePage.errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });
    });

    describe('when submitting the answer as a word (instead of number)', () => {
      it('should render validation errors', () => {
        ukContentPercentagePage.input().type('a');
        ukContentPercentagePage.submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].NOT_A_NUMBER;

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        ukContentPercentagePage.errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });
    });

    describe('when submitting the answer as a number lower than 0', () => {
      it('should render validation errors', () => {
        ukContentPercentagePage.input().type('-1');
        ukContentPercentagePage.submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].BELOW_MINIMUM;

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        ukContentPercentagePage.errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });
    });

    describe('when submitting the answer as a number higher than 100', () => {
      it('should render validation errors', () => {
        ukContentPercentagePage.input().type('101');
        ukContentPercentagePage.submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].ABOVE_MAXIMUM;

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        ukContentPercentagePage.errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });
    });

    describe('when form is valid', () => {
      it(`should redirect to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL}`, () => {
        ukContentPercentagePage.input().type('50');
        ukContentPercentagePage.submitButton().click();

        cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_DEAL);
      });
    });
  });
});
