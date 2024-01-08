import singleInputPageVariables from '.';
import corePageVariables from '../core';
import { FIELDS } from '../../../content-strings';
import { FIELDS_ELIGIBILITY as FIELDS_INSURANCE_ELIGIBILITY } from '../../../content-strings/fields/insurance/eligibility';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';

const { FEEDBACK: feedbackRoute } = ROUTES.INSURANCE;

const { CONDITIONAL_YES_HTML } = TEMPLATES.PARTIALS.INSURANCE.CONNECTION_WITH_BUYER;

describe('server/helpers/page-variables/single-input', () => {
  const mock = {
    FIELD_ID: 'test',
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
    },
    BACK_LINK: '/mock',
    FEEDBACK_ROUTE: feedbackRoute,
    CONDITIONAL_YES_HTML,
  };

  it('should return corePageVariables with BACK_LINK, quote product description and FIELD_ID', () => {
    const result = singleInputPageVariables(mock);

    const expected = {
      FIELD_ID: mock.FIELD_ID,
      ...corePageVariables(mock),
    };

    expect(result).toEqual(expected);
  });

  describe('when a FIELD_ID exists in `fields` content string fields', () => {
    it('should also return FIELD_LABEL and FIELD_HINT', () => {
      mock.FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;
      const result = singleInputPageVariables(mock);

      const expectedLabel = FIELDS[mock.FIELD_ID].LABEL;
      const expectedHint = FIELDS[mock.FIELD_ID].HINT;

      expect(result.FIELD_LABEL).toEqual(expectedLabel);
      expect(result.FIELD_HINT).toEqual(expectedHint);
    });
  });

  describe('when a FIELD_ID exists in `fields - insurance eligibility` content string fields', () => {
    it('should also return a FIELD_HINT', () => {
      mock.FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.HAS_END_BUYER;
      const result = singleInputPageVariables(mock);

      const expectedHint = FIELDS_INSURANCE_ELIGIBILITY[mock.FIELD_ID].HINT;

      expect(result.FIELD_HINT).toEqual(expectedHint);
    });
  });

  describe('when CONDITIONAL_YES_HTML is provided', () => {
    it('should return CONDITIONAL_YES_HTML populated', () => {
      const result = singleInputPageVariables(mock);

      expect(result.CONDITIONAL_YES_HTML).toEqual(mock.CONDITIONAL_YES_HTML);
    });
  });
});
