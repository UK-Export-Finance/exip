import { RiskClassifications } from '../../../../types';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';
import isHighRiskCountry from './index';

const {
  CIS: { ESRA_CLASSIFICATION },
} = EXTERNAL_API_DEFINITIONS;

const assertions = [
  {
    response: false,
    risk: null,
  },
  {
    response: false,
    risk: ESRA_CLASSIFICATION.NONE as RiskClassifications,
  },
  {
    response: false,
    risk: ESRA_CLASSIFICATION.STANDARD as RiskClassifications,
  },
  {
    response: true,
    risk: ESRA_CLASSIFICATION.HIGH as RiskClassifications,
  },
  {
    response: false,
    risk: ESRA_CLASSIFICATION.VERY_HIGH as RiskClassifications,
  },
];

describe('isHighRiskCountry', () => {
  it.each(assertions)(
    'should return $response for $risk risk classification',
    ({ response, risk }: { response: boolean; risk: RiskClassifications | null }) => {
      // Act
      const expected = isHighRiskCountry(risk);

      // Assert
      expect(expected).toBe(response);
    },
  );
});
