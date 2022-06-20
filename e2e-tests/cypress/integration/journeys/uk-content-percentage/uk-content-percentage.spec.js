import ukContentPercentagePage from '../../pages/ukContentPercentage';
import partials from '../../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

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

    cy.url().should('include', ROUTES.TRIED_TO_OBTAIN_COVER);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    ukContentPercentagePage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders `yes` radio button', () => {
    const yesRadio = ukContentPercentagePage.yes();
    yesRadio.should('exist');

    yesRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('Yes');
    });
  });

  it('renders `no` radio button', () => {
    const noRadio = ukContentPercentagePage.no();
    noRadio.should('exist');

    noRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('No');
    });
  });

  it('renders a submit button', () => {
    const button = ukContentPercentagePage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  it('renders expandable details', () => {
    const { details } = ukContentPercentagePage;

    details.summary().should('exist');

    details.summary().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.DETAILS.INTRO);
    });

    details.summary().click();

    details.item1().should('exist');
    details.item2().should('exist');
    details.item3().should('exist');

    details.item1().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.DETAILS.ITEMS[0][0].text);
    });

    const item2ContentStrings = CONTENT_STRINGS.DETAILS.ITEMS[1];

    details.item2().invoke('text').then((text) => {
      expect(text.trim()).includes(item2ContentStrings[0].text);
      expect(text.trim()).includes(item2ContentStrings[1].text);
      expect(text.trim()).includes(item2ContentStrings[2].text);
    });

    details.item2Link().should('have.attr', 'href', item2ContentStrings[1].href);

    details.item3().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.DETAILS.ITEMS[2][0].text);
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

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL}`, () => {
        ukContentPercentagePage.yes().click();
        ukContentPercentagePage.submitButton().click();

        cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_DEAL);
      });
    });
  });
});
