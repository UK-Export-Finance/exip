import { checkYourAnswersPage } from '../../../pages/quote';
import partials from '../../../partials';
import {
  ORGANISATION,
  FIELDS,
  LINKS,
  PAGES,
  SUMMARY_ANSWERS,
} from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';
import FIELD_IDS from '../../../../../constants/field-ids';

const CONTENT_STRINGS = PAGES.CHECK_YOUR_ANSWERS_PAGE;
const { ROUTES, FIELD_VALUES } = CONSTANTS;

context('Check your answers page (single policy) - as an exporter, I want to review the details before submitting the proposal', () => {
  const {
    BUYER_COUNTRY,
    CONTRACT_VALUE,
    CREDIT_PERIOD,
    PERCENTAGE_OF_COVER,
    SINGLE_POLICY_TYPE,
    SINGLE_POLICY_LENGTH,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    VALID_COMPANY_BASE,
  } = FIELD_IDS;

  const submissionData = {
    [BUYER_COUNTRY]: 'Algeria',
    [CREDIT_PERIOD]: '1',
    [PERCENTAGE_OF_COVER]: '90',
    [SINGLE_POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
    [SINGLE_POLICY_LENGTH]: '3',
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
  };

  before(() => {
    cy.login();
    cy.submitAnswersHappyPathSinglePolicy();
    cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 80,
      'best-practices': 100,
      seo: 60,
    });
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY}`;
    partials.backLink().should('have.attr', 'href', expected);
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a submit button', () => {
    const button = checkYourAnswersPage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.SUBMIT_BUTTON);
    });
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    checkYourAnswersPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
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

      const expectedHref = `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`;
      row.changeLink().should('have.attr', 'href', expectedHref);
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

      const expectedHref = `${ROUTES.QUOTE.COMPANY_BASED_CHANGE}#heading`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `UK goods` key, value and change link', () => {
      const row = list[HAS_MINIMUM_UK_GOODS_OR_SERVICES];
      const expectedKeyText = FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(SUMMARY_ANSWERS[HAS_MINIMUM_UK_GOODS_OR_SERVICES]);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE}#heading`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });
  });

  context('policy summary list', () => {
    const list = checkYourAnswersPage.summaryLists.policy;

    it('renders a heading', () => {
      list.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.GROUP_HEADING_POLICY);
      });
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

      const expectedHref = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`;
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

      const expectedHref = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Contract value` key, value with no decimal points and change link', () => {
      const row = list[CONTRACT_VALUE];
      const expectedKeyText = FIELDS[CONTRACT_VALUE].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = '£150,000';

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Percentage of cover` key, value and change link', () => {
      const row = list[PERCENTAGE_OF_COVER];
      const expectedKeyText = FIELDS[PERCENTAGE_OF_COVER].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${submissionData[PERCENTAGE_OF_COVER]}%`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('does NOT render `Credit period` key, value or change link', () => {
      const row = list[CREDIT_PERIOD];

      row.key().should('not.exist');
      row.value().should('not.exist');
      row.changeLink().should('not.exist');
    });
  });

  context('form submission', () => {
    it(`should redirect to ${ROUTES.QUOTE.YOUR_QUOTE}`, () => {
      checkYourAnswersPage.submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);
    });
  });
});
