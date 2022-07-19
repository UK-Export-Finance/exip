const { isNumber } = require('./number');
const { stripCommas } = require('./string');

const shouldChangeStringToNumber = (value) => {
  if (typeof value === 'string' && isNumber(value)) {
    return true;
  }

  if (typeof value === 'string') {
    const stripped = stripCommas(value);

    if (isNumber(stripped)) {
      return true;
    }
  }

  return false;
};

const sanitiseValue = (value) => {
  if (value === 'true' || value === true) {
    return true;
  }

  if (value === 'false' || value === false) {
    return false;
  }

  if (shouldChangeStringToNumber(value)) {
    const stripped = stripCommas(value);

    return Number(stripped);
  }

  return value;
};

const sanitiseData = (formData) => {
  const sanitised = {};
  const keys = Object.keys(formData);

  keys.forEach((key) => {
    const value = formData[key];

    sanitised[key] = sanitiseValue(value);
  });

  return sanitised;
};

module.exports = {
  shouldChangeStringToNumber,
  sanitiseValue,
  sanitiseData,
};
