const csvRow = (fieldName: string, answer?: string | number) => {
  const value = answer || '';

  const row = {
    Field: fieldName,
    Answer: value,
  };

  return row;
};

export default csvRow;
