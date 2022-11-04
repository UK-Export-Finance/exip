import { PRODUCT } from '../../../../content-strings';
import { CorePageVariablesInitialInput, CorePageVariables } from '../../../../../types';
import corePageVariables from '..';

const insuranceCorePageVariables = ({ PAGE_CONTENT_STRINGS, BACK_LINK }: CorePageVariablesInitialInput): CorePageVariables => ({
  ...corePageVariables({
    PAGE_CONTENT_STRINGS,
    PRODUCT: {
      ...PRODUCT,
      DESCRIPTION: PRODUCT.DESCRIPTION.APPLICATION,
    },
    BACK_LINK,
  }),
});

export default insuranceCorePageVariables;
