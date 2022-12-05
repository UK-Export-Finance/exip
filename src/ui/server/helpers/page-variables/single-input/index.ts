import corePageVariables from '../core';
import { FIELDS } from '../../../content-strings';
import { SingleInputPageVariablesInput, SingleInputPageVariables } from '../../../../types';

const singleInputPageVariables = ({ FIELD_ID, PAGE_CONTENT_STRINGS, PRODUCT, BACK_LINK, START_ROUTE }: SingleInputPageVariablesInput) => {
  const pageVariables: SingleInputPageVariables = {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK,
      PRODUCT,
      START_ROUTE,
    }),
    FIELD_ID,
  };

  const fieldStrings = FIELDS[FIELD_ID];

  if (fieldStrings) {
    pageVariables.FIELD_LABEL = fieldStrings.LABEL;
    pageVariables.FIELD_HINT = fieldStrings.HINT;
  }

  return pageVariables;
};

export default singleInputPageVariables;
