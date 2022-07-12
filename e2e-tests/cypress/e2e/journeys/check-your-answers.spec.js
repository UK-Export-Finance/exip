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
    CAN_GET_PRIVATE_INSURANCE_NO,
    UK_GOODS_OR_SERVICES,
    AMOUNT,
    CREDIT_PERIOD,
    SINGLE_POLICY_TYPE,
    SINGLE_POLICY_LENGTH,
  } = FIELD_IDS;

  const submissionData = {
    [BUYER_COUNTRY]: 'France',
    [UK_GOODS_OR_SERVICES]: '50',
    [AMOUNT]: '100',
    [CREDIT_PERIOD]: '2',
    [SINGLE_POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
    [SINGLE_POLICY_LENGTH]: '9',
  };

  before(() => {
    cy.login();
    cy.submitAnswersHappyPath();
    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
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
      seo: 75,
    });
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    const expected = `${Cypress.config('baseUrl')}${ROUTES.TELL_US_ABOUT_YOUR_POLICY}`;
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

      const expectedHref = `${ROUTES.BUYER_COUNTRY_CHANGE}#${BUYER_COUNTRY}`;
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

      const expectedHref = `${ROUTES.COMPANY_BASED_CHANGE}#${VALID_COMPANY_BASE}`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Private insurance` key, value and change link', () => {
      const row = list[CAN_GET_PRIVATE_INSURANCE_NO];
      const expectedKeyText = FIELDS[CAN_GET_PRIVATE_INSURANCE_NO].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(SUMMARY_ANSWERS[CAN_GET_PRIVATE_INSURANCE_NO]);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE}#${CAN_GET_PRIVATE_INSURANCE_NO}`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `UK goods` key, value and change link', () => {
      const row = list[UK_GOODS_OR_SERVICES];
      const expectedKeyText = FIELDS[UK_GOODS_OR_SERVICES].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(SUMMARY_ANSWERS[UK_GOODS_OR_SERVICES]);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      const expectedHref = `${ROUTES.UK_GOODS_OR_SERVICES_CHANGE}#${UK_GOODS_OR_SERVICES}`;
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

      const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${AMOUNT}`;
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

      const expectedHref = `${ROUTES.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_TYPE}`;
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

      const expectedHref = `${ROUTES.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}`;
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

      const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}`;
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
