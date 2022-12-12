/**
 * mapPercentageOfCover
 * Map all percentages of cover and mark if it's selected
 * @param {Array} Array of percentages of cover
 * @returns {String} Selected percentage
 * @returns {Array} Array of mapped percentages of cover
 */
const mapPercentageOfCover = (percentages: Array<number>, selectedValue?: number) => {
  const mapped = percentages.map((percentage) => {
    if (selectedValue && selectedValue === percentage) {
      return {
        text: `${percentage}%`,
        value: percentage,
        selected: true,
      };
    }

    return {
      text: `${percentage}%`,
      value: percentage,
    };
  });

  if (!selectedValue) {
    const defaultOption = {
      disabled: true,
      selected: true,
      value: '',
    };

    const result = [defaultOption, ...mapped];

    return result;
  }

  return mapped;
};

export default mapPercentageOfCover;
