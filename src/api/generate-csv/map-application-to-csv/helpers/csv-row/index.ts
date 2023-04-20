const csvRow = (fieldName: string, answer: string | number) => ({
  Field: fieldName,
  Answer: answer,
});

export default csvRow;
