import { RiskClassifications } from '../../../../types';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';
import isHighRiskCountry from './index';

const {
  CIS: { ESRA_CLASSIFICATION },
} = EXTERNAL_API_DEFINITIONS;

const assertions = [
  {
    expected: false,
    risk: null,
  },
  {
    expected: false,
    risk: ESRA_CLASSIFICATION.NONE as RiskClassifications,
  },
  {
    expected: false,
    risk: ESRA_CLASSIFICATION.STANDARD as RiskClassifications,
  },
  {
    expected: true,
    risk: ESRA_CLASSIFICATION.HIGH as RiskClassifications,
  },
  {
    expected: false,
    risk: ESRA_CLASSIFICATION.VERY_HIGH as RiskClassifications,
  },
];

describe('helpers/map-CIS-countries/map-CIS-country/is-high-risk-country', () => {
  it.each(assertions)(
    'should return $response for $risk risk classification',
    ({ expected, risk }: { expected: boolean; risk: RiskClassifications | null }) => {
      // Act
      const result = isHighRiskCountry(risk);

      // Assert
      expect(result).toBe(expected);
    },
  );
});
