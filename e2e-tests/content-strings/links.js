const ROUTES = require('../constants/routes');

const LINKS = {
  BACK: 'Back',
  CHANGE: 'Change',
  START_AGAIN: {
    TEXT: 'Start again',
    HREF: ROUTES.BEFORE_YOU_START,
  },
  GIVE_FEEDBACK: {
    TEXT: 'Give feedback',
    HREF: ROUTES.FEEDBACK,
  },
};

module.exports = LINKS;
