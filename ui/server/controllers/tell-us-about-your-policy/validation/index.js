const validationRules = require('./rules');

const validation = (submittedData) => {
  let errors;

  for (let i = 0; i < validationRules.length; i += 1) {
    errors = validationRules[i](submittedData, errors);
  }

  return errors;
};

module.exports = validation;
