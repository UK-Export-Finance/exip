import { FIELD_VALUES } from '../../constants';

/**
 * getTrueAnswerProperties
 * Get true properties in an object:
 * - String value
 * - True boolean
 * - Yes/No string value
 * @param {Object}
 * @returns {Object} Object with only true properties
 */
const getTrueAnswerProperties = (obj: object) => {
  const cleanObj = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (value === true) {
      cleanObj[key] = true;
    }

    if (value === FIELD_VALUES.YES) {
      cleanObj[key] = FIELD_VALUES.YES;
    }

    if (value === FIELD_VALUES.NO) {
      cleanObj[key] = FIELD_VALUES.NO;
    }
  });

  return cleanObj;
};

export default getTrueAnswerProperties;
