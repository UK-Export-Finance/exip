import corePageVariables from './core-page-variables';
import { FIELDS } from '../content-strings';
import { SingleInputPageVariablesInput, SingleInputPageVariables } from '../../types';

const singleInputPageVariables = ({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK }: SingleInputPageVariablesInput) => {
  const pageVariables: SingleInputPageVariables = {
    ...corePageVariables({ PAGE_CONTENT_STRINGS, BACK_LINK }),
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
