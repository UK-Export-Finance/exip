const csvRow = (fieldName: string, answer?: string | number) => {
  const value = answer || answer === 0 ? answer : '';

  const row = {
    Field: fieldName,
    Answer: String(value),
  };

  return row;
};

export default csvRow;
