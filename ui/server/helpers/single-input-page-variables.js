const CONTENT_STRINGS = require('../content-strings');

const singleInputPageVariables = ({
  FIELD_ID,
  PAGE_CONTENT_STRINGS,
  BACK_LINK,
}) => {
  const pageVariables = {
    CONTENT_STRINGS: {
      PRODUCT: CONTENT_STRINGS.PRODUCT,
      FOOTER: CONTENT_STRINGS.FOOTER,
      BUTTONS: CONTENT_STRINGS.BUTTONS,
      LINKS: CONTENT_STRINGS.LINKS,
      HINTS: CONTENT_STRINGS.HINTS,
      ...PAGE_CONTENT_STRINGS,
    },
    FIELD_ID,
    BACK_LINK,
  };

  const fieldStrings = CONTENT_STRINGS.FIELDS[FIELD_ID];

  if (fieldStrings) {
    pageVariables.FIELD_LABEL = fieldStrings.LABEL;
    pageVariables.FIELD_HINT = fieldStrings.HINT;
  }

  return pageVariables;
};

module.exports = singleInputPageVariables;
