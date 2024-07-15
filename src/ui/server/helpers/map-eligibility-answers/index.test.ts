import mapEligibilityAnswers from '.';
import { FIELD_IDS } from '../../constants';
import { mockEligibility } from '../../test-mocks';

const {
  INSURANCE: {
    ELIGIBILITY: { BUYER_COUNTRY_ISO_CODE, COVER_PERIOD_ID, TOTAL_CONTRACT_VALUE_ID },
  },
} = FIELD_IDS;

describe('server/helpers/map-eligibility-answers', () => {
  it(`should return the answers with buyer country as ${BUYER_COUNTRY_ISO_CODE}`, () => {
    const mockAnswers = mockEligibility;

    const result = mapEligibilityAnswers(mockAnswers);

    const { buyerCountry, totalContractValue, coverPeriod, hasReviewedEligibility, ...otherAnswers } = mockAnswers;

    const expected = {
      ...otherAnswers,
      [BUYER_COUNTRY_ISO_CODE]: buyerCountry?.isoCode,
      [COVER_PERIOD_ID]: coverPeriod,
      [TOTAL_CONTRACT_VALUE_ID]: totalContractValue,
      sectionReview: {
        eligibility: hasReviewedEligibility,
      },
    };

    expect(result).toEqual(expected);
  });
});
