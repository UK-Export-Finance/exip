import {
  beforeYouStartPage,
  companyBasedPage,
  buyerBasedPage,
  triedToObtainCoverPage,
  finalDestinationPage,
  ukContentPercentagePage,
  tellUsAboutYourDealPage,
  checkYourAnswersPage,
} from '../pages';
import partials from '../partials';
import {
  ORGANISATION,
  BUTTONS,
  FIELDS,
  CHECK_YOUR_ANSWERS_PAGE as CONTENT_STRINGS,
  SUMMARY,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';
import FIELD_IDS from '../../../constants/field-ids';

context('Check your answers page', () => {
  const {
    VALID_COMPANY_BASE,
    VALID_BUYER_BASE,
    TRIED_PRIVATE_COVER,
    COUNTRY,
    FINAL_DESTINATION,
    UK_CONTENT_PERCENTAGE,
    CREDIT_LIMIT_CURRENCY,
    CREDIT_LIMIT,
    PRE_CREDIT_PERIOD,
    CREDIT_PERIOD,
    POLICY_LENGTH,
    POLICY_TYPE,
  } = FIELD_IDS;

  const submissionData = {
    [FINAL_DESTINATION]: 'France',
    [UK_CONTENT_PERCENTAGE]: '50',
    [CREDIT_LIMIT_CURRENCY]: 'GBP',
    [CREDIT_LIMIT]: '100',
    [PRE_CREDIT_PERIOD]: '1',
    [CREDIT_PERIOD]: '2',
    [POLICY_LENGTH]: '3',
    [POLICY_TYPE]: CONSTANTS.FIELD_VALUES.POLICY_TYPE.SINGLE,
  };

  before(() => {
    cy.visit(CONSTANTS.ROUTES.BEFORE_YOU_START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    beforeYouStartPage.submitButton().click();

    // company page/form
    companyBasedPage[VALID_COMPANY_BASE].yes().click();
    companyBasedPage.submitButton().click();

    // buyer page/form
    buyerBasedPage[VALID_BUYER_BASE].yes().click();
    buyerBasedPage.submitButton().click();

    // tried to obtain cover page/form
    triedToObtainCoverPage[TRIED_PRIVATE_COVER].yes().click();
    triedToObtainCoverPage.submitButton().click();

    // final destination page/form
    finalDestinationPage[COUNTRY].searchInput().type('Fra');

    const results = finalDestinationPage[COUNTRY].results();
    results.first().click();
    finalDestinationPage.submitButton().click();

    // uk content percentage page/form
    ukContentPercentagePage.input().type('50');
    ukContentPercentagePage.submitButton().click();

    // tell us about your deal page
    tellUsAboutYourDealPage[CREDIT_LIMIT_CURRENCY].input().select('GBP');
    tellUsAboutYourDealPage[CREDIT_LIMIT].input().type('100');
    tellUsAboutYourDealPage[PRE_CREDIT_PERIOD].input().type('1');
    tellUsAboutYourDealPage[CREDIT_PERIOD].input().type('2');
    tellUsAboutYourDealPage[POLICY_LENGTH].input().type('3');
    tellUsAboutYourDealPage[POLICY_TYPE].single.input().click();
    tellUsAboutYourDealPage.submitButton().click();

    cy.url().should('include', CONSTANTS.ROUTES.CHECK_YOUR_ANSWERS);
  });

  // it('passes the audits', () => {
  //   cy.lighthouse({
  //     accessibility: 100,
  //     performance: 80,
  //     'best-practices': 100,
  //     seo: 80,
  //   });
  // });

  // it('renders a back button with correct link', () => {
  //   partials.backLink().should('exist');
  //   partials.backLink().invoke('text').then((text) => {
  //     expect(text.trim()).equal(LINKS.BACK);
  //   });

  //   partials.backLink().click();

  //   cy.url().should('include', CONSTANTS.ROUTES.TELL_US_ABOUT_YOUR_DEAL);
  // });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    checkYourAnswersPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  // TOOO: add tests for change links

  describe('company summary list', () => {
    const list = checkYourAnswersPage.summaryLists.company;

    it('renders a heading', () => {
      list.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.GROUP_HEADING_COMPANY);
      });
    });

    it('renders `Company` key, value and change link', () => {
      const row = list[CONSTANTS.FIELDS.VALID_COMPANY_BASE];

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[VALID_COMPANY_BASE].TITLE);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(SUMMARY[VALID_COMPANY_BASE]);
      });
    });
  });

  describe('export summary list', () => {
    const list = checkYourAnswersPage.summaryLists.export;

    it('renders a heading', () => {
      list.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.GROUP_HEADING_EXPORT);
      });
    });

    it('renders `Buyer location` key, value and change link', () => {
      const row = list[CONSTANTS.FIELDS.VALID_BUYER_BASE];

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[VALID_BUYER_BASE].TITLE);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(SUMMARY[VALID_BUYER_BASE]);
      });
    });

    it('renders `Private insurance` key, value and change link', () => {
      const row = list[CONSTANTS.FIELDS.TRIED_PRIVATE_COVER];

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[TRIED_PRIVATE_COVER].TITLE);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(SUMMARY[TRIED_PRIVATE_COVER]);
      });
    });

    it('renders `Export destination` key, value and change link', () => {
      const row = list[CONSTANTS.FIELDS.FINAL_DESTINATION];

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[FINAL_DESTINATION].TITLE);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(submissionData[FINAL_DESTINATION]);
      });
    });

    it('renders `UK content` key, value and change link', () => {
      const row = list[CONSTANTS.FIELDS.UK_CONTENT_PERCENTAGE];

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[UK_CONTENT_PERCENTAGE].TITLE);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${submissionData[UK_CONTENT_PERCENTAGE]}%`;

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('deal summary list', () => {
    const list = checkYourAnswersPage.summaryLists.deal;

    it('renders a heading', () => {
      list.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.GROUP_HEADING_DEAL);
      });
    });

    it('renders `Credit limit` key, value and change link', () => {
      const row = list[CONSTANTS.FIELDS.CREDIT_LIMIT];

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[CREDIT_LIMIT].TITLE);
      });

      row.value().invoke('text').then((text) => {
        const expected = '£100.00';
        expect(text.trim()).equal(expected);
      });
    });

    it('renders `Pre-credit period` key, value and change link', () => {
      const row = list[CONSTANTS.FIELDS.PRE_CREDIT_PERIOD];

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[PRE_CREDIT_PERIOD].TITLE);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${submissionData[PRE_CREDIT_PERIOD]} days`;

        expect(text.trim()).equal(expected);
      });
    });

    it('renders `Credit period` key, value and change link', () => {
      const row = list[CONSTANTS.FIELDS.CREDIT_PERIOD];

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[CREDIT_PERIOD].TITLE);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${submissionData[CREDIT_PERIOD]} days`;

        expect(text.trim()).equal(expected);
      });
    });

    it('renders `Policy length` key, value and change link', () => {
      const row = list[CONSTANTS.FIELDS.POLICY_LENGTH];

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[POLICY_LENGTH].TITLE);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${submissionData[POLICY_LENGTH]} months`;

        expect(text.trim()).equal(expected);
      });
    });

    it('renders `Policy type` key, value and change link', () => {
      const row = list[CONSTANTS.FIELDS.POLICY_TYPE];

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[POLICY_TYPE].TITLE);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(submissionData[POLICY_TYPE]);
      });
    });
  });

  it('renders a submit button', () => {
    const button = checkYourAnswersPage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.SUBMIT);
    });
  });

  it(`should redirect to ${CONSTANTS.ROUTES.PREMIUM_QUOTE}`, () => {
    checkYourAnswersPage.submitButton().click();

    cy.url().should('include', CONSTANTS.ROUTES.PREMIUM_QUOTE);
  });
});
