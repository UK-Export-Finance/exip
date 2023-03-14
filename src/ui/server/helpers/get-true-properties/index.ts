/**
 * getTrueProperties
 * Get true properties in an object
 * @param {Object}
 * @returns {Object} Object with only true properties
 */
const getTrueProperties = (obj: object) => {
  const cleanObj = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] === true) {
      cleanObj[key] = true;
    }
  });

  return cleanObj;
};

export default getTrueProperties;
