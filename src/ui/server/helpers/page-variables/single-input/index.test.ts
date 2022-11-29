import singleInputPageVariables from '.';
import corePageVariables from '../core';
import { FIELDS, PRODUCT } from '../../../content-strings';
import { FIELD_IDS } from '../../../constants';

describe('server/helpers/page-variables/single-input', () => {
  const mock = {
    FIELD_ID: 'test',
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
    },
    PRODUCT: {
      DESCRIPTION: PRODUCT.DESCRIPTION.QUOTE,
    },
    BACK_LINK: '/mock',
  };

  it('should return corePageVariables with BACK_LINK, quote product description and FIELD_ID', () => {
    const result = singleInputPageVariables(mock);

    const expected = {
      FIELD_ID: mock.FIELD_ID,
      ...corePageVariables(mock),
    };

    expect(result).toEqual(expected);
  });

  describe('when a FIELD_ID exists in content string fields', () => {
    it('should also return FIELD_HINT', () => {
      mock.FIELD_ID = FIELD_IDS.BUYER_COUNTRY;
      const result = singleInputPageVariables(mock);

      const expected = FIELDS[mock.FIELD_ID].HINT;

      expect(result.FIELD_HINT).toEqual(expected);
    });
  });
});
