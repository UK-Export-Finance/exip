/**
 * getTrueAndFalseAnswers
 * Get properties with true/false booleans in an object:
 * @param {Object}
 * @returns {Object} Object with only true properties
 */
const getTrueAndFalseAnswers = (obj: object) => {
  const cleanObj = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (value === true) {
      cleanObj[key] = true;
    }

    if (value === false) {
      cleanObj[key] = false;
    }
  });

  return cleanObj;
};

export default getTrueAndFalseAnswers;
