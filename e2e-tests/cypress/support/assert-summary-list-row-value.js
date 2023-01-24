import checkText from '../e2e/helpers/check-text';

const assertSummaryListRowValue = (summaryList, fieldId, expected) => {
  checkText(
    summaryList[fieldId].value(),
    expected,
  );
};

export default assertSummaryListRowValue;
