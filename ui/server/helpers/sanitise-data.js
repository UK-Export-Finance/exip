const shouldChangeStringToNumber = (value) => {
  if (Number(value) || value === '0') {
    return true;
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
    return Number(value);
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
