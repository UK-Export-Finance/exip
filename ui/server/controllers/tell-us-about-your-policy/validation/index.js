const validationRules = require('./rules');

const validation = (formBody) => {
  let errors;

  for (let i = 0; i < validationRules.length; i += 1) {
    errors = validationRules[i](formBody, errors);
  }

  return errors;
};

module.exports = validation;
