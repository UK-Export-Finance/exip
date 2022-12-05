import singleInputPageVariables from '..';
import { PRODUCT } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';
import { SingleInputPageVariablesInitialInput } from '../../../../../types';

const { START: quoteStart } = ROUTES.QUOTE;

const quoteSingleInputPageVariables = ({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK }: SingleInputPageVariablesInitialInput) =>
  singleInputPageVariables({
    PAGE_CONTENT_STRINGS,
    PRODUCT: {
      ...PRODUCT,
      DESCRIPTION: PRODUCT.DESCRIPTION.QUOTE,
    },
    BACK_LINK,
    FIELD_ID,
    START_ROUTE: quoteStart,
  });

export default quoteSingleInputPageVariables;
