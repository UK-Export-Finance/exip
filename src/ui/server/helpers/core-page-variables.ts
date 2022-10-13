import { BUTTONS, COOKIES_CONSENT, FOOTER, LINKS, PRODUCT } from '../content-strings';
import { CorePageVariablesInput, CorePageVariables } from '../../types';

const corePageVariables = ({ PAGE_CONTENT_STRINGS, BACK_LINK }: CorePageVariablesInput): CorePageVariables => ({
  CONTENT_STRINGS: {
    ...PAGE_CONTENT_STRINGS,
    BUTTONS,
    COOKIES_CONSENT,
    FOOTER,
    LINKS,
    PRODUCT,
  },
  BACK_LINK,
});

export default corePageVariables;
