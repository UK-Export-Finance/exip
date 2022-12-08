import { PRODUCT } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';
import { CorePageVariablesInitialInput, CorePageVariables } from '../../../../../types';
import corePageVariables from '..';

const { START: startRoute } = ROUTES.INSURANCE;

const insuranceCorePageVariables = ({ PAGE_CONTENT_STRINGS, BACK_LINK }: CorePageVariablesInitialInput): CorePageVariables => ({
  ...corePageVariables({
    PAGE_CONTENT_STRINGS,
    PRODUCT: {
      ...PRODUCT,
      DESCRIPTION: PRODUCT.DESCRIPTION.APPLICATION,
    },
    BACK_LINK,
    START_ROUTE: startRoute,
  }),
});

export default insuranceCorePageVariables;
