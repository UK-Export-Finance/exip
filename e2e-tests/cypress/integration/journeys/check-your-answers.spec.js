import { checkYourAnswersPage } from '../pages';
import partials from '../partials';
import {
  ORGANISATION,
  BUTTONS,
  FIELDS,
  LINKS,
  PAGES,
  SUMMARY_ANSWERS,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';
import FIELD_IDS from '../../../constants/field-ids';

const CONTENT_STRINGS = PAGES.CHECK_YOUR_ANSWERS_PAGE;
const { ROUTES, FIELD_VALUES } = CONSTANTS;

context('Check your answers page', () => {
  const {
    VALID_COMPANY_BASE,
    BUYER_COUNTRY,
    TRIED_PRIVATE_COVER,
    UK_CONTENT_PERCENTAGE,
    CURRENCY,
    AMOUNT,
    PRE_CREDIT_PERIOD,
    CREDIT_PERIOD,
    SINGLE_POLICY_TYPE,
    SINGLE_POLICY_LENGTH,
  } = FIELD_IDS;

  const submissionData = {
    [BUYER_COUNTRY]: 'France',
    [UK_CONTENT_PERCENTAGE]: '50',
    [CURRENCY]: 'GBP',
    [AMOUNT]: '100',
    [PRE_CREDIT_PERIOD]: '1',
    [CREDIT_PERIOD]: '2',
    [SINGLE_POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
    [SINGLE_POLICY_LENGTH]: '13',
  };

  before(() => {
    cy.login();
    cy.submitAnswersHappyPath();
    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
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

    const expected = `${Cypress.config('baseUrl')}${ROUTES.TELL_US_ABOUT_YOUR_DEAL}`;
    partials.backLink().should('have.attr', 'href', expected);
  });

  it('renders a submit button', () => {
    const button = checkYourAnswersPage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.SUBMIT);
    });
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    checkYourAnswersPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  context('company summary list', () => {
    const list = checkYourAnswersPage.summaryLists.company;

    it('renders a heading', () => {
      list.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.GROUP_HEADING_COMPANY);
      });
    });

    it('renders `Company` key, value and change link', () => {
      const row = list[VALID_COMPANY_BASE];
      const expectedKeyText = FIELDS[VALID_COMPANY_BASE].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(SUMMARY_ANSWERS[VALID_COMPANY_BASE]);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.COMPANY_BASED_CHANGE}#${VALID_COMPANY_BASE}`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });
  });

  context('export summary list', () => {
    const list = checkYourAnswersPage.summaryLists.export;

    it('renders a heading', () => {
      list.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.GROUP_HEADING_EXPORT);
      });
    });

    it('renders `Buyer based` key, value and change link', () => {
      const row = list[BUYER_COUNTRY];
      const expectedKeyText = FIELDS[BUYER_COUNTRY].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = submissionData[BUYER_COUNTRY];

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.BUYER_BASED_CHANGE}#${BUYER_COUNTRY}`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Private insurance` key, value and change link', () => {
      const row = list[TRIED_PRIVATE_COVER];
      const expectedKeyText = FIELDS[TRIED_PRIVATE_COVER].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(SUMMARY_ANSWERS[TRIED_PRIVATE_COVER]);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE}#${TRIED_PRIVATE_COVER}`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `UK goods` key, value and change link', () => {
      const row = list[UK_CONTENT_PERCENTAGE];
      const expectedKeyText = FIELDS[UK_CONTENT_PERCENTAGE].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(SUMMARY_ANSWERS[UK_CONTENT_PERCENTAGE]);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.UK_CONTENT_PERCENTAGE_CHANGE}#${UK_CONTENT_PERCENTAGE}`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });
  });

  context('deal summary list', () => {
    const list = checkYourAnswersPage.summaryLists.deal;

    it('renders a heading', () => {
      list.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.GROUP_HEADING_DEAL);
      });
    });

    it('renders `Amount` key, value and change link', () => {
      const row = list[AMOUNT];
      const expectedKeyText = FIELDS[AMOUNT].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `£${submissionData[AMOUNT]}.00`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${AMOUNT}`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Currency` key, value and change link', () => {
      const row = list[CURRENCY];
      const expectedKeyText = FIELDS[CURRENCY].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `UK Sterling (${submissionData[CURRENCY]})`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${CURRENCY}`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Credit period` key, value and change link', () => {
      const row = list[CREDIT_PERIOD];
      const expectedKeyText = FIELDS[CREDIT_PERIOD].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${submissionData[CREDIT_PERIOD]} days`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${CREDIT_PERIOD}`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Policy type` key, value and change link', () => {
      const row = list[SINGLE_POLICY_TYPE];
      const expectedKeyText = FIELDS[SINGLE_POLICY_TYPE].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(submissionData[SINGLE_POLICY_TYPE]);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${SINGLE_POLICY_TYPE}`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Policy length` key, value and change link', () => {
      const row = list[SINGLE_POLICY_LENGTH];
      const expectedKeyText = FIELDS[SINGLE_POLICY_LENGTH].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${submissionData[SINGLE_POLICY_LENGTH]} months`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${SINGLE_POLICY_LENGTH}`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Pre-credit period` key, value and change link', () => {
      const row = list[PRE_CREDIT_PERIOD];
      const expectedKeyText = FIELDS[PRE_CREDIT_PERIOD].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${submissionData[PRE_CREDIT_PERIOD]} days`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${PRE_CREDIT_PERIOD}`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });
  });

  context('form submission', () => {
    it(`should redirect to ${ROUTES.YOUR_QUOTE}`, () => {
      checkYourAnswersPage.submitButton().click();

      cy.url().should('include', ROUTES.YOUR_QUOTE);
    });
  });
});
