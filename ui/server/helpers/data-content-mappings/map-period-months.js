const mapPeriodMonths = (answer) => {
  if (answer === 1) {
    return `${answer} month`;
  }

  return `${answer} months`;
};

module.exports = mapPeriodMonths;
