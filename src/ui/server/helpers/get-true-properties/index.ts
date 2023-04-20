import { FIELD_VALUES } from '../../constants';

/**
 * getYesAndTrueAnswerProperties
 * Get true properties in an object
 * @param {Object}
 * @returns {Object} Object with only true properties
 */
const getYesAndTrueAnswerProperties = (obj: object) => {
  const cleanObj = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (value === true) {
      cleanObj[key] = true;
    }

    if (value === FIELD_VALUES.YES) {
      cleanObj[key] = FIELD_VALUES.YES;
    }
  });

  return cleanObj;
};

export default getYesAndTrueAnswerProperties;
