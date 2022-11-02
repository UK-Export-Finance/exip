import singleInputPageVariables from '..';
import { PRODUCT } from '../../../../content-strings';
import { SingleInputPageVariablesInitialInput } from '../../../../../types';

const quoteSingleInputPageVariables = ({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK }: SingleInputPageVariablesInitialInput) =>
  singleInputPageVariables({
    PAGE_CONTENT_STRINGS,
    PRODUCT: {
      ...PRODUCT,
      DESCRIPTION: PRODUCT.DESCRIPTION.QUOTE,
    },
    BACK_LINK,
    FIELD_ID,
  });

export default quoteSingleInputPageVariables;
