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
      ...PAGE_CONTENT_STRINGS,
    },
    FIELD_NAME,
    BACK_LINK,
  };

  return pageVariables;
};

module.exports = singleInputPageVariables;
