const mapPercentageOfCover = (percentages: Array<Number>, selectedValue?: number) => {
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

    const result = [
      defaultOption,
      ...mapped,
    ];

    return result;
  }

  return mapped;
};

export default mapPercentageOfCover;
