import { checkYourAnswersPage } from '../../../pages/quote';
import {
  FIELDS,
  LINKS,
  PAGES,
  SUMMARY_ANSWERS,
} from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';

const CONTENT_STRINGS = PAGES.CHECK_YOUR_ANSWERS_PAGE;
const { FIELD_IDS, FIELD_VALUES, ROUTES } = CONSTANTS;

context('Check your answers page (multi policy) - as an exporter, I want to review the details before submitting the proposal', () => {
  const {
    BUYER_COUNTRY,
    CREDIT_PERIOD,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    MAX_AMOUNT_OWED,
    MULTI_POLICY_LENGTH,
    MULTI_POLICY_TYPE,
    PERCENTAGE_OF_COVER,
    VALID_COMPANY_BASE,
  } = FIELD_IDS;

  const submissionData = {
    [BUYER_COUNTRY]: 'Algeria',
    [CREDIT_PERIOD]: '1',
    [PERCENTAGE_OF_COVER]: '90',
    [MULTI_POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
  };

  before(() => {
    cy.login();
    cy.submitAnswersHappyPathMultiPolicy();
    cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
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
      const row = list[MULTI_POLICY_TYPE];
      const expectedKeyText = FIELDS[MULTI_POLICY_TYPE].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(submissionData[MULTI_POLICY_TYPE]);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Policy length` key and value (no change link)', () => {
      const row = list[MULTI_POLICY_LENGTH];
      const expectedKeyText = FIELDS[MULTI_POLICY_LENGTH].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${FIELD_VALUES.POLICY_LENGTH.MULTI} months`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().should('not.exist');
    });

    it('renders `Max amount owed` key, value with no decimal points and change link', () => {
      const row = list[MAX_AMOUNT_OWED];
      const expectedKeyText = FIELDS[MAX_AMOUNT_OWED].SUMMARY.TITLE;

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

      const expectedHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Credit period` key, value and change link', () => {
      const row = list[CREDIT_PERIOD];
      const expectedKeyText = FIELDS[CREDIT_PERIOD].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${submissionData[CREDIT_PERIOD]} month`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}-label`;
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
  });

  context('form submission', () => {
    it(`should redirect to ${ROUTES.QUOTE.YOUR_QUOTE}`, () => {
      checkYourAnswersPage.submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);
    });
  });
});
