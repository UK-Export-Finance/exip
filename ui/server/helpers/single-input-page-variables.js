const CONTENT_STRINGS = require('../content-strings');

const singleInputPageVariables = ({
  FIELD_NAME,
  PAGE_CONTENT_STRINGS,
  BACK_LINK,
}) => {
  const pageVariables = {
    CONTENT_STRINGS: {
      BUTTONS: CONTENT_STRINGS.BUTTONS,
      LINKS: CONTENT_STRINGS.LINKS,
      HINTS: CONTENT_STRINGS.HINTS,
      ...PAGE_CONTENT_STRINGS,
    },
    FIELD_NAME,
    BACK_LINK,
  };

  const fieldStrings = CONTENT_STRINGS.FIELDS[FIELD_NAME];

  if (fieldStrings) {
    pageVariables.FIELD_HINT = fieldStrings.HINT;
  }

  return pageVariables;
};

module.exports = singleInputPageVariables;
