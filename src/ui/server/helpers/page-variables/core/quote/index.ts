import { PRODUCT } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';
import { CorePageVariablesInitialInput, CorePageVariables } from '../../../../../types';
import corePageVariables from '..';

const { START: quoteStart } = ROUTES.QUOTE;

const quoteCorePageVariables = ({ PAGE_CONTENT_STRINGS, BACK_LINK }: CorePageVariablesInitialInput): CorePageVariables => ({
  ...corePageVariables({
    PAGE_CONTENT_STRINGS,
    PRODUCT: {
      ...PRODUCT,
      DESCRIPTION: PRODUCT.DESCRIPTION.QUOTE,
    },
    BACK_LINK,
    START_ROUTE: quoteStart,
  }),
});

export default quoteCorePageVariables;
