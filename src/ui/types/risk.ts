/**
 * An object representing the available risk levels.
 *
 * @property {string} VERY_HIGH - Represents a "Very High" risk level.
 * @property {string} HIGH - Represents a "High" risk level.
 * @property {string} STANDARD - Represents a "Standard" risk level.
 */
const RISKS = {
  VERY_HIGH: 'Very High',
  HIGH: 'High',
  STANDARD: 'Standard',
} as const;

type RiskClassifications = (typeof RISKS)[keyof typeof RISKS];

export { RiskClassifications };
