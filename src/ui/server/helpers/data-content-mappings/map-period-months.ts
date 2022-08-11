const mapPeriodMonths = (answer: number) => {
  if (answer === 1) {
    return `${answer} month`;
  }

  return `${answer} months`;
};

export default mapPeriodMonths;
